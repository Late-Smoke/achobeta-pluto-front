import apiClient from '@/utils/axios'
//获取权限组 团队信息
export function getPowerApi(params) {
    return apiClient.get('https://api.example.com/data', { params });
}

//删除团队成员
export function deleteTeamMemberApi(params) {
    return apiClient.delete('https://api.example.com/data', { params });
}

//新建团队
export function CreateTeamApi(data) {
    return apiClient.put('https://api.example.com/data', data);
}

//查询指定团队成员信息
export function getTeamMemberListApi(params) {
    return apiClient.get('https://api.example.com/data', { params });
}