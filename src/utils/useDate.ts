import { ref } from '@vue/reactivity';

interface FormatDate {

        year:number,
        month:number,
        day:number,
        hours:string,
        minutes:string,
        seconds:string
    
}


const date = ref(new Date())
const startDate = ref('')
const endDate = ref('')
export default function useDate(){
    function formatDate(date:Date,format:string):string;
    function formatDate(d?:Date):FormatDate
    function formatDate (d = date.value,format?:string){
        const year = d.getFullYear()
        const month = d.getMonth()+1
        const day = d.getDate()
        const hours = d.getHours().toString().padStart(2,"0")
        const minutes = d.getMinutes().toString().padStart(2,"0")
        const seconds = d.getSeconds().toString().padStart(2,"0")
        
            if(format === 'y-m-d'){
                const m = month.toString().padStart(2,"0");
                const d = day.toString().padStart(2,"0");
                return `${year}-${m}-${d}`
            }else if(format === 'y/m/d'){
                const m = month.toString().padStart(2,"0");
                const d = day.toString().padStart(2,"0");
                return `${year}/${m}/${d}`
            }else{
            return {year,month,day,hours,minutes,seconds}
            }
    }
    const laterDay = (date:Date,num:number)=>{
        // 时间戳
        const dateStamp = date.getTime()
        // 一天的毫秒数
        const dayStamp = num*24*60*60*1000;
        const newDate = new Date(dateStamp + dayStamp)
        return newDate
    }
    return {
        date,
        formatDate,
        startDate,
        endDate,
        laterDay
    }
}