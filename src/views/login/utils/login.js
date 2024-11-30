import axios from 'axios';
import router from '@/router'; // 根据实际路径调整

export function login(phoneInput, captchaInput, captchaError, loginRemember) {
  const phoneNumber = phoneInput.value;
  const captcha = captchaInput.value;
  const remember = loginRemember;
  const captchaPattern = /^[A-Za-z0-9]{6}$/;

  if (!captchaPattern.test(captcha)) {
    captchaError.style.display = 'block';
    captchaError.textContent = '验证码格式不正确，请重试';
    return;
  } else {
    captchaError.style.display = 'none';
  }

  axios.post('/api/login/login', {
      phone: String(phoneNumber),  // 将手机号转为字符串
      code: String(captcha),       // 将验证码转为字符串
      auto_login: remember         // 添加 auto_login 参数并设置为 true
    })
    .then(response => {
      const data = response.data;
      console.log('登录按钮:', data); // 打印后端响应内容

      if (data.code === 20000) { 
        const responseData = data.data;

        if (responseData.is_team) {
          // 用户是团队成员
          // alert('登录成功');
          
          // 使用 Vue Router 跳转到主页
          router.push('/home');
          
         // 存储必要的登录信息
         localStorage.setItem('atoken', responseData.atoken);    // 令牌
         if (remember && responseData.rtoken) localStorage.setItem('rtoken', responseData.rtoken); // 当用户勾选了且rtokrn存在时，刷新令牌
         localStorage.setItem('service_id', responseData.id); // 业务id
         localStorage.setItem('user_agent', responseData.user_agent); // 用户代理信息
         localStorage.setItem('ip', responseData.ip); // IP地址
         if(responseData.rtoken) console.log("登录时储存的rtoken为:",localStorage.getItem('rtoken'));
         console.log("登录时储存的atoken为:",localStorage.getItem('atoken'));
      } else {
        captchaError.style.display = 'block';
        captchaError.textContent = '非团队成员，无法进入系统';
      }
    }else {
      // code 不为 20000 的情况
      captchaError.style.display = 'block';
      captchaError.textContent = data.message || '验证码错误，请重试';
    }
    })
    .catch(error => {
      console.error('请求出错：', error);
      captchaError.style.display = 'block';
      captchaError.textContent = '请求登录失败，请稍后重试';
    });
}
