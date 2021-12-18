<template>
    <div class="category-popup-container basic-container">
        <j-panel title="分类配置" @return="returnRoute">
            <van-notice-bar
                    left-icon="volume-o"
                    text="右滑可编辑或删除分类"
            />
            <div class="category-wrap">
                <div class="category-li">
                    <van-swipe-cell
                            class="category-swipe-cell"
                            v-for="(item, index) in categoryLists"
                            :key="index">
                        <van-cell :border="false" :title="item.name" is-link/>
                        <template #right>
                            <van-button square type="info" text="编辑" @click="editCategory(item)" />
                            <van-button square type="danger" text="删除" />
                        </template>
                    </van-swipe-cell>
                </div>
                <van-button type="primary" round block @click="addCategory">+新增分类</van-button>
            </div>
        </j-panel>
        <van-popup class="category-change-dialog" v-model="popupVisible" position="top">
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
  export default {
    name: "CategoryPopup",
    data () {
      return {
        categoryLists: [
          {
            name: '电子产品'
          },
          {
            name: '调料'
          },
          {
            name: '厨具'
          },
          {
            name: '文件'
          }
        ],
        popupVisible: false,
        isEdit: false,
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
      addCategory () {
        this.isEdit = false
        this.popupVisible = true
      },
      editCategory (item) {
        this.isEdit = true
        this.categoryName = item.name
        this.popupVisible = true
      },
      closeCategoryDialog () {
        this.popupVisible = false
        this.categoryName = ''
      },
      submitCategory () {
        this.closeCategoryDialog()
      }
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
