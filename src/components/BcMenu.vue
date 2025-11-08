<script setup>
  import { NMenu } from 'naive-ui'
  import { menuOptions } from '@/storages/BcMain'
  import { signout } from '@/utils/BcMain'
  import { generateMenu } from '@/utils/BcLogin'
  import BcBeian from '@/components/BcBeian.vue'
  import { loading } from '@/main'
  import router from '@/routes'
  import { onMounted } from 'vue'

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
  onMounted(() => {
    generateMenu()
  })
</script>
<template>
  <n-layout-header class="p-2">
    <img src="/Logo.svg" alt="logo" />
  </n-layout-header>
  <n-menu class="flex-1" :options="menuOptions" />
  <n-layout-footer class="p-2 flex flex-col gap-2">
    <n-button size="large" @click="handleSignout" secondary type="error">退出登录</n-button>
    <div><bc-beian /></div>
  </n-layout-footer>
</template>
