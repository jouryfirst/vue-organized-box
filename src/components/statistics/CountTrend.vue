<template>
    <div class="count-trend-chart-container statistics-box">
        <div class="title">
            <div class="label">物品数量趋势</div>
        </div>
        <div class="count-trend-chart" ref="countTrendChart"></div>
    </div>
</template>

<script>
    import { getGoodsByDate } from '@/api/statisticsApis'
  import {echartsMixins} from "@/utils/mixins/echartsMixins";
    import {REQUEST_SUCCESS} from "@/constant";
  export default {
    name: "CountTrend",
    mixins: [echartsMixins],
    methods: {
      async getChartData () {
        try {
          const { code, data } = await getGoodsByDate()
          if (code === REQUEST_SUCCESS) {
            if (data && data.length) {
              const newData = this.formateData(data)
              this.drawChart(newData)
            } else {
              this.charts && this.charts.clear()
            }
          }
        } catch (e) {
          console.log(e)
        }
      },
      formateData (data) {
        const newData = {
          dataX: [],
          dataY: []
        }
        data.forEach(item => {
          newData.dataX.push(item.date)
          newData.dataY.push(item.count)
        })
        return newData
      },
      drawChart(data) {
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
            data: data.dataX
          },
          yAxis: {
            type: 'value',
            minInterval: 1
          },
          series: [
            {
              data: data.dataY,
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
