<template>
    <div class="user">
        <!-- 左侧显示导航区域 -->
        <div class="menu">
            <div class="top">
                <el-icon><HomeFilled /></el-icon>
                <span>/ 会员中心</span>
            </div>
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
                <el-menu-item index="/user/certification" @click="goUser('/user/certification')">
                    <el-icon><icon-menu /></el-icon>
                    <span>实名认证</span>
                </el-menu-item>
                <el-menu-item index="/user/order" @click="goUser('/user/order')">
                    <el-icon>
                        <document />
                    </el-icon>
                    <span>挂号订单</span>
                </el-menu-item>
                <el-menu-item index="/user/pitient" @click="goUser('/user/pitient')">
                    <el-icon>
                        <setting />
                    </el-icon>
                    <span>就诊人管理</span>
                </el-menu-item>
                <el-menu-item index="/user/profile" @click="goUser('/user/profile')">
                    <el-icon>
                        <InfoFilled />
                    </el-icon>
                    <span>账号信息</span>
                </el-menu-item>
                <el-menu-item index="/user/feedback" @click="goUser('/user/feedback')">
                    <el-icon>
                        <search />
                    </el-icon>
                    <span>意见反馈</span>
                </el-menu-item>
            </el-menu>
        </div>
        <!-- 右侧展示会员中心二级路由组件区域 -->
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
//左侧菜单需要用到的图标
import {
    Document,
    Menu as IconMenu,
    Setting,
    InfoFilled,
    Search,
    HomeFilled
} from '@element-plus/icons-vue';
import { useRouter, useRoute } from 'vue-router';
//获取路由器对象
let $router = useRouter();
//获取路由对象
let $route = useRoute();
//点击左侧菜单就行路由跳转
const goUser = (path: string) => {
    $router.push({path: path});
};
</script>

<style scoped lang="scss">

.user {
    display: flex;

    .menu {
        flex: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        .top{
            position: relative;
            z-index: 0;
            height: 35px;
            span{
                height: 35px;
            }
        }
    }

    .content {
        flex: 8;
    }
}
</style>