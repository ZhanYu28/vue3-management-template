<template>
    <div class="main-box">
        <NavBar />
        <div class="router-box">
          <router-view></router-view>
        </div>
        <div class="my-info-box">
          <MyInfo />
        </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'BaseLayout'
  });
  </script>
  <script setup lang="ts">
    // 引入组件
    import NavBar from '@/components/nav-bar.vue'
    import MyInfo from '@/components/my-info/my-info.vue'
  </script>
  
  <style scoped>
  @media screen and (min-width:1770px) {
    .my-info-box{
    flex: 0 0 300px;
    min-height: 917px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }
  }
  @media screen and (max-width:1770px) {
    .my-info-box{
    display: none;
  }
  }
  .main-box {
    display: flex;
    height: 100%;
  }
  .router-box{
    flex:1 0 1100px;
    height: 100%;
    min-height: 918px;
    background: var(--main-bg);
  }
  
  </style>