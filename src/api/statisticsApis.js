import http from './httpInstance'
import { BASE_URL } from '@/constant'

const CURRENT_URL = '/statistics'

export const getStatisticsInfo = () => http.get(`${BASE_URL}${CURRENT_URL}/getBaseInfo`)

export const getGoodsByDate = () => http.get(`${BASE_URL}${CURRENT_URL}/getGoodsByDate`)
