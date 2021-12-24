import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './vantUI'
import './components/index'
import './style/common.scss'
import './mock/mock'
import echarts from './utils/echarts'
import './assets/iconfont/iconfont.js'
import './assets/iconfont/iconfont.css'

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
