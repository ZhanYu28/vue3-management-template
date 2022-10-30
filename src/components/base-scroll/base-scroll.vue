<template>
  <div class="scroll-box" ref="scrollBox">
    <div class="scroll" ref="scroll" 
    :style="{'height':scrollModuleHeight+'px','top':scrollModuleTop+'px'}" 
    :class="{'transition':transition}">
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from '@vue/reactivity'
import { computed, nextTick, onMounted } from '@vue/runtime-core'
export default {
    name:'BaseScroll'
}
</script>
<script setup lang="ts">
const scrollBox = ref()
const scroll = ref()
const props = defineProps({
  // 滚动内容高度
  scrollHeight:{
    type:Number,
    default:100
  },
  // 显示内容高度
  showHeight:{
    type:Number,
    default:1
  },
  // 内容距离顶部高度
  scrollTop:{
    type:Number,
    default:0
  },
  transition:{
    type:Boolean,
    default:true
  }
})
const emits = defineEmits<{
  (e:'slide',scrollTop:number):void
}>()
// 滚动条长度
const scrollBoxHeight = ref<number>(20)
// 滚动模块高度
const scrollModuleHeight = computed<number>(() => props.showHeight / props.scrollHeight * scrollBoxHeight.value)
// 滚动模块的位置
const scrollModuleTop = computed<number>(()=>props.scrollTop / props.scrollHeight * scrollBoxHeight.value)

onMounted(()=>{
  nextTick(()=>{
    scrollBoxHeight.value = scrollBox.value.offsetHeight
    // 滚动条鼠标按下事件
    scroll.value.addEventListener('mousedown',(event:MouseEvent)=>{
      // 关闭鼠标拖拽选中文字
      document.onselectstart = ()=>false
      // 获取鼠标按下时的Y轴坐标
      let clientY = event.clientY
      // 获取鼠标按下时滚动模块距离顶部
      const {scrollTop:clickTop} = props
      // 鼠标移动事件
      document.onmousemove = (e:MouseEvent)=>{
        // 获取鼠标移动后的Y轴坐标
        let clientY2 = e.clientY
        // 计算滚动后距离顶部距离
        let top = (clientY2-clientY)/scrollBoxHeight.value * props.scrollHeight + clickTop
        // 判断滚动方向
        if(top > 0){
          // 判断是否超过界限
          let maxTop = props.scrollHeight-props.showHeight
          emits('slide',top>maxTop?maxTop:top) 
        }else if(top < 0){
          emits('slide',0)
        }
        document.onmouseup = ()=>{
          document.onmousemove = null;
          document.onmouseup = null;
          document.onselectstart = null;
        }
        
      }
      return false
    })
  })
  
})
</script>

<style scoped>
.scroll-box{
  position: relative;
  height: 100%;
  width: 5px;
  border-radius: 10px;
}
.scroll{
  position: absolute;
  top: 0;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  background-color: var(--scroll);
}
.transition{
  transition: height 0.3s linear;
}
</style>