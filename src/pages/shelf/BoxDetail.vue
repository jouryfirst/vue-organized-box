<template>
    <div class="box-detail-container basic-container">
        <j-panel class="box-detail-panel" :title="title" @return="returnRoute">
            <van-list
                    class="box-detail-lists"
                    :finished="finished"
                    v-model="loading">
                <van-cell
                        v-for="(item, index) in boxLists"
                        @click="goGoodsDetail(item)"
                        :key="index"
                        :title="`${item.goodsName} （${item.goodsCount}个）`"
                        :label="item.position"
                ></van-cell>
            </van-list>
        </j-panel>
    </div>
</template>

<script>
  import { getGoodsLists } from "@/api/goodsApis";
  import { REQUEST_SUCCESS } from "@/constant";
  export default {
    name: "BoxDetail",
    data () {
      return {
        title: '',
        loading: false,
        finished: false,
        boxLists: []
      }
    },
    created() {
      this.init()
    },
    mounted() {
      this.title = this.$route.query && this.$route.query.boxName
    },
    methods: {
      init () {
        const { roomCode, boxName } = this.$route.query
        this.getGoodsLists(+roomCode, boxName)
      },
      returnRoute () {
        this.$router.push(
          {
            name: 'Shelf'
          }
        )
      },
      async getGoodsLists (roomCode, position) {
        try {
          this.loading = true
          const params = {
            roomCode,
            position
          }
          const { code, data } = await getGoodsLists(params)
          this.loading = false
          this.finished = true
          if (code === REQUEST_SUCCESS) {
            this.boxLists = data.goodsList || []
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
              id: item.id
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
