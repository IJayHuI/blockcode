<script setup>
  import BcMenu from '@/components/BcMenu.vue'
</script>
<template>
  <n-layout has-sider position="absolute">
    <n-layout-sider bordered width="200" content-class="flex flex-col"><bc-menu /></n-layout-sider>
    <n-layout content-class="p-2">
      <router-view></router-view>
    </n-layout>
  </n-layout>
</template>
