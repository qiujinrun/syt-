//定义用户相关的仓库
import { reqCode } from '@/api/hospital';
import { defineStore } from 'pinia'
import type { LoginData,UserLoginResponseData,UserInfo } from '@/api/hospital/type';
import { reqUserLogin } from '@/api/hospital';
import type {UserState} from './interface';
import { GET_TOKEN,REMOVE_TOKEN,SET_TOKEN } from '@/utils/user';

const useUserStore = defineStore('User', {
    state: ():UserState => {
        return {
            visiable: false,
            code:'',
            userInfo: JSON.parse(GET_TOKEN() as string) || ({} as UserInfo)
        }
    },
    actions: {
        async getCode(phone: string) {
            //服务器携带号码获取验证码
            let result: any = await reqCode(phone);
            if (result.code == 200) {
                this.code = result.data;
                console.log(result)
            }

            else{
                return Promise.reject(new Error(result.message));
            }
        },
        //用户手机号码登录的方法
        async userLogin(logindata:LoginData){
            let result:UserLoginResponseData = await reqUserLogin(logindata);
            console.log("登录成功")
            if(result.code==200){
                this.userInfo = result.data;
                //本地存储用户信息
                SET_TOKEN(JSON.stringify(this.userInfo));
                return 'ok';
            }else{
                return Promise.reject(new Error(result.message));
            }
        },
        //退出登录方法
        logout(){
            //清空仓库的数据
            this.userInfo = {name:'',token:''};
            //清空本地数据
            REMOVE_TOKEN();
        },
        //查询微信扫码的结果（看本地存储是否存储用户数据）
        queryState(){
            //开启定时器，每隔一段时间问本地存储是否拥有用户信息
            //有，关闭对话框
            //开启定时器每隔一段时间
            let timer = setInterval(()=>{
                if(GET_TOKEN()){
                    //关闭对话框
                    this.visiable = false;
                    this.userInfo = JSON.parse(GET_TOKEN() as string);
                    clearTimeout(timer);
                }
            },1000);

        }
    },
    getters: {

    },

})
export default useUserStore;  