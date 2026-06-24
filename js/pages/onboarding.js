/* ===================================================
   onboarding.js — 온보딩 1·2·3 화면 로직
   =================================================== */

const OnboardingPage = {

  init(params = {}) {
    const pageId = Router.currentPage;

    if (pageId === 'onboarding-1') {
      this._bindNext('onboarding-1-next', 'onboarding-2');
    }

    if (pageId === 'onboarding-2') {
      this._bindNext('onboarding-2-next', 'onboarding-3');
    }

    if (pageId === 'onboarding-3') {
      this._bindNext('onboarding-3-next', 'login');
      /* onboarding-3 진입 시 완료 처리 (다음 버튼 클릭 후 login 전환) */
    }
  },

  _bindNext(btnId, targetPage) {
    const btn = document.getElementById(btnId);
    if (!btn) return;

    /* 이벤트 중복 방지 */
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    newBtn.addEventListener('click', () => {
      if (targetPage === 'login') {
        /* 온보딩 완료 기록 */
        Storage.set('onboarding_done', true);
      }
      this._transitionTo(targetPage);
    });
  },

  /* 현재 화면을 살짝 슬라이드아웃 시킨 뒤 다음 화면으로 이동하고
     슬라이드인 시켜 자연스럽게 전환되는 느낌을 준다 */
  _transitionTo(targetPage) {
    const currentPage = document.querySelector('.page.is-active');

    if (!currentPage) {
      Router.navigate(targetPage);
      return;
    }

    currentPage.classList.add('onboarding-slide-out');
    currentPage.addEventListener(
      'animationend',
      () => {
        currentPage.classList.remove('onboarding-slide-out');
        Router.navigate(targetPage);

        const nextPage = document.querySelector(`[data-page="${targetPage}"]`);
        if (nextPage) {
          nextPage.classList.add('onboarding-slide-in');
          nextPage.addEventListener(
            'animationend',
            () => nextPage.classList.remove('onboarding-slide-in'),
            { once: true }
          );
        }
      },
      { once: true }
    );
  }
};
