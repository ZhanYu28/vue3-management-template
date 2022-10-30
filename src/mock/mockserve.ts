import Mock from 'mockjs';
const user = require('./user.json')

export interface USERINFO {
    userName:string,
    role:string,
    portrait:string,
    userId:string,
}
export interface USERTOKEN {
    token:string,
    userId:string,
    password:string
}

Mock.mock("/mock/token","post",(params)=>{
    const {userName,password} = JSON.parse(params.body)
    const useInfo = user.userToken.filter((u:USERTOKEN) => {
        return u.userId == userName && u.password == password
    })
    if(useInfo.length){
        return {code:200,data:useInfo[0].token}
    }else{
        return {code:201,message:'用户名或密码不正确'}
    }
})
Mock.mock("/mock/userinfo","post",(params)=>{
    const {token} = JSON.parse(params.body)
    const findUserToken = user.userToken.find((item:USERTOKEN) => item.token == token)
    if(findUserToken){
        const findUserInfo = user.userInfo.find((item:USERINFO) => item.userId == findUserToken.userId)
        return {code:200,data:findUserInfo}
    }else{
        return {code:201,message:'token已失效'}
    }
})