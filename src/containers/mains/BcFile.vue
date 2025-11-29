<script setup>
  import BcFileIndex from '@/components/file/BcIndex.vue'

  import { getUserFiles } from '@/utils/BcMain'
  import { ref, onMounted } from 'vue'
  import { supabase } from '@/main'
  const fileList = ref([])

  onMounted(async () => {
    const {
      data: {
        session: { user }
      }
    } = await supabase.auth.getSession()
    fileList.value = await getUserFiles(user.id)
  })

  // 从子组件接收上传的文件并添加到文件列表中
  const handleUploadFileFromSubComponent = (file) => {
    fileList.value.push(file)
  }
</script>
<template>
  <bc-file-index :show-scratch-button="true" :show-delete-button="true" :file-list="fileList" @upload-file="handleUploadFileFromSubComponent" />
</template>
