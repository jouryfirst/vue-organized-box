<template>
    <div class="category-chart-container statistics-box">
        <div class="title">
            <div class="label">分类占比</div>
        </div>
        <div class="category-chart" ref="categoryChart"></div>
    </div>
</template>

<script>
  import {echartsMixins} from "@/utils/mixins/echartsMixins";

  export default {
    name: "CategoryChart",
    mixins: [echartsMixins],
    methods: {
      getChartData() {
        this.drawChart()
      },
      drawChart() {
        this.charts && this.charts.clear()
        this.charts = this.$echarts.init(this.$refs.categoryChart)
        const chartWidth = this.charts.getWidth()
        const options = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            type: 'scroll',
            top: '10'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              center: ['50%', '60%'],
              avoidLabelOverlap: true,
              legendHoverLink: false,
              itemStyle: {
                borderRadius: 4,
                borderColor: '#fff',
                borderWidth: 1
              },
              label: {
                alignTo: 'edge',
                formatter: '{name|{b}}\n{value|{c} 个}',
                minMargin: 5,
                edgeDistance: 10,
                lineHeight: 15,
                rich: {
                  value: {
                    fontSize: 10,
                    color: '#999'
                  }
                }
              },
              labelLine: {
                length: 15,
                length2: 0,
                maxSurfaceAngle: 80
              },
              labelLayout: function (params) {
                const isLeft = params.labelRect.x < chartWidth / 2;
                const points = params.labelLinePoints;
                points[2][0] = isLeft
                  ? params.labelRect.x
                  : params.labelRect.x + params.labelRect.width;
                return {
                  labelLinePoints: points
                };
              },
              data: [
                {value: 1048, name: '电子产品'},
                {value: 735, name: '说明书'},
                {value: 580, name: '数据线'},
                {value: 484, name: '化妆品'},
                {value: 300, name: '玩具'}
              ]
            }
          ]
        }
        this.charts.setOption(options)
      }
    }
  }
</script>

<style scoped lang="scss">
    .category-chart-container {
        height: 40vh;

        .category-chart {
            height: 30vh;
        }
    }
</style>
