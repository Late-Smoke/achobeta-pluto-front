import axios from 'axios';
//axios实例
const apiClient = axios.create({
    baseURL: undefined,
    timeout: 10000, // 请求超时时间为10秒
    headers: { 'Content-Type': 'application/json' },
});
export default apiClient;
