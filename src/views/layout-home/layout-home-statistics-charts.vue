<template>
  <iframe ref="resizeFrame" frameborder="0" class="resizeFrame"></iframe>
  <div class="charts-container" ref="charts"></div>
</template>

<script lang="ts">
export default {
    name:'LayoutHomeStatisticsCharts'
}
</script>
<script setup lang="ts">
import * as echarts from 'echarts';
import { ref } from '@vue/reactivity';
import { nextTick, onMounted ,watch} from '@vue/runtime-core';
import useDate from '@/utils/useDate';
import { useTodoStore } from '@/store/todo';
const charts = ref();
const resizeFrame = ref();
let statCharts:echarts.ECharts
const {startDate,endDate} = useDate()
const todo = useTodoStore().todo;
const finishTodo = useTodoStore().finishTodo;
const currentDate = new Date()
// 图表日期数组
let dateArr:string[] = [];
// 图表完成数量
let finishArr:number[] = [];
// 图表未完成数量
let todoArr:number[] = [];
// 一天的时间戳
let dayStamp = 24*60*60*1000;
// 设置展示日期
function setDateArr(dayNum:number,start:Date,end:Date){
    dateArr = [];
    if(start.getTime() < end.getTime()){
        for(let i = 0;i<dayNum;i++){
            let date = new Date(start.getTime() + i * dayStamp);
            dateArr.push(useDate().formatDate(date,'y/m/d') as string);
        }
    }else{
        for(let i = 0;i<dayNum;i++){
            let date = new Date(start.getTime() - i * dayStamp);
            dateArr.push(useDate().formatDate(date,'y/m/d') as string);
        }
    }
}
// 设置完成数量数组（天数）
function setFinishArr(dayNum:number){
    finishArr = [];
    for(let i = 0;i<dayNum;i++){
        finishArr.push(0)
        let date = new Date(dateArr[i]);
        let formatDate = useDate().formatDate(date,'y-m-d');
        for(let j = 0;j<finishTodo.length;j++){
        if(finishTodo[j].date == formatDate){
            finishArr[i] = finishTodo[j].child.length;
        }
    }
    }
}
// 设置未完成的数量数组(天数)
function setTodoArr(dayNum:number){
    todoArr = [];
    for(let i = 0;i<dayNum;i++){
        todoArr.push(0)
        for(let j = 0;j<todo.length;j++){
            let todoDate = new Date(todo[j].date+" ").getTime()
            if(new Date(dateArr[i]).getTime() == todoDate){
                todoArr[i]++
            }
        }
    }
}
// 按照日期获取图表数据(开始日期，结束日期)
function getChartsInfo(start:Date,end:Date){
        // 天数
        let dayNum =  Math.abs(end.getTime() - start.getTime()) / dayStamp + 1;
        setDateArr(dayNum,start,end);
        setFinishArr(dayNum);
        setTodoArr(dayNum);
        updateCharts(dateArr,finishArr,todoArr);
}
// 更新图表数据
function updateCharts(dateArr:string[],finishArr:number[],todoArr:number[]){
    statCharts.setOption({
            xAxis: {
            data: dateArr,
          },
          series: [
            {
                name: '已完成',
                data: finishArr,
            },
            {
                name: '未完成',
                data: todoArr,
            }
          ]
        })
}

watch([startDate,endDate],()=>{
    // 开始和结束时间
    if(startDate.value && endDate.value){
        let start = new Date(startDate.value);
        let end = new Date(endDate.value);
        getChartsInfo(start,end);
    }
});
watch([todo,finishTodo],()=>{
    // 天数
    let dayNum =  dateArr.length;
    setFinishArr(dayNum);
    setTodoArr(dayNum);
    updateCharts(dateArr,finishArr,todoArr);
});

onMounted(()=>{
    nextTick(()=>{
        // 判断是否支持方法并获取文档样式
        var documentStyle = ()=>{
            if(typeof window.getComputedStyle != 'function'){
                console.log('不支持getComputedStyle方法');
                return
            }else{
                return getComputedStyle(document.documentElement);
            }
        }
        // 获取css变量
        var chartsLineColor = documentStyle()?.getPropertyValue('--charts-line-color') || '#72C9D0';
        var chartsLineColor2 = documentStyle()?.getPropertyValue('--charts-line2-color') || '#FF9D9D';
        // 初始化echarts
        statCharts = echarts.init(charts.value)
        resizeFrame.value.contentWindow.onresize = function (){
            statCharts.resize()
        };
        
        statCharts.setOption({
          tooltip: {
            trigger: "axis",
            axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: chartsLineColor
            }
            }
          },
          xAxis: {
            type:'category',
            data: [],
            axisTick: {
                show:false,
                alignWithLabel: true
            },
            offset: 5,
          },
          yAxis: {},
          series: [
            {
                name: '已完成',
                data: [],
                type: 'line',
                smooth: true,
                itemStyle: {
                    opacity:0,
                    color:chartsLineColor
                },
                lineStyle:{
                    color: chartsLineColor
                }
            },
            {
                name: '未完成',
                data: [],
                type: 'line',
                smooth: true,
                itemStyle: {
                    opacity:0,
                    color:chartsLineColor2
                },
                lineStyle:{
                    color:chartsLineColor2
                }
            }
          ],
          grid:{
            left:40,
            right:20,
            top:20,
            bottom:30
          }
        });
        if(startDate.value && endDate.value){
            let start = new Date(startDate.value);
            let end = new Date(endDate.value);
            getChartsInfo(start,end);
        }else{
            getChartsInfo(currentDate,useDate().laterDay(currentDate,6))       
        }
    })
    
})
</script>

<style scoped>
.charts-container{
    height: 100%;
    width: 100%;
}
.resizeFrame{
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>