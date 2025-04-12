<template>
    <div class="wrap">
        <!-- 顶部结构 -->
        <div class="top">
            <div class="hosname">{{ workData.baseMap?.hosname }}</div>
            <div class="line"></div>
            <div>{{ workData.baseMap?.bigname }}</div>
            <div class="dot">.</div>
            <div class="hosdeparment">{{ workData.baseMap?.depname }}</div>
        </div>
        <!-- 中间展示日期的结构 -->
        <div class="center">
            <h1 class="time">{{ workData.baseMap?.workDateString }}</h1>
            <div class="container">
                <div class="item" :class="{active:item.status == -1 || item.availableNumber == -1,cur:item.workDate == workTime.workDate }" 
                v-for="item in workData.bookingScheduleList" 
                :key="item"
                @click="changeTime(item)"
                >
                    <div class="top1">{{ item.workDate }} &nbsp; {{ item.dayOfWeek }}</div>
                    <div class="bottom">
                        <div v-if="item.status == -1">停止挂号</div>
                        <div v-if="item.status == 0">
                            {{ item.availableNumber == -1 ? '约满了' : `有号(${item.availableNumber})` }}
                        </div>
                        <div v-if="item.status == 1">即将放号</div>
                    </div>
                </div>
            </div>
            <el-pagination layout="prev, pager, next" 
            v-model:current-page="pageNo"
            :total="workData.total" 
            @current-change="fetchWorkData" />
            </div>
        <!-- 底部展示医生的结构 -->
        <div class="bottom">
            <!-- 展示即将放号的时间 -->
            <div class="will" v-if="workTime.status == 1">
                <span class="time">2023年11月30日10:15:21</span>
                <span class="willText">放号</span>
            </div>
            <!-- 展示医生的结构：上午、下午 -->
            <div class="doctor" v-else>
                <!-- 上午 -->
                <div class="moring">
                    <!-- 顶部文字的提示 -->
                    <div class="tip">
                        <svg t="1701310807821" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4675" width="32" height="32"><path d="M904.101037 676.946871H118.670712c-15.461511 0-28.105271-12.535384-28.105271-28.033021 0-15.461511 12.643759-28.105271 28.105271-28.10527h785.430325c15.461511 0 28.105271 12.643759 28.105271 28.10527s-12.607634 28.033021-28.105271 28.033021z m-56.029916-324.980738c-11.018133 10.945883-28.719396 10.945883-39.665279 0-11.018133-10.945883-11.018133-28.755521 0-39.665279l39.665279-39.665279a27.97522 27.97522 0 0 1 39.593029 0 27.93187 27.93187 0 0 1 0 39.665279l-39.593029 39.665279z m-62.279545 212.776406c-26.082269-128.027094-138.683977-224.444789-274.441826-224.44479-135.649474 0-248.287307 96.417696-274.369576 224.44479H177.915755c21.602766-158.263741 162.454244-280.583081 333.433995-280.583081 171.088125 0 311.903478 122.31934 333.506244 280.583081h-59.064418z m-274.441826-336.612997c-15.461511 0-28.033021-12.535384-28.033021-28.10527V143.95823c0-15.461511 12.535384-28.105271 28.033021-28.10527 15.569886 0 28.105271 12.643759 28.10527 28.10527v56.029916c0 15.606011-12.535384 28.141396-28.10527 28.141396zM174.700628 351.966133L135.035349 312.264729c-10.945883-10.945883-10.945883-28.755521 0-39.665279 11.018133-10.945883 28.719396-10.945883 39.665279 0l39.665279 39.665279a27.93187 27.93187 0 0 1 0 39.665279c-10.909758 10.982008-28.647146 10.982008-39.665279 0.036125z m-28.033021 381.119029h729.40041c15.497636 0 28.033021 12.535384 28.03302 28.03302a28.033021 28.033021 0 0 1-28.03302 28.033021H146.667607c-15.497636 0-28.033021-12.535384-28.03302-28.033021 0.036125-15.497636 12.571509-28.033021 28.03302-28.03302z m84.171312 112.168207h561.093911c15.497636 0 28.033021 12.535384 28.033021 28.033021 0 15.569886-12.535384 28.105271-28.033021 28.10527H230.838919c-15.497636 0-28.033021-12.535384-28.03302-28.10527 0-15.497636 12.535384-28.033021 28.03302-28.033021z" fill="#1296db" p-id="4676"></path></svg>
                        <span class="text">上午号源</span>
                    </div>
                    <!-- 每一个医生的信息 -->
                    <div class="doc_info" v-for="doctor in morningArr" :key="doctor.id">
                        <!-- 展示医生的名字，技能 -->
                        <div class="left">
                            <div class="info">
                                <span>{{ doctor.title }}</span>
                                <span>|</span>
                                <span>{{ doctor.docname}}</span>
                            </div>
                            <div class="skill">
                                {{ doctor.skill }}
                            </div>
                        </div>
                        <!-- 右侧区域展示挂号的钱数 -->
                        <div class="right">
                            <div class="money">￥{{ doctor.amount }}</div>
                            <el-button type="primary" size="default" @click="goStep2(doctor)">{{ doctor.availableNumber }}</el-button>
                        </div>
                    </div>
                </div>
                <!-- 下午 -->
                <div class="moring">
                    <!-- 顶部文字的提示 -->
                    <div class="tip">
                        <svg t="1701327815387" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6433" width="32" height="32"><path d="M935.168 393.8304c-18.688-20.0704-42.752-22.8864-63.9488-22.8864h-80.4352V346.624a25.6 25.6 0 0 0-25.6-25.6H98.7136a25.6 25.6 0 0 0-25.6 25.6v176.64a348.16 348.16 0 0 0 348.16 347.8528h21.9136a347.1872 347.1872 0 0 0 266.752-124.8768c78.2848-10.24 139.9808-39.7312 183.552-88.4736 46.6432-52.48 60.6208-113.92 63.9488-156.0064 4.352-52.5312-2.7648-86.784-22.272-107.9296z m-492.2368 426.0864h-21.9136a296.96 296.96 0 0 1-296.704-296.6528V372.224h615.2704v151.04a295.2704 295.2704 0 0 1-58.2144 176.3328 25.6 25.6 0 0 0-13.1584 16.384 296.0896 296.0896 0 0 1-225.28 103.936z m463.5648-322.56c-3.8912 47.616-27.4432 152.1664-156.2112 188.6208a346.0096 346.0096 0 0 0 40.4992-162.7136V422.144h80.4352c14.6944 0 22.0672 1.792 26.3168 6.4 4.9664 5.4272 12.8 21.5552 8.96 68.8128z" fill="#1296db" p-id="6434"></path><path d="M658.176 502.6816a25.6 25.6 0 0 0-27.0848 24.0128c-0.256 4.8128-8.8064 118.7328-128 145.4592a25.6 25.6 0 0 0 5.5808 50.5856 26.7264 26.7264 0 0 0 5.632-0.6144c125.952-28.3136 164.864-138.24 167.8336-192.5632a25.6 25.6 0 0 0-23.9616-26.88zM272.4864 188.8256c-20.7872 20.48-55.552 54.8864-28.7744 109.7216a25.6 25.6 0 0 0 22.9888 14.3872 24.9856 24.9856 0 0 0 11.2128-2.6112 25.6 25.6 0 0 0 11.776-34.2016c-9.5744-19.6608-4.6592-27.6992 18.7904-50.8928 14.0288-13.824 29.9008-29.5424 34.2016-52.0192C353.28 118.1696 291.84 77.5168 284.7744 73.0624a25.6 25.6 0 0 0-27.4432 43.2128c12.3392 7.936 38.2464 30.72 35.072 47.2576-1.3312 6.912-10.8032 16.2304-19.9168 25.2928zM428.5952 188.8256c-20.7872 20.48-55.6032 54.8864-28.8256 109.7216a25.6 25.6 0 1 0 46.08-22.4256c-9.5744-19.6608-4.6592-27.6992 18.7904-50.8928 14.0288-13.824 29.9008-29.5424 34.2528-52.0192 10.5984-55.04-50.8928-95.6928-57.9584-100.1472a25.6 25.6 0 1 0-27.3408 43.264c13.6704 8.704 38.0416 31.4368 35.0208 47.2064-1.4336 6.912-10.9056 16.2304-20.0192 25.2928zM584.6528 188.8256c-20.7872 20.48-55.6032 54.8864-28.8256 109.7216a25.6 25.6 0 0 0 23.04 14.3872 25.9584 25.9584 0 0 0 11.2128-2.56 25.6 25.6 0 0 0 11.776-34.2528c-9.6256-19.6608-4.7104-27.6992 18.7904-50.8928 13.9776-13.824 29.8496-29.5424 34.2016-52.0192 10.752-55.04-50.688-95.6928-57.9584-100.1472a25.6 25.6 0 0 0-27.4432 43.2128c12.3392 7.936 38.2976 30.72 35.1232 47.2576-1.3312 6.912-10.6496 16.2304-19.9168 25.2928zM756.2752 890.0608H128.6144a25.6 25.6 0 0 0 0 51.2h627.6608a25.6 25.6 0 0 0 0-51.2z" fill="#1296db" p-id="6435"></path></svg>
                        <span class="text">下午号源</span>
                    </div>
                    <!-- 每一个医生的信息 -->
                    <div class="doc_info" v-for="doctor in afterArr" :key="doctor.id">
                        <!-- 展示医生的名字，技能 -->
                        <div class="left">
                            <div class="info">
                                <span>{{ doctor.title }}</span>
                                <span>|</span>
                                <span>{{ doctor.docname }}</span>
                            </div>
                            <div class="skill">
                                {{ doctor.skill }}
                            </div>
                        </div>
                        <!-- 右侧区域展示挂号的钱数 -->
                        <div class="right">
                            <div class="money">￥{{ doctor.amount }}</div>
                            <el-button type="primary" size="default" @click="goStep2(doctor)">{{ doctor.availableNumber }}</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { reqHospitalWork,reqHospitalDoctor} from '@/api/hospital';
