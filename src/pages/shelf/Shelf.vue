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
        <van-tabs v-model="activeTab" @change="changeTabs">
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
            <div class="box-content-container is-flex" v-if="sortType !== 0" >
                <div
                        class="box-wrapper"
                        v-for="(item, index) in goodsList"
                        :key="index"
                        @click="showBoxDetail(item)"
                >
                    <div class="label">{{item.label}}</div>
                    <div class="num overflow">
                        <span>{{item.count}}</span>
                        <span>个物品</span>
                    </div>
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="`#icon--box${Math.floor(Math.random() * 5 + 1)}`"></use>
                    </svg>
                    <!--            <i class="iconfont" :class="`icon&#45;&#45;box${Math.floor(Math.random() * 6)}`"></i>-->
                </div>
                <van-empty class="box-content-empty" v-if="!goodsList.length" description="暂无数据" />
            </div>
            <not-classified v-else></not-classified>
        </div>
        <div class="add-good-btn" @click="addGoods">
            <van-icon color="#fff" name="plus" />
        </div>
    </div>
</template>

<script>
  import NotClassified from "@/components/shelf/NotClassified";
  import SearchList from "@/components/shelf/SearchList";
  import {getRoomLists} from "@/api/optionsApis";
  import { getGoodsLists } from '@/api/goodsApis';
  import {REQUEST_SUCCESS} from "@/constant";

  export default {
    name: "Shelf",
    components: {
      NotClassified,
      SearchList
    },
    data() {
      return {
        searchValue: '',
        searchListVis: false,
        activeTab: '0',
        tabLists: [
          {
            roomName: '全部',
            code: '0'
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
              code: '0'
            })
          }
        } catch (e) {
          console.log(e)
        }
      },
      changeSortType (val) {
        this.getGoodsLists(val)
      },
      changeTabs () {
        this.getGoodsLists(this.sortType)
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
          if (this.activeTab !== '0') {
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
      showBoxDetail(item) {
        this.$router.push({
          name: 'BoxDetail',
          query: {
            boxName: item.label,
            sortType: this.sortType,
            roomCode: this.activeTab
          }
        })
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
            .box-content-container {
                height: 100%;
                background-color: #fff;
                flex-wrap: wrap;
                align-content: flex-start;
                padding: 40px;
                .box-wrapper {
                    cursor: pointer;
                    user-select: none;
                    width: 30%;
                    text-align: center;
                    height: 300px;
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 0 15px 2px rgba(0,0,0,0.1);
                    &:nth-child(3n+1) {
                        margin: 0 2.5% 30px 0;
                    }
                    &:nth-child(3n+2) {
                        margin: 0 2.5% 30px 2.5%;
                    }
                    &:nth-child(3n+3) {
                        margin: 0 0 30px 2.5%;
                    }
                    .icon {
                        margin-top: 20px;
                        width: 110px;
                        height: 110px;
                        vertical-align: -0.15em;
                        fill: currentColor;
                        overflow: hidden;
                    }
                }
                .box-content-empty {
                    width: 100%;
                }
            }
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
