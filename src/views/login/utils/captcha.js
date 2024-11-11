import axios from 'axios';

export function requestCaptcha(phoneInput, phoneError, updateCountdown) {
  const phoneNumber = phoneInput.value;

  axios.get('/api/login/code', { params: { phone: phoneNumber } })
    .then(response => {
      const data = response.data;
      if (data.isValid) {
        phoneError.style.display = 'none';
        const expirationTime = Date.now() + 60 * 1000;
        localStorage.setItem('captchaExpirationTime', expirationTime);
        updateCountdown();
      } else {
        phoneError.style.display = 'block';
        phoneError.textContent = '手机号不合法，请重新输入';
      }
    })
    .catch(error => {
      console.error('请求出错：', error);
      phoneError.style.display = 'block';
      phoneError.textContent = '请求验证码失败，请稍后重试';
    });
}

export function updateCountdown(getCodeButton, resetGetCodeButton) {
  const expirationTime = localStorage.getItem('captchaExpirationTime');
  if (expirationTime) {
    const timeRemaining = Math.floor((expirationTime - Date.now()) / 1000);
    if (timeRemaining > 0) {
      getCodeButton.disabled = true;
      getCodeButton.textContent = `重新获取 (${timeRemaining}s)`;
      setTimeout(() => updateCountdown(getCodeButton, resetGetCodeButton), 1000);
    } else {
      resetGetCodeButton();
    }
  }
}

export function resetGetCodeButton(getCodeButton) {
  getCodeButton.disabled = false;
  getCodeButton.textContent = '重新获取';
  localStorage.removeItem('captchaExpirationTime');
}
