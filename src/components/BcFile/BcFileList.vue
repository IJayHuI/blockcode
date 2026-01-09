<script setup>
  import { useLoadingStore } from '@/stores/loading'
  import { onMounted } from 'vue'

  import { useNotification, useLoadingBar } from 'naive-ui'
  import { IosShareRound, DeleteOutlineRound, RefreshRound } from '@vicons/material'

  const props = defineProps({
    fileList: { type: Array, required: false, default: [] },
    showScratchButton: { type: Boolean, required: false, default: false },
    showDeleteButton: { type: Boolean, required: false, default: false },
    openInScratch: { type: Function, required: false, default: () => {} },
    deleteFile: { type: Function, required: false, default: () => {} },
    getFileList: { type: Function, required: false, default: () => {} }
  })

  const loadingBar = useLoadingBar()
  const loading = useLoadingStore()
  const notification = useNotification()

  const handleOpenInScratch = async (fileId) => {
    loading.start()
    props.openInScratch(fileId)
  }
  const handleDeleteUserFile = async (file) => {
    try {
      loadingBar.start()
      await props.deleteFile(file)
      notification.success({
        title: '删除成功',
        duration: 3000
      })
    } catch (error) {
      loadingBar.error()
      console.error(error)
      notification.error({
        title: '删除失败',
        duration: 6000
      })
    } finally {
      loadingBar.finish()
    }
  }
  const handleGetFileList = async () => {
    try {
      loadingBar.start()
      await props.getFileList()
    } catch (error) {
      console.error(error)
      loadingBar.error()
      notification.error({
        title: '获取文件列表失败',
        content: error.message,
        duration: 6000
      })
    } finally {
      loadingBar.finish()
    }
  }

  onMounted(async () => await handleGetFileList())
</script>
<template>
  <p v-if="props.fileList.length === 0" class="text-2xl font-bold">没有文件</p>
  <div v-else class="flex flex-col gap-2">
    <div class="flex justify-between items-center">
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
    <div class="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-2">
      <n-card :title="file.file_name" v-for="(file, index) in props.fileList" :key="index">
        <template #cover>
          <img v-if="file.thumbnail" :src="file.thumbnail" />
          <div v-else class="aspect-[4/3] flex flex-col justify-center p-6">
            <p>上传的文件暂无缩略图。</p>
            <p>点击在 Scratch 中打开，然后点击保存到 BlocCode 。</p>
          </div>
        </template>
        <p>
          创建日期：{{
            new Date(file.created_at).toLocaleString('zh-CN', {
              timeZone: 'Asia/Shanghai', // 如果你想按北京时间显示
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
            <NButton v-if="props.showScratchButton" type="success" secondary @click="handleOpenInScratch(file.id)">
              <template #icon>
                <n-icon>
                  <IosShareRound />
                </n-icon>
              </template>
              在 Scratch 中打开
            </NButton>
            <NButton v-if="props.showDeleteButton" type="error" secondary @click="handleDeleteUserFile(file)">
              <template #icon>
                <n-icon>
                  <DeleteOutlineRound />
                </n-icon>
              </template>
              删除文件
            </NButton>
          </div>
        </template>
      </n-card>
    </div>
  </div>
</template>
