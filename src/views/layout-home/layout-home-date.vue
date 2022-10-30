<template>
    <section class="date">
        <div class="date-box" :class="{'date-box-unfold' : !fold}">
            <!-- 头部年月 -->
            <span class="year-month">
                <span class="iconfont icon-icon_arrow_left per-month" @click="perMonth"></span>
                <span>{{getCurrentDate.year}}年{{getCurrentDate.month}}月</span>
                <span class="iconfont icon-jiantouyou1 next-month" @click="nextMonth"></span>
            </span>
            <!-- 主体日期和时间 -->
            <div class="date-time">
                <!-- 日期选择 -->
                <div class="date-select">
                    <!-- 星期盒子 -->
                    <div class="week-box">
                        <span v-for="(item,index) in foldVisitDate" :key="index" :class="{'current-week':item.select && fold}">
                            <span>{{weeks[index]}}</span>
                            <transition name="include-week-day">
                                <span class="include-week-day" v-show="fold">{{item.day}}</span>
                            </transition>
                        </span>
                    </div>
                    <!-- 展开的盒子 -->
                    <div class="month-everyday-box">
                        <transition name="month-everyday">
                            <div class="month-everyday"  v-show="!fold">
                                <span v-for="i,index in visitDate" :key="index" @click="selectDate(index)">
                                    <span class="day"
                                    :class="{select:i.select,notInMonth:!i.notInMonth}">
                                    {{i.day}}
                                    </span>
                                </span>
                            </div>
                        </transition>
                    </div>
                </div>
                <!-- 时间选择 -->
                <div class="time-select">
                    <span class="time">{{getCurrentDate.hours}}：{{getCurrentDate.minutes}}：{{getCurrentDate.seconds}}</span>
                    <span class="timezone">GTM+8:00</span>
                    <div class="clock" v-show="!fold">
                        <div class="part">
                            <div class="center-point" ref="centerPoint"></div>
                            <div class="hour-pointer" ref="hourPointer" :style="{transform: `rotate(${hourPointerAngle}deg)`}"></div>
                            <div class="minute-pointer" ref="minutePointer" :style="{transform: `rotate(${minutePointerAngle}deg)`}"></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 底部展开收起按钮 -->
            <div class="toggle-btn" @click="foldOrUnfold">
                <button></button>
                <Teleport to="body">
                    <div class="shade" v-show="!fold" @click="fold = !fold"></div>
                </Teleport>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { ref } from '@vue/reactivity';
export default {
    name:'LayoutHomeDate'
}
</script>
<script lang="ts" setup>
import { getAngle } from '@/utils/getAngle'
import  throttle  from 'lodash/throttle'
import { computed, onMounted } from 'vue-demi';
import useDate from '@/utils/useDate'
const weeks = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];

// 选中的日期
const date = useDate().date
// 格式化日期方法
const formatDate = useDate().formatDate
// 获取格式化后当前日期对象
const getCurrentDate = computed(()=>formatDate(date.value))
// 获取当前月份展示的所有日期
const getVisitDate = computed(()=>{
    let arr:Date[] = []
    const {year,month} = formatDate(date.value)
    // 当前月第一天
    let firstDay = new Date(year,month-1,1)
    // 当前月第一天星期
    let firstDayWeek = firstDay.getDay()
    // 当前展示第一个日期
    const firstVisitDay = new Date(firstDay.getTime() - firstDayWeek*24*60*60*1000)
    for(let i = 0; i < 42; i++){
        let day = new Date(firstVisitDay.getTime() + i*24*60*60*1000)
        arr.push(day)
    }
    return arr
})
// 格式化展示的日期
const visitDate = computed(()=>{
    let arr = []
    for(let i=0;i<getVisitDate.value.length;i++){
        const year = getVisitDate.value[i].getFullYear()
        const month = getVisitDate.value[i].getMonth()
        const day = getVisitDate.value[i].getDate()
        arr.push({
            year,
            month,
            day,
            // 是否选中
            select:day === date.value.getDate()&&month === date.value.getMonth()?true:false,
            // 是否当前月份日期
            notInMonth:month === date.value.getMonth()?true:false
            })
    }
    return arr
})
// 折叠展示的日期
const foldVisitDate = computed(()=>{
    for(let i = 0;i < 6;i++){
        let arr= visitDate.value.slice(i*7,i*7+7)
        for(let j = 0;j< arr.length;j++){
            if(arr[j].select){
                return arr
            }
        }
    }
})

