// @ts-nocheck
import { createApp } from 'vue'
import App from './App.vue'
import pinia from './stores'
import router from './router'
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
app.mount('#app')
Vue.prototype.post = post;
Vue.prototype.put = put;
Vue.prototype.get = get;
Vue.prototype.deleted = deleted;
 