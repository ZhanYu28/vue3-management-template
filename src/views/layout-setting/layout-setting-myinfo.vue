<template>
  <div id="myinfo-box">
    <MyInfo :show-address="true"></MyInfo>
  </div>
</template>

<script lang="ts">
export default {

}
</script>
<script setup lang="ts">
import MyInfo from '@/components/my-info/my-info.vue' 
</script>

<style scoped>
#myinfo-box{
  height: 100%;
  flex:1;
  display: flex;
  padding: 20px;
}
</style>