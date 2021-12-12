import Mock from "mockjs";
import {BASE_URL} from "../constant";

Mock.mock(`${BASE_URL}/shelf/getRoomTabs`, {
  'code': '0',
  'data': [
    {
      'title': '客厅',
      'code': 'a'
    },
    {
      'title': '主卧',
      'code': 'b'
    },
    {
      'title': '次卧',
      'code': 'c'
    },
    {
      'title': '阳台',
      'code': 'd'
    }
  ],
  'msg': 'success'
})

Mock.mock(/http:\/\/localhost:8080\/shelf\/getSearchLists/, {
  'code': '0',
  'data|50-200': [
    {
      'label': '@name'
    }
  ],
  'msg': 'success'
})
