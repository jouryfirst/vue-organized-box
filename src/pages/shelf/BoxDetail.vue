<template>
    <div class="box-detail-container basic-container">
        <j-panel class="box-detail-panel" :title="title" @return="returnRoute">
            <van-sidebar v-model="activeTab">
                <van-sidebar-item title="全部"></van-sidebar-item>
                <van-sidebar-item title="全部"></van-sidebar-item>
                <van-sidebar-item title="全部"></van-sidebar-item>
            </van-sidebar>
            <van-list
                    class="box-detail-lists"
                    v-model="loading">
                <van-cell
                        v-for="(item, index) in boxLists"
                        @click="goGoodsDetail(item)"
                        :key="index"
                        :title="item.name"
                        :label="item.location"
                ></van-cell>
            </van-list>
        </j-panel>
    </div>
</template>

<script>
  export default {
    name: "BoxDetail",
    data () {
      return {
        title: '',
        activeTab: 0,
        loading: false,
        boxLists: [
          {
            name: '遥控器',
            location: '客厅'
          },
          {
            name: '遥控器',
            location: '客厅'
          },
          {
            name: '遥控器',
            location: '客厅'
          }
        ]
      }
    },
    mounted() {
      this.title = this.$route.query && this.$route.query.boxName
    },
    methods: {
      returnRoute () {
        this.$router.push(
          {
            name: 'Shelf'
          }
        )
      },
      async getCategoryLists () {
        try {
          const params = {

          }
        } catch (e) {
          console.log(e)
        }
      },
      goGoodsDetail (item) {
        this.$router.push(
          {
            name: 'goodsDetail',
            query: {
              name: item.name
            }
          }
        )
      }
    }
  }
</script>

<style scoped lang="scss">
    .box-detail-container {
        background-color: #fff;
        .box-detail-panel {
            ::v-deep.content {
                display: flex;
            }
            .box-detail-lists {
                border-left: 1px solid #ddd;
                width: calc(100% - 5rem);
                height: 90vh;
                background-color: #fff;
            }
        }
    }
</style>
