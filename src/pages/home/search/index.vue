<template lang="">
    <div class="search">
        <el-autocomplete
        trigger-on-focus="false"
        v-model="hosname"
        :fetch-suggestions="fetchData"
        clearable
        class="inline-input w-50"
        placeholder="请输入医院名称"
        @select="goDetail"
        style="width: 600px;"
        ></el-autocomplete>

      <el-button type="primary" size="default" :icon="Search">搜索</el-button>
    </div>
</template>
<script setup lang="ts">
//引入element-plus 图标
    import { Search } from '@element-plus/icons-vue'
    //引入路由
    import { useRouter } from 'vue-router';
    import {ref} from 'vue';
    //引入请求方法
    import { reqHospitalInfo } from '@/api/home/index';
    import type { HospitalInfo,Content } from '@/api/home/type';


    //收集搜索的关键字(医院的名字)
    let hosname = ref<string>('')
    //创建路由器对象
    let $router = useRouter();


    //顶部组件的回调
    const fetchData = async(keyword:string,cb:any) =>{
        //当用户输入完关键字此函数会执行一次,发请求获取需要展示的数据即可
        let result:HospitalInfo = await reqHospitalInfo(keyword)
        //整理数据，变成人家组件需要的数据格式
        let showData = result.data.map(item => {
            return {
                value : item.hosname,//展示医院的名字
                hostCode: item.hoscode//存储医院的编码
            }
        })
        //给组件展示的户数
        cb(showData)
        
}    
    //点击某一个推荐项
    const goDetail = (item:any) => {
        //医院编码
        //console.log(item.hostCode);
        //点击推荐项，进入医院详情页，将来需要携带 query参数(医院的编码)
        $router.push({path:'/hospital/register',query:{hoscode:item.hostCode}})
    }
</script>
<script lang="ts">
 export default {
    name:'Search'
}
</script>



<style  scoped  lang="scss">
    .search{
       width: 100%;
       height: 50px; 
       display: flex;
       justify-content: center;
       align-items: center;
        margin-top: 10px;
        ::v-deep .el-input__inner{
            width: 300px;
        }
    }
</style>