import { defineStore } from 'pinia'

export const useEnvStore = defineStore('env', () => {
  // ===== state =====
  const isDev = import.meta.env.DEV
  const isProd = import.meta.env.PROD
  const mode = import.meta.env.MODE

  return {
    isDev,
    isProd,
    mode
  }
})
