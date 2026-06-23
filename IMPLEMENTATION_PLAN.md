# TIMO 구현 계획서

> **앱 정보**: TIMO (Team In, Move on) — 공모전·해커톤·사이드 프로젝트 팀원 매칭 모바일 웹앱  
> **Figma 파일**: `5CWZCfkBpPhXfvnQqDE7aE`  
> **기준 너비**: 390px (Figma 디자인 기준)  
> **기술 스택**: HTML5 / CSS3 / Vanilla JS (ES6+) / Supabase (추후)

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

**총 16개 화면**

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
| 화면 | 역할 |
|------|------|
| 홈 | 프로젝트 카드 목록. 필터 칩, 검색, 추천 프로젝트 |
| 프로젝트 상세 | 프로젝트 정보 상세. 지원하기 버튼 |
| 프로젝트 지원 | 지원 동기/포트폴리오 입력 폼 |
| 지원 완료 | 지원 완료 확인 + 홈 이동 |
| 커뮤니티 | 자유게시판/공모전 정보/프로젝트 후기 탭. FAB(글쓰기 버튼) |
| 커뮤니티 게시글 | 게시글 상세 + 댓글 목록 |
| 마이페이지 | 프로필, 내 프로젝트, 내 지원내역, 북마크 |
| 프로젝트 리뷰 | 완료된 프로젝트 리뷰 작성 |

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
│       ├── home.css
│       ├── project.css           ← 상세 + 지원 + 지원완료 + 리뷰
│       ├── community.css         ← 목록 + 게시글
│       └── mypage.css
│
├── js/
│   ├── router.js                 ← SPA 화면 전환 핵심 라우터
│   ├── common.js                 ← 공통 유틸 (토스트, 모달, 날짜 포맷 등)
│   ├── api.js                    ← Supabase API 레이어 (추후)
│   └── pages/
│       ├── onboarding.js
│       ├── auth.js               ← login + signup 공통
│       ├── quiz.js
│       ├── home.js
│       ├── project.js
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
  --color-divider:       #eaeaea;

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

### 8-3. 페이지별 JS 역할

| 파일 | 역할 |
|------|------|
| `onboarding.js` | 슬라이드 전환, 페이지네이션 도트 업데이트, localStorage `onboarding_done` 체크 |
| `auth.js` | 이메일/비밀번호 유효성 검사, 소셜 로그인 버튼 이벤트, 가입 → 퀴즈 전환 |
| `quiz.js` | 3단계 퀴즈 진행, 진행바 업데이트, 답변 로컬 저장, 결과 화면 표시 |
| `home.js` | 프로젝트 카드 렌더링, 필터 칩 클릭, 검색 입력 디바운스 |
| `project.js` | 상세 데이터 표시, 지원 폼 유효성 검사, 지원 완료 전환 |
| `community.js` | 탭 전환 (자유게시판/공모전/후기), 게시글 목록 렌더링, FAB 클릭 |
| `mypage.js` | 프로필 정보 표시, 탭 전환 (내 프로젝트/지원내역/북마크) |

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

home → (카드 클릭) → project-detail
project-detail → (지원하기) → project-apply
project-apply → (지원 완료) → apply-complete
apply-complete → (홈으로) → home

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
home / project-detail / project-apply / apply-complete
community / community-post
mypage / project-review
```

> 단, project-detail · project-apply · apply-complete · community-post · project-review는
> 하단 네비는 표시되지만 **탭 active 상태 없음** (또는 부모 탭 active 유지)

### 숨기는 화면 (인증·온보딩·퀴즈)
```
onboarding-1 / onboarding-2
login / signup
quiz-1 / quiz-2 / quiz-3 / quiz-result
```

### 탭 active 매핑
| 탭 | 활성화되는 화면 |
|----|----------------|
| 홈 | `home`, `project-detail`, `project-apply`, `apply-complete` |
| 프로젝트 | *(향후 프로젝트 목록 화면 추가 시)* |
| 커뮤니티 | `community`, `community-post` |
| 마이페이지 | `mypage`, `project-review` |

### 구현 방법
```js
const NAV_HIDDEN_PAGES = ['onboarding-1','onboarding-2','login','signup',
                           'quiz-1','quiz-2','quiz-3','quiz-result'];

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
- **용도**: 지원 취소 확인, 로그아웃 확인, 에러 안내
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
- **용도**: 필터 선택, 정렬 옵션, 신고하기 등 목록형 옵션
- **구조**: 드래그 핸들 + 옵션 리스트
- **열기**: `openBottomSheet(options)`
- **닫기**: 핸들 드래그 하단 or overlay 클릭
- **애니메이션**: `transform: translateY(100%)` → `translateY(0)`, transition 300ms

