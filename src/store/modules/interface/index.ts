
import type { HosPitalDetail,DeparmentArr } from "@/api/hospital/type";
import type { UserInfo } from "@/api/hospital/type";
export interface DetailState{
    hospitalInfo:HosPitalDetail,
    deparmentArr:DeparmentArr
}
export interface UserState {
    //用于控制登录组件 Dialog 的显示与隐藏
    visiable: boolean,
    //存储用户的验证码
    code: string,
    //存储用户信息
    userInfo: UserInfo
}