<template>
    <div class="box-content-container is-flex">
        <div class="box-wrapper" v-for="(item, index) in boxLists" :key="index">
            <div class="label">{{item.label}}</div>
            <div class="num overflow">
                <span>{{item.count}}</span>
                <span>个物品</span>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "BoxContent",
    data () {
      return {
        boxLists: [
          {
            label: '电视柜',
            count: 30
          },
          {
            label: '茶几',
            count: 30
          },
          {
            label: '书桌',
            count: 30
          },
          {
            label: '沙发',
            count: 30
          },
          {
            label: '天花板',
            count: 30
          }
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
    .box-content-container {
        flex-wrap: wrap;
        padding: 40px;
        .box-wrapper {
            width: 30%;
            text-align: center;
            height: 300px;
            background-color: aliceblue;
            &:nth-child(3n+1) {
                margin: 0 2.5% 30px 0;
            }
            &:nth-child(3n+2) {
                margin: 0 2.5% 30px 2.5%;
            }
            &:nth-child(3n+3) {
                margin: 0 0 30px 2.5%;
            }
        }

    }
</style>
