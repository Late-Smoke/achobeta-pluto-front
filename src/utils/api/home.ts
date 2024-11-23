import apiClient from '@/utils/axios'

////下拉菜单

// 获取用户真实姓名
export function fetchNameApi(params) {
    return apiClient.get('https://api.example.com/data', { params });
}

////常用设备

//分页+设备信息
export function getDevicesApi(params) {
    const atoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjE4NTk5MzI3NjAxNjUwNjA2MDgsInR5cGUiOiJhdG9rZW4iLCJleHAiOjE3MzIzMjI1MjMsImlzcyI6IjE4NTk5NDA0MDc3OTA1Mzg3NTIiLCJuYmYiOjE3MzIyNzkzMjN9.V1frj6DvSeMhbT_IwYz6T8z9Cex5-zBnRga7jIUHb0k';
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
    return apiClient.delete('/api/devices/remove', { params });
}

////项目进度
export function getProgressApi(params) {
    return apiClient.get('https://api.example.com/data', { params });
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