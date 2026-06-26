-- ===================================================
-- schema.sql — TIMO Supabase DB 스키마
-- Supabase Dashboard > SQL Editor 에서 순서대로 실행
-- ===================================================


-- ────────────────────────────────────────────────
-- 1. profiles (auth.users 와 1:1 연결)
-- ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id               UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name             TEXT        NOT NULL,
  email            TEXT        NOT NULL UNIQUE,
  avatar_url       TEXT,
  bio              TEXT,
  skills           TEXT[]      DEFAULT '{}',
  interests        TEXT[]      DEFAULT '{}',       -- quiz step1 결과
  selected_tools   TEXT[]      DEFAULT '{}',       -- quiz step2 결과
  personality_type TEXT        CHECK (personality_type IN ('planner','executor','analyst','communicator')),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles: 모두 읽기"
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "profiles: 본인만 INSERT"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = id);

CREATE POLICY "profiles: 본인만 UPDATE"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = id)
  WITH CHECK ((SELECT auth.uid()) = id);


-- ────────────────────────────────────────────────
-- 2. 회원가입 시 profiles 자동 생성 트리거
-- ────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ────────────────────────────────────────────────
-- 3. projects
-- ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.projects (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title            TEXT        NOT NULL,
  category         TEXT        NOT NULL CHECK (category IN ('공모전','해커톤','사이드 프로젝트','창업')),
  status           TEXT        NOT NULL DEFAULT 'open' CHECK (status IN ('open','urgent','closed')),
  description      TEXT,
  deadline         DATE,
  duration_label   TEXT,
  members_current  INT         NOT NULL DEFAULT 1,
  members_total    INT         NOT NULL DEFAULT 4,
  roles            JSONB       NOT NULL DEFAULT '[]',
  tech_stack       TEXT[]      DEFAULT '{}',
  author_id        UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  applicants_count INT         NOT NULL DEFAULT 0,
  views            INT         NOT NULL DEFAULT 0,
  is_featured      BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "projects: 모두 읽기"
  ON public.projects FOR SELECT USING (true);

CREATE POLICY "projects: 본인만 INSERT"
  ON public.projects FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = author_id);

CREATE POLICY "projects: 본인만 UPDATE"
  ON public.projects FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = author_id)
  WITH CHECK ((SELECT auth.uid()) = author_id);

CREATE POLICY "projects: 본인만 DELETE"
  ON public.projects FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) = author_id);

CREATE INDEX IF NOT EXISTS idx_projects_author_id  ON public.projects(author_id);
CREATE INDEX IF NOT EXISTS idx_projects_category   ON public.projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_status     ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON public.projects(created_at DESC);


-- ────────────────────────────────────────────────
-- 4. applications (프로젝트 지원)
-- ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.applications (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id    UUID        NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id       UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  motivation    TEXT        NOT NULL,
  portfolio_url TEXT,
  self_intro    TEXT        NOT NULL,
  status        TEXT        NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','accepted','rejected')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(project_id, user_id)
);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "applications: 관련자만 읽기"
  ON public.applications FOR SELECT
  TO authenticated
  USING (
    (SELECT auth.uid()) = user_id
    OR (SELECT auth.uid()) = (SELECT author_id FROM public.projects WHERE id = project_id)
  );

CREATE POLICY "applications: 본인만 INSERT"
  ON public.applications FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "applications: 본인만 DELETE"
  ON public.applications FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

CREATE INDEX IF NOT EXISTS idx_applications_user_id    ON public.applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_project_id ON public.applications(project_id);


-- ────────────────────────────────────────────────
-- 5. posts (커뮤니티 게시글)
-- ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.posts (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  category   TEXT        NOT NULL CHECK (category IN ('free','contest','review')),
  title      TEXT        NOT NULL,
  content    TEXT        NOT NULL,
  author_id  UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  views      INT         NOT NULL DEFAULT 0,
  likes      INT         NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "posts: 모두 읽기"
  ON public.posts FOR SELECT USING (true);

CREATE POLICY "posts: 인증된 사용자 INSERT"
  ON public.posts FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = author_id);

