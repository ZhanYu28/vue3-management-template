import { reqGetToken, reqGetUserInfo } from "@/api/login";
import { defineStore } from "pinia";
import {USERINFO} from "@/mock/mockserve"
import { useRouter } from "vue-router";

export const useUserStore = defineStore('user',{
    state:()=>({
        token:'',
        userInfo:<USERINFO>{}
    }),
    actions:{
        async getToken(userName:string,password:string){
            const result = await reqGetToken({userName,password}) as any
            if(result.code == 200){
                this.token = result.data;
                return 'ok'
            }else{
                return Promise.reject(new Error(result.message))
            }
        },
        async getUserInfo(){
            const result = await reqGetUserInfo(this.token) as any
            if(result.code == 200){
                this.userInfo = result.data
                return 'ok'
            }else{
                return Promise.reject(new Error(result.message))
            }
        },
        logout(){
            useUserStore().$reset();
        }
    },
    persist:{}
})