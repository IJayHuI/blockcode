<script lang="ts" setup>
  import BcFileList from '../../containers/file/BcFileList.vue'

  const props = defineProps<{
    drawerState: boolean
    studentId: string
    title: string
    closeDrawer: () => void
  }>()
</script>
<template>
  <n-drawer closeable :show="props.drawerState" width="50%" @update:show="props.closeDrawer">
    <n-drawer-content :title="props.title">
      <bc-file-list :user-id="props.studentId" :show-delete-button="false" :show-refresh-button="false" />
    </n-drawer-content>
  </n-drawer>
</template>
