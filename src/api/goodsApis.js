import http from './httpInstance'
import { BASE_URL } from '@/constant'

const CURRENT_URL = '/goods'

// 添加物品
export const addGoods = (params) => http.post(`${BASE_URL}${CURRENT_URL}/addGoods`, params)

// 获取物品列表
export const getGoodsLists = (params) => http.post(`${BASE_URL}${CURRENT_URL}/getGoodsList`, params)
