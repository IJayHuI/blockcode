<script setup>
  import { getStudentFiles, openInScratch } from '@/utils/BcMain'
  import { classes } from '@/storages/BcMain'
  import { onMounted, ref, h } from 'vue'
  import { NSpace, NButton } from 'naive-ui'
  const props = defineProps({
    userId: { type: String, required: true }
  })

  onMounted(async () => {
    await getStudentFiles(props.userId)
  })
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
              )
            ]
          }
        )
      }
    }
  ])
</script>
<template>
  <n-data-table :columns="columns" :data="classes.classMemberFileList[props.userId]" :loading="classes.getClassMemberFileLoadingStatus" :bordered="false" />
</template>
