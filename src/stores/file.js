import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFileStore = defineStore(
  'file',
  () => {
    // ===== state =====
    const fileList = ref([])

    // ==== actions =====
    function setFileList(newList) {
      fileList.value = newList
    }
    function addFile(newFile) {
      fileList.value.push(newFile)
    }
    function deleteFile(id) {
      fileList.value = fileList.value.filter((file) => file.id !== id)
    }
    function clearFileList() {
      fileList.value = []
    }

    return { fileList, setFileList, addFile, deleteFile, clearFileList }
  },
  { persist: true }
)
