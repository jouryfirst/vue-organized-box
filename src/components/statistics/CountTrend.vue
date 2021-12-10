<template>
    <div class="count-trend-chart statistics-box">
        <div class="title">
            <div class="label">物品数量趋势</div>
        </div>
        <div class="count-trend-chart" ref="countTrendChart"></div>
    </div>
</template>

<script>
  export default {
    name: "CountTrend"
  }
</script>

<style scoped lang="scss">
    .count-trend-chart {
        height: 32vh;
    }
</style>
