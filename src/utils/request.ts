//对于axios函数库二次封装
//目的1：利用 axios 请求，响应拦截器功能
//目的2：请求拦截器，一般可以在请求头中携带公共参数，如:token
//目的3：响应拦截器，可以简化服务器返回的数据，处理 http 的网络错误
import axios from "axios";
//引入用户相关的参数
import useUserStore from "@/store/modules/user";
//axios 实例可以设置基础路径，超时的时间设置等
const request = axios.create({
    //请求的基础路径的设置
    baseURL: '/api',
    //超时时间设置，超出就是失败的，单位：毫秒
    timeout: 5000
});

//请求拦截器
request.interceptors.request.use((config) => {
    //获取一下用户仓库
    let UserStore = useUserStore();
    //token:公共参数，
    if(UserStore.userInfo.token){
        config.headers.token = UserStore.userInfo.token;
    }
    //config:请求拦截器回调注入的配置对象
    //配置对象的身上最重要的事情是 headers 属性
    //可以通过请求头携带公共的参数，例如：token
    // config.headers.token = "123";
    return config;
})


//响应拦截器
request.interceptors.response.use(
    //响应拦截器成功的回调，一般会进行简化数据
    (response) => {
        return response.data;
    },
    // 失败的回调，处理 404 等问题 
    (error) => {
        //处理 http 网络错误
        let status = error.response.status;
        switch (status) {
            case 404:
                ElMessage({
                    type: 'error',
                    message: error.message
                });
                break;
            case 500 | 501 | 502 | 503 | 504 | 505:
                ElMessage({
                    type: 'error',
                    message: '服务器挂了'
                });
                break;
            case 401:
                ElMessage({
                    type: 'error',
                    message: '请求参数有误'
                });
                break;
        }
        return Promise.reject(new Error(error.message))
    }
)

//务必对外暴露 axios
export default request;

//引入 element-plus 提示组件
import { ElMessage } from "element-plus";
import useStore from "element-plus/es/components/table/src/store/index.mjs";