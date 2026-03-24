<script setup>
  import supabase from '@/lib/supabase'
  import { useEnvStore } from '@/stores/env'
  import { useProfileStore } from '@/stores/profile'
  import { useFileStore } from '@/stores/file'
  import { v4 as uuidv4 } from 'uuid'

  import BcFile from '@/components/BcFile/BcFile.vue'

  const pageTitle = '我的文件'
  const file = useFileStore()
  const profile = useProfileStore()
  const env = useEnvStore()
  const showScratchButton = true
  const showDeleteButton = true
  const showRefreshButton = true

  const openInScratch = async (fileId) => {
    const {
      data: { session }
    } = await supabase.auth.getSession()
    window.location.href = `${env.isDev ? 'http://localhost:8601' : 'https://scratch.blockcode.com.cn'}/#${fileId}?token=${session.access_token}&refresh-token=${session.refresh_token}`
  }
  const deleteFile = async (deleteFile) => {
    const fileId = deleteFile.id
    const filePath = deleteFile.file_path
    const thumbnailPath = deleteFile.thumbnail_path
    // 1️⃣ 先删除 Storage（并发）
    const { error: storageError } = await supabase.storage.from('files').remove([filePath, thumbnailPath])
    if (storageError) throw new Error('删除文件失败')
    // 2️⃣ 再删除数据库记录
    const { error: dbError } = await supabase.from('files').delete().eq('id', fileId)
    // 3️⃣ DB 删除失败 → 明确提示（可补偿）
    // 此时文件已删除，但 DB 还在
    if (dbError) throw new Error('文件已删除，但记录清理失败，再次点击删除即可')
    file.deleteFile(fileId)
  }
  const createNewFile = async () => {
    const uuid = uuidv4()
    const userId = profile.id
    const fileName = '新作品'
    const filePath = `${userId}/${uuid}.sb3`
    const thumbnailPath = `${userId}/${uuid}.png`
    // 1️⃣ 并发获取默认文件
    const [sb3Blob, thumbBlob] = await Promise.all([fetch('/default-project.sb3').then((r) => r.blob()), fetch('/default-thumbnail.png').then((r) => r.blob())])
    const sb3File = new File([sb3Blob], 'default-project.sb3', { type: sb3Blob.type })
    const thumbFile = new File([thumbBlob], 'default-thumbnail.png', { type: thumbBlob.type })
    // 2️⃣ 并发上传（这是唯一允许并发的地方）
    const [sb3Res, thumbRes] = await Promise.all([supabase.storage.from('files').upload(filePath, sb3File), supabase.storage.from('files').upload(thumbnailPath, thumbFile)])
    // 3️⃣ 上传失败 → 回滚
    if (sb3Res.error || thumbRes.error) {
      const rollback = []
      if (!sb3Res.error) rollback.push(filePath)
      if (!thumbRes.error) rollback.push(thumbnailPath)
      if (rollback.length) await supabase.storage.from('files').remove(rollback)
      throw new Error(`新建失败: ${fileName}`)
    }
    // 4️⃣ 文件已确认存在 → 再 insert
    const { data, error } = await supabase
      .from('files')
      .insert({
        user_id: userId,
        file_path: filePath,
        thumbnail_path: thumbnailPath,
        file_name: fileName
      })
      .select()
      .single()
    // 5️⃣ insert 失败 → 反向回滚文件
    if (error) {
      await supabase.storage.from('files').remove([filePath, thumbnailPath])
      throw error
    }
    // 6️⃣ 一切成功
    await openInScratch(data.id)
  }
  const uploadFile = async (uploadFile) => {
    if (!uploadFile || !uploadFile.file.name.endsWith('.sb3')) throw new Error('仅支持上传 .sb3 格式的文件')
    const uuid = uuidv4()
    const userId = profile.id
    const filePath = `${userId}/${uuid}.sb3`
    const { error: uploadError } = await supabase.storage.from('files').upload(filePath, uploadFile.file.file)
    if (uploadError) throw new Error('文件上传失败')
    const { data: insertData, error: insertError } = await supabase
      .from('files')
      .insert({
        user_id: userId,
        file_path: filePath,
        file_name: uploadFile.file.name.substring(0, uploadFile.file.name.lastIndexOf('.'))
      })
      .select()
      .single()
    if (insertError) {
      await supabase.storage.from('files').remove([filePath])
      throw insertError
    }
    file.addFile(insertData)
  }
  const getFileList = async () => {
    const { data, error } = await supabase.from('files').select('*').eq('user_id', profile.id).order('created_at', { ascending: false })
    if (error) throw error

    const formattedData = await Promise.all(
      data.map(async (file) => {
        let thumbnailUrl = null
        if (file.thumbnail_path) {
          const { data } = await supabase.storage.from('files').createSignedUrl(file.thumbnail_path, 60 * 60)
          thumbnailUrl = data?.signedUrl ?? null
        }
        return {
          ...file,
          thumbnail: thumbnailUrl
        }
      })
    )

    file.setFileList(formattedData)
  }
</script>
<template>
  <bc-file
    :show-scratch-button="showScratchButton"
    :show-delete-button="showDeleteButton"
    :show-refresh-button="showRefreshButton"
    :get-file-list="getFileList"
    :file-list="file.fileList"
    :page-title="pageTitle"
    :delete-file="deleteFile"
    :create-new-file="createNewFile"
    :upload-file="uploadFile" />
</template>
