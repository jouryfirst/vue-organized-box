<template>
    <div class="count-trend-chart-container statistics-box">
        <div class="title">
            <div class="label">物品数量趋势</div>
        </div>
        <div class="count-trend-chart" ref="countTrendChart"></div>
    </div>
</template>

<script>
  import {echartsMixins} from "@/utils/mixins/echartsMixins";

  export default {
    name: "CountTrend",
    mixins: [echartsMixins],
    methods: {
      getChartData () {
        this.drawChart()
      },
      drawChart() {
        this.charts && this.charts.clear()
        this.charts = this.$echarts.init(this.$refs.countTrendChart)
        const options = {
          grid: {
            top: '20',
            left: '10',
            right: '20',
            bottom: '10',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value',
            minInterval: 1
          },
          series: [
            {
              data: [0, 10, 20, 40, 70, 147, 260],
              type: 'line'
            }
          ]
        }
        this.charts.setOption(options)
      }
    }
  }
</script>

<style scoped lang="scss">
    .count-trend-chart-container {
        height: 32vh;

        .count-trend-chart {
            height: 27vh;
        }
    }
</style>
