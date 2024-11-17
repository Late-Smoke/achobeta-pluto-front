import apiClient from './axios'

// 封装 GET 请求
export const get = (url, params) => {
    return apiClient.get(url, { params });
  };
   
  // 封装 POST 请求
  export const post = (url, data) => {
    return apiClient.post(url, data);
  };
   
  // 封装 DELETE 请求
  export const deleted = (url, params) => {
    return apiClient.delete(url, { params });
  };
   
  // 封装 PUT 请求
  export const put = (url, data) => {
    return apiClient.put(url, data);
  };