<script setup>
  import BcPageTitle from '@/containers/BcPageTitle.vue'
  import BcCreateFile from '@/components/BcFile/BcCreateFile.vue'
  import BcFileList from '@/components/BcFile/BcFileList.vue'

  const props = defineProps({
    pageTitle: { type: String, required: false, default: null },
    showScratchButton: { type: Boolean, required: false, default: false },
    showDeleteButton: { type: Boolean, required: false, default: false },
    showRefreshButton: { type: Boolean, required: false, default: false },
    fileList: { type: Array, required: false, default: [] },
    openInScratch: { type: Function, required: false, default: () => {} },
    deleteFile: { type: Function, required: false, default: () => {} },
    createNewFile: { type: Function, required: false, default: () => {} },
    uploadFile: { type: Function, required: false, default: () => {} },
    getFileList: { type: Function, required: false, default: () => {} }
  })
</script>
<template>
  <bc-page-title :title="props.pageTitle" />
  <bc-create-file :create-new-file="props.createNewFile" :upload-file="props.uploadFile" />
  <bc-file-list :open-in-scratch="props.openInScratch" :delete-file="props.deleteFile" :get-file-list="getFileList" :file-list="props.fileList" :show-scratch-button="props.showScratchButton" :show-delete-button="props.showDeleteButton" :show-refresh-button="props.showRefreshButton" />
</template>
