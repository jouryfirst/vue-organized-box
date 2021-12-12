<template>
    <div class="search-list-container">
        <van-pull-refresh
                v-model="refreshing"
                @refresh="onRefresh">
            <van-list
                    class="search-van-list"
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了">
                <div
                        class="search-item"
                        v-for="(item, index) in lists"
                        :key="index"
                >{{formateColor(item.label)}}</div>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
  export default {
    name: "SearchList",
    data () {
      return {
        loading: false,
        finished: true,
        refreshing: false,
        lists: []
      }
    },
    methods: {
      formateColor (label) {
        return label
      },
      onRefresh() {
        // 清空列表数据
        this.finished = false

        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true
        this.onLoad()
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
      }
    }
  }
</script>

<style scoped lang="scss">
    .search-list-container {
        .search-van-list {
            padding: 20px 2.7vw;
            .search-item {
                line-height: 7.6vh;
                padding-left: 40px;
                border-bottom: 1px solid #ccc;
            }
        }
    }
</style>
