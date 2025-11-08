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
    label: () => h(RouterLink, { to: '/class' }, { default: () => '我的所有班级' }),
    key: 'class'
  },
  {
    label: () => h(RouterLink, { to: '/profile' }, { default: () => '个人资料' }),
    key: 'profile'
  }
])

// 文件列表列
export const fileListTable = ref({
  datas: [],
  loadingStatus: true,
  needGetData: true
})

export const home = ref({
  pageTitle: '你好，用户'
})

export const theme = {
  common: {
    borderRadius: '8px'
  }
}

export const file = ref({
  pageTitle: ''
})

// 使用复数形式代替 class
export const classes = ref({
  pageTitle: '我的所有班级',
  classes: null,
  classMembers: null,
  classMemberFileList: [],
  getClassMemberFileLoadingStatus: true
})

export const profile = ref({
  profileForm: {
    username: null,
    nickName: null
  },
  modifyMode: false,
  role: null,
  pageTitle: '个人资料'
})
