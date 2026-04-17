import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export type LoadingState = {
  status: boolean
  count: number
  text: string
}

export const useGeneralStore = defineStore('general', () => {
  const loadingCount = ref<number>(0)
  const loadingText = ref<string>('')
  const loading = computed<LoadingState>(() => ({
    status: loadingCount.value > 0,
    count: loadingCount.value,
    text: loadingText.value
  }))
  const envMode = import.meta.env.MODE

  function loadingEventAdd() {
    loadingCount.value += 1
  }
  function loadingEventSubtract() {
    loadingCount.value = Math.max(0, loadingCount.value - 1)
  }
  function loadingEventSetText(text: string) {
    loadingText.value = text
  }

  return {
    loadingCount,
    loadingText,
    loading,
    envMode,
    loadingEventAdd,
    loadingEventSubtract,
    loadingEventSetText
  }
})
