<template>
    <div class="box-detail-container">
        <j-panel :title="title" @return="returnRoute">
            <van-sidebar v-model="activeTab">
                <van-sidebar-item title="全部"></van-sidebar-item>
                <van-sidebar-item title="全部"></van-sidebar-item>
                <van-sidebar-item title="全部"></van-sidebar-item>
            </van-sidebar>
        </j-panel>
    </div>
</template>

<script>
  export default {
    name: "BoxDetail",
    data () {
      return {
        title: '',
        activeTab: 0
      }
    },
    mounted() {
      this.title = this.$route.query && this.$route.query.boxName
    },
    methods: {
      returnRoute () {
        this.$router.push(
          {
            name: 'Shelf'
          }
        )
      }
    }
  }
</script>

<style scoped>

</style>
