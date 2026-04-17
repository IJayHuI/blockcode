<script setup lang="ts">
  import { ref } from 'vue'

  import BcFileList from '../../components/file/BcFileList.vue'

  import { getFileList, openInScratch, deleteFile } from '../../lib/file'
  import { getSession } from '../../lib/profile'

  import { useStores, type File } from '../../stores'

  const props = withDefaults(
    defineProps<{
      userId?: string | null // 获取其他用户的文件列表时需要传入用户 ID
      showRefreshButton?: boolean
      showScratchButton?: boolean
      showDeleteButton?: boolean
    }>(),
    {
      userId: null,
      showRefreshButton: true,
      showScratchButton: true,
      showDeleteButton: true
    }
  )
  const { profile, general, file } = useStores()
  const fileList = ref<File[]>([])

  const getFile = async () => {
    if (!props.userId && !file.needGetData) return // 如果没有传入 userId，说明是在获取当前用户的文件列表，此时如果全局状态中已经有文件列表了，就不需要再获取一次了
    try {
      const files = await getFileList(props.userId || profile.id)
      if (!props.userId)
        file.setFileList(files) // 如果没有传入 userId，说明是在获取当前用户的文件列表，此时需要更新全局状态中的文件列表
      else fileList.value = files
      file.setNeedGetData(false)
    } catch (error) {
      throw error
    }
  }
  const handelOpenInScratch = async (file: File) => {
    const session = await getSession()
    openInScratch(file.id, general.envMode, session)
  }
  const handelDeleteFile = async (f: File) => {
    try {
      await deleteFile(f)
      file.removeFile(f)
    } catch (error) {
      throw error
    }
  }
</script>
<template>
  <bc-file-list :file-list="props.userId ? fileList : file.fileList" :get-file-list="getFile" :open-in-scratch="handelOpenInScratch" :delete-file="handelDeleteFile" :show-refresh-button="props.showRefreshButton" :show-scratch-button="props.showScratchButton" :show-delete-button="props.showDeleteButton" />
</template>
