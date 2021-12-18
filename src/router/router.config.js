const router = [
  {
    path: '/statistics',
    name: 'Statistics',
    component: 'shelf/Statistics'
  },
  {
    path: '/config',
    name: 'Config',
    component: 'shelf/Config'
  },
  {
    path: '/user',
    name: 'User',
    component: 'shelf/User'
  },
  {
    path: '/statistics/boxDetail',
    name: 'BoxDetail',
    component: 'shelf/BoxDetail'
  },
  {
    path: '/shelf/goodsAdd',
    name: 'goodsAdd',
    component: 'shelf/GoodsAdd'
  },
  {
    path: '/shelf/goodsDetail',
    name: 'goodsDetail',
    component: 'shelf/GoodsDetail'
  },
  {
    path: '/config/roomPopup',
    name: 'RoomPopup',
    component: 'config/RoomPopup'
  },
  {
    path: '/config/categoryPopup',
    name: 'CategoryPopup',
    component: 'config/CategoryPopup'
  }
]

export default router
