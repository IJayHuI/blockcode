import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from './routes'

import { create,NDrawerContent, NDrawer, NUpload, NUploadDragger, NButton, NRadio, NSwitch, NSpace, NInput, NIcon, NLayout, NLayoutHeader, NLayoutContent, NLayoutFooter, NLayoutSider, NCard, NForm, NFormItem, NDatePicker, NSelect, NDataTable } from 'naive-ui'
const naive = create({ components: [NDrawerContent, NDrawer, NUpload, NUploadDragger, NButton, NRadio, NSwitch, NSpace, NInput, NIcon, NLayout, NLayoutHeader, NLayoutContent, NLayoutFooter, NLayoutSider, NCard, NForm, NFormItem, NDatePicker, NSelect, NDataTable] })

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App).use(pinia).use(naive).use(router).mount('#app')
