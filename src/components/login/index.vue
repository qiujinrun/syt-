<template>
    <div class="login_container">
        <el-dialog v-model="userStore.visiable" title="用户登录" ref="dialog" @close="close">
            <!-- 对话框身体部分的结构 -->
            <el-row>
                <!-- 左侧结构：手机号码登录、微信扫一扫登录 -->
                <el-col :span="12">
                    <div class="login">
                        <div v-show="scene == 0">
                            <el-form :model="loginParam" :rules="rules" ref="form">
                                <el-form-item prop="phone">
                                    <el-input placeholder="请你输入手机号码" :prefix-icon="User"
                                        v-model="loginParam.phone"></el-input>
                                </el-form-item>
                                <el-form-item prop="code">
                                    <el-input placeholder="请你输入手机验证码" :prefix-icon="Lock"
                                        v-model="loginParam.code"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button :disabled="!isPhone ? true : false">
                                        <CountDown v-if="flag" :flag="flag" @getFlag="getFlag" />
                                        <span v-else @click="getCode">获取验证码</span>
                                    </el-button>
                                </el-form-item>
                            </el-form>
                            <div class="bottom">
                                <el-button style="width: 90%;" type="primary" size="default"
                                    :disabled="!isPhone || loginParam.code.length < 6 ? true : false"
                                    @click="login">用户登录</el-button>
                            </div>
                            <div class="bottom" @click="changeScene">
                                <p>微信扫码登录</p>
                                <svg t="1742385902919" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="2681" width="32" height="32">
                                    <path
                                        d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                                        fill="#28C445" p-id="2682"></path>
                                    <path
                                        d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                                        fill="#28C445" p-id="2683"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="webchat" v-show="scene == 1">
                            <!-- 在这个容器当中显示微信扫码登录的页面 -->
                            <div id="login_container">
                            </div>
                            <div class="phone" @click="handler">
                                <p>手机短信验证码登录</p>
                                <svg t="1700204925114" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="4093" width="16" height="16">
                                    <path
                                        d="M820.409449 797.228346q0 25.19685-10.07874 46.866142t-27.716535 38.299213-41.322835 26.204724-50.897638 9.574803l-357.795276 0q-27.212598 0-50.897638-9.574803t-41.322835-26.204724-27.716535-38.299213-10.07874-46.866142l0-675.275591q0-25.19685 10.07874-47.370079t27.716535-38.80315 41.322835-26.204724 50.897638-9.574803l357.795276 0q27.212598 0 50.897638 9.574803t41.322835 26.204724 27.716535 38.80315 10.07874 47.370079l0 675.275591zM738.771654 170.330709l-455.559055 0 0 577.511811 455.559055 0 0-577.511811zM510.992126 776.062992q-21.165354 0-36.787402 15.11811t-15.622047 37.291339q0 21.165354 15.622047 36.787402t36.787402 15.622047q22.173228 0 37.291339-15.622047t15.11811-36.787402q0-22.173228-15.11811-37.291339t-37.291339-15.11811zM591.622047 84.661417q0-8.062992-5.03937-12.598425t-11.086614-4.535433l-128 0q-5.03937 0-10.582677 4.535433t-5.543307 12.598425 5.03937 12.598425 11.086614 4.535433l128 0q6.047244 0 11.086614-4.535433t5.03937-12.598425z"
                                        p-id="4094"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </el-col>
                <!-- 右侧 -->
                <el-col :span="12">
                    <div class="leftContent">
                        <div class="top">
                            <div class="item">
                                <img src="../../assets/images/code_app.png" alt="">
                                <svg t="1698303760127" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="4074" width="16" height="16">
                                    <path
                                        d="M664.250054 368.541681c10.015098 0 19.892049 0.732687 29.67281 1.795902-26.647917-122.810047-159.358451-214.077703-310.826188-214.077703-169.353083 0-308.085774 114.232694-308.085774 259.274068 0 83.708494 46.165436 152.460344 123.281791 205.78483l-30.80868 91.730191 107.688651-53.455469c38.558178 7.53665 69.459978 15.308661 107.924012 15.308661 9.66308 0 19.230993-0.470721 28.752858-1.225921-6.025227-20.36584-9.521864-41.723264-9.521864-63.862493C402.328693 476.632491 517.908058 368.541681 664.250054 368.541681zM498.62897 285.87389c23.200398 0 38.557154 15.120372 38.557154 38.061874 0 22.846334-15.356756 38.156018-38.557154 38.156018-23.107277 0-46.260603-15.309684-46.260603-38.156018C452.368366 300.994262 475.522716 285.87389 498.62897 285.87389zM283.016307 362.090758c-23.107277 0-46.402843-15.309684-46.402843-38.156018 0-22.941502 23.295566-38.061874 46.402843-38.061874 23.081695 0 38.46301 15.120372 38.46301 38.061874C321.479317 346.782098 306.098002 362.090758 283.016307 362.090758zM945.448458 606.151333c0-121.888048-123.258255-221.236753-261.683954-221.236753-146.57838 0-262.015505 99.348706-262.015505 221.236753 0 122.06508 115.437126 221.200938 262.015505 221.200938 30.66644 0 61.617359-7.609305 92.423993-15.262612l84.513836 45.786813-23.178909-76.17082C899.379213 735.776599 945.448458 674.90216 945.448458 606.151333zM598.803483 567.994292c-15.332197 0-30.807656-15.096836-30.807656-30.501688 0-15.190981 15.47546-30.477129 30.807656-30.477129 23.295566 0 38.558178 15.286148 38.558178 30.477129C637.361661 552.897456 622.099049 567.994292 598.803483 567.994292zM768.25071 567.994292c-15.213493 0-30.594809-15.096836-30.594809-30.501688 0-15.190981 15.381315-30.477129 30.594809-30.477129 23.107277 0 38.558178 15.286148 38.558178 30.477129C806.808888 552.897456 791.357987 567.994292 768.25071 567.994292z"
                                        fill="#5D5D5D" p-id="4075"></path>
                                </svg>
                                <p>微信扫一扫关注</p>
                                <p>“快速预约挂号”</p>
                            </div>
                            <div class="item">
                                <img src="../../assets/images/code_login_wechat.png" alt="">
                                <svg t="1698304193274" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="5353" width="16" height="16">
                                    <path
                                        d="M798.723234 174.782745c0-60.576657-49.106418-109.683075-109.683075-109.683075l-354.708628 0c-60.576657 0-109.683075 49.106418-109.683075 109.683075l0 673.980161c0 60.576657 49.106418 109.683075 109.683075 109.683075l354.708628 0c60.576657 0 109.683075-49.106418 109.683075-109.683075L798.723234 174.782745zM264.557398 237.015112l494.256894 0 0 529.049305-494.256894 0L264.557398 237.015112zM334.356091 105.008612 689.016623 105.008612c38.548968 0 69.798692 31.249725 69.798692 69.798692l0 22.298865-494.256894 0 0-22.298865C264.557398 136.25936 295.807123 105.008612 334.356091 105.008612zM689.016623 918.53704 334.356091 918.53704c-38.548968 0-69.798692-31.249725-69.798692-69.798692l0-43.788296 494.256894 0 0 43.788296C758.814292 887.287315 727.564567 918.53704 689.016623 918.53704z"
                                        fill="#272636" p-id="5354"></path>
                                    <path
                                        d="M513.173732 829.943282c-16.70752 0-30.30112 13.5936-30.30112 30.30112 0 16.70752 13.5936 30.30112 30.30112 30.30112s30.299073-13.5936 30.299073-30.30112C543.472805 843.536882 529.881253 829.943282 513.173732 829.943282z"
                                        fill="#272636" p-id="5355"></path>
                                </svg>
                                <p>扫一扫下载</p>
                                <p>“预约挂号”APP</p>
                            </div>

                        </div>
                    </div>
                    <p class="tip">尚医通官方指定平台</p>
                    <p class="tip">快速挂号，安全放心</p>
                </el-col>
            </el-row>
            <template #footer>
                <el-button type="primary" size="default" @click="closeDialog">关闭窗口</el-button>
            </template>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
