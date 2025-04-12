<template lang="">
    <div>
        <span>获取验证码{{time}}s</span>
    </div>
</template>
<script setup lang="ts">
import { flag } from '@/components/login/index.vue';
import { ref,watch } from 'vue';
let time = ref<number>(5);
//接受父组件传来的props->flag：用于控制计数器组件显示和隐藏
let props = defineProps(['flag'])
let $emit = defineEmits(['getFlag'])
//监听父组件传递过来props数据变化
watch(
    () => props.flag, 
    ()=> {
        //开启定时器
        let timer = setInterval(() => {
            time.value--;
            if(time.value == 0) {
                //通知父组件倒计时模式结束
                $emit('getFlag', false);
                //清除定时器
                clearInterval(timer);
                // console.log(123)
            }
        },1000);
    },
    {
        immediate:true
    }
);
</script>
<style lang="">
    
</style>