import apiClient from '@/axios/axios'
import axios from 'axios';

export function reflashRtokenApi(params) {
    return axios.post('/api/common/rtoken',  {
        token:params,
        headers: { 'Content-Type': 'application/json' }
    } );
}

export function checkAutoLoginApi(params) {
    return axios.post('/api/login/auto',  {
        token:params,
        headers: { 'Content-Type': 'application/json' }
    } );
}