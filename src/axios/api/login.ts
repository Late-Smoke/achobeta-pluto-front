import apiClient from '@/axios/axios'
import axios from 'axios';

export function reflashRtokenApi(params) {
    return axios.post('/api/common/rtoken',  {
        body:params,
        headers: { 'Content-Type': 'application/json' }
    } );
}

export function checkAutoLoginApi(params) {
    return axios.post('/api/login/auto',  {
        body:params,
        headers: { 'Content-Type': 'application/json' }
    } );
}