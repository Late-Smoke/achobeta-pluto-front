import axios from 'axios';
import apiClient from './axios';
import { reflashRtokenApi } from '@/axios/api/login';
let refreshing = false;
let queue = [];
// 请求拦截器
apiClient.interceptors.request.use((config) => {
    const atoken = localStorage.getItem('atoken');
    // console.log("请求拦截器的atoken:",atoken)
    if (atoken) {
        config.headers['Authorization'] = `${atoken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
// 响应拦截器
apiClient.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const { response, config } = error;
    let errorMessage;
    // 根据响应状态码处理不同的错误
    if (response) {
        switch (response.data) {
            case 400:
                errorMessage = '请求参数错误';
                break;
            case 401:
                errorMessage = '未授权，请登录';
                // if (!config.url.includes('/refresh')) {
                //   await handleAuthRefresh(error);
                //   return;
                // }
                break;
            case 403:
                errorMessage = '拒绝访问';
                break;
            case 404:
                errorMessage = '请求的资源未找到';
                break;
            case 500:
                errorMessage = '服务器内部错误';
            case -20000:
                errorMessage = 'token过期';
                break;
            default:
                errorMessage = `服务器错误: ${response.status}`;
        }
    }
    else if (error.request) {
        errorMessage = '请求已发送，但没有收到响应';
    }
    else {
        errorMessage = '请求错误';
    }
    console.error('响应错误:', errorMessage);
    return Promise.reject({ status: response ? response.status : null, message: errorMessage });
});
async function handleAuthRefresh(error) {
    if (refreshing) {
        return new Promise((resolve, reject) => {
            // queue.push({ config: error.config, resolve, reject });
        });
    }
    refreshing = true;
    queue = [];
    try {
        const res = await RefreshToken();
        if (res.status === 20000) {
            // 令牌刷新成功，重试队列中的请求
            const authHeader = { 'Authorization': `${res.data.atoken}` };
            queue.forEach(pendingTask => {
                const { config, resolve, reject } = pendingTask;
                config.headers = { ...config.headers, ...authHeader }; // 更新令牌-
                axios(config)
                    .then((response) => resolve(response))
                    .catch((error) => reject(error));
            });
            queue = []; // 清空队列，因为所有请求都已重试
        }
        else {
            // 令牌刷新失败，拒绝队列中的请求并提示用户
            queue.forEach(pendingTask => pendingTask.reject(error));
            alert('登录过期，请重新登录');
        }
    }
    catch (refreshError) {
        // 在刷新令牌过程中发生错误，拒绝队列中的请求并提示用户
        queue.forEach(pendingTask => pendingTask.reject(refreshError));
        alert('刷新令牌失败，请检查网络连接或稍后重试');
    }
    finally {
        refreshing = false; // 无论成功还是失败，都重置refreshing状态
    }
}
// 刷新atoken
async function RefreshToken() {
    try {
        const rtoken = localStorage.getItem('rtoken');
        const res = await reflashRtokenApi(rtoken);
        // 更新本地存储中的访问令牌和刷新令牌
        localStorage.setItem('atoken', res.data.atoken);
        localStorage.setItem('rtokrn', res.data.rtoken);
        return res;
    }
    catch (error) {
        console.error('刷新令牌失败:', error);
        throw error; // 抛出错误以便上层处理
    }
}
