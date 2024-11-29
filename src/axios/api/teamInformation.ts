import apiClient from '@/axios/axios'
import axios from 'axios';

//const atoken = localStorage.getItem('atoken');
//获取权限组 团队信息
export function getPowerApi(params) {
    return apiClient.get('/api/team/power',  {
        params:params
    } );
}

//删除团队成员
export function deleteTeamMemberApi(params) {
    return apiClient.delete('https://api.example.com/data', { params });
}

//新建团队
export function CreateTeamApi(data) {
    return apiClient.post('/api/team/structure/create',  {
        data:data
    } );
}

//查询指定团队成员信息
export function getTeamMemberListApi(params) {
    return apiClient.get('/api/team/memberlist/get', { params });
}

////团队架构管理

//获取指定团队全部架构
export function getTeamStructureApi(params) {
    const atoken = localStorage.getItem('atoken');
    return apiClient.get('/api/team/structure/collection',  {
        params:params
    } );
}

//保存团队架构
export function putTeamNodeApi(data) {
    const atoken = localStorage.getItem('atoken');
    return apiClient.put('/api/team/structure/change',  {
        data:data
    } );
}



