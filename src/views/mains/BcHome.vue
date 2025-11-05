<script setup>
  import { home } from '@/storages/BcMain.js'
  import { setWelcomeMessage } from '@/utils/BcMain'
  import { onMounted } from 'vue'

  onMounted(async () => {
    await setWelcomeMessage()
  })
</script>
<template>
  <p class="text-3xl font-bold mb-2">{{ home.welcomeMessage }}</p>
</template>
