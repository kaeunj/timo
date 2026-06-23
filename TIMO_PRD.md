# TIMO PRD (Product Requirement Document)

## Project Overview

### Service Name
**TIMO**

### Tagline
**Find Your Team**

### One-line Description
프로젝트를 함께할 팀원을 찾고, 협업 경험을 기록하는 팀 매칭 플랫폼

### Project Goal
공모전, 해커톤, 사이드 프로젝트 참여 시 발생하는 팀원 모집의 어려움을 해결하고, 사용자의 성향과 협업 경험을 기반으로 적합한 팀원을 연결하여 프로젝트 성공률을 높인다.

---

# Problem Statement

현재 프로젝트 참여자들은 다음과 같은 문제를 경험한다.

## Team Recruiting Difficulties

- 적합한 팀원을 찾기 어렵다.
- 모집 과정이 비효율적이다.

## Lack of Information

- 지원자의 성향을 파악하기 어렵다.
- 협업 스타일을 알 수 없다.

## Collaboration Conflicts

- 역할 분배 문제
- 일정 관리 문제
- 의사소통 문제

## Project Dropout

- 중도 포기 발생
- 팀 운영 리스크 증가

---

# Objectives

## User Goals

- 성향이 맞는 팀원 찾기
- 프로젝트 참여 기회 확대
- 협업 경험 기록

## Service Goals

- 팀 매칭 효율 향상
- 프로젝트 완주율 향상
- 협업 데이터 축적

---

# Target Audience

## Primary Target

20~30대

- 대학생
- 취업 준비생
- 공모전 참가자
- 해커톤 참가자
- 사이드 프로젝트 참여자

## User Needs

- 믿을 수 있는 팀원 탐색
- 협업 성향 확인
- 프로젝트 경험 관리

---

# Core Value

## Match
성향 기반 팀원 추천

## Trust
협업 리뷰 기반 신뢰 형성

## Record
협업 경험 기록 및 관리

---

# Core Features

## 01. Personality Test

회원가입 후 성향 테스트 진행

### Input Data

#### Role

- 기획
- 디자인
- 프론트엔드
- 백엔드

#### Skills & Tools

- Figma
- Photoshop
- Illustrator
- React
- Flutter
- Notion
- GitHub

#### Collaboration Style

- 계획형
- 실행형
- 분석형
- 소통형

### Output

- 성향 프로필 생성
- 성향 배지 지급

---

## 02. Personality Badge

성향 테스트 결과에 따라 배지 제공

### Examples

- 🏅 계획러
- 🏅 실행러
- 🏅 분석가
- 🏅 소통왕

### Display Area

- 프로필
- 마이페이지

---

## 03. Project Discovery

프로젝트 탐색 기능

### Categories

- 공모전
- 해커톤
- 사이드 프로젝트

### Features

- 검색
- 카테고리 필터
- 인기 프로젝트 조회
- 추천 프로젝트 조회

---

## 04. Project Application

프로젝트 참여 신청

### Input Data

- 지원 동기
- 포트폴리오 링크

### Result

- 지원 완료
- 지원 내역 저장

---

## 05. Collaboration Review

프로젝트 종료 후 협업 평가

### Evaluation Criteria

- 책임감
- 소통
- 일정 준수
- 협업 태도

### Selectable Reviews

- 소통이 빨라요
- 책임감이 강해요
- 피드백을 잘 반영해요
- 일정 관리를 잘해요
- 팀 분위기를 좋게 만들어요
- 맡은 일을 끝까지 해요

---

## 06. Community

사용자 간 정보 공유 공간

### Menu

- 자유게시판
- 공모전 정보 공유
- 프로젝트 후기

---

# User Flow

## New User Flow

온보딩

↓

회원가입

↓

성향 테스트

↓

성향 배지 발급

↓

홈 진입

↓

프로젝트 탐색

↓

프로젝트 지원

↓

프로젝트 참여

↓

협업 리뷰 작성

---

# Information Architecture (IA)

## Home

- 검색
- 추천 프로젝트
- 인기 프로젝트
- 카테고리

## Authentication

- 로그인
- 회원가입

## Personality Test

- 역할 선택
- 사용 툴 선택
- 성향 테스트

## Project

### Project List

- 프로젝트 목록

### Project Detail

- 프로젝트 소개
- 모집 직군
- 팀 정보

### Apply

- 지원 동기
- 포트폴리오 링크

## Community

- 게시글 목록
- 게시글 상세
- 글 작성

## My Page

- 프로필
- 성향 배지
- 참여 프로젝트
- 받은 리뷰

## Review

- 별점
- 협업 평가
- 후기 작성

---

# MVP Scope

## Included

- 회원가입
- 로그인
- 성향 테스트
- 프로젝트 등록
- 프로젝트 조회
- 프로젝트 지원
- 마이페이지
- 리뷰 작성
- 커뮤니티

## Excluded

- 실시간 채팅
- AI 추천 시스템
- 푸시 알림
- 일정 관리 기능
- 화상 미팅 기능

---

# Database Structure

## User

| Field | Type |
|---------|---------|
| user_id | PK |
| nickname | VARCHAR |
| email | VARCHAR |
| role | VARCHAR |
| personality | VARCHAR |

---

## Project

| Field | Type |
|---------|---------|
| project_id | PK |
| title | VARCHAR |
| category | VARCHAR |
| description | TEXT |
| recruit_role | VARCHAR |

---

## Application

| Field | Type |
|---------|---------|
| apply_id | PK |
| user_id | FK |
| project_id | FK |
| motivation | TEXT |
| portfolio_url | VARCHAR |

---

## Review

| Field | Type |
|---------|---------|
| review_id | PK |
| reviewer_id | FK |
| target_user_id | FK |
| rating | INT |
| comment | TEXT |

---

# Design System

## Brand

### Service Name

**TIMO**

### Brand Message

**Find Your Team**

---

## Color System

| Type | Color |
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

**S-Core Dream**

- Display : 36px / 700
- H1 : 32px / 700
- H2 : 24px / 600
- H3 : 20px / 500

### Body

**Pretendard**

- Body Large : 18px / 400
- Body : 16px / 400
- Caption : 14px / 400
- Small : 12px / 400

---

## Design Principle

### Friendly
친근하고 부담 없는 팀 매칭 경험 제공

### Trust
협업 리뷰 기반의 신뢰 형성

### Growth
프로젝트 경험과 성장을 기록하는 플랫폼

### Consistency
일관된 UI와 사용자 경험 제공