# TIMO 구현 계획서

> **앱 정보**: TIMO (Team In, Move on) — 공모전·해커톤·사이드 프로젝트 팀원 매칭 모바일 웹앱
> **Figma 파일**: `5CWZCfkBpPhXfvnQqDE7aE`
> **기준 너비**: 390px (Figma 디자인 기준)
> **기술 스택**: HTML5 / CSS3 / Vanilla JS (ES6+) / Supabase (추후)
> **갱신 메모(2026-06-23)**: 홈(`71:17733`) / 프로젝트 상세(`71:18042`) / 프로젝트 지원(`71:18126`) / 지원 완료(`71:18163`) 4개 화면을 Figma MCP로 직접 재분석하여 3·4·6·7·8·10·12·13·14·15번 항목에 검증된 디테일을 반영함. 폰트는 기존 규정대로 S-Core Dream(제목)/Pretendard(본문) 유지 확정.

---

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 앱 이름 | TIMO (Team In, Move on) |
| 성격 | 팀원 매칭 모바일 웹앱 |
| 구조 | index.html 단일 파일 SPA (Section 전환 방식) |
| 기준 해상도 | 375px / 390px / 430px / 768px |
| 렌더링 방식 | 정적 HTML + CSS + JS 화면 전환 |
| 폰트 | S-Core Dream (제목), Pretendard (본문) — CDN |
| 백엔드 | Supabase (추후 Sprint 1부터 연결) |

---

## 2. 구현 대상 화면 목록

| 순번 | 화면 ID | 화면명 | Figma Node ID |
|------|---------|--------|----------------|
| 1 | `onboarding-1` | 온보딩 1 | `80:189` |
| 2 | `onboarding-2` | 온보딩 2 | `91:262` |
| 3 | `signup` | 회원가입 | `71:17583` |
| 4 | `login` | 로그인 | `71:17534` |
| 5 | `quiz-1` | 성향테스트 1 | `71:17640` |
| 6 | `quiz-2` | 성향테스트 2 | `71:18644` |
| 7 | `quiz-3` | 성향테스트 3 | `71:17427` |
| 8 | `quiz-result` | 테스트 완료 | `71:17675` |
| 9 | `home` | 홈 | `71:17733` |
| 10 | `project-detail` | 프로젝트 상세 | `71:18042` |
| 11 | `project-apply` | 프로젝트 지원 | `71:18126` |
| 12 | `apply-complete` | 지원 완료 | `71:18163` |
| 13 | `community` | 커뮤니티 | `71:18199` |
| 14 | `community-post` | 커뮤니티 게시글 | `71:18338` |
| 15 | `mypage` | 마이페이지 | `71:18413` |
| 16 | `project-review` | 프로젝트 리뷰 | `71:18510` |

**총 16개 화면** (9~12번은 Figma MCP로 재검증 완료)

---

## 3. 화면별 역할

### 인증 플로우
| 화면 | 역할 |
|------|------|
| 온보딩 1·2 | 앱 첫 진입 소개 슬라이드 (3개 페이지네이션 도트). 최초 1회만 표시 (localStorage 체크) |
| 회원가입 | 이메일/비밀번호 입력 + 약관 동의. 소셜 가입 없음 |
| 로그인 | 이메일/비밀번호 로그인 + 구글/카카오/네이버 소셜 로그인 |
| 성향테스트 1·2·3 | 회원가입 직후 진행하는 3단계 성향 퀴즈 (진행바 표시) |
| 테스트 완료 | 성향 결과 표시 + 홈으로 이동 |

### 메인 플로우 (바텀 네비)
| 화면 | 역할 | Figma 검증 디테일 |
|------|------|---------------------|
| 홈 | 프로젝트 카드 목록. 필터 칩, 검색, 추천 프로젝트 | 인사말 "안녕하세요 👋 / {닉네임}님" + 알림 벨(미확인 뱃지), 검색바 placeholder "프로젝트, 팀원 검색", 추천 1건을 다크 그라디언트 배너로 강조("지금 지원하기" CTA, 마감 D-day·지원자 수 표시), 필터 칩(전체/공모전/해커톤/사이드 프로젝트), 추천 프로젝트 카드 리스트, 우하단 FAB |
| 프로젝트 상세 | 프로젝트 정보 상세. 지원하기 버튼 | 상단 풀블리드 커버 이미지 위 뒤로가기/북마크/공유 아이콘(반투명 다크 원형 버튼), 카테고리뱃지+모집상태("● 모집 중"), 정보 그리드 3분할(마감일/팀원 수/기간), "프로젝트 소개" 카드, "모집 직군" 카드(직군별 모집 상태 배지), 하단 고정 액션바(지원자 수 + "지원하기" 버튼). **바텀 탭 네비 없음(풀스크린)** |
| 프로젝트 지원 | 지원 동기/포트폴리오 입력 폼 | 헤더(뒤로가기+"프로젝트 지원"), 지원 대상 프로젝트명 고지 영역(회색 배경), 필수 입력 2개(지원 동기*, 자기소개*) + 선택 입력 1개(포트폴리오 링크), 하단 "지원 완료" 제출 버튼. **바텀 탭 네비 없음(풀스크린)** |
| 지원 완료 | 지원 완료 확인 + 홈 이동 | 체크 아이콘 원형 비주얼 + 장식 도형(별/물방울 등), "지원이 완료되었어요!" 안내문 + 보조 설명, "홈으로 이동"(아웃라인 버튼) / "내 지원 내역 보기"(채움 버튼) 2개 액션. **바텀 탭 네비 없음(풀스크린)** |
| 커뮤니티 | 자유게시판/공모전 정보/프로젝트 후기 탭. FAB(글쓰기 버튼) |
| 커뮤니티 게시글 | 게시글 상세 + 댓글 목록 |
| 마이페이지 | 프로필, 내 프로젝트, 내 지원내역, 북마크 |
| 프로젝트 리뷰 | 완료된 프로젝트 리뷰 작성 |

