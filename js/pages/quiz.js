/* ===================================================
   quiz.js — 성향 테스트 (역할 / 툴 / 스타일 선택)
   =================================================== */

const QUIZ_INTERESTS = [
  { id: 'planning',  label: '기획 · 아이디어',  emoji: '💡' },
  { id: 'design',    label: '디자인',           emoji: '🎨' },
  { id: 'dev',       label: '개발 · IT',        emoji: '💻' },
  { id: 'marketing', label: '광고 · 마케팅',    emoji: '📢' },
  { id: 'video',     label: '영상 · 콘텐츠',    emoji: '🎥' },
  { id: 'ai',        label: 'AI · 데이터',      emoji: '🤖' },
  { id: 'startup',   label: '창업 · 비즈니스',  emoji: '🚀' },
  { id: 'etc',       label: '기타',             emoji: '🌱' },
];

const QUIZ_TOOL_GROUPS = [
  { category: '개발',   emoji: '💻', tools: ['GitHub', 'VS Code', 'IntelliJ', 'Xcode', 'Android Studio'] },
  { category: '디자인', emoji: '🎨', tools: ['Figma', 'Photoshop', 'Illustrator', 'Blender', 'After Effects'] },
  { category: '기획',   emoji: '💡', tools: ['Notion', 'Slack', 'Jira', 'Discord', 'Trello'] },
  { category: '마케팅', emoji: '📣', tools: ['Canva', 'Premiere Pro', 'CapCut', 'GA4', 'Meta Ads'] },
  { category: 'AI',     emoji: '🤖', tools: ['ChatGPT', 'Claude', 'Gemini', 'Cursor', 'GitHub Copilot'] },
];

const QUIZ_TOOL_MAX = 5;

