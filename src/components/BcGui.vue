<script setup lang="ts">
  import { NSpin } from 'naive-ui'

  const props = withDefaults(
    defineProps<{
      loadingStatus?: boolean
      loadingText?: string
    }>(),
    {
      loadingStatus: false,
      loadingText: ''
    }
  )
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="page">
      <component :is="Component" :key="$route.fullPath" class="!absolute inset-0" />
    </transition>
  </router-view>
  <n-spin v-if="props.loadingStatus" :size="150" :rotate="false" class="fixed inset-0 z-50 bg-white">
    <template #description><p class="text-xl">{{ props.loadingText }}</p></template>
  </n-spin>
</template>
