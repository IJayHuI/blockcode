<script setup>
  const props = defineProps({
    title: { type: String, required: false, default: '标题' }
  })
</script>
<template>
  <p class="text-3xl font-bold mb-2">{{ props.title }}</p>
</template>
