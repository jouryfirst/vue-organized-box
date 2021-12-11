export const echartsMixins = {
  data () {
    return {
      charts: null,
      // 部分情况需控制mounted中顺序
      isMounted: true
    }
  },
  methods: {

  },
  mounted () {
    this.isMounted && this.getChartData()
  },
  beforeDestroy () {
    this.charts && this.charts.dispose()
    // echarts有时内存不能自动释放
    this.charts = null
  }
}
