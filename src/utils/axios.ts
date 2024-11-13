import axios from 'axios'

//axios实例
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_API || 'http://localhost', // 待修改
  timeout: 30000, // 请求超时时间为30秒
  headers: { 'Content-Type': 'application/json' }, 
});

export default apiClient;