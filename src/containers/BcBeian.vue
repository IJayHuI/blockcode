<script setup>
  import BcBeian from '@/components/BcBeian/BcBeian.vue'
  const appVersion = __APP_VERSION__
</script>
<template>
  <bc-beian :version="appVersion" />
</template>