> **⚠️ 변경점**: 기존 계획에서는 프로젝트 상세/지원/지원완료 3개 화면도 바텀 네비가 표시되는 것으로 가정했으나, Figma 실제 화면을 확인한 결과 이 3개 화면은 바텀 네비 없는 풀스크린 플로우로 디자인되어 있다. 10번 항목에서 라우터 수정안을 다룬다.

---

## 4. 공통 컴포넌트 목록

| 컴포넌트 | BEM 클래스 | 설명 |
|----------|-----------|------|
| 상태바 | `.status-bar` | iOS 상태바 UI (시간, 배터리, 와이파이) |
| 헤더 | `.app-header` | 페이지 상단 헤더 (제목 + 뒤로가기/아이콘) |
| 바텀 네비 | `.bottom-nav` / `.bottom-nav__item` / `.bottom-nav__item--active` | 4탭 하단 내비게이션 |
| 버튼 | `.btn` / `.btn--primary` / `.btn--secondary` / `.btn--social` / `.btn--disabled` | 모든 버튼 상태 |
| 인풋 | `.input-group` / `.input-group__label` / `.input-group__field` / `.input-group--error` / `.input-group--success` | 폼 입력 필드 |
| 프로젝트 카드 | `.project-card` / `.project-card__title` / `.project-card__tags` / `.project-card__meta` | 홈/리스트용 카드 |
| 커뮤니티 카드 | `.community-card` / `.community-card__badge` / `.community-card__stats` | 커뮤니티 게시글 카드 |
| 태그/칩 | `.tag` / `.chip` / `.chip--active` | 카테고리, 기술스택 표시 |
| 카테고리 배지 | `.cat-badge` / `.cat-badge--free` / `.cat-badge--contest` / `.cat-badge--review` | 커뮤니티 게시글 분류 |
| 아바타 | `.avatar` / `.avatar--sm` / `.avatar--md` | 프로필 이미지 원형 |
| 진행바 | `.progress-bar` / `.progress-bar__fill` | 성향테스트 진행 상태 |
| 페이지네이션 도트 | `.pagination-dots` / `.pagination-dots__dot--active` | 온보딩 슬라이드 표시 |
| FAB | `.fab` | 커뮤니티 글쓰기 플로팅 버튼 |
| 토스트 | `.toast` / `.toast--success` / `.toast--error` | 알림 메시지 |
| 모달 | `.modal` / `.modal__overlay` / `.modal__content` | 팝업/확인 모달 |
| 바텀시트 | `.bottom-sheet` / `.bottom-sheet__handle` | 슬라이딩 시트 |

### 4-1. 신규 컴포넌트 (홈/상세/지원/지원완료 화면 분석으로 추가 확정)

| 컴포넌트 | BEM 클래스(안) | 설명 | 비고 |
|----------|----------------|------|------|
| 아이콘 버튼(원형) | `.icon-btn` / `.icon-btn--dark` | 알림 벨, 상세 페이지 뒤로가기/북마크/공유 버튼 공통 | `--dark`는 반투명 흑배경(상세 히어로 위에서 사용) |
| 검색바 | `.search-bar` / `.search-bar__icon` / `.search-bar__input` | 홈 상단 검색 placeholder | 실제 입력 가능한 `<input>`로 구현 |
| 프로젝트 배너(추천) | `.project-banner` / `.project-banner__badge` / `.project-banner__cta` | 홈 상단 다크 그라디언트 추천 배너 | 카테고리뱃지·CTA 버튼 내포 |
| 필터 칩 그룹 | `.filter-chip-group` / `.filter-chip` / `.filter-chip--active` | 전체/공모전/해커톤/사이드 프로젝트 토글 | 기존 `.chip`(흰 배경 active 시 흑색)과 톤이 달라 별도 클래스 |
| 모집 상태 텍스트 | `.recruit-status` / `.recruit-status--open` / `.recruit-status--urgent` | "● 모집 중"(초록) / "● 모집 마감임박"(빨강) | 점(•) + 텍스트 |
| 역할(직군) 뱃지 | `.role-badge` / `.role-badge--card` | 프론트엔드/백엔드/디자인/기획 | 홈 카드용(소형, 텍스트만) / 상세 페이지용(`--card`, 라벨+모집상태 2줄) |
| 정보 그리드 | `.info-grid` / `.info-grid__item` | 상세 페이지 마감일·팀원수·기간 3분할 | 아이콘+라벨+값 |
| 지원 폼 | `.apply-form` / `.apply-form__group` / `.apply-form__label` / `.apply-form__textarea` / `.apply-form__input` / `.apply-form__required` | 지원 동기/자기소개(textarea), 포트폴리오 링크(input) | `*` 필수 표시는 `--color-status-urgent` 톤 재사용 |
| 완료 화면 비주얼 | `.success-visual` / `.success-visual__circle` / `.success-visual__deco` | 체크 아이콘 원 + 장식 별/도형 | SVG 장식은 절대 위치 |
| 하단 고정 액션바 | `.fixed-action-bar` | 상세 페이지 하단 지원자수+지원하기 버튼 고정 영역 | `position: sticky`/`fixed` |

---

## 5. 파일 구조

```
c:\퍼블리싱\timo\
│
├── index.html                    ← SPA 진입점 (전체 화면 포함)
│
├── css/
│   ├── reset.css                 ← 브라우저 기본 스타일 초기화
│   ├── variables.css             ← CSS 커스텀 프로퍼티 (디자인 토큰)
│   ├── common.css                ← 공통 컴포넌트 스타일
│   └── pages/
│       ├── onboarding.css
│       ├── auth.css              ← login + signup 통합
│       ├── quiz.css              ← 성향테스트 1·2·3 + 완료
│       ├── home.css               ← ★ 홈 (검색바/배너/필터칩/카드)
│       ├── project.css            ← ★ 상세 + 지원 + 지원완료 + 리뷰
│       ├── community.css         ← 목록 + 게시글
│       └── mypage.css
│
├── js/
│   ├── router.js                 ← SPA 화면 전환 핵심 라우터 (NAV_HIDDEN_PAGES 수정 필요, 10번 참고)
│   ├── common.js                 ← 공통 유틸 (토스트, 모달, 날짜 포맷 등)
│   ├── api.js                    ← Supabase API 레이어 (추후)
│   └── pages/
│       ├── onboarding.js
│       ├── auth.js               ← login + signup 공통
│       ├── quiz.js
│       ├── home.js                ← ★ 검색/필터/카드 렌더링 구현
│       ├── project.js             ← ★ 상세/지원/지원완료 구현
│       ├── community.js
│       └── mypage.js
│
├── assets/
│   ├── images/
│   │   ├── logo.png              ← TIMO 로고
│   │   └── onboarding-*.png     ← 온보딩 일러스트
│   ├── icons/
│   │   ├── icon-home.svg
│   │   ├── icon-project.svg
│   │   ├── icon-community.svg
│   │   ├── icon-mypage.svg
│   │   └── ...
│   └── fonts/                    ← (CDN 사용하므로 비워둠)
│
└── supabase/
    └── schema.sql                ← DB 스키마 (추후)
```

