import { defineStore } from "pinia";

export const useBackgroundStore =  defineStore('background',{
    state:()=>({
        backgroundImg:[
            {
                url:require('@/assets/login-bg/万叶.jpg'),
                active:true,
                name:'万叶'
            },
            {
                url:require('@/assets/login-bg/雷神.png'),
                active:false,
                name:'雷神'
            },
            {
                url:require('@/assets/login-bg/魈.jpg'),
                active:false,
                name:'魈'
            },
            {
                url:require('@/assets/login-bg/钟离.jpg'),
                active:false,
                name:'钟离'
            },
            {
                url:require('@/assets/login-bg/神里绫华.png'),
                active:false,
                name:'神里绫华'
            },
        ]
    }),
    actions:{
        changeActive(index:number){
            this.backgroundImg.forEach(item => item.active = false);
            this.backgroundImg[index].active = true;
        }
    },
    getters:{
        getActiveImg(state){
            return state.backgroundImg.filter(item => item.active == true)[0]
        }
    },
    persist: {
        storage: localStorage,
        paths:['backgroundImg']
    }
})