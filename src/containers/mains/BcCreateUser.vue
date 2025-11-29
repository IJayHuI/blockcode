<script setup>
  import { createUserPage } from '@/storages/BcMain'
  import BcIndex from '@/components/create-user/BcIndex.vue'
</script>
<template>
  <p class="text-3xl font-bold mb-2">{{ createUserPage.pageTitle }}</p>
  <bc-index />
</template>
