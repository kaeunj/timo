/* ===================================================
   api.js — API 레이어 (현재: 샘플 데이터 / 추후: Supabase)
   =================================================== */

/* ── 샘플 데이터 ── */

const SAMPLE_PROJECTS = [
  {
    id: 'proj-001',
    title: '2026 스마트시티 앱 공모전 팀 구합니다',
    category: '공모전',
    deadline: '2026-07-01',
    members: { current: 2, total: 5 },
    techStack: ['React', 'Node.js', 'Figma'],
    roles: ['프론트엔드', '백엔드'],
    author: { name: '김서연', avatar: '#7fffd4', initial: '김' },
    isBookmarked: false,
    views: 234,
    applicants: 8
  },
  {
    id: 'proj-002',
    title: '헬스케어 플랫폼 사이드 프로젝트 팀원 모집',
    category: '사이드 프로젝트',
    deadline: '2026-07-15',
    members: { current: 1, total: 4 },
    techStack: ['Vue.js', 'Python', 'AWS'],
    roles: ['프론트엔드', '기획'],
    author: { name: '이준혁', avatar: '#b2ebf2', initial: '이' },
    isBookmarked: true,
    views: 187,
    applicants: 5
  },
  {
    id: 'proj-003',
    title: '2026 해커톤 우승을 목표로! 팀원 모집',
    category: '해커톤',
    deadline: '2026-06-28',
    members: { current: 3, total: 4 },
    techStack: ['React Native', 'Firebase'],
    roles: ['백엔드'],
    author: { name: '박민서', avatar: '#ffe0b2', initial: '박' },
    isBookmarked: false,
    views: 320,
    applicants: 12
  }
];

const SAMPLE_POSTS = [
  {
    id: 'post-001',
    category: '자유게시판',
    title: '해커톤 처음인데 어떻게 준비해야 하나요?',
    content: '다음 달에 첫 해커톤을 나가게 됐는데요. 준비 팁 공유해주실 분 계신가요?',
    author: { name: '이준혁', avatar: '#7fffd4', initial: '이' },
    createdAt: '2026-06-23T10:00:00Z',
    views: 234,
    comments: 18,
    likes: 12
  },
  {
    id: 'post-002',
    category: '공모전 정보',
    title: '2026 K-스타트업 앱 공모전 접수 시작!',
    content: '상금 1000만원 규모의 K-스타트업 공모전이 시작됩니다.',
    author: { name: '관리자', avatar: '#f8bbd9', initial: '관' },
    createdAt: '2026-06-22T09:00:00Z',
    views: 512,
    comments: 7,
    likes: 34
  },
  {
    id: 'post-003',
    category: '프로젝트 후기',
    title: '첫 공모전 수상 후기 공유합니다 🎉',
    content: 'TIMO에서 만난 팀원들과 함께 공모전 은상을 수상했어요!',
    author: { name: '김서연', avatar: '#c8e6c9', initial: '김' },
    createdAt: '2026-06-20T14:30:00Z',
    views: 891,
    comments: 42,
    likes: 78
  }
];

const SAMPLE_USER = {
  id: 'user-001',
  name: '박민서',
  email: 'user@example.com',
  avatar: '#b2ebf2',
  initial: '박',
  bio: 'UI/UX 디자이너 + 프론트엔드',
  skills: ['Figma', 'React', 'CSS'],
  personalityType: null,
  myProjects: [],
  myApplications: [],
  bookmarks: ['proj-002']
};

/* ── API 인터페이스 (추후 Supabase 실제 호출로 교체) ── */

const API = {
  auth: {
    async login(email, password) {
      /* supabase.auth.signInWithPassword */
      return { error: null, data: { user: SAMPLE_USER } };
    },
    async signup(email, password) {
      /* supabase.auth.signUp */
      return { error: null, data: { user: SAMPLE_USER } };
    },
    async loginWithGoogle()  { /* supabase.auth.signInWithOAuth({ provider: 'google' }) */ },
    async loginWithKakao()   { /* supabase.auth.signInWithOAuth({ provider: 'kakao'  }) */ },
    async loginWithNaver()   { /* supabase.auth.signInWithOAuth({ provider: 'naver'  }) */ },
    async logout()           { /* supabase.auth.signOut */ },
    async getSession()       { return Storage.get('session'); }
  },

  projects: {
    async getList(filters = {}) {
      return { data: SAMPLE_PROJECTS, error: null };
    },
    async getById(id) {
      const project = SAMPLE_PROJECTS.find(p => p.id === id) || null;
      return { data: project, error: null };
    },
    async apply(projectId, data) {
      /* supabase.from('applications').insert() */
      return { data: { id: 'app-001', projectId, ...data }, error: null };
    }
  },

  community: {
    async getPosts(category = null) {
      const posts = category
        ? SAMPLE_POSTS.filter(p => p.category === category)
        : SAMPLE_POSTS;
      return { data: posts, error: null };
    },
    async getPost(id) {
      const post = SAMPLE_POSTS.find(p => p.id === id) || null;
      return { data: post, error: null };
    },
    async createPost(data) {
      /* supabase.from('posts').insert() */
      return { data: { id: 'post-new', ...data }, error: null };
    }
  },

  profile: {
    async get(userId) {
      return { data: SAMPLE_USER, error: null };
    },
    async update(data) {
      /* supabase.from('profiles').update() */
      return { data: { ...SAMPLE_USER, ...data }, error: null };
    },
    async saveQuizResult(result) {
      /* supabase.from('profiles').update({ personality_type }) */
      return { data: result, error: null };
    }
  },

  bookmarks: {
    async toggle(projectId) {
      /* supabase.from('bookmarks').insert() or delete() */
      return { data: { projectId }, error: null };
    }
  }
};
