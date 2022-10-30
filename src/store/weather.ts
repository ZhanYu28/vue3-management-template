import { defineStore } from "pinia";
import api from "@/api";

interface Weather {
        "city"?:string,
        "wea"?:string,
        "wea_img"?:string,
        "tem"?:string,
        "humidity"?:string,
}

export default defineStore('weather', {
    state: () => {
        return{
            data:<Weather>{}   
            }
    },
    actions: {
        async getWeather(cityid: number) {
            const result = await api.home.reqGetWeather(cityid) as Weather
            const {city,wea,wea_img,tem,humidity} = result
            this.$patch(({data})=>{
                data.city = city
                data.wea = wea
                data.wea_img = wea_img
                data.tem = tem
                data.humidity = humidity
            })
        }
    },
    getters:{
        getWeatherData(state){
            return state.data
        }
    },
    persist: {
        storage: sessionStorage,
        paths:['data']
    }
})