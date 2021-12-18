<template>
    <div class="base-config-container">
        <div class="title">基本配置</div>
        <van-cell-group inset class="base-config-wrap">
            <van-cell icon="wap-home-o" title="房间" is-link label="新增或修改房间" @click="goRoomConfig"/>
            <van-cell icon="points" title="分类" is-link label="新增或修改分类" @click="goCategoryConfig"/>
            <van-cell icon="delete-o" title="回收站" is-link label="查看回收站物品" @click="goRecycleBin"/>
        </van-cell-group>
    </div>
</template>

<script>
  export default {
    name: "BaseConfig",
    data () {
      return {

      }
    },
    methods: {
      goRoomConfig () {
        this.$router.push(
          {
            name: 'RoomPopup'
          }
        )
      },
      goCategoryConfig () {
        this.$router.push(
          {
            name: 'CategoryPopup'
          }
        )
      },
      goRecycleBin () {
        this.$router.push(
          {
            name: 'RecycleBin'
          }
        )
      }
    }
  }
</script>

<style scoped lang="scss">
    .base-config-container {
        .title {
            padding-left: 30px;
            color: #f68024;
            line-height: 4vh;
            font-weight: bold;
        }
    }
</style>
