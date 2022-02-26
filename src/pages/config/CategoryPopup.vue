<template>
    <div class="category-popup-container basic-container">
        <j-panel title="分类配置" @return="returnRoute">
            <van-notice-bar
                    left-icon="volume-o"
                    text="左滑可编辑或删除分类"
            />
            <div class="category-wrap">
                <div class="category-li">
                    <van-swipe-cell
                            class="category-swipe-cell"
                            v-for="(item, index) in categoryLists"
                            :key="index">
                        <van-cell :border="false" :title="item.categoryName" is-link/>
                        <template #right>
                            <van-button square type="info" text="编辑" @click="editCategory(item)" />
                            <van-button square type="danger" text="删除" @click="deleteCategory(item)"/>
                        </template>
                    </van-swipe-cell>
                </div>
                <van-button type="primary" round block @click="addCategory">+新增分类</van-button>
            </div>
        </j-panel>
        <van-popup class="category-change-dialog" v-model="popupVisible" @close="closePopup" position="top">
            <div class="title">{{isEdit ? '编辑分类' : '新增分类'}}</div>
            <van-form class="category-form" @submit="submitCategory">
                <van-field
                        v-model="categoryName"
                        name="分类名"
                        label="分类名"
                        placeholder="请填写分类名"
                ></van-field>
                <van-button round block type="info" native-type="submit">确定</van-button>
            </van-form>
        </van-popup>
    </div>
</template>

<script>
  import { getCategoriesList, addCategory, editCategory, deleteCategory } from "@/api/optionsApis";
  import { REQUEST_SUCCESS } from "@/constant";
  import { Dialog } from 'vant'
  export default {
    name: "CategoryPopup",
    data () {
      return {
        categoryLists: [],
        popupVisible: false,
        isEdit: false,
        categoryId: '',
        categoryName: ''
      }
    },
    methods: {
      returnRoute () {
        this.$router.push(
          {
            name: 'Config'
          }
        )
      },
      async getCategoriesList () {
        try {
          const {code, data} = await getCategoriesList()
          if (code === REQUEST_SUCCESS) {
            this.categoryLists = data || []
          }
        } catch (e) {
          console.log(e)
        }
      },
      addCategory () {
        this.isEdit = false
        this.popupVisible = true
      },
      editCategory (item) {
        this.isEdit = true
        this.categoryId = item.id
        this.categoryName = item.categoryName
        this.popupVisible = true
      },
      deleteCategory (item) {
        // TODO 房间下有物品存在不能被删除
        Dialog.confirm({
          title: '确认',
          message: `该操作将删除${item.categoryName}分类，确认操作吗？`,
        })
          .then(() => {
            this.submitDeleteCategory(item.id)
          })
          .catch(() => {
            this.categoryId = ''
          });
      },
      closePopup () {
        this.getCategoriesList()
        this.popupVisible = false
        this.categoryName = ''
        this.categoryId = ''
      },
      submitCategory () {
        if (this.isEdit) {
          this.submitEditCategory()
        } else {
          this.submitAddCategory()
        }
      },
      async submitEditCategory () {
        try {
          const params = {
            id: this.categoryId,
            categoryName: this.categoryName
          }
          const {code} = await editCategory(params)
          if (code === REQUEST_SUCCESS) {
            console.log('修改成功')
            this.closePopup()
          }
        } catch (e) {
          console.log(e)
        }
      },
      async submitAddCategory () {
        try {
          const params = {
            categoryName: this.categoryName
          }
          const {code} = await addCategory(params)
          if (code === REQUEST_SUCCESS) {
            console.log('添加成功')
            this.closePopup()
          }
        } catch (e) {
          console.log(e)
        }
      },
      async submitDeleteCategory (id) {
        try {
          const params = {
            id: id
          }
          const {code} = await deleteCategory(params)
          if (code === REQUEST_SUCCESS) {
            console.log('删除成功')
            this.getCategoriesList()
          }
        } catch (e) {
          console.log(e)
        }
      }
    },
    mounted() {
      this.getCategoriesList()
    }
  }
</script>

<style scoped lang="scss">
    .category-popup-container {
        .category-wrap {
            padding: 10px 20px;
            margin-top: 20px;
            .category-li {
                border-radius: 20px;
                box-shadow: 0 2px 10px 5px rgba(0, 0, 0, 0.1);
                padding: 20px 40px;
                margin-bottom: 1.6vh;
                max-height: 69vh;
                overflow-y: auto;
                .category-swipe-cell {
                    border-bottom: 1px solid #ddd;
                    &:last-child {
                        border-bottom: none;
                    }
                }
            }
        }
        .category-change-dialog {
            height: 22vh;
            .title {
                text-align: center;
                padding-top: 3vh;
                color: #f68024;
                font-weight: bold;
            }
            .category-form {
                padding: 40px 20px 0;
            }
        }
    }
</style>
