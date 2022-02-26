<template>
    <div class="search-list-container">
            <van-list
                    class="search-van-list"
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了">
                <div
                        class="search-item"
                        v-for="(item, index) in lists"
                        @click="goGoodsDetail(item)"
                        :key="index"
                        v-html="formateColor(item.goodsName)"
                ></div>
            </van-list>
    </div>
</template>

<script>
  import { getGoodsLists } from '@/api/goodsApis'
  import {REQUEST_SUCCESS} from "@/constant";

  export default {
    name: "SearchList",
    data () {
      return {
        loading: false,
        finished: true,
        lists: []
      }
    },
    props: {
      searchValue: {
        type: String,
        default: ''
      }
    },
    watch: {
      searchValue: function (val) {
        // TODO 防抖
        this.getSearchLists(val)
      }
    },
    mounted() {
      this.getSearchLists()
    },
    methods: {
      formateColor (label) {
        const labelReg = new RegExp(this.searchValue, 'g')
        const newLabel =  label.replace(labelReg, `<span style="color: red">${this.searchValue}</span>`)
        return newLabel
      },
      async getSearchLists (val = '') {
        try {
          const { code, data } = await getGoodsLists({goodsName: val})
          this.refreshing = false
          this.loading = false
          if (code === REQUEST_SUCCESS) {
            this.lists = data.goodsList || []
          }
        } catch (e) {
          console.log(e)
        }
      },
      onLoad () {
        setTimeout(() => {
          if (this.refreshing) {
            this.lists = [];
            this.refreshing = false;
          }

          for (let i = 0; i < 10; i++) {
            this.lists.push(
              {
                label: `遥控器${i}`
              }
            );
          }
          this.loading = false;

          if (this.lists.length === 10) {
            this.finished = true;
          }
        }, 1000);
      },
      goGoodsDetail (item) {
        this.$router.push(
          {
            name: 'goodsDetail',
            query: {
              name: item.name || '0'
            }
          }
        )
      }
    }
  }
</script>

<style scoped lang="scss">
    .search-list-container {
        .search-van-list {
            max-height: calc(100vh - 5rem);
            padding: 20px 2.7vw;
            overflow-x: hidden;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
            &::-webkit-scrollbar {
                display: none;
            }
            .search-item {
                line-height: 7.6vh;
                padding-left: 40px;
                border-bottom: 1px solid #ccc;
            }
        }
    }
</style>
