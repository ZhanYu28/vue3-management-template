<template>
    <div class="date-select-box">
        <div class="year-month-box">
          <span class="iconfont icon-icon_arrow_left button" @click="perMonth"></span>
          <div class="year-month">
              <span class="year">{{getFormatDate.year}}年</span>
              <span class="month">{{getFormatDate.month}}月</span>
          </div>
          <span class="iconfont icon-jiantouyou1 button" @click="nextMonth"></span>
        </div>
        <ul class="week-box">
          <li v-for="w,index in weeks" :key="index">{{w}}</li>
        </ul>
        <ul class="day-box">
            <li class="day"
            v-for="d,index in visitDate" 
            :key="index" 
            :class="{active:props.activeDate == d.formatDate && props.activeDate!== '',button:d.day}"
            @click="selectHandle(index)">{{d.day}}</li>
        </ul>
    </div>
</template>

<script lang="ts">
export default {
    name:'baseDateSelect'
}
</script>
<script setup lang="ts">
import { ref } from 'vue';
import useDate from '@/utils/useDate';
import { computed } from '@vue/reactivity';

const props = defineProps<{activeDate:string}>()
const weeks = ['Su','Mo','Tu','We','Th','Fr','Sa'];
const date = ref(new Date());
const getFormatDate = computed(()=>useDate().formatDate(date.value));
// 展示的所有日期
const visitDate = computed(()=>{
    let arr:{day:string,date:(string|Date),formatDate:string}[] = []
    const {year,month} = getFormatDate.value;
    // 当前月第一天
    const firstMonthDay = new Date(year,month-1,1);
    // 当前月有几天
    const lastMonthDay = new Date(year,month,0).getDate()
    // 当前月第一天星期几
    const firstDayWeek = firstMonthDay.getDay();
    // 显示的日期
    for(let i = 0; i<firstDayWeek+lastMonthDay;i++){
        if(i<firstDayWeek){
            arr.push({
                day:'',
                date:'',
                formatDate:''
            })
        }else{
            let date = new Date(firstMonthDay.getTime() + (i-firstDayWeek) * 24*60*60*1000)
            let d = date.getDate().toString();
            const {year,month,day} = useDate().formatDate(date);
            let formatDate = `${year}-${month}-${day}`
            arr.push({
                day:d,
                date,
                formatDate
            })
        }
    }
    return arr
})

// 上个月
function perMonth(){
    const { month } = getFormatDate.value
    date.value = new Date(date.value.setMonth(month-2))
}
// 下个月
function nextMonth(){
    const { month } = getFormatDate.value
    date.value = new Date(date.value.setMonth(month))
}

const emits = defineEmits(['select'])
function selectHandle(index:number){
    if(typeof visitDate.value[index].date == "string"){
        return
    }else{
        emits('select',visitDate.value[index])
    }
}
</script>

<style scoped>
.date-select-box{
    
    padding: 20px;
}
.year-month-box{
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--scope-date-word);
}
.week-box{
    display: grid;
    grid-template-columns: repeat(7,1fr);
    margin: 10px 0;
    color: var(--scope-date-week);
}
.week-box>li{
    text-align: center;
}
.day-box{
    display: grid;
    grid-gap: 5px 5px;
    grid-template-rows: repeat(6,1fr);
    grid-template-columns: repeat(7,1fr);
    color: var(--scope-date-day);
}
.day-box>.day{
    padding: 5px 0;
    text-align: center;
    transition: all 0.4s;
}
.day-box>.day.active{
    border-radius: 50%;
    background-color: var(--scope-date-active-bg);
    color: var(--scope-date-active-word);
}
</style>