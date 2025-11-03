import { ref, h } from 'vue'
import { RouterLink } from 'vue-router'

// 菜单
export const fullMenuOptions = ref([
  {
    label: () => h(RouterLink, { to: '/home' }, { default: () => '主页' }),
    key: 'home'
  },
  {
    label: () => h(RouterLink, { to: '/file' }, { default: () => '文件' }),
    key: 'file'
  }
])