//引入微信登录扫码的参数请求
import { reqWxLogin } from '@/api/hospital'
//倒计时组件
import CountDown from '@/components/countdown/index.vue'
import { ref, reactive, computed,watch } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import type { WXLoginResponseData } from '@/api/hospital/type'
import useUserStore from '@/store/modules/user'
import { ElMessage } from 'element-plus';

//获取仓库对象
let userStore = useUserStore();
let scene = ref<number>(0);
let form = ref<any>(0);
//定义一个响应式数据控制倒计时组件显示和隐藏
let flag = ref<boolean>(false)
//收集表单数据，收集手机号码
let loginParam = reactive({
    phone: '',//收集手机号码
    code: '' //收集对应的验证码
});
//计算出当前表单元素收集的内容是否是手机号码
let isPhone = computed(() => {
    //手机号码的正则表达式
    const reg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
    //返回相应的 boolean ，true:手机号码，false:不是手机号码
    return reg.test(loginParam.phone);
});
//获取验证吗的回调
const getCode = async () => {
    //倒计时
    flag.value = true;
    //通知仓库储存验证码  
    try {
        await userStore.getCode(loginParam.phone);
        loginParam.code = userStore.code;
        console.log("点击过")
    } catch (error) {

    }
};
//倒计时为0时，通知父组件倒计时组件隐藏
const getFlag = (val: boolean) => {
    flag.value = val;
    console.log(flag.value)
}
const changeScene = async () => {
    scene.value = 1;
    //发请求获取微信扫码二维码需要参数
    //生成微信扫码登录二维码页面
    //还需要携带一个参数：告诉学校服务器用户授权以后重定向项目某一个页面
    let redirect_URL = encodeURIComponent(window.location.origin + '/wxlogin');
    let result: WXLoginResponseData =await reqWxLogin(redirect_URL);
    //@ts-ignore
    //生成二维码的页面
    new WxLogin({
        self_redirect: true,//true:手机点击确认登录后可以在 iframe 内跳转到 redirect_uri
        id: "login_container",//显示二维码容器 ID
        appid: result.data.appid,//应用的唯一标识 appid
        scope: "snsapi_login",//代表微信扫描登录的页面已经授权了，应用授权的作用域
        redirect_uri: result.data.redirectUri,//填写授权回调域的路径，就是用户授权成功以后微信服务器向公司后台推送 code 地址，后台提供
        state: result.data.state,//state 就学校服务器重定向地址，携带用户的信息，后台给
        style: "black",//文字颜色 
        href: "" //自定义样式链接       
    });
};


