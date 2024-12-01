import apiClient from '@/axios/axios'
import axios from 'axios';

export function reflashRtokenApi(params: string | null) {
    return axios.post('/api/common/rtoken',  {
        token:params,
        headers: { 'Content-Type': 'application/json' }
    } );
}

export function checkAutoLoginApi(params: string | null) {
    return axios.post('/api/login/auto',  {
        token:params,
        headers: { 'Content-Type': 'application/json' }
    } );
}