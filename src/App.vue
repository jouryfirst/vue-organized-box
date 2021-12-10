<template>
  <div id="app">
      <router-view />
      <van-tabbar route>
          <van-tabbar-item replace to="/shelf" icon="wap-home-o">房间</van-tabbar-item>
          <van-tabbar-item replace to="/statistics" icon="chart-trending-o">统计</van-tabbar-item>
          <van-tabbar-item replace to="/config" icon="setting-o">配置</van-tabbar-item>
          <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
      </van-tabbar>
  </div>
</template>

<script>


export default {
  name: 'App'
}
</script>

<style scoped lang="scss">
    #app {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 0;
        width: 100%;
        height: 100%;
        background: #7d8188;
        overflow: hidden;
    }
</style>
