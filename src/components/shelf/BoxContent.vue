<template>
    <div class="box-content-container is-flex">
        <div
                class="box-wrapper"
                v-for="(item, index) in boxLists"
                :key="index"
                @click="showBoxDetail(item)"
        >
            <div class="label">{{item.label}}</div>
            <div class="num overflow">
                <span>{{item.count}}</span>
                <span>个物品</span>
            </div>
            <svg class="icon" aria-hidden="true">
                <use :xlink:href="`#icon--box${Math.floor(Math.random() * 5 + 1)}`"></use>
            </svg>
<!--            <i class="iconfont" :class="`icon&#45;&#45;box${Math.floor(Math.random() * 6)}`"></i>-->
        </div>
    </div>
</template>

<script>
  export default {
    name: "BoxContent",
    props: {
      boxLists: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
      }
    },
    methods: {
      showBoxDetail(item) {
        this.$router.push({
          name: 'BoxDetail',
          query: {
            boxName: item.label
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
    .box-content-container {
        height: 100%;
        background-color: #fff;
        flex-wrap: wrap;
        align-content: flex-start;
        padding: 40px;
        .box-wrapper {
            cursor: pointer;
            user-select: none;
            width: 30%;
            text-align: center;
            height: 300px;
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 15px 2px rgba(0,0,0,0.1);
            &:nth-child(3n+1) {
                margin: 0 2.5% 30px 0;
            }
            &:nth-child(3n+2) {
                margin: 0 2.5% 30px 2.5%;
            }
            &:nth-child(3n+3) {
                margin: 0 0 30px 2.5%;
            }
            .icon {
                margin-top: 20px;
                width: 110px;
                height: 110px;
                vertical-align: -0.15em;
                fill: currentColor;
                overflow: hidden;
            }
        }

    }
</style>
