// @ts-nocheck
import { createApp } from 'vue'
import App from './App.vue'
import pinia from './stores'
import router from './router'

// 引入 Element Plus 和样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//font awesome
import '@fortawesome/fontawesome-free/css/all.css';


import 'normalize.css'
import '@/assets/styles/common.scss'
import '@/utils/request'
import {post} from "@/utils/api.ts";
import {put} from "@/utils/api.ts";
import {get} from "@/utils/api.ts";
import {deleted} from "@/utils/api.ts";

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(ElementPlus) // 注册 Element Plus
app.mount('#app')
Vue.prototype.post = post;
Vue.prototype.put = put;
Vue.prototype.get = get;
Vue.prototype.deleted = deleted;
 