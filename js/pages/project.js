/* ===================================================
   project.js — 프로젝트 상세 (이번 단계: 상세만 구현)
   =================================================== */

/*
 * home.js의 SAMPLE_PROJECTS는 자체 IIFE 안에 격리돼 있어 이 페이지에서
 * 접근할 수 없다(또한 이번 작업 범위상 home.js는 수정 금지). 동일한
 * Figma 검증 데이터를 이 페이지 전용으로 다시 선언해 home → detail
 * 이동 시 동일한 프로젝트 id/내용이 보이도록 맞춘다.
 */
(function () {
  const SAMPLE_PROJECTS = [
    {
      id: 'proj-001',
      title: 'AI 헬스케어 앱 개발',
      category: '해커톤',
      status: 'open',
      description: '건강 데이터를 AI로 분석하는 맞춤형 헬스케어 앱입니다. ML 모델 통합 및 사용자 친화적 UI 구현이 목표입니다.',
      deadlineLabel: '07.15',
      teamSizeRange: '3~5명',
      durationLabel: '3개월',
      roles: [
        { name: '프론트엔드', status: '모집 중' },
        { name: '백엔드', status: '모집 중' },
        { name: '디자인', status: '모집 중' }
      ],
      applicants: 12
    },
    {
      id: 'proj-002',
      title: '스마트시티 솔루션 공모전',
      category: '공모전',
      status: 'urgent',
      description: 'IoT 센서 데이터를 활용한 스마트시티 솔루션을 제안하는 공모전입니다.',
      deadlineLabel: '07.01',
      teamSizeRange: '4~6명',
      durationLabel: '2개월',
      roles: [
        { name: '백엔드', status: '모집 중' },
        { name: '기획', status: '모집 중' }
      ],
      applicants: 8
    },
    {
      id: 'proj-003',
      title: '소셜 커머스 플랫폼 MVP',
      category: '사이드 프로젝트',
      status: 'open',
      description: '사용자 경험을 최우선으로 하는 소셜 커머스 플랫폼을 함께 개발합니다.',
      deadlineLabel: '07.20',
      teamSizeRange: '3~4명',
      durationLabel: '4개월',
      roles: [
        { name: '프론트엔드', status: '모집 중' },
        { name: '디자인', status: '모집 중' }
      ],
      applicants: 15
    },
    {
      id: 'proj-004',
      title: '교육 플랫폼 MVP 개발',
      category: '사이드 프로젝트',
      status: 'open',
      description: '온라인 학습 경험을 혁신하는 교육 플랫폼의 MVP를 함께 만들어갈 팀원을 찾습니다.',
      deadlineLabel: '08.01',
      teamSizeRange: '3~5명',
      durationLabel: '3개월',
      roles: [
        { name: '프론트엔드', status: '모집 중' },
        { name: '백엔드', status: '모집 중' }
      ],
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

  const bookmarkedIds = new Set();

  const ProjectPage = {
    _currentProject: null,
    _bound: false,
    _currentApplyProject: null,
    _applyBound: false,

    initDetail(params = {}) {
      const project =
        SAMPLE_PROJECTS.find((item) => item.id === params.id) || SAMPLE_PROJECTS[0];

      this._currentProject = project;
      this._render(project);
      this._bindEvents();
    },

    initApply(params = {}) {
      const project =
        SAMPLE_PROJECTS.find((item) => item.id === params.id) || SAMPLE_PROJECTS[0];

      this._currentApplyProject = project;

      qs('#apply-target-name').textContent = project ? project.title : '';

      /* 다른 프로젝트로 재진입했을 때 이전 입력값이 남지 않도록 초기화 */
      qs('#apply-motivation').value = '';
      qs('#apply-portfolio').value = '';
      qs('#apply-intro').value = '';

      this._bindApplyEvents();
    },

    initComplete(params = {}) {
      this._playCompleteAnimation();
      this._bindCompleteEvents();
    },

    _render(project) {
      if (!project) return;

      const catBadge = qs('#detail-cat-badge');
      catBadge.textContent = project.category;
      catBadge.className = `cat-badge ${CATEGORY_BADGE_CLASS[project.category] || ''}`;

      const status = qs('#detail-status');
      status.textContent = STATUS_LABEL[project.status] || '';
      status.className = `recruit-status ${STATUS_CLASS[project.status] || ''}`;

      qs('#detail-title').textContent = project.title;
      qs('#detail-deadline').textContent = project.deadlineLabel;
      qs('#detail-team-size').textContent = project.teamSizeRange;
      qs('#detail-duration').textContent = project.durationLabel;
      qs('#detail-description').textContent = project.description;
      qs('#detail-applicants').textContent = `지원자 ${project.applicants}명`;

      qs('#detail-role-list').innerHTML = project.roles
        .map(
          (r) => `
        <div class="role-badge role-badge--card">
          <span class="role-badge__name">${r.name}</span>
          <span class="role-badge__status">${r.status}</span>
        </div>
      `
        )
        .join('');

      const bookmarkBtn = qs('[data-action="bookmark"]');
      bookmarkBtn?.classList.toggle('is-active', bookmarkedIds.has(project.id));
    },

    _bindEvents() {
      if (this._bound) return;
      this._bound = true;

      const detailSection = document.querySelector('[data-page="project-detail"]');

      qs('[data-action="back"]', detailSection)?.addEventListener('click', () => {
        Router.back();
      });

      qs('[data-action="bookmark"]', detailSection)?.addEventListener('click', (e) => {
        const project = this._currentProject;
        if (!project) return;

        const btn = e.currentTarget;
        if (bookmarkedIds.has(project.id)) {
          bookmarkedIds.delete(project.id);
          btn.classList.remove('is-active');
          showToast('북마크가 해제되었습니다');
        } else {
          bookmarkedIds.add(project.id);
          btn.classList.add('is-active');
          showToast('북마크에 추가되었습니다');
        }
      });

      qs('[data-action="share"]', detailSection)?.addEventListener('click', async () => {
        const project = this._currentProject;
        const shareData = {
          title: project ? project.title : 'TIMO',
          text: project ? `TIMO에서 "${project.title}" 프로젝트를 확인해보세요.` : 'TIMO',
          url: location.href
        };

        if (navigator.share) {
          try {
            await navigator.share(shareData);
          } catch (err) {
            /* 사용자가 공유를 취소한 경우 등은 무시 */
          }
        } else {
          showToast('링크가 복사되었습니다');
        }
      });

      qs('[data-action="go-apply"]', detailSection)?.addEventListener('click', () => {
        const project = this._currentProject;
        if (!project) return;
        Router.navigate('project-apply', { id: project.id });
      });
    },

    _bindApplyEvents() {
      if (this._applyBound) return;
      this._applyBound = true;

      const applySection = document.querySelector('[data-page="project-apply"]');

      qs('[data-action="back"]', applySection)?.addEventListener('click', () => {
        Router.back();
      });

      qs('#apply-form')?.addEventListener('submit', (e) => {
        e.preventDefault();

        const project = this._currentApplyProject;
        if (!project) return;

        const motivation = qs('#apply-motivation').value.trim();
        const portfolioUrl = qs('#apply-portfolio').value.trim();
        const selfIntro = qs('#apply-intro').value.trim();

        if (!motivation) {
          showToast('지원 동기를 입력해주세요', 'error');
          qs('#apply-motivation').focus();
          return;
        }

        if (!selfIntro) {
          showToast('자기소개를 입력해주세요', 'error');
          qs('#apply-intro').focus();
          return;
        }

        /* 실제 저장 없이 메모리상 임시 객체만 생성 (Supabase 연동 전) */
        const applicationDraft = {
          projectId: project.id,
          motivation,
          portfolioUrl,
          selfIntro
        };
        Storage.set('application_draft', applicationDraft);

        Router.navigate('apply-complete', { id: project.id });
      });
    },

    /* 페이지 진입마다 등장 애니메이션을 처음부터 재생 (display:none ↔ flex 토글만으로는
       내부 자식 요소의 animation-delay가 일관되게 재시작되지 않는 브라우저가 있어
       클래스를 강제로 떼고-리플로우-다시 붙인다) */
    _playCompleteAnimation() {
      const page = document.querySelector('[data-page="apply-complete"]');
      if (!page) return;

      page.classList.remove('is-animating');
      void page.offsetWidth;
      page.classList.add('is-animating');
    },

    _bindCompleteEvents() {
      if (this._completeBound) return;
      this._completeBound = true;

      const completeSection = document.querySelector('[data-page="apply-complete"]');

      qs('[data-action="go-home"]', completeSection)?.addEventListener('click', () => {
        Router.navigate('home');
      });

      qs('[data-action="go-applications"]', completeSection)?.addEventListener('click', () => {
        Router.navigate('mypage', { tab: 'applications' });
      });
    }
  };

  window.ProjectPage = ProjectPage;
})();
