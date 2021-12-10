<template>
    <div class="statistics-container">
        <base-info></base-info>
        <category-chart></category-chart>
        <room-chart></room-chart>
        <count-trend></count-trend>
    </div>
</template>

<script>
    import BaseInfo from "@/components/statistics/BaseInfo";
    import CategoryChart from "@/components/statistics/CategoryChart";
    import RoomChart from "@/components/statistics/RoomChart";
    import CountTrend from "@/components/statistics/CountTrend";
  export default {
    name: "Statistics",
    components: {
      BaseInfo,
      CategoryChart,
      RoomChart,
      CountTrend
    }
  }
</script>

<style scoped lang="scss">
    .statistics-container {
        height: calc(100% - 3.125rem);
        background-color: #01edfe;
        padding: 3vh 4vw 0 4vw;
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        &::-webkit-scrollbar {
            display: none;
        }
    }
</style>
