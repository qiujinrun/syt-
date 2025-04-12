<template>
  <div class="container">
    <HospitalTop></HospitalTop>
    <div class="content">
      <!-- 路由展示的区域 -->
      <router-view></router-view>
    </div>
    <HospitalBottom></HospitalBottom>
    <Login v-if="userStore.visiable"/>
  </div>

</template>
<script setup lang="ts">
//引入用户仓库
import useUserStore from '@/store/modules/user'
let userStore = useUserStore();

</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    margin-top: 70px;
    width: 1200px;
    min-height: 1000px;
  }
}
</style>