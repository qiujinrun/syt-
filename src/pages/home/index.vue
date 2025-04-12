<template>
  <div>
    <!-- 轮播图的结构 -->
    <Carousel />
    <!-- 搜索框结构 -->
    <Search />
    <!-- 底部展示医院的结构 -->
    <el-row gutter="20">
      <el-col :span="20">
        <!-- 等级子组件 -->
        <Level @getLevel="getLevel1"  />
        <!-- 地区 -->
        <Region @getRegion="getRegion1"/>
        <!-- 展示医院的结构 -->
        <div class="hospital" v-if="hasHospitalArr.length >0">
          <Card class="item" v-for="(item, index) in hasHospitalArr" :key="index" :hospitalInfo="item" />
        </div>        
        <el-empty v-else description="没有医院" />

        <!-- 分页器 -->
        <el-pagination 
                        v-model:current-page="pageNo"
                        v-model:page-size="pageSize"
                        :page-sizes="[10,20,30,40]"
                        :background="true"
                        layout="prev, pager, next, jumper, ->, sizes, total"
                        :total="total"
                        @current-change="currentChange"
                        @size-change = "sizeChange"
                    />
      </el-col>
      <el-col :span="4">
        <Tip />
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
//引入组合式API函数
import { onMounted, ref } from 'vue';
import { reqHospital } from '@/api/home/index';
import Carousel from './carousel/index.vue';
import Search from './search/index.vue';
//引入首页等级
import Level from './level/index.vue'
//引入地区组件

import Region from './region/index.vue'
//展示医院的组件
import Card from './card/index.vue'
import { Content, HospitalResponseData } from '@/api/home/type';
import Tip from '@/pages/home/tip/index.vue'


//分页器需要的数据
// import { ref } from 'vue';
//分页器yema
let pageNo = ref<number>(1)
//一页展示多少数据
let pageSize = ref<number>(10)
//存储已有的医院数据
let hasHospitalArr = ref<Content>([])
//存储医院总个数
let total = ref<number>(0)
//组件挂载完毕，发一次请求
//存储医院等级的响应式数据
let hostype = ref<string>('');
//存储医院地区的响应式数据
let districtCode = ref<string>('');



onMounted(() => {
  getHospitalInfo();
});
//分页器页码发生变化的回调
const currentChange = () => {
  getHospitalInfo();
}
//分页器下拉菜单发生变化
const sizeChange = () => {
  getHospitalInfo();
}

//获取已有的数据
const getHospitalInfo = async () => {
  //获取医院的数据：默认获取第一也，一页十个医院的数据
  let result: HospitalResponseData = await reqHospital(pageNo.value, pageSize.value,hostype.value,districtCode.value)
  if (result.code == 200) {
    //存储医院已有的数据
    hasHospitalArr.value = result.data.content;
    //存储医院的总个数
    total.value = result.data.totalElements;
  }
}

//提供给子组件的自定义事件：获取儿子给父组件传递过来的等级参数
const getLevel1 = (level: string) => {
  //收集等级参数
  hostype.value = level;
  //再次发送请求
  getHospitalInfo();
}
//提供给子组件的自定义事件：获取儿子给父组件传递过来的等级参数
const getRegion1 = (region: string) => {
  //收集等级参数
  districtCode.value = region;
  //再次发送请求
  getHospitalInfo();
}

</script>


<style scoped lang="scss">
.hospital {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .item {
    width: 48%;
    margin: 10px 10px;
  }
}
</style>