//点击登录按钮的回调

const login = async () => {
    //保证表单校验亮相都符合条件
    await form.value.validate();
    //发起登录请求
    //登录请求成功，顶部组件需要展示用户名字，对话框关闭
    //登录请求失败，弹出对应登录失败的错误信息
    userStore.userLogin(loginParam);
    try {
        await userStore.userLogin(loginParam)
        userStore.visiable = false;
    } catch (error) {
        ElMessage({
            type: 'error',
            massage: (error as Error).message
        })
    }
}
//自定义校验规则
const validatorPhone = (rule: any, value: any, callBack: any) => {
    //rule：极为表单校验贵啊呃对象
    //value:及为当前文本内容
    //callback：回调函数
    const reg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
    if (reg.test(value)) {
        callBack();
    } else {
        callBack(new Error("请输入正确的手机号码格式"))
    }
};
const validatorCode = (rule: any, value: any, callBack: any) => {
    if (/^\d{6}$/.test(value)) {
        callBack();
    } else {
        callBack(new Error("请输入正确的格式"))
    }
};
//表单校验规则
const rules = {
    //required:代表当前字段无比进行校验
    //message:代表的校验错误的提示信息
    //trigger：代表表单校验触发的时机 change：文本发生变化的时候进行校验 blur：失去焦点的时候触发校验
    //代表的是最小位数，max代表的是最大位数
    // phone:[
    //     {required:true,message:'手机号码必须为11位',trigger:'change', min:11}
    // ],
    // code:[
    //     {required:true,message:'验证码必须为6位',trigger:'blur', min:6,max:6}
    // ]
    phone: [{ trigger: 'change', validator: validatorPhone }],
    code: [{ trigger: 'change', validator: validatorCode }]
}

// //对话框关闭的事件回调
// const close = () =>{
//     //清空手机的数据
//     Object.assign(loginParam,{phone:'',code:''});
//     //清除上一次校验结果
//     form.value.resetFields();
// }


//关闭窗口的回调
const closeDialog = () => {
    userStore.visiable = false;
    Object.assign(loginParam, { phone: "", code: "" });
    //清楚手机的数据
    Object.assign(loginParam, { phone: '', code: '' });
    //清除上一次校验结果
    form.value.resetFields();
}
//点击手机短信验证码盒子的回调
const handler = () => {
    scene.value = 0;

}
//监听场景数据
watch(() => scene.value,(val:number)=>{
    if(val===1){
        userStore.queryState();
    }
})
</script>
<script lang="ts">
export default {
    name: 'Login'
}

</script>

<style scoped lang="scss">
.login_container {

    //深度选择器
    ::v-deep(.el-dialog__body) {
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }

    .login {
        padding: 20px;
        border: 1px solid #ccc;

        .el-form-item {
            margin-top: 10px;
        }

        .webchat {
            display: flex;
            flex-direction: column;
            align-items: center;

            .phone {
                display: flex;
                flex-direction: column;
                align-items: center;

                p {
                    margin: 10px 0;
                }
            }
        }
    }

    .bottom {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #fff;

        p {
            margin: 10px 0px;
        }
    }

    .leftContent {
        .top {
            height: 200px;
            position: relative;
            display: flex;
            justify-content: space-around;

            .item {
                display: flex;
                flex-direction: column;
                align-items: center;

                svg {
                    height: 10px;
                }

                img {
                    width: 130px;
                    height: 130px;
                }

                p {
                    margin: 5px 0px;
                }
            }
        }
    }

    .tip {
        text-align: center;
        margin: 20px 0px;
        font-size: 20px;
        font-weight: 900;
    }
}
</style>
