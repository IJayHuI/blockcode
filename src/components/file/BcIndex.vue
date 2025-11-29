<script setup>
  import BcCreateAndUpload from '@/components/file/BcCreateAndUpload.vue'
  import BcUserFileList from '@/components/BcUserFileList.vue'
  import BcPageTitle from '@/components/BcPageTitle.vue'

  const props = defineProps({
    fileList: { type: Array, required: false, default: [] },
    showScratchButton: { type: Boolean, required: false, default: false },
    showDeleteButton: { type: Boolean, required: false, default: false },
    title: { type: String, required: false, default: '我的文件' }
  })
  const emit = defineEmits(['uploadFile']) // 上传文件后向父组件传递新文件

  // 从子组件接收上传的文件并向上层组件传递
  const handleUploadFileFromSubComponent = (file) => {
    emit('uploadFile', file)
  }
</script>
<template>
  <bc-page-title :title="props.title" />
  <div class="flex flex-col gap-2">
    <bc-create-and-upload @upload-file="handleUploadFileFromSubComponent" />
    <bc-user-file-list :file-list="fileList" :show-scratch-button="true" :show-delete-button="true" />
  </div>
</template>