// 选择日期
function selectDate(index:number){
    let day = getVisitDate.value[index]
    date.value = new Date(date.value.setFullYear(day.getFullYear()))
    date.value = new Date(date.value.setMonth(day.getMonth()))
    date.value = new Date(date.value.setDate(day.getDate()))
}
// 上一个月
function nextMonth(){
    date.value = new Date(date.value.setMonth(date.value.getMonth()+1))
}
// 下一个月
function perMonth(){
    date.value = new Date(date.value.setMonth(date.value.getMonth()-1))
}
// 折叠或展开
let fold = ref<boolean>(true)
function foldOrUnfold():void{
    fold.value = !fold.value
}
//中心点， 时针，分针
const centerPoint = ref();
const hourPointer = ref();
const minutePointer = ref();
const hourPointerAngle = ref(0);
const minutePointerAngle = ref(0);
let flag = 0;


onMounted(()=>{
    // 初始化角度
    hourPointerAngle.value = date.value.getHours() * 360 / 12
    minutePointerAngle.value = date.value.getMinutes() * 360 /60
    flag = date.value.getHours() > 11 && date.value.getHours() < 24?1:0;
    // 时针拖动事件
    hourPointer.value.addEventListener('mousedown',()=>{
        const {x,y} = centerPoint.value.getBoundingClientRect();
        document.onselectstart = ()=>false
        document.onmousemove = throttle((event:MouseEvent)=>{
                const {clientX,clientY} = event
                let angle = getAngle(x,y,clientX,clientY)
                if(hourPointerAngle.value>270 && hourPointerAngle.value < 360 && angle >= 0 && angle < 90){
                    flag==0?flag = 1:flag = 0
                }
                if(hourPointerAngle.value>=0 && hourPointerAngle.value < 90 && angle > 270 && angle < 360){
                    flag==0?flag = 1:flag = 0
                }
                hourPointerAngle.value = angle
                
                date.value = new Date(date.value.setHours(12 / 360 * (angle+flag*360)))
                document.onmouseup = ()=>{
                    document.onmousemove = null;
                    document.onselectstart = null;
                    document.onmouseup = null
                }
        },40)
        document.onmouseup = ()=>{
            document.onmousemove = null;
            document.onselectstart = null;
            document.onmouseup = null
        }
    })
    // 分针拖动事件
    minutePointer.value.addEventListener('mousedown',()=>{
        const {x,y} = centerPoint.value.getBoundingClientRect();
        document.onselectstart = ()=>false
        document.onmousemove = throttle((event:MouseEvent)=>{
                const {clientX,clientY} = event
                const angle = getAngle(x,y,clientX,clientY)
                minutePointerAngle.value = angle
                date.value = new Date(date.value.setMinutes(60 / 360 * angle))
                document.onmouseup = ()=>{
                    document.onmousemove = null;
                    document.onselectstart = null;
                    document.onmouseup = null
                }
        },30)
        document.onmouseup = ()=>{
            document.onmousemove = null;
            document.onselectstart = null;
            document.onmouseup = null
        }
    })
    
})



</script>