/* 칩을 3개씩 묶어 모래시계형(3개 → 2개) 행으로 배치 */
function _chunkByThree(arr) {
  const rows = [];
  for (let i = 0; i < arr.length; i += 3) rows.push(arr.slice(i, i + 3));
  return rows;
}

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
    illustration: 'assets/images/result1.svg',
  },
  executor: {
    typeLabel:    '🚀 실행러',
    title:        '아이디어를 행동으로 옮기는 유형',
    traits:       ['⚡ 빠른 실행력', '🔥 적극적인 추진', '💪 도전 정신', '🎯 결과 중심'],
    illustration: 'assets/images/result2.svg',
  },
  analyst: {
    typeLabel:    '🔍 분석러',
    title:        '논리적으로 문제를 해결하는 유형',
    traits:       ['📊 데이터 기반', '🧩 논리적 분석', '⚙️ 꼼꼼한 검토', '💡 최적 해결책'],
    illustration: 'assets/images/result3.svg',
  },
  communicator: {
    typeLabel:    '💬 소통러',
    title:        '팀을 자연스럽게 연결하는 유형',
    traits:       ['🤝 협업 중심', '💬 원활한 소통', '💡 아이디어 제안', '🌟 팀 조율'],
    illustration: 'assets/images/result4.svg',
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
        <p class="quiz-progress__label">${step} / ${QUIZ_TOTAL}</p>
        <div class="progress-bar" role="progressbar"
             aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar__fill" style="width: ${pct}%"></div>
        </div>
      </div>
    `;
  },

  /* ── Step 1: 관심 분야 선택 (복수) ── */

  _renderStep1(saved) {
    const selectedInterests = saved.interests || [];

    const cardsHTML = QUIZ_INTERESTS.map(item => `
      <button
        class="quiz-interest-card${selectedInterests.includes(item.id) ? ' quiz-interest-card--selected' : ''}"
        data-interest="${item.id}"
        type="button"
        aria-pressed="${selectedInterests.includes(item.id)}"
      >
        <span class="quiz-interest-card__emoji" aria-hidden="true">${item.emoji}</span>
        <span class="quiz-interest-card__label">${item.label}</span>
        <span class="quiz-interest-card__badge" aria-hidden="true">
          <img src="assets/icons/check-icon.svg" alt="" />
        </span>
      </button>
    `).join('');

    const hasSelection = selectedInterests.length > 0;

    return `
      ${this._renderHeader(1)}
      <div class="quiz-body">
        <h2 class="quiz-title">나의 관심 분야를 선택해주세요</h2>
        <p class="quiz-desc">주로 참여하고 싶은 프로젝트 분야를 선택해주세요.</p>
        <div class="quiz-interest-grid" role="group" aria-label="관심 분야 선택">
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

  /* ── Step 2: 툴 선택 (복수) ── */

  _renderStep2(saved) {
    const selectedTools = saved.tools || [];

    const groupsHTML = QUIZ_TOOL_GROUPS.map(group => `
      <div class="quiz-tool-group">
        <p class="quiz-tool-group__label"><span aria-hidden="true">${group.emoji}</span> ${group.category}</p>
        <div class="quiz-tool-group__chips" aria-label="${group.category}">
          ${_chunkByThree(group.tools).map(row => `
            <div class="quiz-tool-group__row">
              ${row.map(tool => `
                <button
                  class="quiz-tool-chip${selectedTools.includes(tool) ? ' quiz-tool-chip--selected' : ''}"
                  data-tool="${tool}"
                  type="button"
                  aria-pressed="${selectedTools.includes(tool)}"
                >${tool}</button>
              `).join('')}
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    const hasSelection = selectedTools.length > 0;

    return `
      ${this._renderHeader(2)}
      <div class="quiz-body">
        <h2 class="quiz-title">주로 사용하는 툴을 선택해주세요</h2>
        <div class="quiz-tool-subrow">
          <p class="quiz-tool-subrow__desc">최대 ${QUIZ_TOOL_MAX}개까지 선택할 수 있어요.</p>
          <p class="quiz-tool-count"><span id="quiz-tool-count-current">${selectedTools.length}</span> / ${QUIZ_TOOL_MAX} 선택됨</p>
        </div>
        <div class="quiz-tool-selected" id="quiz-tool-selected">${this._renderSelectedTools(selectedTools)}</div>
        <div class="quiz-tool-groups" role="group" aria-label="툴 선택">
          ${groupsHTML}
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

  /* 선택한 툴을 한눈에 보여주는 미리보기 칩 (읽기 전용) */
  _renderSelectedTools(selected) {
    if (!selected.length) return '';
    return selected
      .map(tool => `<span class="quiz-tool-chip quiz-tool-chip--selected">${tool}</span>`)
      .join('');
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
    const cards  = section.querySelectorAll('.quiz-interest-card');
    const nextBtn = section.querySelector('#quiz-next-btn');

    cards.forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('quiz-interest-card--selected');
        card.setAttribute(
          'aria-pressed',
          String(card.classList.contains('quiz-interest-card--selected'))
        );

        const selected = [...section.querySelectorAll('.quiz-interest-card--selected')]
          .map(c => c.dataset.interest);

        const saved = Storage.get(QUIZ_STORAGE_KEY) || {};
        saved.interests = selected;
        Storage.set(QUIZ_STORAGE_KEY, saved);

        nextBtn.disabled = selected.length === 0;
        nextBtn.classList.toggle('btn--disabled', selected.length === 0);
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
    const chips       = section.querySelectorAll('.quiz-tool-group .quiz-tool-chip');
    const nextBtn      = section.querySelector('#quiz-next-btn');
    const countEl       = section.querySelector('#quiz-tool-count-current');
    const selectedRow  = section.querySelector('#quiz-tool-selected');

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const isSelected = chip.classList.contains('quiz-tool-chip--selected');

        if (!isSelected) {
          const selectedCount = section.querySelectorAll('.quiz-tool-group .quiz-tool-chip--selected').length;
          if (selectedCount >= QUIZ_TOOL_MAX) {
            showToast(`최대 ${QUIZ_TOOL_MAX}개까지 선택할 수 있어요`, 'error');
            return;
          }
        }

        chip.classList.toggle('quiz-tool-chip--selected');
        chip.setAttribute(
          'aria-pressed',
          String(chip.classList.contains('quiz-tool-chip--selected'))
        );

        const selected = [...section.querySelectorAll('.quiz-tool-group .quiz-tool-chip--selected')]
          .map(c => c.dataset.tool);

        const saved = Storage.get(QUIZ_STORAGE_KEY) || {};
        saved.tools = selected;
        Storage.set(QUIZ_STORAGE_KEY, saved);

        if (countEl) countEl.textContent = selected.length;
        if (selectedRow) selectedRow.innerHTML = this._renderSelectedTools(selected);

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
