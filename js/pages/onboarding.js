/* ===================================================
   onboarding.js — 온보딩 1·2 화면 로직
   =================================================== */

const OnboardingPage = {

  init(params = {}) {
    const pageId = Router.currentPage;

    if (pageId === 'onboarding-1') {
      this._bindNext('onboarding-1-next', 'onboarding-2');
    }

    if (pageId === 'onboarding-2') {
      this._bindNext('onboarding-2-next', 'login');
      /* onboarding-2 진입 시 완료 처리 (다음 버튼 클릭 후 login 전환) */
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
      Router.navigate(targetPage);
    });
  }
};
