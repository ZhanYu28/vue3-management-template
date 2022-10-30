import { nanoid } from "nanoid";
import { defineStore } from "pinia";
interface Data {
    id: string;
    date: string;
    time: string;
    event: string;
}[]

export const useTodoStore =  defineStore('todo',{
    state:()=>(
        {
            finishTodo:[
                {
                    date:'2022-09-01',
                    id:'0',
                    child:[
                        {
                            id:'0',
                            time:'09:00',
                            event:'写bug'
                        },
                        {
                            id:'1',
                            time:'10:00',
                            event:'写bug'
                        },
                    ]

                },
                {
                    date:'2022-09-02',
                    id:'1',
                    child:[
                        {
                            id:'0',
                            time:'09:00',
                            event:'不写bug了'
                        },
                        {
                            id:'1',
                            time:'10:00',
                            event:'写屎山代码'
                        },
                        {
                            id:'2',
                            time:'11:00',
                            event:'又写bug'
                        },
                    ]
                }
            ],
            todo:[
                {
                    id:'0',
                    date:'2022-09-08',
                    time:'09:00',
                    event:'继续写bug',
                },
                {
                    id:'1',
                    date:'2022-09-08',
                    time:'10:00',
                    event:'写一堆bug',
                },
                {
                    id:'2',
                    date:'2022-09-09',
                    time:'09:00',
                    event:'找上次的bug',
                },
                {
                    id:'3',
                    date:'2022-09-10',
                    time:'10:00',
                    event:'修修bug',
                }
            ]
        }
    ),
    actions:{
        // 删除一个待办
        deleteTodo(id:string){
            for(let i = 0;i< this.todo.length; i++){
                if(this.todo[i].id === id){
                  return this.todo.splice(i,1);
                }
              }
        },
        // 新增一个已完成事件
        addFinishTodo(dateStamp:number,timestamp:number,data:Data){
            // 如果已完成事件有相同日期，将事件加入该日期
            for(let i = 0;i<this.getFinishTodoTimestamp.length;i++){
                if(this.getFinishTodoTimestamp[i].date == dateStamp){
                    const child = this.getFinishTodoTimestamp[i].child;
                    const len = child.length;
                    const params = {
                        id:nanoid(),
                        time:data.time,
                        event:data.event
                    }
                    if(timestamp < child[0]){
                        this.finishTodo[i].child.unshift(params)
                        return;
                    }else if(timestamp >= child[len - 1]){
                        
                        this.finishTodo[i].child.push(params)
                        return;
                    }else{
                        for(let j = 1;j<len;j++){
                            if(timestamp < child[j] ){
                                this.finishTodo[i].child.splice(j,0,params);
                                return;
                            }
                        }
                    }
                }
            }
            // 没有相同日期
            for(let i = 0;i<this.getFinishTodoTimestamp.length;i++){
                const params = {
                    date:data.date,
                    id:nanoid(),
                    child:[{
                        id:nanoid(),
                        time:data.time,
                        event:data.event
                    }]
                }
                const len = this.getFinishTodoTimestamp.length
                if(dateStamp < this.getFinishTodoTimestamp[0].date || len === 0){
                    this.finishTodo.unshift(params)
                    return;
                }else if(dateStamp > this.getFinishTodoTimestamp[len - 1].date){
                    this.finishTodo.push(params)
                    return;
                }else{
                    for(let j = 1;j<len;j++){
                        if(dateStamp < this.getFinishTodoTimestamp[j].date){
                            this.finishTodo.splice(j,0,params)
                            return;
                        }
                    }
                }
            }
        }
    },
    getters:{
        getTodoTimestamp(state){
           return state.todo.map(item => +new Date(item.date+" "+item.time))
        },
        getFinishTodoTimestamp(state){
           return state.finishTodo.map(item => {
                return {
                    date:new Date(item.date).getTime(),
                    child:item.child.map(childItem => +new Date(item.date+" "+childItem.time))
                }
            })
        }
    }
})