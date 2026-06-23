/* ===================================================
   quiz.js — 성향 테스트 (역할 / 툴 / 스타일 선택)
   =================================================== */

const QUIZ_ROLES = [
  { id: 'planning', label: '기획',        icon: 'assets/icons/plan-icon.svg' },
  { id: 'design',   label: '디자인',      icon: 'assets/icons/design-icon.svg' },
  { id: 'frontend', label: '프론트엔드',  icon: 'assets/icons/frontend-icon.svg' },
  { id: 'backend',  label: '백엔드',      icon: 'assets/icons/backend-icon.svg' },
];

const QUIZ_TOOLS = [
  { id: 'figma',       label: 'Figma',       icon: 'assets/icons/figma-icon.svg' },
  { id: 'photoshop',   label: 'Photoshop',   icon: 'assets/icons/photoshop-icon.svg' },
  { id: 'illustrator', label: 'Illustrator', icon: 'assets/icons/illustrator-icon.svg' },
  { id: 'react',       label: 'React',       icon: 'assets/icons/react-icon.svg' },
  { id: 'flutter',     label: 'Flutter',     icon: 'assets/icons/flutter-icon.svg' },
  { id: 'notion',      label: 'Notion',      icon: 'assets/icons/notion-icon.svg' },
  { id: 'github',      label: 'GitHub',      icon: 'assets/icons/github-icon.svg' },
];

const QUIZ_STYLES = [
  { id: 'planner',      label: '계획형',  desc: '철저한 계획으로 프로젝트를 이끌어요',    icon: 'assets/icons/planner-icon.svg' },
  { id: 'executor',     label: '실행형',  desc: '빠른 실행력으로 결과를 만들어요',        icon: 'assets/icons/thunder-icon.svg' },
  { id: 'analyst',      label: '분석형',  desc: '데이터 기반으로 최적 방향을 찾아요',     icon: 'assets/icons/analysis-icon.svg' },
  { id: 'communicator', label: '소통형',  desc: '원활한 소통으로 팀을 연결해요',          icon: 'assets/icons/communication-icon.svg' },
];

const QUIZ_RESULTS = {
  planning: {
    typeLabel:    '기획자형',
    title:        '아이디어 설계자',
    desc:         '큰 그림을 그리고 방향을 제시하는 타입이에요.\n팀의 비전을 명확히 설정하고 체계적인\n계획으로 프로젝트를 이끌어갑니다.',
    traits:       ['#기획력', '#전략적사고', '#리더십', '#커뮤니케이션'],
    illustration: 'assets/images/produce.png',
  },
  design: {
    typeLabel:    '디자이너형',
    title:        '창의적 비주얼리스트',
    desc:         '감각적인 시각화로 아이디어를 구체화하는\n타입이에요. 사용자 경험을 고려한 디자인으로\n프로젝트에 가치를 더합니다.',
    traits:       ['#창의력', '#시각화', '#UX감각', '#디테일'],
    illustration: 'assets/images/result2.png',
  },
  frontend: {
    typeLabel:    '프론트엔드형',
    title:        '빠른 빌더',
    desc:         '아이디어를 실제 화면으로 구현하는\n타입이에요. 빠른 실행력과 기술력으로\n팀에 활력을 불어넣는 에너자이저입니다.',
    traits:       ['#구현력', '#실행력', '#기술력', '#적응력'],
    illustration: 'assets/images/frontend.png',
  },
  backend: {
    typeLabel:    '백엔드형',
    title:        '든든한 설계자',
    desc:         '탄탄한 시스템을 설계하는 타입이에요.\n데이터 기반의 논리적 사고로\n서비스의 안정성을 책임집니다.',
    traits:       ['#분석력', '#체계적', '#안정성', '#문제해결'],
    illustration: 'assets/images/backend.png',
  },
};

const QUIZ_STORAGE_KEY = 'quiz_answers';
const QUIZ_TOTAL = 3;

