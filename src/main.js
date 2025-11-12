import { computed, createApp, ref } from 'vue'
import '@/style.css'
import App from '@/App.vue'

import router from '@/routes.js'

import { create, NUpload, NUploadDragger, NButton, NRadio, NSwitch, NSpace, NInput, NIcon, NLayout, NLayoutHeader, NLayoutContent, NLayoutFooter, NLayoutSider, NCard, NForm, NFormItem, NDatePicker, NSelect, NDataTable } from 'naive-ui'
const naive = create({ components: [NUpload, NUploadDragger, NButton, NRadio, NSwitch, NSpace, NInput, NIcon, NLayout, NLayoutHeader, NLayoutContent, NLayoutFooter, NLayoutSider, NCard, NForm, NFormItem, NDatePicker, NSelect, NDataTable] })

// Supabase 后端
import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)

// 全局加载状态
export const loading = ref({
  status: computed(() => {
    return loading.value.missionCount !== 0
  }),
  missionCount: 0,
  text: null
})

// 环境
export const isDev = import.meta.env.DEV

createApp(App).use(router).use(naive).mount('#app')
