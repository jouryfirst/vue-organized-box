<template>
    <div class="room-popup-container basic-container">
        <j-panel title="房间配置" @return="returnRoute">
            <van-notice-bar
                left-icon="volume-o"
                text="左滑可编辑或删除房间"
        />
            <div class="room-wrap">
                <div class="room-li">
                    <van-swipe-cell
                            class="room-swipe-cell"
                            v-for="(item, index) in roomLists"
                            :key="index">
                        <van-cell :border="false" :title="item.name" is-link/>
                        <template #right>
                            <van-button square type="info" text="编辑" @click="editRoom(item)" />
                            <van-button square type="danger" text="删除" />
                        </template>
                    </van-swipe-cell>
                </div>
                <van-button type="primary" round block @click="addRoom">+新增房间</van-button>
            </div>
        </j-panel>
        <van-popup class="room-change-dialog" v-model="popupVisible" position="top">
            <div class="title">{{isEdit ? '编辑房间' : '新增房间'}}</div>
            <van-form class="room-form" @submit="submitRoom">
                <van-field
                        v-model="roomName"
                        name="房间名"
                        label="房间名"
                        placeholder="请填写房间名"
                ></van-field>
                <van-button round block type="info" native-type="submit">确定</van-button>
            </van-form>
        </van-popup>
    </div>
</template>

<script>
  export default {
    name: "RoomPopup",
    data () {
      return {
        roomLists: [
          {
            name: '客厅1'
          },
          {
            name: '客厅2'
          },
          {
            name: '客厅3'
          },
          {
            name: '客厅4'
          }
        ],
        popupVisible: false,
        isEdit: false,
        roomName: ''
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
      addRoom () {
        this.isEdit = false
        this.popupVisible = true
      },
      editRoom (item) {
        this.isEdit = true
        this.roomName = item.name
        this.popupVisible = true
      },
      closeRoomDialog () {
        this.popupVisible = false
        this.roomName = ''
      },
      submitRoom () {
        this.closeRoomDialog()
      }
    }
  }
</script>

<style scoped lang="scss">
    .room-popup-container {
        .room-wrap {
            padding: 10px 20px;
            margin-top: 20px;
            .room-li {
                border-radius: 20px;
                box-shadow: 0 2px 10px 5px rgba(0, 0, 0, 0.1);
                padding: 20px 40px;
                margin-bottom: 1.6vh;
                max-height: 69vh;
                overflow-y: auto;
                .room-swipe-cell {
                    border-bottom: 1px solid #ddd;
                    &:last-child {
                        border-bottom: none;
                    }
                }
            }
        }
        .room-change-dialog {
            height: 22vh;
            .title {
                text-align: center;
                padding-top: 3vh;
                color: #f68024;
                font-weight: bold;
            }
            .room-form {
                padding: 40px 20px 0;
            }
        }
    }
</style>
