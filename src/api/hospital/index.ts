//引入二次封装的 axios
import request from "@/utils/request";
import type {HosPitalDetail, DeparmentResponseData,
    LoginData, UserLoginResponseData,
    WXLoginResponseData, HospitalWorkData,
    DoctorResponseData, UserResponseData,
    DoctorInfoData
   } from './type';

enum API {
    HOSPITALDETAIL_URL = '/hosp/hospital/',
    //获取某一个医院的科室数据
    HOSPITALDEPARMENT_URL = '/hosp/hospital/department/',
    //获取验证码接口
    GETTUSERCODE_URL = '/sms/send/',
    //用户登录接口
    USERLOGIN_URL = '/user/login',
    //获取微信扫描登录需要的参数接口
    WXLOGIN_URL = '/user/weixin/getLoginParam/',
    //获取某一个医院某一个科室预约挂号的数据
    HOSPITALWORK_URL = '/hosp/hospital/auth/getBookingScheduleRule/',
    //获取某一个医院某一个科室某一天相应医生的排班数据
    HOSPITALDOCTOR_URL = '/hosp/hospital/auth/findScheduleList/', 
    //获取某一个账号下就诊人信息
    GETUSER_URL = '/user/patient/auth/findAll',
    //获取挂号医生的信息
    GETDOCTOR_URL = '/hosp/hospital/getSchedule/'
}


//获取医院详情的接口
export const reqHospitalDetail = 
    (hoscode:string) => 
    request.get<any, HosPitalDetail>(API.HOSPITALDETAIL_URL + hoscode);
//获取医院科室的接口
export const reqHospitalDeparment = 
    (hoscode:string) => 
    request.get<any, DeparmentResponseData>(API.HOSPITALDEPARMENT_URL + hoscode);


//获取验证码接口
export const reqCode  = 
    (phone:string) =>
    request.get<any,any>(API.GETTUSERCODE_URL + phone);
//用户登录接口
export const reqUserLogin =  
    (data:LoginData) => 
    request.post<any, UserLoginResponseData>(API.USERLOGIN_URL, data);

// //获取微信扫描登录生成二维码需要的参数接口
export const reqWxLogin = 
    (wxRedirectUri: string) => 
    request.get<any, WXLoginResponseData>(API.WXLOGIN_URL + `?wxRedirectUri=${wxRedirectUri}`);   

//获取预约挂号的数据
export const reqHospitalWork = (page:number, limit:number, hoscode:string, depcode:string) => 
    request.get<any, HospitalWorkData>(API.HOSPITALWORK_URL + `${page}/${limit}/${hoscode}/${depcode}`);

//获取医生排班的数据
export const reqHospitalDoctor = (hoscode:string, depcode:string, workDate:string) => 
    request.get<any, DoctorResponseData>(API.HOSPITALDOCTOR_URL + `${hoscode}/${depcode}/${workDate}`);

//获取某一个账号下就诊人信息
export const reqGetUser = () =>
    request.get<any, UserResponseData>(API.GETUSER_URL);

//获取挂号医生的信息
export const reqDoctorInfo = (scheduleId:string) =>
    request.get<any, DoctorInfoData>(API.GETDOCTOR_URL + scheduleId);