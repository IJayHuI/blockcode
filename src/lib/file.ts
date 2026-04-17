import { type UploadFileInfo } from 'naive-ui'

import { supabase } from './supabase'

import { type File, type Session } from '../stores'

export const getFileList = async (userId: string) => {
  const { data, error } = await supabase.from('files').select('*').eq('user_id', userId).order('created_at', { ascending: false })
  if (error) throw error

  return await Promise.all(
    data.map(async (file) => {
      let thumbnailUrl = null
      if (file.thumbnail_path) {
        const { data } = await supabase.storage.from('files').createSignedUrl(file.thumbnail_path, 60 * 60)
        thumbnailUrl = data?.signedUrl ?? null
      }
      return {
        createdAt: file.created_at,
        fileName: file.file_name,
        filePath: file.file_path,
        id: file.id,
        thumbnailUrl: thumbnailUrl,
        thumbnailPath: file.thumbnail_path,
        userId: file.user_id
      } as File
    })
  )
}

export const deleteFile = async (file: File) => {
  // 1. 先删除 Storage（并发）
  const { error: storageError } = await supabase.storage.from('files').remove([file.filePath, file.thumbnailPath].filter((path): path is string => Boolean(path)))
  if (storageError) throw new Error('删除文件失败')
  // 2. 再删除数据库记录
  const { error: dbError } = await supabase.from('files').delete().eq('id', file.id)
  // DB 删除失败 → 明确提示（可补偿）此时文件已删除，但 DB 还在
  if (dbError) throw new Error('文件已删除，但记录清理失败，再次点击删除即可')
}

export const createNewFile = async (userId: string) => {
  const { data, error } = await supabase.functions.invoke('create-new-file', {
    body: { userId: userId }
  })
  if (error) throw error
  return data.id as number
}

export const uploadFile = async (userId: string, file: UploadFileInfo): Promise<File> => {
  if (!file.file || !file.file.name.endsWith('.sb3')) throw new Error('只能上传 .sb3 格式的文件')

  const uuid = crypto.randomUUID()
  const filePath = `${userId}/${uuid}.sb3`

  const { error: uploadError } = await supabase.storage.from('files').upload(filePath, file.file)
  if (uploadError) throw uploadError

  const { data: insertData, error: insertError } = await supabase
    .from('files')
    .insert({
      user_id: userId,
      file_path: filePath,
      file_name: file.file.name.replace(/\.sb3$/, '')
    })
    .select()
    .single()

  if (insertError) {
    await supabase.storage.from('files').remove([filePath])
    throw insertError
  }

  return {
    createdAt: insertData.created_at,
    fileName: insertData.file_name,
    filePath: insertData.file_path,
    id: insertData.id,
    thumbnailUrl: null,
    thumbnailPath: null,
    userId: insertData.user_id
  }
}

export const openInScratch = async (fileId: number, env: string = 'development', session: Session) => {
  window.location.href = `${env === 'development' ? 'http://localhost:8601' : 'https://scratch.blockcode.com.cn'}/#${fileId}?token=${session.accessToken}&refresh-token=${session.refreshToken}`
}
