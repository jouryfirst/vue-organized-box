<template>
    <div class="category-chart-container statistics-box">
        <div class="title">
            <div class="label">分类占比</div>
        </div>
        <div class="category-chart" ref="categoryChart"></div>
    </div>
</template>

<script>
  export default {
    name: "CategoryChart"
  }
</script>

<style scoped lang="scss">
    .category-chart-container {
        height: 40vh;
    }
</style>
