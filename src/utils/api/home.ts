import apiClient from '@/utils/axios'

////下拉菜单

// 获取用户真实姓名
export function FetchName(params) {
    return apiClient.get('https://api.example.com/data', { params })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error(error);
            throw error; 
        });
}

////常用设备

//分页+设备信息
export function GetAutoLoginDevices(params) {
    return apiClient.get('https://api.example.com/data', { params })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error(error);
            throw error;
        });
}

//下线
export function RemoveAutoDevice(params) {
    return apiClient.get('https://api.example.com/data', { params })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error(error);
            throw error;
        });
}

////项目进度
export function GetFeiShu(params) {
    return apiClient.get('https://api.example.com/data', { params })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error(error);
            throw error;
        });
}