CREATE POLICY "posts: 본인만 UPDATE"
  ON public.posts FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = author_id)
  WITH CHECK ((SELECT auth.uid()) = author_id);

CREATE POLICY "posts: 본인만 DELETE"
  ON public.posts FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) = author_id);

CREATE INDEX IF NOT EXISTS idx_posts_category   ON public.posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_author_id  ON public.posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON public.posts(created_at DESC);


-- ────────────────────────────────────────────────
-- 6. comments (댓글)
-- ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.comments (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id    UUID        NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  author_id  UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content    TEXT        NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "comments: 모두 읽기"
  ON public.comments FOR SELECT USING (true);

CREATE POLICY "comments: 인증된 사용자 INSERT"
  ON public.comments FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = author_id);

CREATE POLICY "comments: 본인만 DELETE"
  ON public.comments FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) = author_id);

CREATE INDEX IF NOT EXISTS idx_comments_post_id ON public.comments(post_id);


-- ────────────────────────────────────────────────
-- 7. post_likes (좋아요 중복 방지)
-- ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.post_likes (
  post_id    UUID        NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id    UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (post_id, user_id)
);

ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "post_likes: 모두 읽기"
  ON public.post_likes FOR SELECT USING (true);

CREATE POLICY "post_likes: 본인만 INSERT"
  ON public.post_likes FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "post_likes: 본인만 DELETE"
  ON public.post_likes FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);


-- ────────────────────────────────────────────────
-- 8. bookmarks (프로젝트 북마크)
-- ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.bookmarks (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  project_id UUID        NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, project_id)
);

ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "bookmarks: 본인만 읽기"
  ON public.bookmarks FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "bookmarks: 본인만 INSERT"
  ON public.bookmarks FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "bookmarks: 본인만 DELETE"
  ON public.bookmarks FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id ON public.bookmarks(user_id);


-- ────────────────────────────────────────────────
-- 9. saved_posts (게시글 저장)
-- ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.saved_posts (
  user_id    UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  post_id    UUID        NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, post_id)
);

ALTER TABLE public.saved_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "saved_posts: 본인만 읽기"
  ON public.saved_posts FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "saved_posts: 본인만 INSERT"
  ON public.saved_posts FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "saved_posts: 본인만 DELETE"
  ON public.saved_posts FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

CREATE INDEX IF NOT EXISTS idx_saved_posts_user_id ON public.saved_posts(user_id);


-- ────────────────────────────────────────────────
-- 10. notifications (알림)
-- ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.notifications (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type       TEXT        NOT NULL CHECK (type IN ('application','accepted','rejected','comment','review')),
  message    TEXT        NOT NULL,
  link_page  TEXT,
  link_param TEXT,
  is_read    BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "notifications: 본인만 읽기"
  ON public.notifications FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "notifications: 본인만 UPDATE"
  ON public.notifications FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id_unread ON public.notifications(user_id, is_read);


-- ────────────────────────────────────────────────
-- 11. reviews (협업 리뷰)
-- ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.reviews (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID        NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  author_id  UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  target_id  UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  rating     INT         NOT NULL CHECK (rating BETWEEN 1 AND 5),
  content    TEXT        NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(project_id, author_id, target_id)
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "reviews: 모두 읽기"
  ON public.reviews FOR SELECT USING (true);

CREATE POLICY "reviews: 인증된 사용자 INSERT"
  ON public.reviews FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = author_id);

CREATE INDEX IF NOT EXISTS idx_reviews_target_id ON public.reviews(target_id);
CREATE INDEX IF NOT EXISTS idx_reviews_author_id ON public.reviews(author_id);


-- ────────────────────────────────────────────────
-- 12. Data API 접근 권한 부여
--     (Supabase Data API settings에 따라 필요할 수 있음)
-- ────────────────────────────────────────────────
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.profiles, public.projects, public.posts, public.comments, public.post_likes, public.reviews TO anon;
GRANT ALL ON public.profiles, public.projects, public.applications, public.posts, public.comments, public.post_likes, public.bookmarks, public.saved_posts, public.notifications, public.reviews TO authenticated;
