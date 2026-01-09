<script setup>
  import BcPageTitle from '@/components/BcPageTitle/BcPageTitle.vue'

  const props = defineProps({
    title: { type: String, required: false, default: null },
    subtitle: { type: String, required: false, default: null }
  })
</script>
<template>
  <bc-page-title :title="props.title" :subtitle="props.subtitle" />
</template>
