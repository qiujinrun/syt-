<template>
    <div class="top">
        <div class="content">
            <div class="left" @click="goHome">
                <img src="../../assets/images/logo.png" alt="">
                <p>尚医通 预约挂号平台</p>
            </div>
            <div class="right">
                <p class="help">帮助中心</p>
                <p class="login" @click="login" v-if="!userStore.userInfo.name">登录/注册</p>
                <el-dropdown v-else>
                    <span class="el-dropdown-link">
                    {{ userStore.userInfo.name }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                    </span>
                    <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="goUser('/user/certification')">实名认证</el-dropdown-item>
                        <el-dropdown-item @click="goUser('/user/order')">挂号订单</el-dropdown-item>
                        <el-dropdown-item @click="goUser('/user/pitient')">就诊人管理</el-dropdown-item>
                        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" >
import { ArrowDown } from '@element-plus/icons-vue'
import useUserStore from '@/store/modules/user'
//获取仓库对象
let userStore = useUserStore();

 //引入 路由
 import { useRouter } from 'vue-router';
  //创建路由器对象
  let $router = useRouter();

  //回到首页
  const goHome = () => {
    //编程式导航调转到首页
    $router.push({path:'/home'});
  };
//点击登录注册的事件
const login = () =>{
    userStore.visiable = true;
    console.log(userStore.visiable)
}
//退出登录按钮的回调
const logout = () =>{
    //通知pinia仓库清除用户的相关信息
    userStore.logout();
    //编程时导航跳转到首页
    $router.push({path:'/home'});
}
const goUser = (path:string) =>{
    $router.push({path:path})
}

</script>
<style lang="scss">
    .top{
        position: fixed;
        z-index: 1;
        width: 100%;
        height: 70px;
        background: #fff;
        display: flex;
        justify-content: center;
        .content{
            width: 1200px;
            height: 70px;
            background: #fff;
            display: flex;
            justify-content: space-between;

        }
        .left{
            display: flex;
            justify-content: center;
            align-items: center;
            p:hover{
                cursor: pointer;
            }
            img{
            width: 50px;
            height: 50px;
            margin-right: 10px;
            }
            p{
            font-size: 20px;
            color: #55a6fe;
        }
        }
        .right{
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            color: #bbb;
            .help{
                margin-right: 10px;
            }
            p:hover{
                cursor: pointer;
            }
        }
    }
</style>