> 현재 `home.css`/`project.css`, `home.js`/`project.js`는 빈 파일/스텁 상태(`HomePage.init`, `ProjectPage.initDetail/initApply/initComplete` 시그니처만 존재)이며, 이번 단계에서 실제 구현을 채운다.

---

## 6. HTML section 구조

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <!-- CDN 폰트 -->
  <!-- CSS 파일들 -->
</head>
<body>
  <!-- ① 앱 전체 래퍼 -->
  <div id="app">

    <!-- ② 상태바 (공통) -->
    <div class="status-bar">...</div>

    <!-- ③ 각 페이지 section (data-page로 식별) -->
    <section data-page="onboarding-1" class="page">...</section>
    <section data-page="onboarding-2" class="page">...</section>
    <section data-page="login"        class="page">...</section>
    <section data-page="signup"       class="page">...</section>
    <section data-page="quiz-1"       class="page">...</section>
    <section data-page="quiz-2"       class="page">...</section>
    <section data-page="quiz-3"       class="page">...</section>
    <section data-page="quiz-result"  class="page">...</section>
    <section data-page="home"         class="page">...</section>
    <section data-page="project-detail"  class="page">...</section>
    <section data-page="project-apply"   class="page">...</section>
    <section data-page="apply-complete"  class="page">...</section>
    <section data-page="community"       class="page">...</section>
    <section data-page="community-post"  class="page">...</section>
    <section data-page="mypage"          class="page">...</section>
    <section data-page="project-review"  class="page">...</section>

    <!-- ④ 바텀 네비 (공통) -->
    <nav class="bottom-nav" id="bottom-nav">
      <button class="bottom-nav__item" data-nav="home">...</button>
      <button class="bottom-nav__item" data-nav="project">...</button>
      <button class="bottom-nav__item" data-nav="community">...</button>
      <button class="bottom-nav__item" data-nav="mypage">...</button>
    </nav>

    <!-- ⑤ 모달 (공통) -->
    <div class="modal" id="modal" aria-hidden="true">...</div>

    <!-- ⑥ 토스트 (공통) -->
    <div class="toast" id="toast" aria-live="polite"></div>

  </div>

  <!-- JS 파일들 -->
</body>
</html>
```

### page CSS 기본 패턴
```css
.page { display: none; flex-direction: column; min-height: 100vh; }
.page.is-active { display: flex; }
```

### 6-1. 홈 / 상세 / 지원 / 지원완료 section 상세 스켈레톤 (Figma 검증 기준)

```html
<section data-page="home" class="page" aria-label="홈">
  <header class="home__header">
    <div class="home__greeting">안녕하세요 👋 / {닉네임}님</div>
    <button class="icon-btn" data-action="open-notification" aria-label="알림">...</button>
    <div class="search-bar"><input class="search-bar__input" placeholder="프로젝트, 팀원 검색" /></div>
  </header>
  <div class="home__scroll">
    <div class="project-banner">...(카테고리뱃지 + 타이틀 + 마감/지원자 + "지금 지원하기")</div>
    <div class="filter-chip-group">전체/공모전/해커톤/사이드 프로젝트</div>
    <section class="home__section">
      <h2>추천 프로젝트</h2>
      <div class="project-card-list" id="project-card-list"><!-- .project-card × N (JS 렌더링) --></div>
    </section>
  </div>
  <button class="fab" data-action="create-project" aria-label="프로젝트 등록">...</button>
</section>

<section data-page="project-detail" class="page" aria-label="프로젝트 상세">
  <div class="detail__hero">
    <img class="detail__hero-img" />
    <div class="detail__hero-actions">
      <button class="icon-btn icon-btn--dark" data-action="back" aria-label="뒤로가기">...</button>
      <button class="icon-btn icon-btn--dark" data-action="bookmark" aria-label="북마크">...</button>
      <button class="icon-btn icon-btn--dark" data-action="share" aria-label="공유">...</button>
    </div>
  </div>
  <div class="detail__body">
    <div class="detail__badges"><span class="cat-badge">...</span><span class="recruit-status">...</span></div>
    <h1 class="detail__title">...</h1>
    <div class="info-grid">...(마감일/팀원 수/기간 3 items)</div>
    <section class="detail__card"><h2>프로젝트 소개</h2><p>...</p></section>
    <section class="detail__card"><h2>모집 직군</h2><div class="role-badge-list">...</div></section>
  </div>
  <div class="fixed-action-bar">
    <div class="fixed-action-bar__applicants">...지원자 N명</div>
    <button class="btn btn--primary" data-action="go-apply">지원하기</button>
  </div>
</section>

<section data-page="project-apply" class="page" aria-label="프로젝트 지원">
  <header class="app-header"><button class="app-header__back">...</button><h1>프로젝트 지원</h1></header>
  <div class="apply__target"><span>지원 프로젝트</span><strong>{프로젝트명}</strong></div>
  <form class="apply-form" id="apply-form" novalidate>
    <div class="apply-form__group"><label>지원 동기 <span class="apply-form__required">*</span></label><textarea required></textarea></div>
    <div class="apply-form__group"><label>포트폴리오 링크</label><input type="url" /></div>
    <div class="apply-form__group"><label>자기소개 <span class="apply-form__required">*</span></label><textarea required></textarea></div>
    <button type="submit" class="btn btn--primary">지원 완료</button>
  </form>
