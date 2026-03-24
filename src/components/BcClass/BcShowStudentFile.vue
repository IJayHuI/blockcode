<script setup>
  import BcFileList from '@/components/BcFile/BcFileList.vue'
  import { NDrawer, NDrawerContent } from 'naive-ui'

  const props = defineProps({
    username: { type: String, required: false, default: null },
    fileList: { type: Object, required: true, default: () => {} },
    state: { type: Boolean, required: true, default: false },
    closeDrawer: { type: Function, required: true, default: () => {} }
  })
</script>
<template>
  <n-drawer @update:show="props.closeDrawer" :show="props.state" width="40%">
    <n-drawer-content closable :title="`${props.username}的文件`">
      <bc-file-list :show-scratch-button="true" :file-list="props.fileList" />
    </n-drawer-content>
  </n-drawer>
</template>
