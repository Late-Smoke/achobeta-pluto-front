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

//element-plus/icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(ElementPlus) // 注册 Element Plus
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.mount('#app')
 