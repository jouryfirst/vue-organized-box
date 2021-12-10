<template>
    <div class="statistics-base-info statistics-box is-flex">
        <div class="base-info-wrapper">
            <div class="num overflow">1</div>
            <div class="label">物品数量</div>
        </div>
        <div class="base-info-wrapper">
            <div class="num overflow">10</div>
            <div class="label">房间数量</div>
        </div>
        <div class="base-info-wrapper">
            <div class="num overflow">100</div>
            <div class="label">物品种类</div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "BaseInfo"
  }
</script>

<style scoped lang="scss">
    .statistics-base-info {
        align-items: center;
        justify-content: space-around;
        .base-info-wrapper {
            text-align: center;
            .label {
                font-size: 14px;
            }
        }
    }
</style>
