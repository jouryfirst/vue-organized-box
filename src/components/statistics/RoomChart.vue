<template>
    <div class="room-chart-container statistics-box">
        <div class="title">
            <div class="label">房间占比</div>
        </div>
        <div class="room-chart" ref="roomChart"></div>
    </div>
</template>

<script>
  export default {
    name: "RoomChart"
  }
</script>

<style scoped lang="scss">
    .room-chart-container {
        height: 40vh;
    }
</style>
