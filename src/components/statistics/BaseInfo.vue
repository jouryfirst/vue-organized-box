<template>
    <div class="statistics-base-info statistics-box is-flex">
        <div class="base-info-wrapper">
            <div class="num overflow">{{infoData.goodsCount}}</div>
            <div class="label">物品数量</div>
        </div>
        <div class="base-info-wrapper">
            <div class="num overflow">{{infoData.roomCount}}</div>
            <div class="label">房间数量</div>
        </div>
        <div class="base-info-wrapper">
            <div class="num overflow">{{infoData.categoryCount}}</div>
            <div class="label">物品种类</div>
        </div>
    </div>
</template>

<script>
  import { getStatisticsInfo } from "@/api/statisticsApis";
  import {REQUEST_SUCCESS} from "@/constant";

  export default {
    name: "BaseInfo",
    data () {
      return {
        infoData: {
          goodsCount: 0,
          roomCount: 0,
          categoryCount: 0
        }
      }
    },
    methods: {
      async _getStatisticsInfo () {
        try {
          const { code, data } = await getStatisticsInfo()
          if (code === REQUEST_SUCCESS) {
            this.infoData = data || {
              goodsCount: 0,
              roomCount: 0,
              categoryCount: 0
            }
          }
        } catch (e) {
          console.log(e)
        }
      },
      init () {
        this._getStatisticsInfo()
      }
    },
    mounted() {
      this.init()
    }
  }
</script>

<style scoped lang="scss">
    .statistics-base-info {
        align-items: center;
        justify-content: space-around;
        .base-info-wrapper {
            text-align: center;
            .label {
                font-size: 14px;
            }
        }
    }
</style>
