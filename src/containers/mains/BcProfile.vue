<script setup>
import BcIndex from '@/components/profile/BcIndex.vue';
import { profile } from '@/storages/BcMain';
import { getProfileForm } from '@/utils/BcMain';
import { onMounted } from 'vue';

onMounted(async() => {
  await getProfileForm()
})
</script>
<template>
  <p class="text-3xl font-bold mb-2">{{profile.pageTitle}}</p>
  <div class="flex flex-col gap-2">
    <div>
      <bc-index />
    </div>
  </div>
</template>