import { useRoute,useRouter } from 'vue-router';
import type { DocArr,HospitalWorkData, DoctorResponseData, Doctor } from '@/api/hospital/type';
import { composeEventHandlers } from 'element-plus/es/utils/index.mjs';

let $route = useRoute();
let $router = useRouter();
let pageNo = ref<number>(1);
let limit = ref<number>(6);
//存储医院科室挂号的数据
let workData:any = ref<any>({})
//存储排版日期
let workTime:any = ref({})
//存储排版医生的数据
let docArr = ref<DocArr>()
//请求
onMounted(() => {
    fetchWorkData();
    getDoctorWorkData();

});
//获取挂号数据
const fetchWorkData =async () =>{
    let result:HospitalWorkData = await reqHospitalWork(pageNo.value,limit.value,$route.query.hoscode as string,$route.query.depcode as string);
    if(result.code==200){
        workData.value = result.data;
        // console.log(result)
        //存储第一天日期的数据
        workTime.value = workData.value.bookingScheduleList[0];
    }
}
//获取某一天医生排班的数据
const getDoctorWorkData = async() =>{
    //医院编号
    let hoscode:string = $route.query.hoscode as string
    //科室的编号
    let depcode:string = $route.query.depcode as string;
    //时间
    let workDate:string =  workTime.value.workDate;
    //获取排版医生的数据
    let result:DoctorResponseData = await reqHospitalDoctor(hoscode,depcode,workDate);
    if(result.code==200){
        docArr.value = result.data;
        // console.log(result)
    }
}
//点击顶部某一天的时候触发回调
const changeTime = (item:any) =>{
    //存储用户选择那一天的数据
    workTime.value = item;
    getDoctorWorkData();
}
//计算上午排版的数据
let morningArr = computed(() =>{
    return docArr.value?.filter((doc:Doctor)=>{
        return docArr.workTime==0;
    })
    
})
//下午排班的数据
let afterArr = computed(()=>{
    return docArr.value?.filter((doc:Doctor)=>{
        return docArr.workTime==1;
    })
})

