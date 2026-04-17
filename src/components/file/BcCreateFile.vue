<script setup lang="ts">
  import { ref } from 'vue'
  import { NSplit, useLoadingBar, useNotification, type UploadFileInfo, type UploadCustomRequestOptions } from 'naive-ui'
  import { AddRound, UploadFileRound } from '@vicons/material'

  const props = withDefaults(
    defineProps<{
      createNew: () => Promise<void>
      upload: (file: UploadFileInfo) => Promise<void>
    }>(),
    {}
  )
  const loadingBar = useLoadingBar()
  const notification = useNotification()
  const fileList = ref<any[]>([])

  const handleCreateNew = () => props.createNew()
  const handleUpload = async (options: UploadCustomRequestOptions) => {
    const { file, onFinish, onError } = options
    try {
      loadingBar.start()
      await props.upload(file)
      notification.success({
        title: `${file.name} 上传成功`,
        duration: 3000
      })
    } catch (error) {
      console.error(error)
      onError()
      notification.error({
        title: error instanceof Error ? error.message : '上传失败',
        duration: 6000
      })
      loadingBar.error()
    } finally {
      onFinish()
      loadingBar.finish()
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
