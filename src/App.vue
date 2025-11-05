<script setup>
  import { darkTheme, zhCN, dateZhCN, NLoadingBarProvider, NSpin, NDialogProvider, NConfigProvider, NNotificationProvider, useOsTheme } from 'naive-ui'
  import { computed } from 'vue'
  import { loading } from '@/main'
  import { theme } from '@/storages/BcMain.js'

  const osTheme = useOsTheme()
  const currentTheme = computed(() => (osTheme.value === 'dark' ? darkTheme : null))
</script>

<template>
  <n-config-provider :date-locale="dateZhCN" :locale="zhCN" :theme="currentTheme" :theme-overrides="theme">
    <n-notification-provider>
      <n-loading-bar-provider>
        <n-spin class="!absolute top-0 right-0 bottom-0 left-0" :show="loading.status" :size="150">
          <n-dialog-provider>
            <router-view></router-view>
          </n-dialog-provider>
        </n-spin>
      </n-loading-bar-provider>
    </n-notification-provider>
  </n-config-provider>
</template>
