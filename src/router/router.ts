import { createRouter, createWebHashHistory,RouteRecordRaw } from "vue-router";
import routes from "./routes"
import { useUserStore } from "@/store/userStore";

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

router.beforeEach((to)=>{
    const userStore = useUserStore()
    const token = userStore.token
    const userInfo = userStore.userInfo
    
    if(token){
        if(to.name == 'login'){
            if(userInfo.userName){
                return {path:'/'}
            }else{
                userStore.getUserInfo()
            }
        }else{
            if(!userInfo.userName){
                userStore.getUserInfo()
            }
        }
    }else{
        if(to.name == 'login'){
            return
        }else{
            return {name:'login'}
        }
    }
})

console.log(Object.prototype.toString.call(routes));


export default router;