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
  <span>&copy;2025 BlockCode 版权所有</span>
  <span><a class="hover:underline" target="_blank" href="https://beian.miit.gov.cn">浙ICP备2024134699号</a></span>
  <span>Version: {{ props.version }}</span>
</template>
