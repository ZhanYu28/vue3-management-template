<template>
  <main>
    <LayoutHomeDate />
    <LayoutHomeSearch />
    <LayoutHomeWeather/>
    <LayoutHomeStatistics/>
    <LayoutHomeFinish/>
    <LayoutHomeTodoList/>
  </main>
</template>

<script>
export default {
    name:'LayoutHome'
}
</script>
<script setup>
import LayoutHomeDate from '@/views/layout-home/layout-home-date'
import LayoutHomeSearch from '@/views/layout-home/layout-home-search'
import LayoutHomeWeather from '@/views/layout-home/layout-home-weather'
import LayoutHomeStatistics from '@/views/layout-home/layout-home-statistics'
import LayoutHomeFinish from '@/views/layout-home/layout-home-finish'
import LayoutHomeTodoList from '@/views/layout-home/layout-home-todo-list'
</script>


<style scoped>
@media screen and (min-width: 1500px){
    main{
        display: grid;
        padding: 20px 18px;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        grid-template-columns: 1fr 1fr 400px;
        grid-template-rows: 40px 130px 320px minmax(340px,100%);
        grid-gap: 20px 18px;
        background-color: var(--main-bg);
        transition: all 0.4s;
    }
    .date{
        grid-column: 1 / span 2;
        grid-row: 1 / span 2;
    }
    .stat{
        grid-column: 1 / span 3;
    }
    .todo-list{
        grid-column: 2 / span 2;
    }
}

@media screen and (max-width:1500px) {
    main{
    display: grid;
    padding: 20px 18px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 190px 320px minmax(340px,100%);
    grid-gap: 20px 18px;
    background-color: var(--main-bg);
    transition: all 0.4s;
    }
    .date{
        grid-column: 1 / span 2;
    }
    .stat{
        grid-column: 1 / span 2;
    }
    
}
main>section{
    box-sizing: border-box;
    background-color: var(--main-child-bg);
    border-radius: 30px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
    transition: all 0.4s;
}
</style>