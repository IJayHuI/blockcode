import { supabase, isDev } from '@/main'
import { v4 as uuidv4 } from 'uuid'
import { fileListTable, home } from '@/storages/BcMain'

export const signout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const fileUpload = async (file) => {
  const bucket = 'files'
  const {
    data: {
      session: { user }
    }
  } = await supabase.auth.getSession()
  if (file.file.name.endsWith('.sb3')) {
    const filePath = `${user.id}/${uuidv4()}.sb3`
    const fileName = file.file.name.substring(0, file.file.name.lastIndexOf('.'))
    const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file.file.file)
    if (uploadError) {
      file.onError()
      throw `上传失败: ${file.file.name}, ${uploadError}`
    }
    const { data: insertData, error: insertError } = await supabase
      .from('files')
      .insert({
        user_id: user.id, // ⚠️ 必须是 auth 用户 id
        file_name: fileName,
        file_path: filePath
      })
      .select()
    if (insertError) {
      file.onError()
      throw `数据库插入失败: ${file.file.name}, ${insertError}`
    }
    fileListTable.value.datas.push(...insertData)
    file.onFinish()
    return `上传成功: ${fileName}`
  }
}

export const getUserFiles = async () => {
  if (!fileListTable.value.needGetData) return
  const { data, error } = await supabase.from('files').select('*')
  if (error) throw error
  fileListTable.value.datas = await Promise.all(
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
  fileListTable.value.needGetData = false
  fileListTable.value.loadingStatus = false
}

export const deleteUserFile = async (file) => {
  let deleteStatus = {
    thumbnail: true,
    file: true,
    record: true
  }
  if (file.thumbnail_path) {
    const { error: errorThumbnail } = await supabase.storage.from('files').remove(file.thumbnail_path)
    if (errorThumbnail) deleteStatus.thumbnail = errorThumbnail
  }
  const { error: errorFile } = await supabase.storage.from('files').remove(file.file_path)
  if (errorFile) deleteStatus.file = errorFile
  const { error: errorRecord } = await supabase.from('files').delete().eq('id', file.id)
  if (errorRecord) deleteStatus.record = errorRecord
  if (deleteStatus.thumbnail && deleteStatus.file && deleteStatus.thumbnail) fileListTable.value.datas.splice(fileListTable.value.datas.indexOf(file), 1)
  return deleteStatus
}

export const openInScratch = async (file) => {
  const {
    data: { session }
  } = await supabase.auth.getSession()
  window.location.href = `${isDev ? 'http://localhost:8601' : 'https://scratch.blockcode.com.cn'}/?token=${session.access_token}&refresh-token=${session.refresh_token}&project-id=${file.id}`
}

export const setWelcomeMessage = async () => {
  const data = JSON.parse(localStorage.getItem('bc-profile'))
  home.value.welcomeMessage = `你好，${data.nick_name || data.user.email || '用户'}`
}
