<template>
  <div id="setting">
    <div class="navbar">
      <h3 class="title">基本设置</h3>
      <ul class="nav-list">
        <li class="button">
          <router-link class="nav" :to="{name:'theme'}">主题设置</router-link>
        </li>
        <li class="button">
          <router-link class="nav" :to="{name:'myinfo'}">个人信息</router-link>
        </li>
        <li class="button logout" @click="logout">退出登录</li>
        <div class="current-nav default-transition" :style="{top:top}"></div>
      </ul>
    </div>
    <div class="main">
      <h4 class="title">主题设置</h4>
      <div class="router-box">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
    name:'LayoutSetting'
}
</script>
<script setup lang="ts">
import { useUserStore } from '@/store/userStore'
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue-demi';
import { ElMessageBox,ElMessage } from 'element-plus'
const userStore = useUserStore();
const router = useRouter();
const route = useRoute()
// 退出登录
function logout(){
  ElMessageBox.confirm(
    '你确定要退出登录吗？',
    '提醒',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      userStore.logout();
      await router.push({name:'login'})
      ElMessage({
        type: 'success',
        message: '退出成功',
      })
    })
    .catch(()=>{})
  
}
// 当前选中导航索引
const currentNav = computed(()=>{
  if(route.name == 'myinfo'){return 1;}
  else{return 0}
})
// 当前导航样式高度
const top = computed(()=>{
  return currentNav.value * 41 + 'px'
})


</script>

<style scoped>
#setting{
  height: 100%;
  display: flex;
  background-color: var(--main-bg);
}
.navbar{
  width: 220px;
  height: 100%;
  min-height: 917px;
  padding: 20px 0;
  display: flex;
  flex-flow: column;
  align-items: center;
  background-color: var(--setting-nav-bg);
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
}
.navbar>.title{
  margin-bottom: 50px;
  color:var(--setting-title)
}
.nav-list{
  position: relative;
  width: 100%;
  /* display: flex;
  flex-flow: column;
  align-items: center; */
}
.nav-list>li{
  text-align: center;
  /* width: 100% */
  color: var(--setting-nav-word);
}
.nav-list>li>.nav{
  width: 100%;
  height: 100%;
  padding: 10px 0;
  display: block;
  color: var(--setting-nav-word);
}
/* 退出登录按钮 */
.nav-list>li.logout{
  padding: 10px 0;
}
.current-nav{
  position: absolute;
  left: 0;
  width: 100%;
  height: 41px;
  border: 1px solid var(--setting-current-border);
}

.main{
  flex: 1;
  display: flex;
  flex-flow: column;
  padding: 40px;
}
.main>.title{
  margin-bottom: 10px;
  color: var(--setting-main-title);
}
.main>.router-box{
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  background-color: var(--main-child-bg);
  border-radius: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
}
/* 修改elementui默认样式 */
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>