<template lang="">
    <div>
        
    </div>
</template>
<script setup lang="ts">
//获取用户信息
import { SET_TOKEN } from '@/utils/user';
import { useRoute } from 'vue-router';
//获取路由对象
let $route = useRoute();

// console.log($route.query)
SET_TOKEN(JSON.stringify($route.query))
//次路由组件代码执行；授权成功
let html:any = document.querySelector('html');
html.style.display = 'none';
</script>
<style scoped lang="">
    
</style>