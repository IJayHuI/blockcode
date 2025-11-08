<script setup>
  import { fileListTable } from '@/storages/BcMain.js'
  import { getUserFiles, openInScratch, deleteUserFile } from '@/utils/BcMain'
  import { onMounted, ref, h } from 'vue'
  import { useNotification, NButton, NSpace } from 'naive-ui'
  import supabaseErrorMap from '@/utils/BcSupabaseErrorMap'

  const notification = useNotification()

  onMounted(async () => {
    await getUserFiles()
  })
  const handleDeleteUserFile = async (file) => {
    const result = await deleteUserFile(file)
    if (result.file !== true || result.record !== true || result.thumbnail !== true)
      notification.error({
        title: '删除失败',
        content: `文件：${supabaseErrorMap[result.file.message] || result.file.message}\n记录：${supabaseErrorMap[result.record.message] || result.record.message}\n缩略图：${supabaseErrorMap[result.thumbnail.message] || result.thumbnail.message}`,
        duration: 3000
      })
    else
      notification.success({
        title: '删除成功',
        duration: 3000
      })
  }
  const columns = ref([
    {
      title: '',
      key: 'thumbnail',
      align: 'center',
      render(row) {
        if (row.thumbnail) return h('img', { src: row.thumbnail, width: '200', height: '150', class: 'rounded-lg' })
        return h('p', { class: 'w-50' }, '上传的文件暂无缩略图，点击在 Scratch 中打开，然后点击保存到 BlocCode 。')
      }
    },
    {
      title: '作品名',
      key: 'file_name',
      align: 'center'
    },
    {
      title: '创建日期',
      key: 'created_at',
      align: 'center',
      render(row) {
        return new Date(row.created_at).toLocaleString('zh-CN', {
          timeZone: 'Asia/Shanghai', // 如果你想按北京时间显示
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
      }
    },
    {
      title: '',
      key: 'actions',
      align: 'center',
      render(row) {
        return h(
          NSpace,
          {},
          {
            default: () => [
              h(
                NButton,
                {
                  type: 'success',
                  secondary: true,
                  onClick: () => openInScratch(row)
                },
                { default: () => '在 Scratch 中打开' }
              ),
              h(
                NButton,
                {
                  type: 'error',
                  secondary: true,
                  onClick: () => handleDeleteUserFile(row)
                },
                { default: () => '删除文件' }
              )
            ]
          }
        )
      }
    }
  ])
</script>
<template>
  <n-data-table :columns="columns" :data="fileListTable.datas" :loading="fileListTable.loadingStatus" />
</template>
