import http from './httpInstance'
import { BASE_URL } from '@/constant'

const CURRENT_URL = '/shelf'

export const getRoomTabs = () => http.get(`${BASE_URL}${CURRENT_URL}/getRoomTabs`)
