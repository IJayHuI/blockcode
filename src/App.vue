<script setup>
  import { darkTheme, zhCN, dateZhCN, NLoadingBarProvider, NSpin, NDialogProvider, NConfigProvider, NNotificationProvider, useOsTheme } from 'naive-ui'
  import { computed } from 'vue'
  import { loading } from '@/main'

  const osTheme = useOsTheme()
  const theme = computed(() => (osTheme.value === 'dark' ? darkTheme : null))
</script>

<template>
  <n-config-provider :date-locale="dateZhCN" :locale="zhCN" :theme="theme">
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
