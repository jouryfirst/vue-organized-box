<template>
    <div class="detail-panel">
        <div class="header">
            <van-icon class="return-icon" name="arrow-left" @click="returnRoute"/>
            <div class="title">{{title}}</div>
        </div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: "DetailPanel",
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    methods: {
      returnRoute () {
        this.$emit('return')
      }
    }
  }
</script>

<style scoped lang="scss">
    .detail-panel {
        .header {
            position: relative;
            height: 10vh;
            border-bottom: 1px solid rgba(0,0,0,0.1);
            .return-icon {
                position: absolute;
                left: 20px;
                top: 20px;
            }
            .title {
                padding-top: 4vh;
                text-align: center;
            }
        }
    }
</style>
