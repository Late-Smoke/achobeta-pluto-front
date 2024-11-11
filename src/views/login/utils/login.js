import axios from 'axios';

export function login(phoneInput, captchaInput, captchaError) {
  const phoneNumber = phoneInput.value;
  const captcha = captchaInput.value;

  const captchaPattern = /^[A-Za-z0-9]{6}$/;
  if (!captchaPattern.test(captcha)) {
    captchaError.style.display = 'block';
    captchaError.textContent = '验证码格式不正确，请重试';
    return;
  } else {
    captchaError.style.display = 'none';
  }

  axios.post('/LoginWithCode', { phone: phoneNumber, captcha })
    .then(response => {
      const data = response.data;
      if (data.result === 'success') {
        alert('登录成功');
        localStorage.setItem('id', data.id);
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('atoken', data.atoken);
        if (data.rtoken) localStorage.setItem('rtoken', data.rtoken);
      } else if (data.result === 'non-member') {
        alert('暂无账号，请联系管理员处理');
      } else {
        captchaError.style.display = 'block';
        captchaError.textContent = '验证码错误，请重试';
      }
    })
    .catch(error => {
      console.error('请求出错：', error);
      captchaError.style.display = 'block';
      captchaError.textContent = '请求登录失败，请稍后重试';
    });
}
