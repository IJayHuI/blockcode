<script setup lang="ts">
  import BcGui from '../components/BcGui.vue'

  import { useStores } from '../stores'

  const { general } = useStores()
</script>

<template>
  <bc-gui :loading-status="general.loading.status" :loading-text="general.loadingText" />
</template>
