<template>
  <div class="github-timeline">
    <h3 class="title">{{props.title}}</h3>
      <div class="show-list-container">
        <ul class="update-list" ref="slideList">
          <li v-for="i,index in info" :key="index">
            <div class="decorate">
              <div class="round"></div>
              <div class="line"></div>
            </div>
            <div class="main">
              <div class="head">
                <span class="date">{{i.year}}年{{i.month}}月{{i.day}}日</span>
                <span class="time">{{i.hours}}:{{i.minutes}}</span>
              </div>
              <div class="content">
                <p>{{i.message}}</p>
              </div>
            </div>
          </li>
        </ul>
        <BaseScroll 
        :scrollHeight="scrollArguments.scrollHeight" 
        :showHeight="scrollArguments.showHeight" 
        :scrollTop="scrollArguments.scrollTop"
        @slide = "slide"/>
      </div>
  </div>
</template>

<script lang="ts">
export default {
    name:'MyInfoGithub'
}
</script>
<script setup lang="ts">
import BaseScroll from '@/components/base-scroll/base-scroll.vue'
// 导入滚动条所需参数类型接口
import {ScrollArguments} from '@/components/base-scroll/scrollArgumentsType'
import { onMounted, reactive, ref ,nextTick, watch } from 'vue-demi'

const props = defineProps(['title','info'])
// 滚动条参数
const scrollArguments:ScrollArguments = reactive({
  scrollHeight:100,
  showHeight:10,
  scrollTop:0
})
// 滚动容器dom
const slideList = ref()
// 更新滚动参数
function updateArguments(){
    const {scrollHeight,offsetHeight} = slideList.value
    scrollArguments.scrollHeight = scrollHeight
    scrollArguments.showHeight = offsetHeight
}
onMounted(()=>{
  nextTick(()=>{
    updateArguments();
    // 添加滚动事件，获取滚动高度
    slideList.value.addEventListener('scroll',(e:Event)=>{
        const target:HTMLElement = e.target as HTMLElement
        scrollArguments.scrollTop = target.scrollTop
    })
  })
})
watch(props,(n)=>{
  nextTick(()=>{
    updateArguments();
  })
})

// 滚动组件自定义事件
function slide(scrollTop:number){
  scrollArguments.scrollTop = scrollTop
  slideList.value.scrollTop = scrollTop
}

</script>

<style scoped>
/* github、gitee时间线 */
.github-timeline{
  width: 100%;
  /* height: 380px; */
  flex: 1;
  display: flex;
  flex-flow: column;
  margin-top: 30px;
  padding:30px 20px;
  border: 2px solid var(--myinfo-child-border);
  border-radius: 20px;
  background-color: var(--myinfo-child-bg);
  color: var(--myinfo-child-word);
}
/* 显示部分列表容器 */
.show-list-container{
  position: relative;
  display: flex;
  justify-content: flex-end;
  height: 100%;
  margin-top: 30px;
  overflow: hidden;
}
/* 所有更新的列表 */
.update-list{
  position: absolute;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-right: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.update-list::-webkit-scrollbar{
  display: none;
}
/* 每个更新 */
.update-list>li{
  display: flex;
  height: 100px;
}
/* 每个更新左边装饰 */
.update-list>li>.decorate{
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 16px;
  height: 100%;
  margin-right: 10px;
}
.decorate>.round{
  width: 16px;
  flex: 0 0 16px;
  border-radius: 50%;
  border: 3px solid var(--myinfo-timeline);
  background-color: aliceblue;
}
.decorate>.line{
  width: 3px;
  height: 100%;
  background-color: var(--myinfo-timeline);
}
.update-list>li>.main{
  display: flex;
  flex-flow: column;
  width: 100%;
}
/* 每个更新右边内容头部日期 */
.update-list>li>.main>.head{
  font-size: 14px;
  font-weight: bold;
}
.main>.head>.time{
  margin-left: 10px;
}
/* 每个更新右边内容文字 */
.update-list>li>.main>.content{
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2) inset;
  /* border: 2px solid var(--myinfo-child-border); */
}
.content>p{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  color: var(--myinfo-child-subword);
}
</style>