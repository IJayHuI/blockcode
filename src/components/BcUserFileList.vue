<script setup>
  import { openInScratch, deleteUserFile } from '@/utils/BcMain'
  import { useNotification } from 'naive-ui'
  import { loading } from '@/main'

  const notification = useNotification()
  const props = defineProps({
    fileList: { type: Array, required: false, default: [] },
    showScratchButton: { type: Boolean, required: false, default: false },
    showDeleteButton: { type: Boolean, required: false, default: false }
  })

  const handleDeleteUserFile = async (file) => {
    loading.value.missionCount++
    const result = await deleteUserFile(file)
    if (result.file !== true || result.record !== true || result.thumbnail !== true)
      notification.error({
        title: '删除失败',
        content: `文件：${supabaseErrorMap[result.file.message] || result.file.message}\n记录：${supabaseErrorMap[result.record.message] || result.record.message}\n缩略图：${supabaseErrorMap[result.thumbnail.message] || result.thumbnail.message}`,
        duration: 3000
      })
    else {
      props.fileList.splice(props.fileList.indexOf(file), 1)
      notification.success({
        title: '删除成功',
        duration: 3000
      })
    }
    loading.value.missionCount--
  }
</script>
<template>
  <p v-if="props.fileList.length === 0" class="text-2xl font-bold">没有文件</p>
  <div v-else class="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-2">
    <n-card :title="file.file_name" v-for="file in props.fileList">
      <template #cover>
        <img v-if="file.thumbnail" :src="file.thumbnail" />
        <p v-else>上传的文件暂无缩略图，点击在 Scratch 中打开，然后点击保存到 BlocCode 。</p>
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
        <NSpace>
          <NButton v-if="props.showScratchButton" type="success" secondary @click="openInScratch(file.id)">在 Scratch 中打开</NButton>
          <NButton v-if="props.showDeleteButton" type="error" secondary @click="handleDeleteUserFile(file)">删除文件</NButton>
        </NSpace>
      </template>
    </n-card>
  </div>
</template>
