<template>
  <section class="stat">
    <div class="stat-header">
        <h3 class="title">每日完成统计</h3>
        <BaseDatePicker/>
    </div>
    <div class="charts">
        <LayoutHomeStatisticsCharts/>
    </div>
  </section>
</template>

<script>
export default {
    name:'LayoutHomeStatistics'
}
</script>
<script setup>
import BaseDatePicker from '@/components/base-date-picker/base-date-picker'
import LayoutHomeStatisticsCharts from '@/views/layout-home/layout-home-statistics-charts'
</script>

<style scoped>
.stat{
    display: flex;
    flex-flow: column;
    padding: 20px;
    box-sizing: border-box;
}
.stat-header{
    display: flex;
    justify-content: space-between;
}
.stat-header>.title{
    font-size: 18px;
    color: var(--main-child-title);
}
.charts{
    position: relative;
    margin-top: 20px;
    height: 100%;
}

</style>