</section>

<section data-page="apply-complete" class="page" aria-label="지원 완료">
  <div class="success-visual">
    <div class="success-visual__circle"><img class="success-visual__check" /></div>
    <!-- 장식 도형 4~6개 -->
  </div>
  <h1>지원이 완료되었어요!</h1>
  <p>프로젝트 팀에서 검토 후 연락드릴 예정이에요.</p>
  <div class="success-actions">
    <button class="btn btn--secondary" data-action="go-home">홈으로 이동</button>
    <button class="btn btn--primary" data-action="go-my-applications">내 지원 내역 보기</button>
  </div>
</section>
```

---

## 7. CSS 설계 방식

### 7-1. variables.css — 디자인 토큰

```css
:root {
  /* ── Color ── */
  --color-primary:       #5ccfa6;   /* 메인 CTA, 온보딩 버튼 */
  --color-primary-light: #7fffd4;   /* FAB, active dot, 아바타 */
  --color-primary-dark:  #66ccaa;   /* 링크 hover */

  --color-black:         #202020;   /* 기본 텍스트, 진한 버튼 */
  --color-text-primary:  #333;      /* 온보딩 제목 */
  --color-text-secondary:#666;      /* 본문 보조 텍스트 */
  --color-text-muted:    #aaa;      /* 시간, 부가정보 */
  --color-text-nav-off:  #bbb;      /* 바텀 네비 비활성 */

  --color-bg-base:       #ffffff;
  --color-bg-page:       #f8fafa;   /* 커뮤니티 등 회색 배경 */
  --color-border:        #eaeaea;
  --color-divider:        #eaeaea;

  /* 소셜 로그인 */
  --color-kakao:         #fee500;
  --color-kakao-text:    #3c1e1e;
  --color-naver:         #03c75a;

  /* 커뮤니티 카테고리 배지 */
  --color-badge-free-bg:     #f5f5f5;
  --color-badge-free-text:   #555;
  --color-badge-contest-bg:  #ebf5ff;
  --color-badge-contest-text:#1976d2;
  --color-badge-review-bg:   #f3e8ff;
  --color-badge-review-text: #7b1fa2;

  /* ── 프로젝트 카테고리 배지 (홈/상세 — 커뮤니티 배지와 별도, 신규) ── */
  --color-badge-hackathon-bg:   #fff3eb;
  --color-badge-hackathon-text: #e65100;
  --color-badge-side-bg:        #f0fff4;
  --color-badge-side-text:      #2e7d32;
  /* 공모전은 위 --color-badge-contest-bg/text(#ebf5ff/#1976d2)를 그대로 재사용 */

  /* 모집 상태 (신규) */
  --color-status-open:   #16a34a;   /* ● 모집 중 */
  --color-status-urgent: #ef4444;   /* ● 모집 마감임박 / 폼 필수(*) 표시 */

  /* 역할(직군) 뱃지 (신규) */
  --color-role-badge-text:  #444;            /* 배경은 --color-badge-free-bg(#f5f5f5) 재사용 */
  --color-role-card-bg:     #f0fffb;         /* 상세 페이지 모집 직군 카드 배경 */
  --color-role-card-border: var(--color-primary-light); /* #7fffd4 재사용 */

  /* 배너 그라디언트 (신규) */
  --gradient-banner: linear-gradient(145deg, #202020 0%, #333333 100%);

  /* 보조 아바타 색상 (신규) */
  --color-avatar-cyan: #b2ebf2;

  /* ── Typography ── */
  --font-title: "S-Core Dream", sans-serif;
  --font-body:  "Pretendard", sans-serif;

  --text-xs:   13px;    /* 0.813rem */
  --text-sm:   14px;    /* 0.875rem */
  --text-base: 16px;    /* 1rem */
  --text-lg:   17px;    /* 1.063rem */
  --text-xl:   18px;    /* 1.125rem */
  --text-2xl:  22px;    /* 1.375rem */
  --text-3xl:  24px;    /* 1.5rem */

  /* ── Spacing ── */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;

  /* ── Border Radius ── */
  --radius-sm:   8px;
  --radius-md:   14px;   /* 카드, 버튼 */
  --radius-lg:   16px;   /* 온보딩 버튼 */
  --radius-input:17px;   /* 인풋 필드 */
  --radius-full: 9999px; /* 도트, 칩 */

  /* ── Shadow ── */
  --shadow-card: 0 2px 8px rgba(0,0,0,0.08);
  --shadow-fab:  0 6px 12px rgba(127,255,212,0.5);

  /* ── Layout ── */
  --bottom-nav-height: 80px;
  --status-bar-height: 47px;
  --page-px: 20px;       /* 페이지 좌우 패딩 */
}
```

### 7-2. BEM 네이밍 원칙
- Block: `.project-card`
- Element: `.project-card__title`, `.project-card__tags`
- Modifier: `.project-card--bookmarked`, `.btn--disabled`
- State: `.is-active`, `.is-loading`, `.is-error`

### 7-3. 반응형 전략
```css
/* 기본: 375px */
/* 390px */  @media (min-width: 390px) { ... }
/* 430px */  @media (min-width: 430px) { ... }
/* 768px */  @media (min-width: 768px) { ... }
```

### 7-4. Figma 픽셀 값 보정 규칙 (신규, 홈/상세/지원 화면 분석으로 확인)

Figma MCP가 추출하는 raw px 값(예: `14.552px`, `1.455px`, `145.522px`)은 내부적으로 약 1.4552배 스케일이 적용된 소수 단위로 나온다. 구현 시에는 **가장 가까운 정수 px로 반올림하고, 기존 4px 그리드 토큰(`--space-*`, `--radius-*`, `--text-*`)에 최대한 스냅**한다. 예: `14.552px → 14px(--text-sm)`, `11.642px → 12px(--space-3)`, `1.455px → 1px(hairline border)`. 카드 내부 패딩처럼 토큰과 차이가 크면(예: `18.918px`) 새 의미 단위를 그대로 사용한다.

### 7-5. 알려진 디자인 차이 — 구현 시 결정 필요

- 기존 `.fab`(common.css, 52px)와 홈 화면 Figma FAB(64px) 크기 차이 → 홈 화면 한정 `.fab--lg` 모디파이어 추가 검토.
- 기존 `.avatar--sm`(32px)보다 작은 카드 내 아바타(약 23~26px) → `.avatar--xs` 모디파이어 신설 검토.

---

## 8. JavaScript 모듈 설계

### 8-1. router.js — SPA 핵심
```js
const Router = {
  currentPage: null,

  // 화면 전환
  navigate(pageId, params = {}) {
    // 1. 이전 page section 숨김
    // 2. 새 page section 표시 (.is-active)
    // 3. 바텀 네비 표시/숨김 업데이트
    // 4. 바텀 네비 활성 탭 업데이트
    // 5. 히스토리 스택 업데이트 (history.pushState)
    // 6. 페이지별 init 함수 호출
  },

  // 뒤로가기
  back() { history.back(); },

  // 히스토리 이벤트
  init() {
    window.addEventListener('popstate', (e) => {
      this.navigate(e.state?.page || 'home', { noHistory: true });
    });
  }
};
```

> 현재 [js/router.js](js/router.js)에 위 로직이 이미 구현되어 있다. **10번 항목에서 다루는 `NAV_HIDDEN_PAGES` 수정만 추가로 필요**하며, 그 외 라우터 구조 변경은 없다.

### 8-2. common.js — 공통 유틸

```js
// 토스트 메시지
function showToast(message, type = 'success', duration = 2500) { ... }

// 모달 열기/닫기
function openModal(title, message, onConfirm) { ... }
function closeModal() { ... }

// 로컬스토리지 래퍼
const Storage = {
  get(key) { return JSON.parse(localStorage.getItem(key)); },
  set(key, val) { localStorage.setItem(key, JSON.stringify(val)); },
  remove(key) { localStorage.removeItem(key); }
};

// 날짜 포맷
function formatDate(isoString) { ... }

// 디바운스
function debounce(fn, delay) { ... }
```

> 위 유틸은 이미 [js/common.js](js/common.js)에 구현되어 있으며 그대로 재사용한다.

### 8-3. 페이지별 JS 역할

| 파일 | 역할 |
|------|------|
| `onboarding.js` | 슬라이드 전환, 페이지네이션 도트 업데이트, localStorage `onboarding_done` 체크 |
| `auth.js` | 이메일/비밀번호 유효성 검사, 소셜 로그인 버튼 이벤트, 가입 → 퀴즈 전환 |
| `quiz.js` | 3단계 퀴즈 진행, 진행바 업데이트, 답변 로컬 저장, 결과 화면 표시 |
| `home.js` | 인사말/알림 렌더링, 추천 배너 렌더링, 필터 칩 클릭, 검색 입력 디바운스, 프로젝트 카드 렌더링 |
| `project.js` | 상세 데이터 표시, 지원 폼 유효성 검사, 지원 완료 전환 |
| `community.js` | 탭 전환 (자유게시판/공모전/후기), 게시글 목록 렌더링, FAB 클릭 |
| `mypage.js` | 프로필 정보 표시, 탭 전환 (내 프로젝트/지원내역/북마크) |

### 8-4. home.js / project.js 구현 스케치 (신규 — 이번 단계 구현 대상)

```js
// home.js — HomePage
const HomePage = {
  state: { category: 'all', keyword: '' },

  init(params = {}) {
    this.renderGreeting();
    this.renderBanner();
    this.bindFilterChips();
    this.bindSearch();
    this.renderCardList();
  },

  renderGreeting() { /* SAMPLE_USER.name 표시 */ },
  renderBanner()   { /* 추천 1건을 .project-banner에 표시 */ },
  bindFilterChips(){ /* .filter-chip 클릭 → state.category 갱신 → renderCardList() */ },
  bindSearch()     { /* debounce(300ms) → state.keyword 갱신 → renderCardList() */ },
  renderCardList() { /* SAMPLE_PROJECTS 필터링 → .project-card 마크업 생성, 클릭 시 Router.navigate('project-detail', { id }) */ }
};

// project.js — ProjectPage
const ProjectPage = {
  initDetail(params = {}) {
    /* params.id로 SAMPLE_PROJECTS 조회 → 상세 렌더 */
    /* 지원하기 버튼 클릭 → Router.navigate('project-apply', { id }) */
  },
  initApply(params = {}) {
    /* 상단에 프로젝트명 표시, 폼 유효성 검사(지원 동기/자기소개 필수) */
    /* 제출 → Router.navigate('apply-complete', { id }) */
  },
  initComplete(params = {}) {
    /* "홈으로 이동" → Router.navigate('home') */
    /* "내 지원 내역 보기" → Router.navigate('mypage', { tab: 'applications' }) */
  }
};
```

지원 폼 제출 실패(필수값 누락) 시 `showToast('자기소개를 입력해주세요', 'error')` 형태로 처리한다.

---

## 9. 화면 전환 방식

### 기본 원칙
- **단일 index.html** 내 모든 `<section data-page="...">` 관리
- `.page` 기본 `display: none`, 활성화 시 `.is-active` 추가 → `display: flex`
- `history.pushState({ page: pageId }, '', '#' + pageId)` 로 URL 해시 유지
- 브라우저 뒤로가기 → `popstate` 이벤트 처리

### 주요 화면 전환 흐름

```
최초 진입
  └─ onboarding_done === false → onboarding-1
  └─ onboarding_done === true
       └─ 로그인 세션 없음 → login
       └─ 로그인 세션 있음 → home

온보딩-1 → (시작하기) → onboarding-2
온보딩-2 → (시작하기) → login

로그인 → (성공) → home
로그인 → (회원가입 링크) → signup
signup → (완료) → quiz-1
quiz-1 → quiz-2 → quiz-3 → quiz-result → home

home → (카드 클릭) → project-detail (params: { id })
project-detail → (지원하기) → project-apply (params: { id })
project-detail → (뒤로가기 아이콘) → Router.back()
project-apply → (지원 완료 제출) → apply-complete (params: { id })
apply-complete → (홈으로 이동) → home
apply-complete → (내 지원 내역 보기) → mypage (params: { tab: 'applications' })

community → (게시글 클릭) → community-post
community-post → (뒤로가기) → community

mypage → (리뷰 작성) → project-review
project-review → (완료) → mypage
```

### 전환 애니메이션
- 기본: fade (opacity 0→1, 150ms ease)
- 상세 페이지 진입: slide-in-right (transform translateX)
- 뒤로가기: slide-out-right

---

## 10. 하단 탭 메뉴 표시/숨김 규칙

### 표시하는 화면 (4개 메인 탭)
```
home
community / community-post
mypage / project-review
```

### 숨기는 화면 (인증·온보딩·퀴즈 + 프로젝트 상세/지원/완료)
```
onboarding-1 / onboarding-2
login / signup
quiz-1 / quiz-2 / quiz-3 / quiz-result
project-detail / project-apply / apply-complete
```

> **⚠️ 변경사항 (Figma 재검증 결과)**: 기존 계획에서는 `project-detail`/`project-apply`/`apply-complete`도 바텀 네비를 표시하되 active 탭 없이 두는 것으로 가정했다. 그러나 Figma 스크린샷을 직접 확인한 결과 이 3개 화면은 바텀 네비가 전혀 없는 풀스크린 플로우다(상세는 자체 하단 고정 액션바, 지원/완료는 전용 헤더·버튼 구성). 이에 따라 `NAV_HIDDEN_PAGES`에 3개 화면을 추가하는 것으로 규칙을 수정한다.

### 탭 active 매핑
| 탭 | 활성화되는 화면 |
|----|----------------|
| 홈 | `home` |
| 프로젝트 | *(향후 프로젝트 목록 화면 추가 시)* |
| 커뮤니티 | `community`, `community-post` |
| 마이페이지 | `mypage`, `project-review` |

### 구현 방법 (수정된 버전)
```js
// js/router.js — 수정
const NAV_HIDDEN_PAGES = [
  'onboarding-1','onboarding-2','login','signup',
  'quiz-1','quiz-2','quiz-3','quiz-result',
  'project-detail','project-apply','apply-complete'   // ← 신규 추가
];

const NAV_TAB_MAP = {
  home:      ['home'],                          // ← project-detail/apply/apply-complete 제거
  project:   [],
  community: ['community', 'community-post'],
  mypage:    ['mypage', 'project-review']
};

function updateBottomNav(pageId) {
  const nav = document.getElementById('bottom-nav');
  nav.classList.toggle('is-hidden', NAV_HIDDEN_PAGES.includes(pageId));
  // active 탭 업데이트
  document.querySelectorAll('.bottom-nav__item').forEach(item => {
    item.classList.toggle('bottom-nav__item--active', /* 매핑 로직 */);
  });
}
```

---

## 11. 모달/바텀시트 처리 방식

### 모달 (Modal)
- **용도**: 지원 취소 확인, 로그아웃 확인, 에러 안내, **지원 폼 작성 중 뒤로가기 시도 시 이탈 확인**(신규)
- **구조**: `overlay` + `content` (제목, 내용, 버튼 2개)
- **열기**: `openModal({ title, message, confirmText, onConfirm })`
- **닫기**: overlay 클릭 or 취소 버튼 → `closeModal()`
- **접근성**: `aria-hidden`, `role="dialog"`, 포커스 트랩

```html
<div class="modal" id="modal" aria-hidden="true" role="dialog">
  <div class="modal__overlay"></div>
  <div class="modal__content">
    <h2 class="modal__title"></h2>
    <p class="modal__message"></p>
    <div class="modal__actions">
      <button class="btn btn--secondary modal__cancel">취소</button>
      <button class="btn btn--primary modal__confirm">확인</button>
    </div>
  </div>
</div>
```

### 바텀시트 (Bottom Sheet)
- **용도**: 필터 선택, 정렬 옵션, 신고하기 등 목록형 옵션. **상세 페이지 공유 버튼**(선택 — MVP에서는 "링크가 복사되었습니다" 토스트로 간소화 가능)
- **구조**: 드래그 핸들 + 옵션 리스트
- **열기**: `openBottomSheet(options)`
- **닫기**: 핸들 드래그 하단 or overlay 클릭
- **애니메이션**: `transform: translateY(100%)` → `translateY(0)`, transition 300ms

### 토스트 (Toast)
- **위치**: 화면 하단 center (바텀 네비 위 20px)
- **종류**: `--success`(초록), `--error`(빨강), `--info`(회색)
- **자동 닫힘**: 2500ms 후 fade-out
- **중복 방지**: 기존 토스트 즉시 제거 후 새 것 표시
- **신규 사용처**: 지원완료 화면 진입 시 `showToast('지원이 완료되었습니다', 'success')` 1회 표시

---

## 12. 샘플 데이터 구조

### 프로젝트 카드 데이터 (Figma 검증 결과로 필드 보강)
```js
const SAMPLE_PROJECTS = [
  {
    id: 'proj-001',
    title: 'AI 헬스케어 앱 개발',
    category: '해커톤',          // '공모전' | '해커톤' | '사이드 프로젝트'
    status: 'open',              // 'open'(모집 중) | 'urgent'(모집 마감임박) | 'closed'  ← 신규
    description: '건강 데이터를 AI로 분석하는 맞춤형 헬스케어 앱입니다. ML 모델 통합 및 사용자 친화적 UI 구현이 목표입니다.',  // ← 신규(상세 페이지 소개)
    deadline: '2026-07-15',
    deadlineDday: 23,            // 홈 배너 "마감 D-23" 표시용 ← 신규
    teamSizeRange: '3~5명',      // ← 신규(상세 정보 그리드)
    durationLabel: '3개월',      // ← 신규(상세 정보 그리드)
    members: { current: 2, total: 5 },
    techStack: ['React', 'Node.js', 'Figma'],
    roles: [                     // ← 구조 변경: 문자열 배열 → 모집상태 포함 객체 배열
      { name: '프론트엔드', status: '모집 중' },
      { name: '백엔드',     status: '모집 중' },
      { name: '디자인',     status: '모집 중' }
    ],
    author: { name: '김민준', avatar: '#7fffd4', initial: '김' },
    coverImage: null,            // 상세 페이지 히어로 이미지(에셋 추가 필요) ← 신규
    isBookmarked: false,
    views: 234,
    applicants: 12
  }
  // proj-002(공모전/스마트시티 솔루션), proj-003(사이드 프로젝트/소셜 커머스), proj-004(사이드 프로젝트/교육 플랫폼) 동일 스키마로 추가
];
```

### 지원서 초안 데이터 (신규)
```js
const SAMPLE_APPLICATION_DRAFT = {
  projectId: null,
  motivation: '',     // 지원 동기 (필수)
  portfolioUrl: '',   // 포트폴리오 링크 (선택)
  selfIntro: ''        // 자기소개 (필수) — TIMO_TRD.md의 applications 테이블에 컬럼 추가 필요
};
```

### 커뮤니티 게시글 데이터
```js
const SAMPLE_POSTS = [
  {
    id: 'post-001',
    category: '자유게시판',       // '자유게시판' | '공모전 정보' | '프로젝트 후기'
    title: '해커톤 처음인데 어떻게 준비해야 하나요?',
    content: '다음 달에 첫 해커톤을 나가게 됐는데요...',
    author: { name: '이준혁', avatar: '#7fffd4', initial: '이' },
    createdAt: '2026-06-23T10:00:00Z',
    views: 234,
    comments: 18,
    likes: 12
  }
];
```

### 성향 테스트 질문 데이터
```js
const QUIZ_QUESTIONS = [
  {
    step: 1,
    question: '프로젝트에서 나는?',
    options: [
      { value: 'A', label: '아이디어를 주도한다' },
      { value: 'B', label: '실행에 집중한다' },
      { value: 'C', label: '팀을 조율한다' },
      { value: 'D', label: '완성도를 높인다' }
    ]
  }
  // ... step 2, 3
];
```

### 마이페이지 유저 데이터
```js
const SAMPLE_USER = {
  id: 'user-001',
  name: '박민서',
  email: 'user@example.com',
  avatar: '#b2ebf2',
  bio: 'UI/UX 디자이너 + 프론트엔드',
  skills: ['Figma', 'React', 'CSS'],
  personalityType: 'ENTP',       // 성향 테스트 결과
  myProjects: [],
  myApplications: [],
  bookmarks: []
};
```

---

## 13. 이후 Supabase 연결을 고려한 구조

### api.js 레이어 설계 (추후)
```js
// 현재: 샘플 데이터 반환
// 추후: Supabase 실제 호출로 교체

const API = {
  // 인증
  auth: {
    login(email, password) { /* supabase.auth.signInWithPassword */ },
    signup(email, password) { /* supabase.auth.signUp */ },
    loginWithGoogle() { /* supabase.auth.signInWithOAuth({ provider:'google' }) */ },
    loginWithKakao() { /* supabase.auth.signInWithOAuth({ provider:'kakao' }) */ },
    loginWithNaver() { /* supabase.auth.signInWithOAuth({ provider:'naver' }) */ },
    logout() { /* supabase.auth.signOut */ },
    getSession() { /* supabase.auth.getSession */ }
  },

  // 프로젝트
  projects: {
    getList(filters) { /* supabase.from('projects').select() */ },
    getById(id) { /* supabase.from('projects').select().eq('id', id) */ },
    apply(projectId, data) { /* supabase.from('applications').insert() */ }
  },

  // 커뮤니티
  community: {
    getPosts(category) { /* supabase.from('posts').select() */ },
    getPost(id) { /* supabase.from('posts').select().eq('id', id) */ },
    createPost(data) { /* supabase.from('posts').insert() */ }
  },

  // 프로필
  profile: {
    get(userId) { /* supabase.from('profiles').select().eq('id', userId) */ },
    update(data) { /* supabase.from('profiles').update() */ },
    saveQuizResult(result) { /* supabase.from('profiles').update({ personality_type }) */ }
  },

  // 북마크
  bookmarks: {
    toggle(projectId) { /* insert or delete */ }
  }
};
```

### Supabase 테이블 구조 (추후 schema.sql)
```
profiles        (id, name, email, avatar_url, bio, skills, personality_type, created_at)
projects        (id, title, category, deadline, members_current, members_total, tech_stack, roles, author_id, created_at)
applications    (id, project_id, user_id, motivation, portfolio_url, self_intro, status, created_at)   ← self_intro 컬럼 추가 필요
posts           (id, category, title, content, author_id, views, created_at)
comments        (id, post_id, author_id, content, created_at)
bookmarks       (id, user_id, project_id, created_at)
notifications   (id, user_id, type, message, is_read, created_at)
reviews         (id, project_id, author_id, rating, content, created_at)
```

> `applications` 테이블은 기존 `TIMO_TRD.md`에 `motivation`, `portfolio_url`만 정의되어 있었으나, 지원 폼에 "자기소개" 필수 입력이 있음을 Figma에서 확인했으므로 `self_intro` 컬럼 추가가 필요하다.

---

## 14. 구현 순서

### Phase 0 — 환경 세팅 (1일)
- [ ] 폴더 구조 생성
- [ ] `index.html` 기본 틀 + CDN 폰트 연결
- [ ] `reset.css`, `variables.css` 작성
- [ ] `router.js` 기본 라우터 구현
- [ ] 바텀 네비 HTML/CSS 구현

### Phase 1 — 온보딩·인증 화면 (2일)
- [ ] 온보딩 1·2 슬라이드 UI + 페이지네이션 도트
- [ ] 로그인 화면 (이메일/비밀번호 폼 + 소셜 버튼 3종)
- [ ] 회원가입 화면
- [ ] Input 컴포넌트 상태 구현 (focus/error/success)
- [ ] 버튼 컴포넌트 상태 구현 (hover/active/disabled)

### Phase 2 — 성향테스트 화면 (1일)
- [ ] 성향테스트 1·2·3 UI + 진행바
- [ ] 퀴즈 답변 로직 + 로컬스토리지 저장
- [ ] 테스트 완료 화면

### Phase 3 — 홈 화면 (2일, Figma 재검증으로 세분화)
- [ ] `variables.css`에 7-1 항목의 신규 색상 토큰 추가 (카테고리/모집상태/역할뱃지/배너 그라디언트)
- [ ] `common.css`에 `.icon-btn` 공통 컴포넌트 추가
- [ ] `home.css` 작성: 헤더(인사말+알림벨)/검색바/추천 배너/필터칩/카드 리스트
- [ ] `home.js` 구현: `SAMPLE_PROJECTS` 렌더링, 필터 칩 토글, 검색 디바운스
- [ ] 카드 클릭 → `project-detail` 이동 연결

### Phase 4 — 프로젝트 플로우 (2일, Figma 재검증으로 세분화)
- [ ] `js/router.js`의 `NAV_HIDDEN_PAGES`/`NAV_TAB_MAP` 수정 (10번 항목 반영)
- [ ] `project.css`에 detail 영역 작성: 히어로 이미지/아이콘 버튼/정보 그리드/소개/모집 직군/하단 고정 액션바
- [ ] `project.js`의 `initDetail` 구현, params.id 기반 데이터 바인딩
- [ ] `project.css`에 apply/complete 영역 작성
- [ ] `initApply` 폼 유효성 검사(지원 동기/자기소개 필수) + 제출 처리, 이탈 확인 모달 연결
- [ ] `initComplete` 버튼 2개 라우팅 연결("홈으로 이동" / "내 지원 내역 보기")
- [ ] 카드 → 상세 → 지원 → 완료 전환 전체 연결 및 회귀 테스트

### Phase 5 — 커뮤니티 (1일)
- [ ] 커뮤니티 탭 UI (자유게시판/공모전/후기)
- [ ] 게시글 카드 목록 렌더링
- [ ] 게시글 상세 화면
- [ ] FAB 버튼

### Phase 6 — 마이페이지·리뷰 (1일)
- [ ] 마이페이지 프로필 표시
- [ ] 내 프로젝트/지원내역/북마크 탭
- [ ] 프로젝트 리뷰 작성 화면

### Phase 7 — 공통 정리 (1일)
- [ ] 토스트 컴포넌트
- [ ] 모달 컴포넌트
- [ ] 바텀시트 컴포넌트
- [ ] 전체 화면 전환 연결 최종 점검
- [ ] 반응형 390px / 430px / 768px 확인

---

## 15. 테스트 체크리스트

### 화면 전환
- [ ] 모든 버튼 클릭 시 올바른 화면으로 이동하는가
- [ ] 브라우저 뒤로가기 버튼이 정상 동작하는가
- [ ] 바텀 네비 탭 클릭 시 올바른 화면으로 이동하는가
- [ ] 홈 카드 클릭 시 해당 프로젝트의 `project-detail`로 정확히 이동하는가 (id 매칭) ← 신규
- [ ] 상세 → 지원하기 → 지원완료 → 홈 흐름이 끊김 없이 동작하는가 ← 신규
- [ ] 지원완료 화면의 "내 지원 내역 보기"가 마이페이지 지원내역 탭으로 이동하는가 ← 신규

### 바텀 네비
- [ ] 인증/온보딩/퀴즈 화면에서 바텀 네비가 숨겨지는가
- [ ] 홈/커뮤니티/마이페이지에서 바텀 네비가 표시되는가
- [ ] 현재 탭 active 상태가 올바른가
- [ ] **상세/지원하기/지원완료 3개 화면에서는 바텀 네비가 숨겨지는가** (10번 항목 수정사항 반영 확인) ← 신규

### 컴포넌트 상태
- [ ] Input focus 상태 스타일이 적용되는가
- [ ] Input error 상태가 표시되는가
- [ ] 버튼 hover/active 상태가 적용되는가
- [ ] disabled 버튼이 클릭되지 않는가
- [ ] 필터 칩 클릭 시 active 토글 및 카드 목록이 필터링되는가 ← 신규
- [ ] 검색 입력 시 디바운스 후 목록이 갱신되는가 ← 신규
- [ ] 카테고리 뱃지 색상이 해커톤(주황)/공모전(파랑)/사이드 프로젝트(초록)로 구분되는가 ← 신규
- [ ] 모집 상태 텍스트가 모집중(초록)/마감임박(빨강)으로 구분되는가 ← 신규
- [ ] 지원 폼에서 필수값(지원 동기, 자기소개) 미입력 시 제출이 막히고 토스트가 뜨는가 ← 신규
- [ ] 포트폴리오 링크는 비워도 제출 가능한가(선택 항목) ← 신규

### 온보딩
- [ ] 슬라이드 도트가 현재 페이지와 동기화되는가
- [ ] localStorage `onboarding_done` 설정 후 재방문 시 로그인 화면으로 이동하는가

### 성향테스트
- [ ] 3단계 진행 시 진행바가 올바르게 업데이트되는가
- [ ] 답변 선택 시 다음 단계로 이동하는가

### 반응형
- [ ] 375px에서 레이아웃이 깨지지 않는가
- [ ] 390px 기준 디자인과 일치하는가
- [ ] 430px에서 레이아웃이 적절히 조정되는가
- [ ] 홈/상세/지원 폼 레이아웃이 375~430px 구간에서 깨지지 않는가 ← 신규

### 폰트
- [ ] 제목에 S-Core Dream이 적용되는가
- [ ] 본문에 Pretendard가 적용되는가
- [ ] CDN 로드 실패 시 fallback 폰트가 적용되는가

### 접근성
- [ ] 모달이 열릴 때 aria-hidden이 토글되는가
- [ ] 버튼에 의미 있는 텍스트 또는 aria-label이 있는가
- [ ] 토스트가 aria-live로 스크린리더에 알려지는가
- [ ] 아이콘 버튼(`.icon-btn`)에 `aria-label`이 있는가 ← 신규
- [ ] 지원 폼 필수 입력 필드에 `required` 및 에러 안내가 스크린리더에 전달되는가 ← 신규

---

*작성일: 2026-06-23*
*Figma 기준 파일: TEAM-PROJECT-2 (5CWZCfkBpPhXfvnQqDE7aE)*
*갱신: 홈/상세/지원/지원완료 4화면 Figma MCP 재검증 반영*
