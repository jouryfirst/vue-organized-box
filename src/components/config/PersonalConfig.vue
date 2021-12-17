<template>
    <div class="personal-config-container">
        <div class="title">个性化配置</div>
        <van-cell-group inset class="personal-config-wrap">
            <van-cell icon="share-o" title="导出" is-link label="导出为csv"/>
            <van-cell icon="gift-o" title="换肤" is-link />
            <van-cell icon="delete-o" title="评分" is-link />
        </van-cell-group>
    </div>
</template>

<script>
  export default {
    name: "PersonalConfig"
  }
</script>

<style scoped lang="scss">
    .personal-config-container {
        .title {
            padding-left: 30px;
            line-height: 4vh;
            color: #f68024;
            font-weight: bold;
        }
    }
</style>
