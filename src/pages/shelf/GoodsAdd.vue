<template>
    <div class="goods-detail-container basic-container">
        <j-panel :title="title" @return="returnRoute">
        <van-form validate-first class="goods-form">
            <van-field
                    v-model="formData.goodsName"
                    input-align="right"
                    name="goodsValidate"
                    required
                    placeholder="请输入"
                    label="物品名称"
                    :rules="[{ validator: goodsValidate, message: '不能包含特殊字符' }]"
            />
            <van-field
                    v-model="formData.goodsCount"
                    input-align="right"
                    type="digit"
                    name="digitValidate"
                    required
                    label="数量"
                    :rules="[{ validator: digitValidate, message: '必须是正整数' }]"
            />
            <van-field
                    v-model="formData.room"
                    input-align="right"
                    name="picker"
                    is-link
                    readonly
                    required
                    label="房间"
                    placeholder="选择"
                    @click="showRoomPop('roomLists')"
            />
            <van-field
                    v-model="formData.category"
                    input-align="right"
                    is-link
                    readonly
                    required
                    label="分类"
                    placeholder="选择"
                    @click="showRoomPop('categoryLists')"
            />
            <van-field
                    v-model="formData.position"
                    input-align="right"
                    name="goodsValidate"
                    required
                    placeholder="请输入"
                    label="存放位置"
                    :rules="[{ validator: goodsValidate, message: '不能包含特殊字符' }]"
            />
            <van-field
                    v-model="formData.goodsTag"
                    input-align="right"
                    name="goodsValidate"
                    placeholder="请输入"
                    label="物品品牌"
                    :rules="[{ validator: goodsValidate, message: '不能包含特殊字符' }]"
            />
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
                <van-button round block type="info" native-type="submit" @click="submit">{{$route.query.id ? '修改' : '提交'}}</van-button>
            </div>

        </van-form>
            <van-popup v-model="popVisible" round position="bottom">
                <van-picker
                        :show-toolbar="true"
                        toolbar-position="top"
                        :columns="pickerColumns"
                        @confirm="confirmPicker"
                        @cancel="onCancel"></van-picker>
            </van-popup>
        </j-panel>
    </div>
</template>

<script>
    import regExp from '@/utils/formRules'
    import { getRoomLists, getCategoriesList } from "@/api/optionsApis";
    import {REQUEST_SUCCESS} from "@/constant";
    import { addGoods } from "@/api/goodsApis";
    import { Toast } from 'vant';

  export default {
    name: "GoodsDetail",
    data () {
      return {
        title: this.$route.query.id ? '编辑物品' : '新增物品',
        formData: {
          goodsName: '',
          goodsCount: 1,
          room: '',
          category: '',
          position: '',
          goodsTag: '',
          rate: 3,
          photo: [],
          remark: ''
        },
        submitData: {
          room: '',
          category: '',
        },
        popVisible: false,
        roomLists: [],
        categoryLists: [],
        pickerColumns: []
      }
    },
    methods: {
      goodsValidate(val) {
        return regExp.hasSpecialString.test(val)
      },
      digitValidate (val) {
        return regExp.isInteger.test(val)
      },
      returnRoute () {
        if (this.$route.query.id) {
          this.$router.go(-1)
        } else {
          this.$router.push(
            {
              name: 'Shelf'
            }
          )
        }
      },
      async getRoomList () {
        try {
          const {code, data} = await getRoomLists()
          if (code === REQUEST_SUCCESS) {
            this.roomLists = data.map(item => {
              return {
                text: item.roomName,
                code: item.code,
                type: 'room'
              }
            }) || []
          }
        } catch (e) {
          console.log(e)
        }
      },
      async getCategoriesList () {
        try {
          const {code, data} = await getCategoriesList()
          if (code === REQUEST_SUCCESS) {
            this.categoryLists = data.map(item => {
              return {
                text: item.categoryName,
                code: item.code,
                type: 'category'
              }
            }) || []
          }
        } catch (e) {
          console.log(e)
        }
      },
      showRoomPop (type) {
        this.pickerColumns = this[type]
        this.popVisible = true
      },
      confirmPicker (value) {
        // 奇葩的vant，回显和值是分开的
        this.formData[value.type] = value.text
        this.submitData[value.type] = value.code
        this.popVisible = false
      },
      onCancel () {
        this.popVisible = false
      },
      // 保存或修改
      submit () {
        let params = {
          ...this.formData,
          roomCode: this.submitData.room,
          categoryCode: this.submitData.category
        }
        if (this.$route.query.id) {
          params.id = this.$route.query.id
          this.submitEditGoods(params)
        } else {
          this.submitAddGoods(params)
        }
      },
      async submitAddGoods (params) {
        try {
          const { code } = await addGoods(params)
          if (code === REQUEST_SUCCESS) {
            Toast('添加物品成功！')
          }
        } catch (e) {
          console.log(e)
        }
      },
      submitEditGoods () {

      },
      init () {
        this.getRoomList()
        this.getCategoriesList()
      }
    },
    mounted() {
      this.init()
    }
  }
</script>

<style scoped lang="scss">
    .goods-detail-container {
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
