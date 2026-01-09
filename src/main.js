import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'

import router from '@/router/index'

import { create, NUpload, NUploadDragger, NButton, NRadio, NSwitch, NSpace, NInput, NIcon, NLayout, NLayoutHeader, NLayoutContent, NLayoutFooter, NLayoutSider, NCard, NForm, NFormItem, NDatePicker, NSelect, NDataTable } from 'naive-ui'
const naive = create({ components: [NUpload, NUploadDragger, NButton, NRadio, NSwitch, NSpace, NInput, NIcon, NLayout, NLayoutHeader, NLayoutContent, NLayoutFooter, NLayoutSider, NCard, NForm, NFormItem, NDatePicker, NSelect, NDataTable] })

import { createPinia } from 'pinia'
const pinia = createPinia()

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
pinia.use(piniaPluginPersistedstate)

createApp(App).use(pinia).use(router).use(naive).mount('#app')
