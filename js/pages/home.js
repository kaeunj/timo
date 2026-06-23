/* ===================================================
   home.js — 홈 화면
   =================================================== */

/*
 * js/api.js가 이미 전역 SAMPLE_PROJECTS / SAMPLE_USER를 선언하고 있어
 * (다른 화면용, 구버전 스키마) 동일 이름으로 재선언하면 충돌한다.
 * 홈 화면 전용 Figma 검증 데이터는 IIFE로 격리하고 HomePage만 전역에 노출한다.
 */
(function () {
  const SAMPLE_USER = {
    id: 'user-001',
    name: '김티모',
    email: 'user@example.com',
    avatar: '#7fffd4',
    bio: '',
    skills: [],
    personalityType: '',
    myProjects: [],
    myApplications: [],
    bookmarks: [],
    hasUnreadNotification: true
  };

  const SAMPLE_PROJECTS = [
    {
      id: 'proj-001',
      title: 'AI 헬스케어 앱 개발',
      category: '해커톤',
      status: 'open',
      description: '건강 데이터를 AI로 분석하는 맞춤형 헬스케어 앱입니다. ML 모델 통합 및 사용자 친화적 UI 구현이 목표입니다.',
      deadline: '2026-07-15',
      deadlineLabel: '07.15',
      deadlineDday: 23,
      teamSizeRange: '3~5명',
      durationLabel: '3개월',
      roles: [
        { name: '프론트엔드', status: '모집 중' },
        { name: '백엔드', status: '모집 중' },
        { name: '디자인', status: '모집 중' }
      ],
      author: { name: '김민준', avatarColor: '#7fffd4', initial: '김' },
      applicants: 12,
      isFeatured: true
    },
    {
      id: 'proj-002',
      title: '스마트시티 솔루션 공모전',
      category: '공모전',
      status: 'urgent',
      description: 'IoT 센서 데이터를 활용한 스마트시티 솔루션을 제안하는 공모전입니다.',
      deadline: '2026-07-01',
      deadlineLabel: '07.01',
      deadlineDday: 8,
      teamSizeRange: '4~6명',
      durationLabel: '2개월',
      roles: [
        { name: '백엔드', status: '모집 중' },
        { name: '기획', status: '모집 중' }
      ],
      author: { name: '이수진', avatarColor: '#7fffd4', initial: '이' },
      applicants: 8
    },
    {
      id: 'proj-003',
      title: '소셜 커머스 플랫폼 MVP',
      category: '사이드 프로젝트',
      status: 'open',
      description: '사용자 경험을 최우선으로 하는 소셜 커머스 플랫폼을 함께 개발합니다.',
      deadline: '2026-07-20',
      deadlineLabel: '07.20',
      deadlineDday: 27,
      teamSizeRange: '3~4명',
      durationLabel: '4개월',
      roles: [
        { name: '프론트엔드', status: '모집 중' },
        { name: '디자인', status: '모집 중' }
      ],
      author: { name: '박지호', avatarColor: '#b2ebf2', initial: '박' },
      applicants: 15
    },
    {
      id: 'proj-004',
      title: '교육 플랫폼 MVP 개발',
      category: '사이드 프로젝트',
      status: 'open',
      description: '온라인 학습 경험을 혁신하는 교육 플랫폼의 MVP를 함께 만들어갈 팀원을 찾습니다.',
      deadline: '2026-08-01',
      deadlineLabel: '08.01',
      deadlineDday: 39,
      teamSizeRange: '3~5명',
      durationLabel: '3개월',
      roles: [
        { name: '프론트엔드', status: '모집 중' },
        { name: '백엔드', status: '모집 중' }
      ],
      author: { name: '최다은', avatarColor: '#7fffd4', initial: '최' },
      applicants: 6
    }
  ];

  const CATEGORY_BADGE_CLASS = {
    '해커톤': 'cat-badge--hackathon',
    '공모전': 'cat-badge--contest',
    '사이드 프로젝트': 'cat-badge--side'
  };

  const STATUS_LABEL = {
    open: '● 모집 중',
    urgent: '● 모집 마감임박',
    closed: '● 모집 마감'
  };

  const STATUS_CLASS = {
    open: 'recruit-status--open',
    urgent: 'recruit-status--urgent',
    closed: ''
  };

  const HomePage = {
    state: {
      category: 'all',
      keyword: ''
    },

    _bound: false,

    init(params = {}) {
      this.renderGreeting();
      this.renderBanner();
      this.renderCardList();
      this.bindEvents();
    },

    renderGreeting() {
      const nameEl = qs('#home-username');
      if (nameEl) nameEl.textContent = `${SAMPLE_USER.name}님`;

      const badge = qs('#home-notification-badge');
      if (badge) badge.style.display = SAMPLE_USER.hasUnreadNotification ? 'block' : 'none';
    },

    renderBanner() {
      const banner = qs('#home-banner');
      if (!banner) return;

      const featured = SAMPLE_PROJECTS.find((p) => p.isFeatured) || SAMPLE_PROJECTS[0];
      if (!featured) return;

      banner.dataset.id = featured.id;

      const badgeEl = qs('.project-banner__badge', banner);
      badgeEl.textContent = featured.category;
      badgeEl.className = `project-banner__badge ${CATEGORY_BADGE_CLASS[featured.category] || ''}`;

      qs('.project-banner__title', banner).innerHTML =
        `${featured.title} <br>팀원을 찾고 있어요!`;

      qs('.project-banner__meta', banner).textContent =
        `마감 D-${featured.deadlineDday} · 지원자 ${featured.applicants}명`;
    },

    renderCardList() {
      const list = qs('#home-project-list');
      if (!list) return;

      const projects = this._getFilteredProjects();

      if (projects.length === 0) {
        list.innerHTML = '<p class="project-card-list__empty">검색 결과가 없습니다.</p>';
        return;
      }

      list.innerHTML = projects.map((p) => this._renderCard(p)).join('');
    },

    _getFilteredProjects() {
      const { category, keyword } = this.state;
      return SAMPLE_PROJECTS.filter((p) => {
        const matchCategory = category === 'all' || p.category === category;
        const matchKeyword = !keyword || p.title.toLowerCase().includes(keyword.toLowerCase());
        return matchCategory && matchKeyword;
      });
    },

    _renderCard(project) {
      const badgeClass = CATEGORY_BADGE_CLASS[project.category] || '';
      const statusClass = STATUS_CLASS[project.status] || '';
      const statusLabel = STATUS_LABEL[project.status] || '';

      const roles = project.roles
        .map((r) => `<span class="role-badge">${r.name}</span>`)
        .join('');

      return `
        <article class="project-card" data-id="${project.id}" tabindex="0" role="button" aria-label="${project.title} 상세보기">
          <div class="project-card__top">
            <div class="project-card__category">
              <span class="cat-badge ${badgeClass}">${project.category}</span>
              <span class="recruit-status ${statusClass}">${statusLabel}</span>
            </div>
            <span class="project-card__deadline">마감 ${project.deadlineLabel}</span>
          </div>
          <h3 class="project-card__title">${project.title}</h3>
          <div class="project-card__roles">${roles}</div>
          <div class="project-card__footer">
            <div class="project-card__author">
              <span class="avatar avatar--xs" style="background-color:${project.author.avatarColor}">${project.author.initial}</span>
              <span class="project-card__author-name">${project.author.name}</span>
            </div>
            <span class="project-card__applicants">지원 ${project.applicants}명</span>
          </div>
        </article>
      `;
    },

    bindEvents() {
      if (this._bound) return;
      this._bound = true;

      /* 검색 (debounce) */
      const searchInput = qs('#home-search-input');
      if (searchInput) {
        const debouncedSearch = debounce((value) => {
          this.state.keyword = value.trim();
          this.renderCardList();
        }, 300);

        searchInput.addEventListener('input', (e) => {
          debouncedSearch(e.target.value);
        });
      }

      /* 카테고리 필터 칩 */
      const chipGroup = qs('#home-filter-chips');
      if (chipGroup) {
        chipGroup.addEventListener('click', (e) => {
          const chip = e.target.closest('.filter-chip');
          if (!chip) return;

          qsa('.filter-chip', chipGroup).forEach((c) => {
            c.classList.remove('filter-chip--active');
            c.setAttribute('aria-selected', 'false');
          });
          chip.classList.add('filter-chip--active');
          chip.setAttribute('aria-selected', 'true');

          this.state.category = chip.dataset.category;
          this.renderCardList();
        });
      }

      /* 프로젝트 카드 클릭 */
      const list = qs('#home-project-list');
      if (list) {
        const goToDetail = (card) => {
          if (!card) return;
          Router.navigate('project-detail', { id: card.dataset.id });
        };

        list.addEventListener('click', (e) => {
          goToDetail(e.target.closest('.project-card'));
        });

        list.addEventListener('keydown', (e) => {
          if (e.key !== 'Enter' && e.key !== ' ') return;
          const card = e.target.closest('.project-card');
          if (!card) return;
          e.preventDefault();
          goToDetail(card);
        });
      }

      /* 배너 CTA */
      qs('#home-banner .project-banner__cta')?.addEventListener('click', () => {
        const banner = qs('#home-banner');
        Router.navigate('project-detail', { id: banner?.dataset.id });
      });

      /* 알림 버튼 */
      qs('[data-action="open-notification"]')?.addEventListener('click', () => {
        showToast('알림 기능은 준비 중입니다.', 'info');
      });

      /* FAB */
      qs('[data-action="create-project"]')?.addEventListener('click', () => {
        Router.navigate('project-detail');
      });
    }
  };

  window.HomePage = HomePage;
})();
