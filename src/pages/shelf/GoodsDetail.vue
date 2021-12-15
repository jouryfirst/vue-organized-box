<template>
    <div class="goods-detail-container">
        <j-panel :title="title" @return="returnRoute"></j-panel>
    </div>
</template>

<script>
  export default {
    name: "GoodsDetail",
    data () {
      return {
        title: ''
      }
    },
    methods: {
      returnRoute () {

      }
    }
  }
</script>

<style scoped>

</style>
