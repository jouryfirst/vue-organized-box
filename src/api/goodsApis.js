import http from './httpInstance'
import { BASE_URL } from '@/constant'
import qs from 'qs'
const CURRENT_URL = '/goods'

// 添加物品
export const addGoods = (params) => http.post(`${BASE_URL}${CURRENT_URL}/addGoods`, params)

// 编辑物品
export const editGoods = (params) => http.post(`${BASE_URL}${CURRENT_URL}/editGoods`, params)

// 获取物品列表
export const getGoodsLists = (params) => http.post(`${BASE_URL}${CURRENT_URL}/getGoodsList`, params)

// 获取物品详情
export const getGoodsDetail = (params) => http.get(`${BASE_URL}${CURRENT_URL}/getGoodsDetail?` + qs.stringify(params))