//路由跳转进入到选择就诊人的页面
const goStep2 = (doctor: Doctor) => {
    //编程式导航进行路由跳转且携带医生的 ID
    $router.push({path:'/hospital/register_step2', query:{docId: doctor.id}});
}
</script>
<script lang="ts">
 export default {
    name:'register'
}
</script>

<style scoped lang="scss">
.wrap {
    .top {
        position: relative;
        display: flex;
        color: #7f7f7f;
        z-index: 0;

        .line {
            width: 1px;
            height: 20px;
            background-color: skyblue;
            margin: 0px 5px;
        }

        .dot {
            margin: 0 5px;
            color: skyblue;
        }
    }

    .center {
        margin: 20px 0px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .time {
            font-weight: 900;
        }

        .container {
            width: 100%;
            display: flex;
            margin: 30px 0px;

            .item {
                flex: 1;
                width: 100%;
                border: 1px solid skyblue;
                margin: 0px 5px;
                transition: all 0.5s;

                &.active {
                    border: 1px solid #ccc;
                    color: #7f7f7f;
                    
                    .top1 {
                        background: #ccc;
                    }
                }

                &.cur {
                    transform: scale(1.1);
                }

                .top1 {
                    background: #e8f2ff;
                    height: 30px;
                    width: 100%;
                    text-align: center;
                    line-height: 30px;
                }

                .bottom {
                    width: 100%;
                    height: 60px;
                    text-align: center;
                    line-height: 60px;
                    // display: block;
                    // justify-content:normal ;
                }
            }
        }
    }

    .bottom {
        display: block;
        justify-content:normal ;
        .will {
           text-align: center; 
           font-size: 30px;
           font-weight: 900;

           .time {
             color: red;
           }

           .willText {
            color: skyblue;
           }
        }

        .doctor {
            .moring {
                .tip {
                    display: flex;
                    align-items: center;
                    background-color:#fff;

                    .text {
                        color: #7f7f7f;
                        font-weight: 900;
                    }
                }

                .doc_info {
                    display: flex;
                    justify-content: space-between;
                    margin: 10px 0px;
                    border-bottom: 1px solid #ccc;

                    .left {
                        .info {
                            color: skyblue;
                            margin: 10px 0;
                            span {
                                margin: 0 5px;
                                font-size: 18px;
                                font-weight: 900;
                            }
                        }

                        .skill {
                            margin: 10px 0px;
                            color: #7f7f7f;
                        }
                    }

                    .right {
                        width: 150px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .money {
                            color: #7f7f7f;
                            font-weight: 900;
                        }
                    }
                }
            }
        }
    }
}
</style>