<script setup lang="ts">
  import { type UploadFileInfo } from 'naive-ui'

  import BcCreateFile from '../../components/file/BcCreateFile.vue'

  import { useStores } from '../../stores'

  import { createNewFile, openInScratch, uploadFile } from '../../lib/file'
  import { getSession } from '../../lib/profile'

  const { profile, general, file } = useStores()

  const createNew = async () => {
    try {
      general.loadingEventAdd()
      general.loadingEventSetText('正在创建新文件...')
      const newFile = await createNewFile(profile.id)
      const session = await getSession()
      openInScratch(newFile, general.envMode, session)
    } catch (error) {
      throw error
    }
  }
  const upload = async (f: UploadFileInfo) => {
    try {
      const uploadedFile = await uploadFile(profile.id, f)
      file.addFile(uploadedFile)
    } catch (error) {
      throw error
    }
  }
</script>
<template>
  <bc-create-file :create-new="createNew" :upload="upload" />
</template>
