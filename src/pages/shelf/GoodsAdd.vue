<template>
    <div class="goods-detail-container">
        <j-panel :title="title" @return="returnRoute">
        <van-form class="goods-form">
            <van-field
                    v-model="formData.goodsName"
                    input-align="right"
                    name="物品名称"
                    required
                    placeholder="请输入"
                    label="物品名称"/>
            <van-field
                    v-model="formData.count"
                    input-align="right"
                    type="digit"
                    required
                    label="数量" />
            <van-field
                    v-model="formData.room"
                    input-align="right"
                    is-link
                    readonly
                    required
                    label="房间"
                    placeholder="选择"
                    @click="showRoomPop"
            />
            <van-field
                    v-model="formData.category"
                    input-align="right"
                    is-link
                    readonly
                    required
                    label="分类"
                    placeholder="选择"
                    @click="showRoomPop"
            />
            <van-field
                    v-model="formData.goodsTag"
                    input-align="right"
                    name="物品品牌"
                    placeholder="请输入"
                    label="物品品牌"/>
            <van-field
                    name="rate"
                    input-align="right"
                    label="重要程度">
                <template #input>
                    <van-rate v-model="formData.rate" />
                </template>
            </van-field>
            <van-field name="photo" label="文件上传">
                <template #input>
                    <van-uploader v-model="formData.photo" />
                </template>
            </van-field>
            <van-field
                    v-model="formData.remark"
                    input-align="right"
                    rows="4"
                    autosize
                    label="备注"
                    type="textarea"
                    maxlength="50"
                    placeholder="请输入备注"
                    show-word-limit
            />
            <div class="submit-btn">
                <van-button round block type="info" native-type="submit">{{$route.query.isEdit ? '修改' : '提交'}}</van-button>
            </div>

        </van-form>
        </j-panel>
    </div>
</template>

<script>
  export default {
    name: "GoodsDetail",
    data () {
      return {
        title: this.$route.query.isEdit ? '编辑物品' : '新增物品',
        formData: {
          goodsName: '',
          count: 1,
          room: '',
          category: '',
          goodsTag: '',
          rate: 3,
          photo: [],
          remark: ''
        }
      }
    },
    methods: {
      returnRoute () {
        if (this.$route.query.isEdit) {
          this.$router.go(-1)
        } else {
          this.$router.push(
            {
              name: 'Shelf'
            }
          )
        }
      },
      showRoomPop () {}
    }
  }
</script>

<style scoped lang="scss">
    .goods-detail-container {
        background-color: #fff;
        height: calc(100% - 3.125rem);
        padding: 20px;
        .goods-form {
            border-radius: 20px;
            box-shadow: 0 2px 10px 5px rgba(0, 0, 0, 0.1);
            padding: 20px 40px;
            .submit-btn {
                padding: 1.2vh 30px;
                background-color: #fff;
            }
        }
    }
</style>
