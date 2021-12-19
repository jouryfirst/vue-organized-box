<template>
    <div class="recycle-bin-container basic-container">
        <j-panel title="回收站" @return="returnRoute">
            <van-notice-bar
                    left-icon="volume-o"
                    text="右滑恢复物品，左滑彻底删除物品"
            />
            <div class="recycle-bin-wrap">
                <div class="recycle-bin-li">
                    <van-swipe-cell
                            class="recycle-bin-swipe-cell"
                            v-for="(item, index) in recycleLists"
                            :key="index">
                        <template #left>
                            <van-button square type="primary" text="还原物品" />
                        </template>
                        <van-cell :border="false" :title="item.name"/>
                        <template #right>
                            <van-button square type="danger" text="彻底删除" />
                        </template>
                    </van-swipe-cell>
                </div>
                <van-button type="danger" round block @click="clearBin">清空回收站</van-button>
            </div>
        </j-panel>
    </div>
</template>

<script>
  export default {
    name: "RecycleBin",
    data () {
      return {
        recycleLists: [
          {
            name: '不要的东西'
          },
          {
            name: '不要的东西'
          }
        ]
      }
    },
    methods: {
      returnRoute () {
        this.$router.push(
          {
            name: 'Config'
          }
        )
      },
      clearBin () {

      }
    }
  }
</script>

<style scoped lang="scss">
    .recycle-bin-container {
        .recycle-bin-wrap {
            padding: 10px 20px;
            margin-top: 20px;
            .recycle-bin-li {
                border-radius: 20px;
                box-shadow: 0 2px 10px 5px rgba(0, 0, 0, 0.1);
                padding: 20px 40px;
                margin-bottom: 1.6vh;
                max-height: 69vh;
                overflow-y: auto;
                .recycle-bin-swipe-cell {
                    border-bottom: 1px solid #ddd;
                    &:last-child {
                        border-bottom: none;
                    }
                }
            }
        }
    }
</style>
