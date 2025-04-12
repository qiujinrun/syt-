export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
  }
  
  //代表医院详情的数据
  export interface HosPitalDetailData {
    "bookingRule": {
      "cycle": number,
      "releaseTime": string,
      "stopTime": string,
      "quitDay": number,
      "quitTime": string,
      "rule": string[]
    },
    "hospital": {
      "id": string,
      "createTime": string,
      "updateTime": string,
      "isDeleted": number,
      "param": {
        "hostypeString": string,
        "fullAddress": string
      },
      "hoscode": string,
      "hosname": string,
      "hostype": string,
      "provinceCode": string,
      "cityCode": string,
      "districtCode": string,
      "address": string,
      "logoData": string,
      "intro": string,
      "route": string,
      "status": number,
      "bookingRule": string
    }
  }
  
  //医院详情接口返回数据 TS
  export interface HosPitalDetail extends ResponseData {
    data: HosPitalDetailData
  }
  
  //代表医院科室的数据
  export interface Deparment {
    "depcode": string,
    "depname": string,
    
    "children"?: Deparment[]
  }
  
  //代表存储科室数据类型
  export type DeparmentArr = Deparment[];
  //获取科室接口返回的数据类型
  export interface DeparmentResponseData extends ResponseData {
    data: DeparmentArr
  }
  
  //用户登录接口需要携带的参数
  export interface LoginData {
    phone: string,
    code: string
  }
  //登录接口返回的用户信息数据的类型
  export interface UserInfo {
    name: string,
    token: string
  }
  //登录接口返回数据的 TS 类型
  export interface UserLoginResponseData extends ResponseData {
    data: UserInfo
  }
  
  //定义微信扫描登录返回数据的 TS 类型
  export interface WXLogin {
    "redirectUri": string,
    "appid": string,
    "scope": string,
    "state": string
  }
  
  export interface WXLoginResponseData extends ResponseData {
    data: WXLogin
  }
  
  
  export interface BaseMap {
    "workDateString": string,
    "releaseTime": string,
    "bigname": string,
    "stopTime": string,
    "depname": string,
    "hosname": string
  }
  
  export interface WorkData {
    "workDate": string,
    "workDateMd": string,
    "dayOfWeek": string,
    "docCount": number,
    "reservedNumber": number,
    "availableNumber": number,
    "status": number
  }
  
  export type BookingScheduleList = WorkData[]
  
  //某一个医院某一个科室预约挂号的数据
  export interface HospitalWorkData extends ResponseData {
    data: {
      total: number,
      bookingScheduleList:BookingScheduleList ,
      baseMap: BaseMap
    }
  }
  
  //代表的是一个医生的数据
  export interface Doctor {
    "id": string,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
      "dayOfWeek": string,
      "depname": string,
      "hosname": string
    },
    "hoscode": string,
    "depcode": string,
    "title": string,
    "docname": string,
    "skill": string,
    "workDate": string,
    "workTime": number,
    "reservedNumber": number,
    "availableNumber": number,
    "amount": number,
    "status": number,
    "hosScheduleId": string
  }
  
  //数组包含全部医生
  export type DocArr = Doctor[]
  //获取医生排班接口返回的数据
  export interface DoctorResponseData extends ResponseData {
    data: DocArr
  }
  
  //代表的是一个就诊人数据的 TS 类型
  export interface User {
    id: number,
    createTime: string,
    updateTime: string,
    isDeleted: number,
    param: {
      certificatesTypeString: string,
      contactsCertificatesTypeString: string,
      cityString: string,
      fullAddress: string,
      districtString: string,
      provinceString: string
    },
    userId: number,
    name: string,
    certificatesType: string,
    certificatesNo: string,
    sex: number,
    birthdate: string,
    phone: string,
    isMarry: number,
    provinceCode: string,
    cityCode: string,
    districtCode: string,
    address: string,
    contactsName: string,
    contactsCertificatesType: number,
    contactsCertificatesNo: string,
    contactsPhone: string,
    isInsure: number,
    cardNo: string,
    status: number
  }
  export type UserArr = User[];
  export interface UserResponseData extends ResponseData {
    data: UserArr
  }
  
  //获取某一个挂号医生数据的详情
  export interface DoctorInfoData extends ResponseData {
    data: Doctor
  }
  