<template>
    <div class="config-container">
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

<style scoped>

</style>
