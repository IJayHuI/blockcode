<script setup lang="ts">
  import { ref } from 'vue'
  import { useLoadingBar, useNotification, NSkeleton } from 'naive-ui'
  import { IosShareRound, DeleteOutlineRound, RefreshRound } from '@vicons/material'

  import { type File } from '../../stores'

  const props = withDefaults(
    defineProps<{
      fileList: File[]
      getFileList: () => Promise<void>
      openInScratch: (file: File) => Promise<void>
      deleteFile: (file: File) => Promise<void>
      showRefreshButton?: boolean
      showScratchButton?: boolean
      showDeleteButton?: boolean
    }>(),
    {
      showRefreshButton: true,
      showScratchButton: true,
      showDeleteButton: true
    }
  )
  const notification = useNotification()
  const loadingBar = useLoadingBar()
  const showSkeleton = ref(true)

  const handleGetFileList = async () => {
    try {
      loadingBar.start()
      await props.getFileList()
    } finally {
      showSkeleton.value = false
      loadingBar.finish()
    }
  }
  const handleOpenInScratch = async (file: File) => await props.openInScratch(file)
  const handleDeleteFile = async (file: File) => {
    try {
      loadingBar.start()
      await props.deleteFile(file)
      notification.success({
        title: `${file.fileName} 删除成功`,
        duration: 3000
      })
    } catch (error) {
      notification.error({
        title: `${file.fileName} 删除失败`,
        duration: 6000
      })
      loadingBar.error()
    } finally {
      loadingBar.finish()
    }
  }

  handleGetFileList()
</script>
<template>
  <div v-if="showSkeleton" class="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-2">
    <n-card v-for="i in Math.floor(Math.random() * 10) + 3" :key="i">
      <template #cover><n-skeleton width="100%" height="100%" class="aspect-[4/3]" /></template>
      <n-skeleton size="large" :sharp="false" text width="100%" class="my-5" />
      <n-skeleton size="small" :sharp="false" text width="50%" />
      <template #footer>
        <div class="flex flex-col gap-2">
          <n-skeleton :sharp="false" size="large" />
          <n-skeleton :sharp="false" size="large" />
        </div>
      </template>
    </n-card>
  </div>
  <div v-else class="h-full flex-1 flex flex-col justify-center items-center">
    <div v-if="props.fileList.length === 0" class="flex flex-col justify-center items-center gap-5">
      <p class="text-5xl font-bold">没有文件</p>
      <n-button size="large" @click="handleGetFileList" secondary type="success" v-if="props.showRefreshButton">
        <template #icon>
          <n-icon><RefreshRound /></n-icon>
        </template>
        刷新
      </n-button>
    </div>
    <div v-else class="w-full h-full flex flex-col gap-2">
      <div class="flex justify-between items-center" v-if="props.showRefreshButton">
        <p class="text-2xl font-bold">文件列表</p>
        <n-button @click="handleGetFileList" secondary type="success">
          <template #icon>
            <n-icon>
              <RefreshRound />
            </n-icon>
          </template>
          刷新
        </n-button>
      </div>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-4">
        <n-card :title="file.fileName" v-for="(file, index) in props.fileList" :key="index">
          <template #cover>
            <img v-if="file.thumbnailUrl" :src="file.thumbnailUrl" />
            <div v-else class="aspect-[4/3] flex flex-col justify-center p-6">
              <p>上传的文件暂无缩略图。</p>
              <p>点击在 Scratch 中打开，然后点击保存到 BlocCode 。</p>
            </div>
          </template>
          <p>
            创建日期：{{
              new Date(file.createdAt).toLocaleString('zh-CN', {
                timeZone: 'Asia/Shanghai',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              })
            }}
          </p>
          <template #footer>
            <div class="flex flex-col gap-2">
              <n-button v-if="props.showScratchButton" type="success" secondary @click="handleOpenInScratch(file)">
                <template #icon>
                  <n-icon><IosShareRound /></n-icon>
                </template>
                在 Scratch 中打开
              </n-button>
              <n-button v-if="props.showDeleteButton" type="error" secondary @click="handleDeleteFile(file)">
                <template #icon>
                  <n-icon><DeleteOutlineRound /></n-icon>
                </template>
                删除文件
              </n-button>
            </div>
          </template>
        </n-card>
      </div>
    </div>
  </div>
</template>
