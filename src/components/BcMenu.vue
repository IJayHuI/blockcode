<script setup>
  import { NMenu } from 'naive-ui'
  import { fullMenuOptions } from '@/storages/BcMain'
  import { signout } from '@/utils/BcMain'
  import BcBeian from '@/components/BcBeian.vue'
  import { loading } from '@/main'
  import router from '@/routes'

  const handleSignout = async () => {
    loading.value.missionCount++
    try {
      await signout()
      router.push('/login')
    } catch (error) {
      console.error('Signout failed:', error)
    } finally {
      loading.value.missionCount--
    }
  }
</script>
<template>
  <n-layout-header class="p-2">
    <img src="/Logo.svg" alt="logo" />
  </n-layout-header>
  <n-menu class="flex-1" :options="fullMenuOptions" />
  <n-layout-footer class="p-2 flex flex-col gap-2">
    <n-button @click="handleSignout" secondary type="error">退出登录</n-button>
    <div><bc-beian /></div>
  </n-layout-footer>
</template>
