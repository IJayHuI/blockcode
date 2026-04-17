<script setup lang="ts">
  import { computed } from 'vue'
  import { NMenu, NAvatar, type MenuOption } from 'naive-ui'
  import { useRoute } from 'vue-router'

  import BcFooter from '../../containers/BcFooter.vue'

  const props = withDefaults(
    defineProps<{
      menuOptions: MenuOption[]
      nickName?: string
      username?: string
      signout: () => Promise<void>
    }>(),
    {
      nickName: 'undefined'
    }
  )
  const title = computed(() => useRoute().meta?.label || 'BlockCode')

  const handleSignout = async () => {
    await props.signout()
  }
</script>

<template>
  <n-layout has-sider position="absolute">
    <n-layout-sider width="200" content-class="flex flex-col">
      <n-layout-header class="p-2">
        <img src="/logo.svg" alt="logo" />
      </n-layout-header>
      <n-menu class="flex-1" :options="props.menuOptions" />
      <n-layout-footer class="p-2 flex flex-col gap-2">
        <div class="flex gap-2 items-center">
          <n-avatar :size="44">{{ props.nickName ? props.nickName.substring(0, 1) : props.username }}</n-avatar>
          <p class="text-xl">{{ props.nickName ? props.nickName : props.username }}</p>
        </div>
        <n-button size="large" @click="handleSignout" secondary type="error">退出登录</n-button>
        <div class="flex flex-col"><bc-footer /></div>
      </n-layout-footer>
    </n-layout-sider>
    <n-layout content-class="p-2 flex flex-col gap-2">
      <n-layout-header class="text-3xl font-bold">{{ title }}</n-layout-header>
      <router-view></router-view>
    </n-layout>
  </n-layout>
</template>
