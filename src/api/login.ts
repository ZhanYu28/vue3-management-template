import mockRequest from "@/api/mockRequest";
// 获取token
export const reqGetToken = (data:{userName:string,password:string})=>mockRequest({url:'/token',method:'post',data})
// 获取用户信息
export const reqGetUserInfo = (token:string)=>mockRequest({url:'/userinfo',method:'post',data:{token}})