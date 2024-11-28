import apiClient from '@/axios/axios'
import { atoken , rtoken } from '@/axios/api/login'

//const atoken = localStorage.getItem('atoken');
//获取权限组 团队信息
export function getPowerApi(params) {
    return apiClient.get('/api/team/power',  {
        params:params,
        headers:
        {
            'Authorization': `${atoken}`, // 正确地将atoken作为请求头传递
        }
    } );
}

//删除团队成员
export function deleteTeamMemberApi(params) {
    return apiClient.delete('https://api.example.com/data', { params });
}

//新建团队
export function CreateTeamApi(data) {
    return apiClient.put('/api/team/structure/create',  {
        data:data,
        headers:
        {
            'Authorization': `${atoken}`, // 正确地将atoken作为请求头传递
        }
    } );
}

//查询指定团队成员信息
export function getTeamMemberListApi(params) {
    return apiClient.get('https://api.example.com/data', { params });
}

////团队架构管理

//获取指定团队全部架构
export function getTeamStructureApi(params) {
    return apiClient.get('/api/team/structure/collection',  {
        params:params,
        headers:
        {
            'Authorization': `${atoken}`, // 正确地将atoken作为请求头传递
        }
    } );
}

//保存团队架构
export function putTeamNodeApi(data) {
    return apiClient.put('/api/team/structure/change',  {
        data:data,
        headers:
        {
            'Authorization': `${atoken}`, // 正确地将atoken作为请求头传递
        }
    } );
}



