import axios from 'axios';

// 创建一个 axios 实例，并设置全局超时时间为 3 秒
const axiosInstance = axios.create({
  timeout: 3000, // 超时时间为 3000 毫秒（3 秒）
});

// 获取消息
export const getMessages = async (atoken, page, timestamp) => {
  try {
    const response = await axiosInstance.get('/api/message/get', {
      params: { atoken, page, timestamp },
    });
    return response.data;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      console.error('请求超时: 获取消息接口超过3秒未响应');
    } else {
      console.error('消息获取失败:', error);
    }
    throw error;
  }
};

// 标记单条消息为已读
export const markMessageAsRead = async (userMessageId) => {
  try {
    const response = await axiosInstance.post('/api/message/markread', {
      user_message_id: userMessageId,
    });
    return response.data;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      console.error('请求超时: 标记消息为已读接口超过3秒未响应');
    } else {
      console.error('标记消息为已读失败:', error);
    }
    throw error;
  }
};

// 标记多条消息为已读
export const markMessagesAsRead = async (userMessageIds) => {
  try {
    const response = await axiosInstance.post('/api/message/markread', {
      user_message_id: userMessageIds,
    });
    return response.data;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      console.error('请求超时: 标记多条消息为已读接口超过3秒未响应');
    } else {
      console.error('标记多条消息为已读失败:', error);
    }
    throw error;
  }
};