const QuizPage = {

  init(step, params = {}) {
    const section = document.querySelector(`[data-page="quiz-${step}"]`);
    if (!section) return;

    const saved = Storage.get(QUIZ_STORAGE_KEY) || {};

    if (step === 1) {
      section.innerHTML = this._renderStep1(saved);
      this._bindStep1(section);
    } else if (step === 2) {
      section.innerHTML = this._renderStep2(saved);
      this._bindStep2(section);
    } else if (step === 3) {
      section.innerHTML = this._renderStep3(saved);
      this._bindStep3(section);
    }
  },

  initResult(params = {}) {
    const saved = Storage.get(QUIZ_STORAGE_KEY);
    if (!saved || !saved.role) {
      Router.navigate('quiz-1');
      return;
    }

    const section = document.querySelector('[data-page="quiz-result"]');
    if (!section) return;

    Storage.set('quiz_result', saved.role);
    const result = QUIZ_RESULTS[saved.role];
    section.innerHTML = this._renderResult(result, saved);
    this._bindResult(section);
  },

  /* ── 공통 헤더 + 진행바 ── */

  _renderHeader(step) {
    const pct = Math.round((step / QUIZ_TOTAL) * 100);
    return `
      <div class="quiz-header">
        <button class="quiz-header__back" type="button" aria-label="뒤로가기" data-action="back">
          <img src="assets/icons/back-icon.svg" alt="" aria-hidden="true" />
        </button>
      </div>

      <div class="quiz-progress">
        <div class="quiz-progress__label">
          <span>성향 테스트</span>
          <span><strong class="quiz-progress__current">${step}</strong> / ${QUIZ_TOTAL}</span>
        </div>
        <div class="progress-bar" role="progressbar"
             aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar__fill" style="width: ${pct}%"></div>
        </div>
      </div>
    `;
  },

  /* ── Step 1: 역할 선택 (단일) ── */

  _renderStep1(saved) {
    const selectedRole = saved.role || null;

    const cardsHTML = QUIZ_ROLES.map(role => `
      <button
        class="quiz-role-card${selectedRole === role.id ? ' quiz-role-card--selected' : ''}"
        data-role="${role.id}"
        type="button"
        aria-pressed="${selectedRole === role.id}"
      >
        <span class="quiz-role-card__icon">
          <img src="${role.icon}" alt="" aria-hidden="true" />
        </span>
        <span class="quiz-role-card__label">${role.label}</span>
      </button>
    `).join('');

    return `
      ${this._renderHeader(1)}
      <div class="quiz-body">
        <h2 class="quiz-title">나의 역할을 선택해주세요</h2>
        <p class="quiz-desc">팀 프로젝트에서 주로 맡는 역할이에요</p>
        <div class="quiz-role-grid" role="group" aria-label="역할 선택">
          ${cardsHTML}
        </div>
      </div>
      <div class="quiz-footer">
        <button
          class="btn btn--dark${selectedRole ? '' : ' btn--disabled'}"
          id="quiz-next-btn"
          type="button"
          ${selectedRole ? '' : 'disabled'}
        >다음</button>
      </div>
    `;
  },

  /* ── Step 2: 툴 선택 (복수) ── */

  _renderStep2(saved) {
    const selectedTools = saved.tools || [];

    const cardsHTML = QUIZ_TOOLS.map(tool => `
      <button
        class="quiz-tool-card${selectedTools.includes(tool.id) ? ' quiz-tool-card--selected' : ''}"
        data-tool="${tool.id}"
        type="button"
        aria-pressed="${selectedTools.includes(tool.id)}"
      >
        <span class="quiz-tool-card__icon">
          <img src="${tool.icon}" alt="" aria-hidden="true" />
        </span>
        <span class="quiz-tool-card__label">${tool.label}</span>
      </button>
    `).join('');

    const hasSelection = selectedTools.length > 0;

    return `
      ${this._renderHeader(2)}
      <div class="quiz-body">
        <h2 class="quiz-title">주로 사용하는 툴을 선택해주세요</h2>
        <p class="quiz-desc">복수 선택이 가능합니다</p>
        <div class="quiz-tool-grid" role="group" aria-label="툴 선택">
          ${cardsHTML}
        </div>
      </div>
      <div class="quiz-footer">
        <button
          class="btn btn--dark${hasSelection ? '' : ' btn--disabled'}"
          id="quiz-next-btn"
          type="button"
          ${hasSelection ? '' : 'disabled'}
        >다음</button>
      </div>
    `;
  },

  /* ── Step 3: 업무 스타일 선택 (단일) ── */

  _renderStep3(saved) {
    const selectedStyle = saved.style || null;

    const cardsHTML = QUIZ_STYLES.map(style => `
      <button
        class="quiz-style-card${selectedStyle === style.id ? ' quiz-style-card--selected' : ''}"
        data-style="${style.id}"
        type="button"
        aria-pressed="${selectedStyle === style.id}"
      >
        <span class="quiz-style-card__icon">
          <img src="${style.icon}" alt="" aria-hidden="true" />
        </span>
        <div class="quiz-style-card__content">
          <span class="quiz-style-card__label">${style.label}</span>
          <span class="quiz-style-card__desc">${style.desc}</span>
        </div>
        <span class="quiz-style-card__check" aria-hidden="true">
          <img src="assets/icons/check-icon.svg" alt="" />
        </span>
      </button>
    `).join('');

    return `
      ${this._renderHeader(3)}
      <div class="quiz-body">
        <h2 class="quiz-title">나의 업무 스타일은?</h2>
        <p class="quiz-desc">함께할 때 주로 어떤 스타일인지 선택해주세요</p>
        <div class="quiz-style-list" role="group" aria-label="스타일 선택">
          ${cardsHTML}
        </div>
      </div>
      <div class="quiz-footer">
        <button
          class="btn btn--dark${selectedStyle ? '' : ' btn--disabled'}"
          id="quiz-next-btn"
          type="button"
          ${selectedStyle ? '' : 'disabled'}
        >결과 보기</button>
      </div>
    `;
  },

  /* ── 결과 화면 ── */

  _renderResult(result, saved) {
    const traitsHTML = result.traits
      .map(t => `<span class="quiz-result-page__trait">${t}</span>`)
      .join('');

    const roleLabel  = QUIZ_ROLES.find(r => r.id === saved.role)?.label  || '';
    const styleLabel = QUIZ_STYLES.find(s => s.id === saved.style)?.label || '';
    const toolLabels = (saved.tools || [])
      .map(id => QUIZ_TOOLS.find(t => t.id === id)?.label)
      .filter(Boolean);

    const summaryHTML = `
      <div class="quiz-result-summary">
        <div class="quiz-result-summary__item">
          <span class="quiz-result-summary__label">역할</span>
          <span class="quiz-result-summary__value">${roleLabel}</span>
        </div>
        ${styleLabel ? `
        <div class="quiz-result-summary__item">
          <span class="quiz-result-summary__label">스타일</span>
          <span class="quiz-result-summary__value">${styleLabel}</span>
        </div>` : ''}
        ${toolLabels.length ? `
        <div class="quiz-result-summary__item quiz-result-summary__item--tools">
          <span class="quiz-result-summary__label">툴</span>
          <span class="quiz-result-summary__value">${toolLabels.join(' · ')}</span>
        </div>` : ''}
      </div>
    `;

    return `
      <div class="quiz-result-page">
        <img
          src="assets/icons/confetti-icon.svg"
          alt=""
          class="quiz-result-page__confetti"
          aria-hidden="true"
        />
        <p class="quiz-result-page__subtitle">테스트가 완료되었어요!</p>

        <img
          src="${result.illustration}"
          alt="${result.title}"
          class="quiz-result-page__illustration"
        />

        <span class="quiz-result-page__type-badge">${result.typeLabel}</span>
        <h2 class="quiz-result-page__title">${result.title}</h2>
        <p class="quiz-result-page__desc">${result.desc.replace(/\n/g, '<br>')}</p>

        <div class="quiz-result-page__traits" aria-label="주요 성향">
          ${traitsHTML}
        </div>

        ${summaryHTML}

        <div class="quiz-result-page__cta">
          <button class="btn btn--primary" id="quiz-result-home" type="button">
            홈으로 이동하기
          </button>
        </div>
      </div>
    `;
  },

  /* ── 이벤트 바인딩 ── */

  _bindStep1(section) {
    const cards  = section.querySelectorAll('.quiz-role-card');
    const nextBtn = section.querySelector('#quiz-next-btn');

    cards.forEach(card => {
      card.addEventListener('click', () => {
        cards.forEach(c => {
          c.classList.remove('quiz-role-card--selected');
          c.setAttribute('aria-pressed', 'false');
        });
        card.classList.add('quiz-role-card--selected');
        card.setAttribute('aria-pressed', 'true');

        const saved = Storage.get(QUIZ_STORAGE_KEY) || {};
        saved.role = card.dataset.role;
        Storage.set(QUIZ_STORAGE_KEY, saved);

        nextBtn.disabled = false;
        nextBtn.classList.remove('btn--disabled');
      });
    });

    nextBtn?.addEventListener('click', () => {
      if (!nextBtn.disabled) Router.navigate('quiz-2');
    });

    section.querySelector('[data-action="back"]')?.addEventListener('click', () => {
      Router.navigate('login');
    });
  },

  _bindStep2(section) {
    const chips  = section.querySelectorAll('.quiz-tool-card');
    const nextBtn = section.querySelector('#quiz-next-btn');

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chip.classList.toggle('quiz-tool-card--selected');
        chip.setAttribute(
          'aria-pressed',
          String(chip.classList.contains('quiz-tool-card--selected'))
        );

        const selected = [...section.querySelectorAll('.quiz-tool-card--selected')]
          .map(c => c.dataset.tool);

        const saved = Storage.get(QUIZ_STORAGE_KEY) || {};
        saved.tools = selected;
        Storage.set(QUIZ_STORAGE_KEY, saved);

        nextBtn.disabled = selected.length === 0;
        nextBtn.classList.toggle('btn--disabled', selected.length === 0);
      });
    });

    nextBtn?.addEventListener('click', () => {
      if (!nextBtn.disabled) Router.navigate('quiz-3');
    });

    section.querySelector('[data-action="back"]')?.addEventListener('click', () => {
      Router.navigate('quiz-1');
    });
  },

  _bindStep3(section) {
    const cards  = section.querySelectorAll('.quiz-style-card');
    const nextBtn = section.querySelector('#quiz-next-btn');

    cards.forEach(card => {
      card.addEventListener('click', () => {
        cards.forEach(c => {
          c.classList.remove('quiz-style-card--selected');
          c.setAttribute('aria-pressed', 'false');
        });
        card.classList.add('quiz-style-card--selected');
        card.setAttribute('aria-pressed', 'true');

        const saved = Storage.get(QUIZ_STORAGE_KEY) || {};
        saved.style = card.dataset.style;
        Storage.set(QUIZ_STORAGE_KEY, saved);

        nextBtn.disabled = false;
        nextBtn.classList.remove('btn--disabled');
      });
    });

    nextBtn?.addEventListener('click', () => {
      if (!nextBtn.disabled) Router.navigate('quiz-result');
    });

    section.querySelector('[data-action="back"]')?.addEventListener('click', () => {
      Router.navigate('quiz-2');
    });
  },

  _bindResult(section) {
    section.querySelector('#quiz-result-home')?.addEventListener('click', () => {
      Storage.remove(QUIZ_STORAGE_KEY);
      Router.navigate('home');
    });
  },
};
