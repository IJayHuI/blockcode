<script setup>
  import { useLoadingStore } from '@/stores/loading'
  import { useProfileStore } from '@/stores/profile'

  import { NMenu, useNotification, NAvatar } from 'naive-ui'
  import BcBeian from '@/containers/BcBeian.vue'

  const props = defineProps({
    menuOptions: { type: Array, required: false, default: [] },
    signout: { type: Function, required: false, default: () => {} }
  })
  const loading = useLoadingStore()
  const notification = useNotification()
  const profile = useProfileStore()

  const handleSignout = async () => {
    try {
      loading.start('正在退出登录...')
      await props.signout()
    } catch (error) {
      console.error(error)
      notification.error({
        title: '退出登录失败',
        content: error.message,
        duration: 6000
      })
    } finally {
      loading.end()
    }
  }
</script>
<template>
  <n-layout-header class="p-2">
    <img src="/Logo.svg" alt="logo" />
  </n-layout-header>
  <n-menu class="flex-1" :options="menuOptions" />
  <n-layout-footer class="p-2 flex flex-col gap-2">
    <div class="flex gap-2 items-center">
      <n-avatar :size="44">{{ profile.nickName ? profile.nickName.substring(0, 1) : null }}</n-avatar>
      <p class="text-xl">{{ profile.nickName ? profile.nickName : null }}</p>
    </div>
    <n-button size="large" @click="handleSignout" secondary type="error">退出登录</n-button>
    <div><bc-beian /></div>
  </n-layout-footer>
</template>
