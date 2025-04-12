import { createApp } from 'vue'

import '@/style/reset.scss'

import App from '@/App.vue'
//引入组件
import HospitalTop from '@/components/hospital_top/index.vue'
import HospitalBottom from '@/components/hospital_bottom/index.vue'
import Login from '@/components/login/index.vue'
//引入路由核心插件并安装
import router from '@/router/index'
//引入element-plus插件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//国际化文件
import zhCn from 'element-plus/es/locale/lang/zh-cn'

//引入Pinia仓库
import pinia from '@/store'
const app = createApp(App);
//组件
app.component('HospitalTop',HospitalTop);
app.component('HospitalBottom',HospitalBottom);
app.component('Login',Login);
//安装vue-router
app.use(router)
//安装element-plus插件
app.use(ElementPlus,{
    locale:zhCn,
})
//安装pinia仓库
app.use(pinia);
//挂载
app.mount('#app');
