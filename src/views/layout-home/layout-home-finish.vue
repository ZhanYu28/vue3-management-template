<template>
  <section class="finish">
    <h3 class="title">已完成事件</h3>
    <div class="show-event-container">
      <div class="all-event-container" ref="eventContainer">
        <TransitionGroup name="finishList">
          <div class="day-event-container" v-for="day in useTodo.finishTodo" :key="day.id">
            <div class="date-box">
              <span class="date">{{day.date}}</span>
              <span class="line"></span>
            </div>
            <ul class="event-list">
              <TransitionGroup name="finishList">
                  <li v-for="event in day.child" :key="event.id">
                    <span class="time">{{event.time}}</span>
                    <p class="event">{{event.event}}</p>
                  </li>
              </TransitionGroup>
            </ul>
          </div>
        </TransitionGroup>
      </div>
      <BaseScroll 
      :scrollHeight="scrollArguments.scrollHeight" 
      :showHeight="scrollArguments.showHeight" 
      :scrollTop="scrollArguments.scrollTop"
      @slide = "slide"/>
    </div>
  </section>
</template>

<script lang="ts">
export default {
    name:'LayoutHomeFinish'
}
</script>

<script setup lang="ts">
import  {useTodoStore}  from '@/store/todo'
import { nextTick, onMounted, reactive, ref, watch } from 'vue-demi'
import BaseScroll from '@/components/base-scroll/base-scroll.vue'
let useTodo = useTodoStore();

/**************获取滚动条组件所需参数**************/
// 获取event容器dom
const eventContainer = ref();
// scrollArguments的类型接口
interface ScrollArguments {
  scrollHeight:number
  showHeight:number
  scrollTop:number
}
// base-scroll组件的参数
let scrollArguments:ScrollArguments = reactive({
  scrollHeight:100,
  showHeight:10,
  scrollTop:0
})

function setScrollHeight(){
  const {scrollHeight,offsetHeight} = eventContainer.value
    scrollArguments.scrollHeight = scrollHeight
    scrollArguments.showHeight = offsetHeight
}

onMounted(()=>{
  nextTick(()=>{
    setScrollHeight();
    // 添加滚动事件，获取滚动高度
    eventContainer.value.addEventListener('scroll',(e:Event)=>{
        const target:HTMLElement = e.target as HTMLElement
        scrollArguments.scrollTop = target.scrollTop
    })
  })
})

watch(useTodo.finishTodo,()=>{
  nextTick(()=>{
    setScrollHeight();
  })
})

// 滚动组件自定义事件
function slide(scrollTop:number){
  scrollArguments.scrollTop = scrollTop
  eventContainer.value.scrollTop = scrollTop
}
</script>


<style scoped>
/* 已完成事件外部容器 */
.finish{
    padding: 20px;
    display: flex;
    flex-flow: column;
}
/* 标题 */
.finish>.title{
    margin-bottom: 20px;
    font-size: 18px;
    color: var(--main-child-title);
}
/* 事件显示容器 */
.finish>.show-event-container{
  position:relative;
  display: flex;
  justify-content: flex-end;
  overflow: hidden;
  height: 100%;
}
/* 事件滚动容器 */
.finish>.show-event-container>.all-event-container{
  position: absolute;
  padding-right: 20px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.finish>.show-event-container>.all-event-container::-webkit-scrollbar{
  display: none;
}
/* 日期 */
.date-box{
  display: flex;
  align-items: center;
  font-weight: bold;
  color: var(--finish-word);
}
/* 日期后装饰线 */
.date-box>.line{
  flex: 1 1 0;
  margin-left: 10px;
  height: 0;
  box-sizing: border-box;
  border-bottom: dashed 4px var(--finish-word);
}
/* 每一天所有事件容器 */
.day-event-container>.event-list{
  margin: 10px 0;
  border-left: solid 4px var(--finish-word);
}
.day-event-container:last-of-type>.event-list{
  margin-bottom: 0;
}
/* 过渡动画 */
.finishList-move, /* 对移动中的元素应用的过渡 */
.finishList-enter-active,
.finishList-leave-active {
  transition: all 0.4s ease;
}

.finishList-enter-from,
.finishList-leave-to {
  opacity: 0;
}
/* 每一个事件容器 */
.event-list>li{
  display: flex;
  justify-content: flex-end;
}
/* 每一个事件的时间 */
.event-list>li>.time{
  margin-top: 14px;
  margin-left: 20px;
  color: var(--finish-time-word);
}
/* 每一个事件 */
.event-list>li>.event{
  width: 100%;
  margin: 0 0 10px 10px;
  padding: 10px 20px;
  border-radius: 20px;
  line-height: 1.5rem;
  color:var(--finish-child-word);
  background-color: var(--finish-child-bg);
}
</style>