<template>
  <nav class="nav-bar" :class="{unfold:unfold}">
    <div class="unfold-or-fold button" @click="unfold = !unfold">
        <span class="iconfont icon-yincang"></span>
    </div>
    <ul class="nav-list">
        <li 
            v-for="{meta,path},index in routes" 
            :key="index"
            :class="{current:index == currentNav}" 
            @click="navClickHandle(index,path)">
            <span 
                class="iconfont" 
                :class="[{unfold:unfold},meta?.icon]">
            </span>
            <transition>
                <span class="title" v-show="unfold">{{meta?.name}}</span>
            </transition>
        </li>
        <transition name="active">
            <div class="active" v-show="unfold" :style="{top:top+'px'}"></div>
        </transition>
    </ul>
    <div class="button" :class="toggleButtonClass" @click="toggleTheme">
        <div 
            v-show="themeName == '蓝绿色' || unfold"
            class="daytime tran" 
            :class="{'daytime-checked':themeName == '蓝绿色' && unfold}">
            <span class="iconfont icon-taiyang"></span>
        </div>
        <div 
            class="night tran" 
            :class="{'night-checked':themeName == '灰紫色' && unfold}" 
            :style="{'z-index':themeName == '灰紫色'?10:1}">
            <span class="iconfont icon-yueliang"></span>
        </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { computed, onMounted, ref } from 'vue-demi'
import { useRoute, useRouter } from 'vue-router'
import { useThemeStore } from '@/store/theme'
import changeTheme from '@/utils/changeTheme'
export default {
    name:'NavBar'
}
</script>
<script setup lang="ts">
const unfold = ref(false)
const currentNav = ref(0)
const top = ref(20)
const router = useRouter();
const route = useRoute();
const routes = router.options.routes.find(item => item.path == '/')?.children || [];
async function navClickHandle(index:number,path:string){
    await router.push({path})
    currentNav.value = index
    top.value = 20+(index * 60)
}
const toggleButtonClass = computed(()=>unfold.value?'unfold-toggle-daytime-night':'toggle-daytime-night')
const themeStore = useThemeStore()
const themeName =computed(()=>themeStore.themes[themeStore.activeIndex].name) 
function toggleTheme(e:MouseEvent){
    const className = (e.target as Element)?.parentElement?.className
        if(themeName.value == '蓝绿色'){
            changeTheme('灰紫色')
            themeStore.changeActive(1)
        }else{
            changeTheme('蓝绿色')
            themeStore.changeActive(0)
        }
}
onMounted(()=>{
    for(let i=0;i<routes.length;i++){
        if(route.path.indexOf(routes[i].path) != -1){
            currentNav.value = i
            return
        }
    }
})

</script>

<style scoped>
.tran{
    transition: all 0.3s;
}
/* 导航栏盒子 */
.nav-bar{
    height: 100%;
    min-height: 917px;
    padding: 20px 0;
    box-sizing: border-box;
    background-color: var(--nav-bg);
    color: var(--nav-word);
    flex: 0 0 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    transition: all 0.4s ease;
}
.nav-bar.unfold{
    padding: 21px;
    flex: 0 0 200px;
    /* align-items: flex-start; */
}
.unfold-or-fold{
    display: flex;
    padding: 0 21px;
    width: 100%;
}
.iconfont{
    font-size: 18px;
}
/* 导航栏中间选项 */
.nav-list{
    position: relative;
    width: 100%;
}
.nav-list > li{
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    height: 40px;
    box-sizing: border-box;
    padding: 10px 21px;
    margin: 20px 0;
    border-radius: 20px;
    overflow: hidden;
    transition: all 0.3s;
    cursor: pointer;
}
/* 未展开时选中样式 */
.nav-list>li.current{
    color: var(--nav-current-word);
    transition: all 0.2s 0.1s;
}
/* 展开时选中导航样式 */
.active{
    position: absolute;
    /* top: 136px; */
    width: 100%;
    height: 40px;
    border-radius: 20px;
    background-color: var(--nav-current-bg);
    transition: all 0.3s;
}
/* 选中导航模块过渡 */
.active-enter-from,.active-leave-to{
    opacity: 0;
}
.active-enter-active,.active-leave-active{
    transition: all 0.4s;
}
.nav-list>li>.title{
    display: inline-block;
    height: 20px;
    margin-left: 10px;
    overflow: hidden;
    transition: all 0.2s;
}
.v-enter-from,.v-leave-to{
    width: 0;
}
.v-enter-to,.v-leave-from{
    width: 70px;
}
.v-enter-active{
    transition: all 0.2s;
}
.v-leave-active{
    transition: all 0.2s;
}
/* 切换白天夜间模式按钮 */
.toggle-daytime-night{
    position: relative;
    width: 40px;
    height: 22px;
    padding: 3px;
    box-sizing: border-box;
    border-radius: 20px;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.1);
    color: #F9C626;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    transition: all 0.3s;
}
/* 展开的切换按钮样式 */
.unfold-toggle-daytime-night{
    width: 80px;
    height: 22px;
    box-sizing: border-box;
    border-radius: 20px;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.1);
    color: #F9C626;
    position: relative;
    /* display: flex; */
    /* justify-content: space-evenly; */
    /* align-items: center; */
    overflow: hidden;
    transition: all 0.3s;
}
/* 白天按钮 */
.daytime{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    width: 40px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
}
/* 夜晚按钮 */
.night{
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: #42445D;
}
.icon-yueliang{
    font-size: 16px;
}
.daytime-checked{
    box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.4) inset;
}
.night-checked{
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5) inset;
}
</style>