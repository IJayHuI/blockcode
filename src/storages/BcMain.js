import { ref, h } from 'vue'
import { RouterLink } from 'vue-router'

// 菜单
export const fullMenuOptions = ref([
  {
    label: () => h(RouterLink, { to: '/home' }, { default: () => '主页' }),
    key: 'home'
  },
  {
    label: () => h(RouterLink, { to: '/file' }, { default: () => '我的文件' }),
    key: 'file'
  },
  {
    label: () => h(RouterLink, { to: '/class' }, { default: () => '我的班级' }),
    key: 'class'
  },
  {
    label: () => h(RouterLink, { to: '/classes' }, { default: () => '我的所有班级' }),
    key: 'classes'
  },
  {
    label: () => h(RouterLink, { to: '/profile' }, { default: () => '个人资料' }),
    key: 'profile'
  }
])
