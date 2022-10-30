<template>
    <ul class="theme-select-container">
      <li class="theme" v-for="theme,index in useTheme.themes" :key="index">
        <div class="theme-button button" :style = "theme.style" @click="selectTheme(index,theme.name)">
          {{theme.name}}
        </div>
        <div class="theme-index"></div>
      </li>
      <div class="active-index" :style = "useTheme.getActiveIndexPosition"></div>
    </ul>
</template>

<script lang="ts">
import { useThemeStore } from '@/store/theme'
import changeTheme from '@/utils/changeTheme';
export default {
    name:'SettingTheme'
}
</script>
<script setup lang="ts">
const useTheme = useThemeStore()
function selectTheme(index:number,name:string){
  useTheme.changeActive(index);
  changeTheme(name);
}


</script>

<style scoped>
/* 所有主题容器 */
.theme-select-container{
  position: relative;
  width: 730px;
  height: 100%;
  padding: 50px 0;
  display: flex;
  box-sizing: border-box;
  /* justify-content: space-between; */
  align-content: flex-start;
  flex-flow: row wrap;
}
/* 单个主题容器 */
.theme-select-container>.theme{
  width:33.33%;
  margin-bottom: 40px;
  display: flex;
  flex-flow: column;
  align-items: center;
}
/* 主题选择按钮 */
.theme>.theme-button{
  width:170px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  /* border: 3px solid #fff; */
  color: #fff;
}
/* 主题索引装饰条 */
.theme>.theme-index{
  width: 38px;
  height: 5px;
  margin-top: 10px;
  border-radius: 20px;
  background-color: #d7d7d7;
}
.active-index{
  content:'';
  position: absolute;
  width: 40px;
  height: 5px;
  border-radius: 20px;
  background-color: var(--login-theme-active-index);
  transition: all 0.4s;
}
</style>