### 토스트 (Toast)
- **위치**: 화면 하단 center (바텀 네비 위 20px)
- **종류**: `--success`(초록), `--error`(빨강), `--info`(회색)
- **자동 닫힘**: 2500ms 후 fade-out
- **중복 방지**: 기존 토스트 즉시 제거 후 새 것 표시

---

## 12. 샘플 데이터 구조

### 프로젝트 카드 데이터
```js
const SAMPLE_PROJECTS = [
  {
    id: 'proj-001',
    title: '2026 스마트시티 앱 공모전 팀 구합니다',
    category: '공모전',          // '공모전' | '해커톤' | '사이드 프로젝트'
    deadline: '2026-07-01',
    members: { current: 2, total: 5 },
    techStack: ['React', 'Node.js', 'Figma'],
    roles: ['프론트엔드', '백엔드'],
    author: { name: '김서연', avatar: '#7fffd4' },
    isBookmarked: false,
    views: 234,
    applicants: 8
  }
];
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
applications    (id, project_id, user_id, motivation, portfolio_url, status, created_at)
posts           (id, category, title, content, author_id, views, created_at)
comments        (id, post_id, author_id, content, created_at)
bookmarks       (id, user_id, project_id, created_at)
notifications   (id, user_id, type, message, is_read, created_at)
reviews         (id, project_id, author_id, rating, content, created_at)
```

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

### Phase 3 — 홈 화면 (2일)
- [ ] 홈 레이아웃 (헤더, 검색, 필터 칩)
- [ ] 프로젝트 카드 컴포넌트
- [ ] 샘플 데이터로 카드 목록 렌더링
- [ ] 필터 칩 활성화 토글

### Phase 4 — 프로젝트 플로우 (2일)
- [ ] 프로젝트 상세 화면
- [ ] 프로젝트 지원 폼 화면
- [ ] 지원 완료 화면
- [ ] 카드 → 상세 → 지원 → 완료 전환 연결

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

### 바텀 네비
- [ ] 인증/온보딩/퀴즈 화면에서 바텀 네비가 숨겨지는가
- [ ] 홈/커뮤니티/마이페이지에서 바텀 네비가 표시되는가
- [ ] 현재 탭 active 상태가 올바른가

### 컴포넌트 상태
- [ ] Input focus 상태 스타일이 적용되는가
- [ ] Input error 상태가 표시되는가
- [ ] 버튼 hover/active 상태가 적용되는가
- [ ] disabled 버튼이 클릭되지 않는가

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

### 폰트
- [ ] 제목에 S-Core Dream이 적용되는가
- [ ] 본문에 Pretendard가 적용되는가
- [ ] CDN 로드 실패 시 fallback 폰트가 적용되는가

### 접근성
- [ ] 모달이 열릴 때 aria-hidden이 토글되는가
- [ ] 버튼에 의미 있는 텍스트 또는 aria-label이 있는가
- [ ] 토스트가 aria-live로 스크린리더에 알려지는가

---

*작성일: 2026-06-23*  
*Figma 기준 파일: TEAM-PROJECT-2 (5CWZCfkBpPhXfvnQqDE7aE)*
