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
  import { getGoodsLists } from '@/api/goodsApis';
  import {REQUEST_SUCCESS} from "@/constant";

  export default {
    name: "CategoryChart",
    mixins: [echartsMixins],
    methods: {
      async getChartData() {
        try {
          const params= {
            pageSize: 1000,
            sortType: 2
          }
          const { code, data } = await getGoodsLists(params)
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
        return data.map(item => {
          return {
            value: item.count,
            name: item.label
          }
        })
      },
      drawChart(data) {
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
              data: data
            }
          ]
        }
        this.charts.setOption(options)
      }
    },
    created() {
      this.getChartData()
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
