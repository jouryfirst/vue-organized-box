<template>
    <div class="room-popup-container basic-container">
        <j-panel title="房间配置" @return="returnRoute">
            <van-notice-bar
                left-icon="volume-o"
                text="左滑可编辑或删除房间"
        />
            <div class="room-wrap">
                <div class="room-li" v-if="roomLists.length">
                    <van-swipe-cell
                            class="room-swipe-cell"
                            v-for="(item, index) in roomLists"
                            :key="index">
                        <van-cell :border="false" :title="item.roomName" is-link/>
                        <template #right>
                            <van-button square type="info" text="编辑" @click="editRoom(item)" />
                            <van-button square type="danger" text="删除" @click="deleteRoom(item)"/>
                        </template>
                    </van-swipe-cell>
                </div>
                <van-empty v-else description="当前暂无房间，请添加" />
                <van-button type="primary" round block @click="addRoom">+新增房间</van-button>
            </div>
        </j-panel>
        <van-popup class="room-change-dialog" v-model="popupVisible" @close="closePopup" position="top">
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
  import { getRoomLists, addRoom, editRoom, deleteRoom } from "@/api/optionsApis";
  import { REQUEST_SUCCESS } from "@/constant";
  import { Dialog } from 'vant'
  export default {
    name: "RoomPopup",
    data () {
      return {
        roomLists: [],
        popupVisible: false,
        isEdit: false,
        roomId: '',
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
      async getRoomList () {
        try {
          const {code, data} = await getRoomLists()
          if (code === REQUEST_SUCCESS) {
            this.roomLists = data || []
          }
        } catch (e) {
          console.log(e)
        }
      },
      addRoom () {
        this.isEdit = false
        this.popupVisible = true
      },
      editRoom (item) {
        this.isEdit = true
        this.roomId = item.id
        this.roomName = item.roomName
        this.popupVisible = true
      },
      deleteRoom (item) {
        // TODO 房间下有物品存在不能被删除
        Dialog.confirm({
          title: '确认',
          message: `该操作将删除${item.roomName}房间，确认操作吗？`,
        })
          .then(() => {
            this.submitDeleteRoom(item.id)
          })
          .catch(() => {
            this.roomId = ''
          });
      },
      closePopup () {
        this.getRoomList()
        this.popupVisible = false
        this.roomName = ''
        this.roomId = ''
      },
      submitRoom () {
        if (this.isEdit) {
          this.submitEditRoom()
        } else {
          this.submitAddRoom()
        }
      },
      async submitEditRoom () {
        try {
          const params = {
            id: this.roomId,
            roomName: this.roomName
          }
          const {code} = await editRoom(params)
          if (code === REQUEST_SUCCESS) {
            console.log('修改成功')
            this.closePopup()
          }
        } catch (e) {
          console.log(e)
        }
      },
      async submitAddRoom () {
        try {
          const params = {
            roomName: this.roomName
          }
          const {code} = await addRoom(params)
          if (code === REQUEST_SUCCESS) {
            console.log('添加成功')
            this.closePopup()
          }
        } catch (e) {
          console.log(e)
        }
      },
      async submitDeleteRoom (id) {
        try {
          const params = {
            id: id
          }
          const {code} = await deleteRoom(params)
          if (code === REQUEST_SUCCESS) {
            console.log('删除成功')
            this.getRoomList()
          }
        } catch (e) {
          console.log(e)
        }
      }
    },
    mounted() {
      this.getRoomList()
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
