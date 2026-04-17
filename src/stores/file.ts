import { defineStore } from 'pinia'
import { ref } from 'vue'

export type File = {
  createdAt: string
  fileName: string
  filePath: string
  id: number
  thumbnailUrl: string | null
  thumbnailPath: string | null
  userId: string
}

export const useFileStore = defineStore('file', () => {
  const fileList = ref<File[]>([])
  const needGetData = ref(true)

  const setNeedGetData = (v: boolean) => {
    needGetData.value = v
  }
  const setFileList = (files: File[]) => {
    fileList.value = files
  }
  const addFile = (file: File) => {
    fileList.value.push(file)
  }
  const removeFile = (file: File) => {
    fileList.value = fileList.value.filter((f) => f.id !== file.id)
  }

  return {
    fileList,
    needGetData,
    setNeedGetData,
    setFileList,
    addFile,
    removeFile
  }
})
