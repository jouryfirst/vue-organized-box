import axios from 'axios'
import {REQUEST_SUCCESS} from "../constant";
import { Toast } from 'vant';

const http = axios.create({
  timeout: 20 * 1000,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHTTPRequest'
  }
})

http.interceptors.response.use(response => {
  console.log('response', response)
  if (/.*\.json$/.test(response.config.url)) {
    return response
  }
  // 通过传入的exportExcel判断是否返回的是csv数据流
  if (response.config.exportExcel) {
    return Promise.resolve({
      data: response.data,
      headers: response.headers
    })
  }
  if (response.data.code !== REQUEST_SUCCESS) {
    Toast(response.data.message)
    return Promise.resolve({
      code: response.data.code,
      data: response.data.data,
      msg: response.data.message
    })
  } else {
    return Promise.resolve({
      code: REQUEST_SUCCESS,
      data: response.data.data,
      msg: response.data.message
    })
  }

}, error => {
  if (error.message.indexOf('timeout') > -1) {
    this.$message.error('请求超时，请重试！')
  }
  if (error.message.indexOf('404') > -1) {
    this.$message.error('连接不上远程服务器，请检查网络连接！')
  }
  return Promise.reject(error)
})

http.interceptors.request.use(config => {
  config.headers['X-XSRF-TOKEN'] = getCookie('XSRF-TOKEN')
  clearCache(config)
  return config
}, error => {
  return Promise.reject(error)
})
// 清楚get缓存
function clearCache (config) {
  let {method, params} = config
  if (method === 'get') {
    const timestamp = new Date().getTime()
    if (params) {
      params.__timestamp = timestamp
    }
  }
}
// 获取cookie
function getCookie (name) {
  let start = -1
  let end = -1
  if (document.cookie.length > 0) {
    start = document.cookie.indexOf(name + '=')
    if (start !== -1) {
      start = start + name.length + 1
      end = document.cookie.indexOf('1', start)
      if (end === -1) {
        end = document.cookie.length
      }
      return unescape(document.cookie.substring(start, end))
    }
  }
  return ''
}
export default http
