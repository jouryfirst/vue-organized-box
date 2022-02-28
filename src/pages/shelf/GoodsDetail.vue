<template>
    <div class="goods-detail-container basic-container">
        <j-panel :title="detailData.goodsName" @return="returnRoute">
            <div class="goods-content">
                <div class="goods-wrapper">
                    <div class="goods-li is-flex">
                        <div class="goods-tag">
                            <div class="label">物品数量</div>
                            <div class="value">{{detailData.goodsCount || 0}}</div>
                        </div>
                        <div class="goods-tag">
                            <div class="label">品牌</div>
                            <div class="value">{{detailData.goodsTag || '无'}}</div>
                        </div>
                    </div>
                    <div class="goods-li is-flex">
                        <div class="goods-tag">
                            <div class="label">房间</div>
                            <div class="value">客厅</div>
                        </div>
                        <div class="goods-tag">
                            <div class="label">分类</div>
                            <div class="value">电子产品</div>
                        </div>
                    </div>
                    <div class="goods-li">
                        <div class="goods-tag">
                            <div class="label">重要程度</div>
                            <van-rate v-model="detailData.rate" />
                        </div>

                    </div>
                    <div class="goods-li">
                        <div class="goods-tag">
                            <div class="label">备注</div>
                            <div class="value">{{detailData.remark || '无备注'}}</div>
                        </div>
                    </div>
                </div>
                <div class="goods-img">
                    <div class="label">图片</div>
                    <img src="../../assets/logo.png" alt="">
                </div>
                <van-button class="edit-btn" type="info" round block @click="editGoods">编辑</van-button>
                <van-button type="danger" round block @click="deleteGoods">删除</van-button>
            </div>
        </j-panel>
    </div>
</template>

<script>
    import { getGoodsDetail } from "@/api/goodsApis";
    import {REQUEST_SUCCESS} from "@/constant";
  export default {
    name: "GoodsDetail",
    data () {
      return {
        detailData: {}
      }
    },
    methods: {
      returnRoute () {
        this.$router.go(-1)
      },
      async getGoodsDetail () {
        try {
          const { code, data } = await getGoodsDetail({id: this.$route.query.id})
          if (code === REQUEST_SUCCESS) {
            this.detailData = data || {}
          }
        } catch (e) {
          console.log(e)
        }
      },
      editGoods () {
        this.$router.push({
          name: 'goodsAdd',
          query: {
            id: this.$route.query.id
          }
        })
      },
      deleteGoods () {
        this.$dialog.confirm({
          title: '注意！',
          message: '要将该物品放入回收站吗？',
          theme: 'round-button',
        })
      }
    },
    mounted() {
      this.getGoodsDetail()
    }
  }
</script>

<style scoped lang="scss">
    .goods-detail-container {
        .goods-content {
            padding: 20px;
            max-height: 83vh;
            overflow-y: auto;
            .goods-wrapper {
                border-radius: 20px;
                box-shadow: 0 2px 10px 5px rgba(0, 0, 0, 0.1);
                padding: 20px 40px;
                margin-bottom: 2vh;
                .goods-li {
                    border-bottom: 1px solid #ddd;
                    .goods-tag {
                        flex: 1;
                        margin: 1.2vh 0;
                        .label {
                            color: #f6913a;
                            line-height: 3vh;
                            font-size: 16px;
                        }
                    }
                    &:last-child {
                        border: none;
                    }

                }
            }
            .goods-img {
                margin-bottom: 2vh;
                border-radius: 20px;
                box-shadow: 0 2px 10px 5px rgba(0, 0, 0, 0.1);
                padding: 40px;
                .label {
                    color: #f6913a;
                    line-height: 3vh;
                    font-size: 16px;
                }
            }
            .edit-btn {
                margin-bottom: 2vh;
            }
        }
    }
</style>
