import http from './httpInstance'
import { BASE_URL } from '@/constant'
import qs from 'qs'

const CURRENT_URL = '/options'

// 获取房间列表
export const getRoomLists = () => http.get(`${BASE_URL}${CURRENT_URL}/getRoomsList`)

// 添加房间
export const addRoom = (params) => http.get(`${BASE_URL}${CURRENT_URL}/addRoom?` + qs.stringify(params))

// 编辑房间
export const editRoom = (params) => http.get(`${BASE_URL}${CURRENT_URL}/editRoom?` + qs.stringify(params))

// 添加房间
export const deleteRoom = (params) => http.get(`${BASE_URL}${CURRENT_URL}/deleteRoom?` + qs.stringify(params))
