import axios from 'axios';

export async function exitSystem() {
  const atoken = localStorage.getItem('atoken'); // 从本地获取 atoken

  if (!atoken) {
    return { success: false, message: '未找到有效的 atoken，请重新登录' };
  }

  try {
    const response = await axios.post('/api/login/exit', { atoken });

    if (response.data.code === 200) {
      return { success: true, message: '退出成功' };
    } else if (response.data.code === -43960) {
      return { success: false, message: '登录已过期，请重新登录' };
    } else if (response.data.code === 10001) {
      return { success: false, message: '无效的登录参数，请重新登录' };
    } else {
      return { success: false, message: '退出失败，请稍后重试' };
    }
  } catch (error) {
    console.error('退出登录接口调用失败:', error);
    return { success: false, message: '网络错误，退出失败，请稍后重试' };
  }
}
