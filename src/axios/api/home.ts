import apiClient from '@/axios/axios'
import { atoken , rtoken } from '@/axios/api/login'

////获取token
//const atoken = localStorage.getItem('atoken');
//const atoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjE4NjEzMzUwMzI1NzcxMzQ1OTIsInR5cGUiOiJhdG9rZW4iLCJleHAiOjE3MzI3Mzg1OTAsIm5iZiI6MTczMjY5NTM5MH0.YqAkXL07rrFE4TvuJGIG8LdTOqDXKib0IyAElSFp2F8";

////下拉菜单

// 获取用户真实姓名
export function fetchNameApi() {
    return apiClient.get('/api/user-profile/details',  {
        headers:
        {
            'Authorization': `${atoken}`, // 正确地将atoken作为请求头传递
        }
    } );
}

////常用设备

//分页+设备信息
export function getDevicesApi(params) {
    return apiClient.get('/api/devices/show',  {
        params:params,
        headers:
        {
            'Authorization': `${atoken}`, // 正确地将atoken作为请求头传递
        }
    } );
}

//下线
export function removeDeviceApi(params) {
    return apiClient.delete('/api/devices/remove',  {
        data: JSON.stringify(params),
        headers:
        {
            'Authorization': `${atoken}`, // 正确地将atoken作为请求头传递
        }
    } );
}

////项目进度
export function getProgressApi(params) {
    return apiClient.get('/api/feishu/get',  {
        params:params,
        headers:
        {
            'Authorization': `${atoken}`, // 正确地将atoken作为请求头传递
        }
    } );
}

////更新atoken

//token
export function reflashAtokenApi(data) {
    return apiClient.put('https://api.example.com/data', data);
}

export function identifyTokenApi(params) {
    return apiClient.get('https://api.example.com/data', { params });
}

export function reflashRtoken(data) {
    return apiClient.put('https://api.example.com/data', data);
}

//免登录
export function checkAutoLoginApi(params) {
    return apiClient.get('https://api.example.com/data', { params });
}