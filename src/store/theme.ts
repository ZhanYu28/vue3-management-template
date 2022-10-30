import { defineStore } from "pinia";

export const useThemeStore =  defineStore('theme',{
    state:()=>({
        activeIndex:0,
        themes:[
            {
                style:{
                    background: 'linear-gradient(to right,#B5E2E5,#96CAD7,#4F7A9A)',
                    border:'3px solid #B5E2E5'
                },
                name:'蓝绿色',
                active:true
            },
            {
                style:{
                    background: 'linear-gradient(to right,#9CA4B7,#464E61,#42445D)',
                    border:'3px solid #9CA4B7'
                },
                name:'灰紫色',
                active:false
            },
            {
                style:{
                    background: 'linear-gradient(to right,#FFE7E6,#F5D8D8,#EBA6AA)',
                    border:'3px solid #FFE7E6'
                },
                name:'樱花粉',
                active:false
            }
        ]
    }),
    actions:{
        changeActive(index:number){
            this.themes.forEach(item => item.active = false);
            this.themes[index].active = true;
            this.activeIndex = index;
        }
    },
    getters:{
        getActiveIndexPosition(state){
            const row = Math.ceil((state.activeIndex + 1) / 3);
            const col = (state.activeIndex + 1) % 3 || 3;
            return {
                left:101 + 243 * (col - 1) + 'px',
                top:110 + 105 * (row - 1) + 'px'
            }
        },
        getActiveName(state){
            return state.themes[state.activeIndex].name
        }
    },
    persist: {
    }
})