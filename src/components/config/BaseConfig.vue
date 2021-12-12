<template>
    <div class="base-config-container">
        <div class="title">基本配置</div>
        <van-cell-group inset class="base-config-wrap">
            <van-cell icon="wap-home-o" title="房间" is-link label="新增或修改房间"/>
            <van-cell icon="points" title="分类" is-link label="新增或修改分类" />
            <van-cell icon="delete-o" title="回收站" is-link label="查看回收站物品" />
        </van-cell-group>
    </div>
</template>

<script>
  export default {
    name: "BaseConfig"
  }
</script>

<style scoped>

</style>
