import * as echarts from 'echarts/core'

import { LineChart, PieChart } from 'echarts/charts'

import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components'

import { LabelLayout } from 'echarts/features'

import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  LineChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LabelLayout,
  CanvasRenderer
])

export default echarts
