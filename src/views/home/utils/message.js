import axios from 'axios';

// 基于 axios 创建实例的工厂函数，用于动态设置超时时间
const createAxiosInstance = (timeout) => {
  return axios.create({
    timeout, // 动态设置超时时间
  });
};

// 获取消息
export const getMessages = async (atoken, page, timestamp) => {
  const axiosInstance = createAxiosInstance(2000); // 设置较短的超时时间为 2 秒
  try {
    const response = await axiosInstance.get('/api/message/get', {
      params: { atoken, page, timestamp },
    });
    return response.data;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      console.error('请求超时: 获取消息接口超过2秒未响应');
    } else {
      console.error('消息获取失败:', error);
    }
    throw error;
  }
};

// 标记单条消息为已读
export const markMessageAsRead = async (userMessageId) => {
  const axiosInstance = createAxiosInstance(3000); // 设置默认超时时间为 3 秒
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
  const axiosInstance = createAxiosInstance(5000); // 设置较长的超时时间为 5 秒
  try {
    const response = await axiosInstance.post('/api/message/markread', {
      user_message_id: userMessageIds,
    });
    return response.data;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      console.error('请求超时: 标记多条消息为已读接口超过5秒未响应');
    } else {
      console.error('标记多条消息为已读失败:', error);
    }
    throw error;
  }
};
