/* ===================================================
   auth.js — 로그인 / 회원가입 로직 (더미 처리)
   =================================================== */

const AuthPage = {

  /* ── 로그인 초기화 ── */
  initLogin(params = {}) {
    this._bindLoginForm();
    this._bindSocialButtons();
    this._bindGoSignup();
    this._bindForgotPassword();
  },

  _bindLoginForm() {
    const form = document.getElementById('login-form');
    if (!form) return;

    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);

    newForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email    = newForm.querySelector('#login-email').value.trim();
      const password = newForm.querySelector('#login-password').value;

      if (!this._validateEmail(email)) {
        showToast('올바른 이메일 주소를 입력해주세요.', 'error');
        return;
      }
      if (password.length < 6) {
        showToast('비밀번호는 6자 이상 입력해주세요.', 'error');
        return;
      }

      /* 더미 로그인 처리 */
      Storage.set('session', { email, dummy: true });
      showToast('로그인 되었습니다.', 'success');
      Router.navigate('home');
    });
  },

  _bindSocialButtons() {
    document.querySelectorAll('.auth-social__btn').forEach((btn) => {
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);

      newBtn.addEventListener('click', () => {
        const provider = newBtn.dataset.social;
        const names = { google: 'Google', kakao: '카카오', naver: '네이버' };
        showToast(`${names[provider]} 로그인은 추후 연동 예정입니다.`, 'error');
      });
    });
  },

  _bindForgotPassword() {
    const btn = document.querySelector('.auth-login__forgot');
    if (!btn) return;
    btn.addEventListener('click', () => {
      showToast('비밀번호 찾기는 추후 지원 예정입니다.', 'error');
    });
  },

  _bindGoSignup() {
    const btn = document.getElementById('go-signup');
    if (!btn) return;

    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    newBtn.addEventListener('click', () => {
      Router.navigate('signup');
    });
  },

  /* ── 회원가입 초기화 ── */
  initSignup(params = {}) {
    this._bindSignupBack();
    this._bindSignupForm();
  },

  _bindSignupBack() {
    const btn = document.getElementById('signup-back');
    if (!btn) return;

    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    newBtn.addEventListener('click', () => {
      Router.navigate('login');
    });
  },

  _bindSignupForm() {
    const form = document.getElementById('signup-form');
    if (!form) return;

    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);

    newForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nickname = newForm.querySelector('#signup-nickname').value.trim();
      const email    = newForm.querySelector('#signup-email').value.trim();
      const password = newForm.querySelector('#signup-password').value;
      const confirm  = newForm.querySelector('#signup-password-confirm').value;

      if (!nickname) {
        showToast('닉네임을 입력해주세요.', 'error');
        return;
      }
      if (!this._validateEmail(email)) {
        showToast('올바른 이메일 주소를 입력해주세요.', 'error');
        return;
      }
      if (password.length < 6) {
        showToast('비밀번호는 6자 이상 입력해주세요.', 'error');
        return;
      }
      if (password !== confirm) {
        showToast('비밀번호가 일치하지 않습니다.', 'error');
        return;
      }

      /* 더미 회원가입 처리 → 성향 테스트로 이동 */
      Storage.set('session', { email, nickname, dummy: true });
      showToast('회원가입이 완료되었습니다!', 'success');
      Router.navigate('quiz-1');
    });
  },

  /* ── 유틸 ── */
  _validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
};
