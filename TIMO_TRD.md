# TIMO TRD (Technical Requirement Document)

## Project Information

### Service Name
TIMO

### Project Type
팀원 매칭 및 협업 경험 관리 플랫폼

### Development Goal

사용자의 성향 데이터를 기반으로 프로젝트 팀원을 모집하고 지원할 수 있는 플랫폼 구축

---

# Technical Overview

## Frontend

### Framework

- HTML5
- CSS3
- JavaScript (ES6)

### UI Library

- Vanilla JavaScript

### Design Tool

- Figma

### Responsive

- Mobile First

Target Width

- Mobile : 390px
- Tablet : 768px
- Desktop : 1200px+

---

## Backend

### BaaS

Supabase

사용 목적

- 회원 인증
- 데이터베이스 관리
- CRUD 기능 구현

---

## Deployment

### Frontend

- Vercel

### Repository

- GitHub

Branch Strategy

```text
main
develop
feature/inseo
feature/member
```

---

# System Architecture

```text
Client
(Web / Mobile)

↓

Frontend
HTML + CSS + JS

↓

Supabase

↓

Database
```

---

# Functional Requirements

## Authentication

### Login

기능

- 이메일 로그인
- 로그아웃

사용 기술

- Supabase Auth

---

### Sign Up

기능

- 이메일 회원가입
- 기본 정보 저장

사용 기술

- Supabase Auth
- Supabase Database

---

# Personality Test

## Input

### Role

- 기획
- 디자인
- 프론트엔드
- 백엔드

### Tools

- Figma
- Photoshop
- Illustrator
- React
- Flutter
- Notion
- GitHub

### Personality

- 계획형
- 실행형
- 분석형
- 소통형

---

## Output

성향 배지 생성

예시

- 계획러
- 실행러
- 분석가
- 소통왕

---

# Project Feature

## Project List

기능

- 프로젝트 조회
- 카테고리 필터
- 검색

카테고리

- 공모전
- 해커톤
- 사이드 프로젝트

---

## Project Detail

기능

- 프로젝트 상세 조회
- 모집 직군 확인
- 지원하기

---

## Project Apply

입력 정보

- 지원 동기
- 포트폴리오 링크

결과

- 지원 데이터 저장

---

# Community

## Board

기능

- 게시글 작성
- 게시글 조회
- 게시글 수정
- 게시글 삭제

---

# Review

## Evaluation

평가 항목

- 책임감
- 소통
- 일정 준수
- 협업 태도

## Review Tag

- 소통이 빨라요
- 책임감이 강해요
- 피드백을 잘 반영해요
- 일정 관리를 잘해요
- 팀 분위기를 좋게 만들어요
- 맡은 일을 끝까지 해요

---

# Database Design

## users

| Field | Type |
|---------|---------|
| id | UUID |
| email | TEXT |
| nickname | TEXT |
| role | TEXT |
| personality | TEXT |
| created_at | TIMESTAMP |

---

## projects

| Field | Type |
|---------|---------|
| id | UUID |
| title | TEXT |
| category | TEXT |
| description | TEXT |
| recruit_role | TEXT |
| user_id | UUID |
| created_at | TIMESTAMP |

---

## applications

| Field | Type |
|---------|---------|
| id | UUID |
| project_id | UUID |
| user_id | UUID |
| motivation | TEXT |
| portfolio_url | TEXT |
| created_at | TIMESTAMP |

---

## reviews

| Field | Type |
|---------|---------|
| id | UUID |
| reviewer_id | UUID |
| target_user_id | UUID |
| rating | INTEGER |
| comment | TEXT |
| created_at | TIMESTAMP |

---

## community_posts

| Field | Type |
|---------|---------|
| id | UUID |
| title | TEXT |
| content | TEXT |
| user_id | UUID |
| created_at | TIMESTAMP |

---

# API Requirements

## User

### Create User

```javascript
POST /users
```

### Get User

```javascript
GET /users/:id
```

---

## Project

### Create Project

```javascript
POST /projects
```

### Get Projects

```javascript
GET /projects
```

### Get Project Detail

```javascript
GET /projects/:id
```

---

## Application

### Apply Project

```javascript
POST /applications
```

---

## Community

### Create Post

```javascript
POST /posts
```

### Get Posts

```javascript
GET /posts
```

---

# Security

## Authentication

Supabase Auth 사용

권한

### Guest

- 프로젝트 조회
- 커뮤니티 조회

### User

- 프로젝트 지원
- 게시글 작성
- 리뷰 작성

---

# Design System

## Colors

| Token | Color |
|---------|---------|
| Primary | #7FFFD4 |
| Hover | #6FE6C0 |
| Dark | #202020 |
| Background | #F8FAFA |
| Border | #EAEAEA |
| Sub Text | #666666 |

---

## Typography

### Heading

S-Core Dream

- Display 36
- H1 32
- H2 24
- H3 20

### Body

Pretendard

- Body L 18
- Body 16
- Caption 14
- Small 12

---

# MVP Technical Scope

## Included

- 회원가입
- 로그인
- 성향 테스트
- 프로젝트 등록
- 프로젝트 조회
- 프로젝트 지원
- 리뷰 작성
- 커뮤니티

## Excluded

- AI 추천
- 실시간 채팅
- 알림 시스템
- 화상 회의
- 프로젝트 일정 관리

---

# Expected Stack

Frontend
- HTML
- CSS
- JavaScript

Backend
- Supabase

Deployment
- GitHub
- Vercel

Design
- Figma

Version Control
- Git