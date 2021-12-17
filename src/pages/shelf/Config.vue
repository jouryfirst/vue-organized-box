<template>
    <div class="config-container">
        <div class="title">配置</div>
        <base-config></base-config>
        <personal-config></personal-config>
    </div>
</template>

<script>
    import BaseConfig from "@/components/config/BaseConfig";
    import PersonalConfig from "@/components/config/PersonalConfig";
  export default {
    name: "Config",
    components: {
      BaseConfig,
      PersonalConfig
    }
  }
</script>

<style scoped lang="scss">
    .config-container {
        height: calc(100% - 3.125rem);
        background-color: #ddd;
        .title {
            text-align: center;
            padding-top: 2vh;
            margin-bottom: 2vh;
        }
    }
</style>
