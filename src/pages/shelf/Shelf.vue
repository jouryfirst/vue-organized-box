<template>
    <div class="box-shelf-container">
        <div class="box-shelf-header">
            <van-search v-model="searchValue" placeholder="请输入物品名称"></van-search>
        </div>
        <van-tabs v-model="activeTab">
            <van-tab
                    v-for="(item, index) in tabLists"
                    :key="index"
                    :title="item.title"
                    :name="item.code"></van-tab>
        </van-tabs>
        <van-dropdown-menu>
            <van-dropdown-item v-model="sortType" :options="sortOptions"></van-dropdown-item>
        </van-dropdown-menu>
        <div class="box-content">
            <box-content v-if="sortType !== 2"></box-content>
            <not-classified v-else></not-classified>
        </div>
    </div>
</template>

<script>
    import BoxContent from "@/components/shelf/BoxContent";
    import NotClassified from "@/components/shelf/NotClassified";
  export default {
    name: "Shelf",
    components: {
      BoxContent,
      NotClassified
    },
    data () {
      return {
        searchValue: '',
        activeTab: 'all',
        tabLists: [
          {
            title: '全部',
            code: 'all'
          },
          {
            title: '客厅',
            code: 'a'
          },
          {
            title: '主卧',
            code: 'b'
          }
        ],
        sortType: 0,
        sortOptions: [
          {
            text: '按位置',
            value: 0
          },
          {
            text: '按分类',
            value: 1
          },
          {
            text: '不分组',
            value: 2
          }
        ],
        scrollBottom: 50,
        initPosition: {
          x: 0,
          y: 0
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    .box-shelf-container {
        .box-content {
            height: calc(100vh - 12rem);
        }
    }
</style>
