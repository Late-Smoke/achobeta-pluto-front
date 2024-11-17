import apiClient from '@/utils/axios'

////下拉菜单

// 获取用户真实姓名
export const FetchName = (params,response) => {
    apiClient.get('https://api.example.com/data', { params })
    .then(response)
    .catch(error => {
      console.error(error);
    });}