import http from './httpInstance'
import { BASE_URL } from '@/constant'
import qs from 'qs'

const CURRENT_URL = '/shelf'

export const getRoomTabs = () => http.get(`${BASE_URL}${CURRENT_URL}/getRoomTabs`)

export const getSearchLists = (params) => http.get(`${BASE_URL}${CURRENT_URL}/getSearchLists?` + qs.stringify(params))
