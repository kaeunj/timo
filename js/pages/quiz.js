/* ===================================================
   quiz.js — 성향 테스트 (역할 / 툴 / 스타일 선택)
   =================================================== */

const QUIZ_ROLES = [
  { id: 'planning', label: '기획',        emoji: '💡' },
  { id: 'design',   label: '디자인',      emoji: '🎨' },
  { id: 'frontend', label: '프론트엔드',  emoji: '💻' },
  { id: 'backend',  label: '백엔드',      emoji: '⚙️' },
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
  { id: 'planner',      label: '계획형',  desc: '철저한 계획으로 프로젝트를 이끌어요',    emoji: '📋' },
  { id: 'executor',     label: '실행형',  desc: '빠른 실행력으로 결과를 만들어요',        emoji: '⚡️' },
  { id: 'analyst',      label: '분석형',  desc: '데이터 기반으로 최적 방향을 찾아요',     emoji: '🔍' },
  { id: 'communicator', label: '소통형',  desc: '원활한 소통으로 팀을 연결해요',          emoji: '💬' },
];

const QUIZ_RESULTS = {
  planner: {
    typeLabel:    '🏅 계획러',
    title:        '체계적으로 프로젝트를 이끄는 유형',
    traits:       ['🎯 체계적인 계획', '📋 일정 관리', '📊 목표 지향적', '👥 신중한 의사결정'],
    illustration: 'assets/images/result2.png',
  },
  executor: {
    typeLabel:    '🚀 실행러',
    title:        '아이디어를 행동으로 옮기는 유형',
    traits:       ['⚡ 빠른 실행력', '🔥 적극적인 추진', '💪 도전 정신', '🎯 결과 중심'],
    illustration: 'assets/images/result1.png',
  },
  analyst: {
    typeLabel:    '🔍 분석러',
    title:        '논리적으로 문제를 해결하는 유형',
    traits:       ['📊 데이터 기반', '🧩 논리적 분석', '⚙️ 꼼꼼한 검토', '💡 최적 해결책'],
    illustration: 'assets/images/result4.png',
  },
  communicator: {
    typeLabel:    '💬 소통러',
    title:        '팀을 자연스럽게 연결하는 유형',
    traits:       ['🤝 협업 중심', '💬 원활한 소통', '💡 아이디어 제안', '🌟 팀 조율'],
    illustration: 'assets/images/result3.png',
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
    if (!saved || !saved.style) {
      Router.navigate('quiz-1');
      return;
    }

    const section = document.querySelector('[data-page="quiz-result"]');
    if (!section) return;

    Storage.set('quiz_result', saved.style);
    const result = QUIZ_RESULTS[saved.style];
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
          <span class="quiz-role-card__icon-emoji" aria-hidden="true">${role.emoji}</span>
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
          <span class="quiz-style-card__icon-emoji" aria-hidden="true">${style.emoji}</span>
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
    const confettiPieces = [
      { color: '#ff6b6b', left: 42,  top: 97,  w: 7,  h: 14, deg: -30 },
      { color: '#ffd93d', left: 141, top: 127, w: 6,  h: 11, deg:  15 },
      { color: '#6bcb77', left: 216, top: 81,  w: 8,  h: 8,  deg:  45 },
      { color: '#4d96ff', left: 291, top: 112, w: 7,  h: 13, deg: -20 },
      { color: '#ff6b6b', left: 328, top: 156, w: 6,  h: 10, deg:  30 },
      { color: '#ffd93d', left: 23,  top: 200, w: 7,  h: 7,  deg:   0 },
      { color: '#6bcb77', left: 342, top: 186, w: 6,  h: 11, deg: -45 },
      { color: '#4d96ff', left: 59,  top: 259, w: 4,  h: 8,  deg:  20 },
      { color: '#ff922b', left: 314, top: 273, w: 7,  h: 7,  deg: -15 },
      { color: '#6bcb77', left: 12,  top: 318, w: 6,  h: 13, deg:  35 },
      { color: '#ff6b6b', left: 352, top: 332, w: 4,  h: 10, deg:  10 },
    ];

    const confettiHTML = confettiPieces
      .map(p => `<span class="confetti-piece" style="left:${p.left}px;top:${p.top}px;width:${p.w}px;height:${p.h}px;background:${p.color};transform:rotate(${p.deg}deg)"></span>`)
      .join('');

    const traitsHTML = result.traits
      .map(t => {
        const [icon, ...words] = t.split(' ');
        return `<div class="quiz-result-trait-card"><span class="quiz-result-trait-card__emoji">${icon}</span><span>${words.join(' ')}</span></div>`;
      })
      .join('');

    return `
      <div class="quiz-result-page">
        <div class="quiz-result-confetti" aria-hidden="true"><div class="quiz-result-confetti__inner">${confettiHTML}</div></div>

        <div class="quiz-result-page__content">
          <p class="quiz-result-page__subtitle">축하해요! 당신의 성향은</p>
          <h2 class="quiz-result-page__title">${result.typeLabel}</h2>
          <p class="quiz-result-page__type-desc">${result.title}</p>

          <img
            src="${result.illustration}"
            alt="${result.typeLabel}"
            class="quiz-result-page__illustration"
          />

          <div class="quiz-result-page__traits" aria-label="주요 성향">
            ${traitsHTML}
          </div>
        </div>

        <div class="quiz-result-page__cta">
          <button class="btn btn--dark" id="quiz-result-home" type="button">
            프로필로 보러가기
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
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