<style scoped>
/* 根盒子 */
section{
    position: relative;
    min-width: 780px;
    color: var(--date-word);
    font-weight: bold;
    font-family: '微软雅黑';
}
/* 内部盒子 */
.date-box{
    position: absolute;
    z-index: 10;
    display: flex;
    flex-flow: column;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: var(--main-child-bg);
    border-radius: 20px;
    box-shadow: 0 0 15px rgba(0,0,0, 0.1);
    transition: all 0.3s ease;
    overflow: hidden;
}
/* 展开的盒子 */
.date-box-unfold{
    height: 445px;
}
/* 头部年和月 */
.date-box>.year-month{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    margin: 18px 0;
}
/* 上个月，下个月 */
.per-month,.next-month{
    cursor: pointer;
}
/* 包裹年和月盒子 */
.date-box>.year-month>span:nth-child(2){
    padding: 5px 10px;
    border-radius: 20px;
    background-color: var(--date-month-bg);
}
/* 中间日期和时间盒子 */
.date-box>.date-time{
    display: flex;
    width: 100%;
}
/* 左边日期选择盒子 */
.date-box>.date-time>.date-select{
    width: 100%;
    padding: 0 20px;
    text-align: center;
}
/* 星期一到星期日盒子 */
.date-time>.date-select>.week-box{
    display: grid;
    grid-template-columns: repeat(7,70px);
    justify-content: space-between;
}
.date-time>.date-select>.week-box>span{
    display: flex;
    flex-flow: column;
    padding: 20px 10px;
    border-radius: 20px;
    transition: all 0.3s ease;
}
/* 包裹在星期里的日期 */
.date-time>.date-select>.week-box>span>.include-week-day{
    margin-top: 18px;
}
/* 星期里日期过渡 */
.include-week-day-enter-from,
.include-week-day-leave-to{
    opacity: 0;
}
.include-week-day-enter-active{
    transition: opacity 0.1s ease;
}
/* 被选中星期和日期样式 */
.current-week{
    color: var(--date-current-word);
    background-color: var(--date-current-bg);
}
/* 当前月所有日期外部盒子 */
.month-everyday-box{
    overflow: hidden;
}
/* 当前月所有日期 */
.month-everyday{
    display: grid;
    grid-template-columns: repeat(7,70px);
    grid-template-rows: auto auto auto auto auto auto;
    grid-row-gap:10px;
    justify-content: space-between;
}
/* 当前月所有日期盒子过渡 */
.month-everyday-enter-from,
.month-everyday-leave-to{
    transform: translateY(-300px);
}
.month-everyday-enter-active,
.month-everyday-leave-active{
    transition: all 0.3s ease;
}
/* 所有日期里每一天的盒子 */
.month-everyday>span{
    padding: 5px 0;
}
.month-everyday>span>.day{
    width: 30px;
    line-height: 30px;
    display: inline-block;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.4s;
}
/* 被选中日期样式 */
.month-everyday>span>.day.select{
    background-color: var(--date-current-bg);
}
/* 不是当前月份的日期 */
.month-everyday>span>.day.notInMonth{
    color:var(--date-not-in-month);
}
/* 时间选择盒子 */
.time-select{
    display: flex;
    flex-flow: column;
    align-items: center;
    /* width: 200px; */
    flex: 0 0 200px;
    padding: 0 20px;
}
/* 时间 */
.time-select>.time{
    padding: 10px 10px;
    margin: 10px 0;
    font-size: 20px;
    border-radius: 20px;
    background-color: var(--date-current-bg);
    color: var(--date-current-word);
}
/* 时区 */
.time-select>.timezone{
    font-size: 14px;
    font-weight: 600;
}
/* 时钟 */
.time-select>.clock{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    width: 150px;
    height: 150px;
    box-sizing: border-box;
    border-radius: 50%;
    border: solid 5px var(--date-clock-border);
    background-color: var(--date-clock-bg);
}
.clock>.part{
    position: relative;
    width: 10px;
    height: 10px;
}
/* 时钟中心点 */
.clock>.part>.center-point{
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--date-clock-pointer);
}
/* 分针 */
.clock>.part>.minute-pointer{
    position: absolute;
    top: -45px;
    transform: rotate(45deg);
    transform-origin: 50% 100%;
    border: solid 50px var(--date-clock-pointer);
    border-left: solid 5px transparent;
    border-right: solid 5px transparent;
    border-top: transparent;
}
/* 时针 */
.clock>.part>.hour-pointer{
    position: absolute;
    transform: rotate(90deg);
    transform-origin: 50% 100%;
    top: -25px;
    border: solid 30px var(--date-clock-pointer);
    border-left: solid 5px transparent;
    border-right: solid 5px transparent;
    border-top: transparent;
}
/* 展开折叠按钮 */
.date-box>.toggle-btn>button{
    width: 60px;
    height: 8px;
    margin: 10px 0;
    border-radius: 20px;
    background-color: var(--date-current-bg);
}
/* 日期展开背景遮罩 */
.shade{
    position:absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

</style>