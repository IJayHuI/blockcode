<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      appVersion?: string
    }>(),
    {
      appVersion: ''
    }
  )
</script>
<template>
  <span>&copy;2025-2026 BlockCode 版权所有</span>
  <span><a class="hover:underline" target="_blank" href="https://beian.miit.gov.cn">浙ICP备2024134699号</a></span>
  <span>版本: {{ appVersion }}</span>
</template>
