<template>
    <div class="level">
        <h1>医院</h1>
        <div class="content">
            <div class="left">等级：</div>
            <ul class="hospital">
                <li :class="{active:activeFlag == ''}"
                    @click="changeLevel('')">
                    全部
                </li>
                <li v-for="level in levelArr" 
                :key="level.value" 
                @click="changeLevel(level.value)" 
                :class="{active:activeFlag == level.value}">
                {{ level.name }}
            </li>
            </ul>
        </div>
    </div>
</template>
<script setup lang="ts">

import type { HospitalLevelAndRegionResponseData, HospitalLevelAndRegionArr } from '@/api/home/type';
import { reqHospitalLevelAndRegion } from '@/api/home';
import { onMounted, ref } from 'vue';


//定义一个数组，存储医院等级
let levelArr = ref<HospitalLevelAndRegionArr>([]);
    //控制医院等级高亮的响应式数据
    let activeFlag = ref<string>('');
onMounted(() => {
    getLevel();
})
//获取医院等级
const getLevel = async () => {
    let result: HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion('HosType')
    //存储医院等级数据
    if (result.code == 200) {
        levelArr.value = result.data;
    }
}
//点击等级的按钮回调
const changeLevel = (level: string) => {
     //高亮的响应式数据存储 level 数值
     activeFlag.value = level
    //触发自定义事件：将医院等级参数回传给父组件
    $emit('getLevel', level);
}
    //父组件定义的事件
let $emit = defineEmits(['getLevel'])

</script>
<style lang="scss" scoped>
.level {
    margin-top: 10px;
    color: #7f7f7f;

    h1 {
        font-weight: 900;
        margin: 10px 10px;

    }

    .content {
        display: flex;
        margin-left: 10px;
        margin-top: 20px;

        .left {
            margin-right: 10px;

        }

        .hospital {
            display: flex;

            li {
                margin-right: 10px;

                &.active {
                    color: #55a6fe;
                }
            }

            li:hover {
                color: #55a6fe;
                cursor: pointer;
            }
        }
    }
}
</style>