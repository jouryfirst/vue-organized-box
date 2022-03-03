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
        <search-list ref="searchList" class="search-list" :search-value="searchValue" v-if="searchListVis"></search-list>
        <van-tabs v-model="activeTab">
            <van-tab
                    v-for="(item, index) in tabLists"
                    :key="index"
                    :title="item.roomName"
                    :name="item.code"></van-tab>
        </van-tabs>
        <van-dropdown-menu>
            <van-dropdown-item v-model="sortType" :options="sortOptions" @change="changeSortType"></van-dropdown-item>
        </van-dropdown-menu>
        <div class="box-content">
            <box-content v-if="sortType !== 0" :boxLists="goodsList"></box-content>
            <not-classified v-else></not-classified>
        </div>
        <div class="add-good-btn" @click="addGoods">
            <van-icon color="#fff" name="plus" />
        </div>
    </div>
</template>

<script>
  import BoxContent from "@/components/shelf/BoxContent";
  import NotClassified from "@/components/shelf/NotClassified";
  import SearchList from "@/components/shelf/SearchList";
  import {getRoomLists} from "@/api/optionsApis";
  import { getGoodsLists } from '@/api/goodsApis';
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
            roomName: '全部',
            code: 'all'
          }
        ],
        sortType: 1,
        sortOptions: [
          {
            text: '按位置',
            value: 1
          },
          {
            text: '按分类',
            value: 2
          },
          {
            text: '不分组',
            value: 0
          }
        ],
        goodsList: []
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
          const {code, data} = await getRoomLists()
          if (code === REQUEST_SUCCESS) {
            this.tabLists = data || []
            this.tabLists.unshift({
              roomName: '全部',
              code: 'all'
            })
          }
        } catch (e) {
          console.log(e)
        }
      },
      changeSortType (val) {
        this.getGoodsLists(val)
      },
      addGoods () {
        this.$router.push(
          {
            name: 'goodsAdd',
            query: {
              roomName: this.tabLists.filter(item => item.code === this.activeTab)[0].roomName,
              roomCode: this.activeTab
            }
          }
        )
      },
      async getGoodsLists (val = 1) {
        try {
          const params = {
            sortType:val
          }
          if (this.activeTab !== 'all') {
            params.roomCode = this.activeTab
          }
          const { code, data } = await getGoodsLists(params)
          if (code === REQUEST_SUCCESS) {
            this.goodsList = val === 0 ? data.goodsList : data
          }
        } catch (e) {
          console.log(e)
        }
      },
      init () {
        this.getRoomTabs()
        this.getGoodsLists()
      }
    },
    created() {
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
        .add-good-btn {
            position: fixed;
            z-index: 9;
            right: 7%;
            bottom: 300px;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            text-align: center;
            line-height: 100px;
            background-color: #fcb643;
        }
    }
</style>
