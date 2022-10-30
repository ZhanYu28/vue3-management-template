import api from "@/api";
import { defineStore } from "pinia";
import useDate from "@/utils/useDate";

export const useRepositoryStore = defineStore('repository',{
    state:()=>({
        github:{
            address:"https://github.com/ZhanYu28/yuanshen-eye-animation.git",
            data:<{}[]>[]
        },
        gitee:{
            address:"https://gitee.com/dabai-library/yuanshen-eye.git",
            data:<{}[]>[]
        },
    }),
    actions:{
        async getGithubData(){
            const res = await api.home.reqGithubCommit(this.githubRepositoryName) as any;
            console.log(2222);
            
            if(Array.isArray(res)){
                this.github.data =  res.map((item:any) => {
                    const date = item.commit.author.date;
                    const message = item.commit.message;
                    const {year,month,day,hours,minutes} = useDate().formatDate(new Date(date))
                    return {date,message,year,month,day,hours,minutes}
                  });
            }
        },
        async getGiteebData(){
            const res = await api.home.reqGiteeCommit(this.giteeRepositoryName) as any;
            if(Array.isArray(res)){
                this.gitee.data =  res.map((item:any) => {
                    const date = item.commit.author.date;
                    const message = item.commit.message;
                    const {year,month,day,hours,minutes} = useDate().formatDate(new Date(date))
                    return {date,message,year,month,day,hours,minutes}
                  });
            }
        }
    },
    getters:{
        githubRepositoryName(state){
            return state.github.address.replace("https://github.com/","").replace(".git","")
        },
        giteeRepositoryName(state){
            return state.gitee.address.replace("https://gitee.com/","").replace(".git","")
        },
    }
})