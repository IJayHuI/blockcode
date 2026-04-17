<script setup lang="ts">
  import { zhCN, dateZhCN, NMessageProvider, NConfigProvider, NLoadingBarProvider, NNotificationProvider } from 'naive-ui'

  import theme from './configs/theme.json'

  import BcGui from './containers/BcGui.vue'
</script>

<template>
  <n-config-provider :theme-overrides="theme" :locale="zhCN" :date-locale="dateZhCN">
    <n-loading-bar-provider>
      <n-notification-provider>
        <n-message-provider>
          <bc-gui />
        </n-message-provider>
      </n-notification-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
