<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRepositoryStore } from './store/repository';

export default defineComponent({
  name: 'App'
});
</script>
<script setup lang="ts">
onMounted(()=>{
  useRepositoryStore().getGithubData();
  useRepositoryStore().getGiteebData();
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
.button{
  cursor: pointer;
}
.default-transition{
  transition: all 0.4s;
}
</style>
