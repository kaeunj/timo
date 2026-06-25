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
      deadlineDday: 9,
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
      deadlineDday: 28,
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
      emoji: '✏️',
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

  /* 인기 공모전 (정적 데모 데이터) */
  const SAMPLE_CONTESTS = [
    { id: 'contest-001', title: '카카오 서비스 해커톤', organizer: '카카오', category: '해커톤', deadlineDday: 15, ddayUrgent: false, prizeLabel: '🏆 상금 3천만원', emoji: '⚡', theme: 'purple' },
    { id: 'contest-002', title: '스마트시티 공모전', organizer: '국토부', category: '공모전', deadlineDday: 9, ddayUrgent: true, prizeLabel: '🏆 최우수 500만원', emoji: '🏙️', theme: 'navy' },
    { id: 'contest-003', title: '바이오헬스 공모전', organizer: '보건부', category: '공모전', deadlineDday: 22, ddayUrgent: false, prizeLabel: '🏆 대상 1000만원', emoji: '🔬', theme: 'green' }
  ];

  /* 현재 가장 활발한 공모전 (정적 데모 데이터) */
  const SAMPLE_ACTIVE_CONTESTS = [
    { id: 'active-001', org: 'LG', title: 'LG AI 챌린지 2026', prizeLabel: '3,000만원', theme: 'lg' },
    { id: 'active-002', org: 'KB', title: 'KB 핀테크 아이디어', prizeLabel: '2,000만원', theme: 'kb' },
    { id: 'active-003', org: 'SK', title: 'SK ICT 공모전', prizeLabel: '5,000만원', theme: 'sk' },
    { id: 'active-004', org: '현대', title: '현대 모빌리티 챌린지', prizeLabel: '1,500만원', theme: 'hyundai' }
  ];

  /* 배너 카테고리 배지 색상 매핑 (project.js와 동일 패턴, home.css의 .cat-badge 재사용) */
  const CATEGORY_BADGE_CLASS = {
    '해커톤': 'cat-badge--hackathon',
    '공모전': 'cat-badge--contest',
    '사이드 프로젝트': 'cat-badge--side'
  };

  /* 카테고리 → 아이콘 박스 그라디언트 테마 매핑 (인기 공모전 카드와 공유) */
  const CATEGORY_THEME = {
    '해커톤': 'theme-purple',
    '공모전': 'theme-navy',
    '사이드 프로젝트': 'theme-green'
  };

  const CATEGORY_EMOJI = {
    '해커톤': '🤖',
    '공모전': '🌆',
    '사이드 프로젝트': '🛒'
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
      this.renderContestList();
      this.renderActiveContestList();
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

    renderContestList() {
      const list = qs('#home-contest-list');
      if (!list) return;

      list.innerHTML = SAMPLE_CONTESTS.map((c) => this._renderContestCard(c)).join('');
    },

    _renderContestCard(contest) {
      const ddayClass = contest.ddayUrgent ? 'contest-card__dday-pill--urgent' : '';

      return `
        <article class="contest-card" data-id="${contest.id}">
          <div class="contest-card__photo theme-${contest.theme}">
            <span class="contest-card__emoji" aria-hidden="true">${contest.emoji}</span>
            <span class="contest-card__category-pill">${contest.category}</span>
            <span class="contest-card__dday-pill ${ddayClass}">D-${contest.deadlineDday}</span>
          </div>
          <div class="contest-card__body">
            <h3 class="contest-card__title">${contest.title}</h3>
            <p class="contest-card__organizer">${contest.organizer}</p>
            <span class="contest-card__prize">${contest.prizeLabel}</span>
          </div>
        </article>
      `;
    },

    renderActiveContestList() {
      const list = qs('#home-active-contest-list');
      if (!list) return;

      list.innerHTML = SAMPLE_ACTIVE_CONTESTS.map((c) => this._renderActiveContestCard(c)).join('');
    },

    _renderActiveContestCard(contest) {
      return `
        <article class="active-contest-card" data-id="${contest.id}">
          <div class="active-contest-card__logo active-contest-card__logo--${contest.theme}">${contest.org}</div>
          <p class="active-contest-card__title">${contest.title}</p>
          <span class="active-contest-card__prize">${contest.prizeLabel}</span>
        </article>
      `;
    },

    renderCardList() {
      const list = qs('#home-recruit-list');
      if (!list) return;

      const projects = this._getFilteredProjects();

      if (projects.length === 0) {
        list.innerHTML = '<p class="recruit-row-list__empty">검색 결과가 없습니다.</p>';
        return;
      }

      list.innerHTML = projects.map((p) => this._renderRecruitRow(p)).join('');
    },

    _getFilteredProjects() {
      const { category, keyword } = this.state;
      return SAMPLE_PROJECTS.filter((p) => {
        const matchCategory = category === 'all' || p.category === category;
        const matchKeyword = !keyword || p.title.toLowerCase().includes(keyword.toLowerCase());
        return matchCategory && matchKeyword;
      });
    },

    _renderRecruitRow(project) {
      const iconTheme = CATEGORY_THEME[project.category] || 'theme-purple';
      const iconEmoji = project.emoji || CATEGORY_EMOJI[project.category] || '🤖';
      const ddayClass = project.status === 'urgent' ? 'recruit-row__dday--urgent' : '';

      const tags = [
        `<span class="recruit-row__tag">${project.category}</span>`,
        ...project.roles.map((r) => `<span class="recruit-row__tag recruit-row__tag--role">${r.name}</span>`)
      ].join('');

      return `
        <article class="recruit-row" data-id="${project.id}" tabindex="0" role="button" aria-label="${project.title} 상세보기">
          <div class="recruit-row__icon ${iconTheme}" aria-hidden="true">${iconEmoji}</div>
          <div class="recruit-row__body">
            <h3 class="recruit-row__title">${project.title}</h3>
            <div class="recruit-row__tags">${tags}</div>
          </div>
          <div class="recruit-row__meta">
            <span class="recruit-row__dday ${ddayClass}">D-${project.deadlineDday}</span>
            <span class="recruit-row__applicants">지원 ${project.applicants}명</span>
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

      /* 팀원 모집 행 클릭 */
      const list = qs('#home-recruit-list');
      if (list) {
        const goToDetail = (row) => {
          if (!row) return;
          Router.navigate('project-detail', { id: row.dataset.id });
        };

        list.addEventListener('click', (e) => {
          goToDetail(e.target.closest('.recruit-row'));
        });

        list.addEventListener('keydown', (e) => {
          if (e.key !== 'Enter' && e.key !== ' ') return;
          const row = e.target.closest('.recruit-row');
          if (!row) return;
          e.preventDefault();
          goToDetail(row);
        });
      }

      /* 배너 CTA */
      qs('#home-banner .project-banner__cta')?.addEventListener('click', () => {
        const banner = qs('#home-banner');
        Router.navigate('project-detail', { id: banner?.dataset.id });
      });

      /* 더보기 버튼 (인기 공모전 / 활발한 공모전 / 팀원 모집) */
      document.querySelectorAll('[data-action="go-projects"]').forEach(btn => {
        btn.addEventListener('click', () => Router.navigate('project-list'));
      });

      /* 프로필 아바타 버튼 */
      qs('[data-action="open-profile"]')?.addEventListener('click', () => {
        Router.navigate('mypage');
      });

      /* FAB */
      qs('[data-action="create-project"]')?.addEventListener('click', () => {
        Router.navigate('project-detail');
      });
    }
  };

  window.HomePage = HomePage;
})();
