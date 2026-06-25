/* ===================================================
   review.js — 리뷰 더보기 화면
   =================================================== */

const ReviewPage = {

  init(params = {}) {
    this._bindBack();
  },

  _bindBack() {
    const section = document.querySelector('[data-page="profile-review-more"]');
    const btn = section?.querySelector('[data-action="back"]');
    if (btn) {
      btn.addEventListener('click', () => Router.back());
    }
  }
};
