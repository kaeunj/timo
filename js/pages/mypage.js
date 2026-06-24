/* ===================================================
   mypage.js — 마이페이지
   =================================================== */

const MyPage = {

  init(params = {}) {
    this._bindStats();
    this._bindProjectMore();
  },

  initReview(params = {}) {
    this._bindReviewBack();
    this._bindTagMore();
  },

  /* 통계 버튼 → 페이지 이동 */
  _bindStats() {
    document.querySelectorAll('[data-myp-stat]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.mypStat;
        if (target === 'project-review' || target === 'received-review') {
          Router.navigate('project-review');
        } else if (target === 'written-review') {
          Router.navigate('profile-review-more');
        }
      });
    });
  },

  /* "더보기" 버튼 → 리뷰 목록 페이지 */
  _bindProjectMore() {
    const btn = document.querySelector('[data-action="go-project-review"]');
    if (btn) {
      btn.addEventListener('click', () => Router.navigate('project-review'));
    }
  },

  /* 프로젝트 리뷰 뒤로가기 */
  _bindReviewBack() {
    const section = document.querySelector('[data-page="project-review"]');
    const btn = section?.querySelector('[data-action="back"]');
    if (btn) {
      btn.addEventListener('click', () => Router.back());
    }
  },

  /* +2 태그 더보기 */
  _bindTagMore() {
    const moreBtn = document.getElementById('prv-tag-more-btn');
    const hiddenRow = document.getElementById('prv-tags-hidden');
    if (moreBtn && hiddenRow) {
      moreBtn.addEventListener('click', () => {
        hiddenRow.style.display = 'flex';
        moreBtn.style.display = 'none';
      });
    }
  }
};
