# CLAUDE.md

## 프로젝트 개요

본 프로젝트는 HTML, CSS, JavaScript 기반의 모바일 웹앱이다.

### 기술 스택

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- Supabase
- Mobile First Responsive Design

---

## 디자인 구현 원칙

### 디자인 소스

- 최종 디자인 기준은 Figma 파일이다.
- Figma 디자인과 픽셀 단위까지 최대한 동일하게 구현한다.
- 임의로 UI를 변경하지 않는다.
- 컴포넌트, 간격, 여백, 폰트 크기를 최대한 유지한다.

---

## 폰트 규칙

### 제목

S-Core Dream 사용

### 본문

Pretendard 사용

### CDN 연결

```html
<link rel="preconnect" href="https://cdn.jsdelivr.net" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/fonts-archive/Pretendard/Pretendard.css" />

<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/SCDream.css" />
```

### CSS 기본 설정

```css
:root {
  --font-title: "S-Core Dream", sans-serif;
  --font-body: "Pretendard", sans-serif;
}

body {
  font-family: var(--font-body);
}

h1,
h2,
h3,
h4,
h5,
h6,
.title {
  font-family: var(--font-title);
}
```

---

## 모바일 퍼스트 규칙

기준 너비

```css
375px
```

우선 모바일 화면부터 구현한다.

반응형 우선순위

```text
375px
390px
430px
768px
```

Desktop은 고려하지 않는다.

---

## 폴더 구조

```text
project
│
├── index.html
├── pages
│
├── css
│   ├── reset.css
│   ├── variables.css
│   ├── common.css
│   └── pages
│
├── js
│   ├── common.js
│   ├── api.js
│   └── pages
│
├── assets
│   ├── images
│   ├── icons
│   └── fonts
│
└── supabase
```

---

## CSS 작성 규칙

### 네이밍

BEM 방식 사용

예시

```css
.project-card {}
.project-card__title {}
.project-card__description {}
.project-card--active {}
```

### 금지

```text
인라인 스타일 금지
!important 남용 금지
중복 CSS 금지
```

---

## 컴포넌트 규칙

반드시 재사용 가능한 컴포넌트로 구현

예시

```text
Header
Bottom Navigation
Button
Input
Tag
Chip
Card
Modal
Toast
Profile Card
Project Card
```

---

## UI 구현 규칙

### 버튼

- hover
- active
- disabled

상태 구현

### Input

- focus
- error
- success

상태 구현

### 카드

- 그림자
- radius
- spacing

디자인과 동일하게 구현

---

## JavaScript 규칙

### 사용 가능

- ES6+
- async/await
- fetch API

### 사용 금지

```text
jQuery
불필요한 라이브러리
```

---

## Supabase 규칙

### 인증

- 이메일 로그인
- 구글 로그인
- 카카오 로그인
- 네이버 로그인

### 데이터

- profiles
- projects
- applications
- bookmarks
- notifications

테이블 분리

---

## 구현 순서

### Sprint 1

인증

```text
로그인
회원가입
로그아웃
세션 유지
```

### Sprint 2

프로필

```text
프로필 생성
프로필 수정
프로필 조회
```

### Sprint 3

프로젝트

```text
프로젝트 생성
프로젝트 수정
프로젝트 삭제
프로젝트 목록
프로젝트 상세
```

### Sprint 4

지원 기능

```text
지원하기
지원 취소
지원 상태
```

### Sprint 5

마이페이지

```text
내 프로젝트
내 지원내역
북마크
프로필
```

---

## Claude Code 작업 규칙

작업 시작 전

1. 현재 파일 구조 분석
2. 필요한 변경사항 설명
3. 작업 계획 수립

작업 후

1. 변경 파일 목록 출력
2. 변경 내용 설명
3. 실행 방법 설명
4. 테스트 방법 설명

---

## 최종 목표

Figma 디자인을 기준으로
실서비스 수준의 모바일 웹앱을 구현한다.

우선순위

1. UI 완성도
2. 사용자 경험
3. 코드 재사용성
4. 유지보수성
5. 성능 최적화
