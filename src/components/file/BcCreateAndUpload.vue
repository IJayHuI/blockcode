<script setup>
  import { AddRound, UploadFileRound } from '@vicons/material'
  import { isDev, supabase } from '@/main'
  import { ref, onMounted } from 'vue'
  import { NUpload, NSplit, NUploadDragger, useNotification } from 'naive-ui'
  import { fileUpload } from '@/utils/BcMain'

  const notification = useNotification()
  const token = ref(null)
  const refreshToken = ref(null)

  onMounted(async () => {
    await supabase.auth.getSession().then((value) => {
      token.value = value.data.session.access_token
      refreshToken.value = value.data.session.refresh_token
    })
  })
  const handleUpload = async (file) => {
    try {
      const result = await fileUpload(file)
      notification.success({
        title: '上传成功',
        content: String(result),
        duration: 3000
      })
    } catch (error) {
      notification.error({
        title: '上传失败',
        content: String(error),
        duration: 4000
      })
    }
  }
</script>
<template>
  <n-split class="!h-max" pane1-class="pt-0 pr-2 pb-0" pane2-class="pt-0 pb-0 pl-2" direction="horizontal" :max="0.7" :min="0.3" :default-size="0.7">
    <template #1>
      <n-button size="large" dashed class="!w-full !h-full" tag="a" :href="`${isDev ? 'http://localhost:8601' : 'https://scratch.blockcode.com.cn'}/?token=${token}&refresh-token=${refreshToken}`">
        <template #icon>
          <n-icon size="35"><AddRound /></n-icon>
        </template>
        <p class="text-xl">新建文件</p>
      </n-button>
    </template>
    <template #2>
      <n-upload multiple :custom-request="handleUpload" :max="5" accept=".sb3">
        <n-upload-dragger class="flex flex-col justify-center items-center !bg-transparent">
          <n-icon size="35"><UploadFileRound /></n-icon>
          <p class="text-base">点击或者拖动文件到该区域来上传</p>
          <p>最多支持同时上传5个文件，文件格式.sb3</p>
        </n-upload-dragger>
      </n-upload>
    </template>
  </n-split>
</template>
