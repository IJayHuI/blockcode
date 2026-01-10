<script setup>
  const props = defineProps({
    version: {
      type: String,
      require: false,
      default: '0.0.0'
    }
  })
</script>
<template>
  <p>&copy;2025-2026 BlockCode 版权所有</p>
  <p><a class="hover:underline" target="_blank" href="https://beian.miit.gov.cn">浙ICP备2024134699号</a></p>
  <p>Version: {{ props.version }}</p>
</template>
