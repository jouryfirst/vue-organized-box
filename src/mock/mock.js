import Mock from 'mockjs'
import { BASE_URL } from '../constant'
import './shelf'

Mock.mock(`${BASE_URL}/statistics/getStatisticsInfo`, {
  'code': '0',
  'data': {
    'goodsNum': 110,
    'roomNum': 5,
    'categoryNum': 70
  },
  'msg': 'success'
})
