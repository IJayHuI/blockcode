<script setup>
  import { ref } from 'vue'
  import { useLoadingStore } from '@/stores/loading'

  import { AddRound, UploadFileRound } from '@vicons/material'
  import { NSplit, useNotification } from 'naive-ui'

  const props = defineProps({
    createNewFile: { type: Function, required: false, default: () => {} },
    uploadFile: { type: Function, required: false, default: () => {} }
  })
  const fileList = ref([])
  const notification = useNotification()
  const loading = useLoadingStore()

  const handleCreateNew = async () => {
    try {
      loading.start('创建新文件中...')
      await props.createNewFile()
    } catch (error) {
      notification.error({
        title: '新建文件失败',
        content: error.message || '请稍后再试',
        duration: 6000
      })
    } finally {
      loading.end()
    }
  }
  const handleUpload = async (file) => {
    try {
    //   file.onProgress()
      await props.uploadFile(file)
      file.onFinish()
      notification.success({
        title: '上传成功',
        content: `${file.file.name} 上传成功`,
        duration: 3000
      })
    } catch (error) {
      file.onError()
      notification.error({
        title: '上传失败',
        content: error.message || `${file.file.name} 上传失败，请稍后再试`,
        duration: 6000
      })
    }
  }
</script>
<template>
  <n-split class="!h-max" pane1-class="pt-0 pr-2 pb-0" pane2-class="pt-0 pb-0 pl-2" direction="horizontal" :max="0.7" :min="0.3" :default-size="0.6">
    <template #1>
      <n-button size="large" dashed class="!w-full !h-full" tag="a" @click="handleCreateNew">
        <template #icon>
          <n-icon size="35"><AddRound /></n-icon>
        </template>
        <p class="text-xl">新建文件</p>
      </n-button>
    </template>
    <template #2>
      <n-upload multiple :show-file-list="fileList.length > 0" v-model:file-list="fileList" :custom-request="handleUpload" :max="5" accept=".sb3">
        <n-upload-dragger class="flex flex-col justify-center items-center !bg-transparent">
          <n-icon size="35"><UploadFileRound /></n-icon>
          <p class="text-base">点击或者拖动文件到该区域来上传</p>
          <p>最多支持同时上传5个文件，文件格式.sb3</p>
        </n-upload-dragger>
      </n-upload>
    </template>
  </n-split>
</template>
