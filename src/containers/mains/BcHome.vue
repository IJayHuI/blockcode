<script setup>
  import { home } from '@/storages/BcMain.js'
  import { setHomePageTitle } from '@/utils/BcMain'
  import { onMounted } from 'vue'

  onMounted(async () => {
    setHomePageTitle()
  })
</script>
<template>
  <p class="text-3xl font-bold mb-2">{{ home.pageTitle }}</p>
</template>
