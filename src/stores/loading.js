import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useLoadingStore = defineStore('loading', () => {
  // ===== initialState =====
  const missionCount = ref(0)
  const text = ref(null)

  const status = computed(() => missionCount.value !== 0)

  // ===== actions =====
  function start(message) {
    missionCount.value++
    if (message) text.value = message
  }

  function end() {
    if (missionCount.value > 0) {
      missionCount.value--
    }
    if (missionCount.value === 0) {
      text.value = null
    }
  }

  function setText(message) {
    text.value = message
  }

  return {
    // state
    missionCount,
    text,

    status,

    // actions
    start,
    end,
    setText
  }
})
