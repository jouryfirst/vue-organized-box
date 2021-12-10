<template>
    <div class="detail-panel">
        <div class="header is-flex">
            <div class="return-icon">《</div>
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
    }
  }
</script>

<style scoped lang="scss">
    .detail-panel {
        .header {
            align-items: center;
            .title {

            }
        }
    }
</style>
