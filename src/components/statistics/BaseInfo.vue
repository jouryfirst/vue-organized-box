<template>
    <div class="statistics-base-info statistics-box is-flex">
        <div class="base-info-wrapper">
            <div class="num overflow">{{infoData.goodsNum}}</div>
            <div class="label">物品数量</div>
        </div>
        <div class="base-info-wrapper">
            <div class="num overflow">{{infoData.roomNum}}</div>
            <div class="label">房间数量</div>
        </div>
        <div class="base-info-wrapper">
            <div class="num overflow">{{infoData.categoryNum}}</div>
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
          goodsNum: 0,
          roomNum: 0,
          categoryNum: 0
        }
      }
    },
    methods: {
      async _getStatisticsInfo () {
        try {
          const { code, data } = await getStatisticsInfo()
          if (code === REQUEST_SUCCESS) {
            this.infoData = data || {
              goodsNum: 0,
              roomNum: 0,
              categoryNum: 0
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
