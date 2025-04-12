//pinia 仓库写法：组合式 API，选择式 API
import {defineStore} from 'pinia';
//引入医院详情数据请求方法
import {reqHospitalDetail , reqHospitalDeparment} from '@/api/hospital'
//引入医院详情数据的 TS 类型
import type {HosPitalDetailData} from '@/api/hospital/type';
import type {HosPitalDetail, DeparmentResponseData,DeparmentArr} from '@/api/hospital/type';
import type {DetailState} from './interface/'
const useDetailStore = defineStore('Detail',{
    state: ():DetailState => {
        return {
          //医院详情的数据
          hospitalInfo : ({} as HosPitalDetail), //可以看一下,问问ai
          //存储医院科室的数据
          deparmentArr:[]
        }
    },
    actions:{
        async getHospital(hoscode:string){
            let result:HosPitalDetail = await reqHospitalDetail(hoscode);
            console.log(result);
            if(result.code == 200) {
                //医院详情的数据
                this.hospitalInfo = result.data;
            }
        },
        //获取某一个医院科室的数据
        async getDeparment(hoscode:string) {
            let result:DeparmentResponseData = await reqHospitalDeparment(hoscode);
            

            if(result.code == 200) {
                this.deparmentArr = result.data;
            }
        }
    },
    getters:{

    }
});
export default useDetailStore 