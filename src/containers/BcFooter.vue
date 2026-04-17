<script setup lang="ts">
  import BcFooter from '../components/BcFooter.vue'

  const appVersion = __APP_VERSION__
</script>

<template>
    <bc-footer :app-version="appVersion" />
</template>