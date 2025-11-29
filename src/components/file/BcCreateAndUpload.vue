<script setup>
  import { AddRound, UploadFileRound } from '@vicons/material'
  import { supabase } from '@/main'
  import { ref, onMounted } from 'vue'
  import { NSplit, useNotification } from 'naive-ui'
  import { fileUpload, openInScratch } from '@/utils/BcMain'

  const notification = useNotification()
  const token = ref(null)
  const refreshToken = ref(null)
  const fileList = ref([])
  const emit = defineEmits(['uploadFile']) // 上传文件后向父组件传递新文件

  onMounted(async () => {
    await supabase.auth.getSession().then((value) => {
      token.value = value.data.session.access_token
      refreshToken.value = value.data.session.refresh_token
    })
  })
  const handleUpload = async (file) => {
    try {
      const result = await fileUpload(file)
      emit('uploadFile', result)
      file.onFinish()
      notification.success({
        title: '上传成功',
        duration: 3000
      })
    } catch (error) {
      file.onError()
      notification.error({
        title: '上传失败',
        content: String(error),
        duration: 4000
      })
    }
  }
  const handleCreateNew = async () => {
    const result = await fileUpload(null, 'new')
    await openInScratch(result.id)
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
