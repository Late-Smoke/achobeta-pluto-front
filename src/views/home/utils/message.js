import axios from 'axios';


// 基于 axios 创建实例的工厂函数，用于动态设置超时时间
const createAxiosInstance = (timeout) => {
  return axios.create({
    timeout, // 动态设置超时时间
  });
};

// 错误处理函数
const handleApiError = (data) => {
  if (!data || typeof data !== 'object' || !data.code) {
    console.error('Invalid data received in handleApiError:', data);
    ElMessage.error('发生未知错误');
    return;
  }

  if (data.code === 60004) {
    console.error('数据库错误:', data.message);
    ElMessage.error('后台出现错误，请稍后重试');
  } else if (data.code === -20000 || data.code === -20002) {
    console.error('Token 错误:', data.message);
    ElMessage.error('登录信息已过期或无效，请重新登录');
    // window.location.href = '/login'; // 强制跳转到登录页面
  } else if (data.code === -20003) {
    console.error('Token 类型错误:', data.message);
    ElMessage.error('程序出错，请联系开发人员');
  } else {
    console.error('未知错误:', data.message);
    ElMessage.error(data.message || '请求失败，请稍后重试');
  }
};
// 获取消息
export const getMessages = async (atoken, page, timestamp) => {
  const axiosInstance = createAxiosInstance(500); // 设置超时时间
  try {
    const response = await axiosInstance.get('/api/message/get', {
      params: { page, timestamp },// Query 参数
      headers: { Authorization: `${atoken}` }, // 将 atoken 放在请求头
    });
    const data = response.data;

      if (!data) {
      console.error('未收到服务器响应');
      ElMessage.error('没有收到服务器响应');
      return { code: -1, message: '没有收到服务器响应' };
    }

    if (data.code === 200) {
      return data;
    } else {
      handleApiError(data);
      return data;
    }
  } catch (error) {
    console.error('请求失败:', error);
    
    // 更详细的错误处理
    if (error.response) {
      handleApiError(error.response.data);
      return error.response.data;
    } else if (error.request) {
      console.error('无响应', error.request);
      ElMessage.error('网络连接失败');
      return { code: -1, message: '网络连接失败' };
    } else {
      console.error('请求错误', error.message);
      ElMessage.error('请求发生错误');
      return { code: -1, message: '请求发生错误' };
    }
  }
};

// 标记单条消息为已读
export const markMessageAsRead = async (userMessageId) => {
  const axiosInstance = createAxiosInstance(2000); // 设置默认超时时间
  try {
    const response = await axiosInstance.post('/api/message/markread', {
      user_message_id: userMessageId,
    });

    if (response.data.code === 200) {
      return response.data;
    } else {
      console.error('标记消息为已读失败:', response.data.message || '未知错误');
      throw new Error(response.data.message || '标记失败');
    }
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      console.error('请求超时: 标记消息为已读接口超时未响应');
    } else {
      console.error('标记消息为已读失败:', error);
    }
    throw error;
  }
};

// 标记多条消息为已读
export const markMessagesAsRead = async (userMessageIds) => {
  const axiosInstance = createAxiosInstance(5000); // 设置超时时间
  try {
    const response = await axiosInstance.post('/api/message/markread', {
      user_message_id: userMessageIds,
    });

    if (response.data.code === 200) {
      return response.data;
    } else {
      console.error('标记消息为已读失败:', response.data.message || '未知错误');
      throw new Error(response.data.message || '标记失败');
    }
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      console.error('请求超时: 标记多条消息为已读接口超时未响应');
    } else {
      console.error('标记多条消息为已读失败:', error);
    }
    throw error;
  }
};
