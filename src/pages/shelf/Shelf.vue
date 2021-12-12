<template>
    <div class="box-shelf-container">
        <div class="box-shelf-header">
            <van-search
                    v-model="searchValue"
                    show-action
                    placeholder="请输入物品名称"
                    @focus="showSearchList"
                    @cancel="hideSearchList"
            ></van-search>
        </div>
        <search-list class="search-list" v-show="searchListVis"></search-list>
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
  import SearchList from "@/components/shelf/SearchList";
  import {getRoomTabs} from "@/api/shelfApis";
  import {REQUEST_SUCCESS} from "@/constant";

  export default {
    name: "Shelf",
    components: {
      BoxContent,
      NotClassified,
      SearchList
    },
    data() {
      return {
        searchValue: '',
        searchListVis: false,
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
    },
    methods: {
      showSearchList () {
        this.searchListVis = true
      },
      hideSearchList () {
        this.searchListVis = false
      },
      async getRoomTabs() {
        try {
          const {code, data} = await getRoomTabs()
          if (code === REQUEST_SUCCESS) {
            this.tabLists = data || []
            this.tabLists.unshift({
              title: '全部',
              code: 'all'
            })
          }
        } catch (e) {
          console.log(e)
        }
      },
      init () {
        this.getRoomTabs()
      }
    },
    mounted() {
      this.init()
    }
  }
</script>

<style scoped lang="scss">
    .box-shelf-container {
        position: relative;
        .search-list {
            position: absolute;
            z-index: 10;
            background-color: rgba(255,255,255, 0.9);
            width: 100%;
            height: calc(100vh - 3.45rem);
        }
        .box-content {
            height: calc(100vh - 12rem);
        }
    }
</style>
