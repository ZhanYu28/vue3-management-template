<template>
  <section class="weather" :style="{backgroundImage:weatherBg}">
    <div class="weather-detail">
        <div class="detail-top">
            <span class="temp">{{useWeather.data.tem || "暂无数据"}}°</span>
            <span class="city">{{useWeather.data.city || "暂无数据"}}</span>
        </div>
        <div class="detail-bottom">
            <span>{{useWeather.data.wea || "暂无数据"}}</span>
            <span class="isolate">/</span>
            <span><i class="iconfont icon-shidu"></i>{{useWeather.data.humidity || "暂无数据"}}</span>
        </div>
    </div>
    <div class="filter" :style="{backgroundImage:weatherBg}"></div>
    <div class="weather-icon">
        <img :src="weaImg()" alt="天气" draggable="false">
    </div>
  </section>
</template>

<script lang="ts">
import { computed, onMounted } from 'vue-demi'
import useWeatherStore from '@/store/weather'
export default {
    name:'LayoutHomeWeather'
}
</script>
<script setup lang="ts">
const useWeather = useWeatherStore()
const wea_img =  computed(()=>useWeather.data.wea_img || "qing");
const weaImg = ()=>require(`@/assets/weather/${wea_img.value}.png`);
const time = new Date().getHours();
const weatherBg = computed(()=>{
    if(time == 5 ){
        return `url(${require('@/assets/日出.png')})`;
    }else if(time > 5 && time < 18){
        return `url(${require('@/assets/白天.png')})`;
    }else if(time == 18){
        return `url(${require('@/assets/日落.png')})`;
    }else{
        return `url(${require('@/assets/晚上.png')})`;
    }
})



onMounted(
  async ()=>{
  if(!useWeather.data.city){
    await useWeather.getWeather(101280101)
  }
}

)
</script>

<style scoped>
.weather{
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 20px;
    box-sizing: border-box;
    color: #fff;
    background-size: 400px 175px;
    border-radius: 40px;
}
.weather-detail{
    display: flex;
    flex-flow: column;
    align-items: center;
    padding-right: 10px;
}
.filter{
    position: absolute;
    width: 114px;
    height: 63px;
    background-position: -20px -47px;
    background-size: 400px 175px;
    filter: blur(10px);
}
.weather-detail>.detail-top{
    position: relative;
    z-index: 1;
    margin-bottom: 5px;
    border-bottom: solid 3px #fff;
    font-weight: bold;
}
.detail-top>.temp{
    font-size: 30px;
    margin-right: 10px;
}
.detail-top>.city{
    font-size: 20px;
}
.detail-bottom{
    position: relative;
    z-index: 1;
}
.detail-bottom>.isolate{
    margin: 0 10px;
}
.weather-icon>img{
    position: absolute;
    top: 0;
    right: 0;
    width: 80px;
    height: 80px;
}
@media screen and (max-width:1500px) {
    .weather{
        display: none;
    }
}
</style>