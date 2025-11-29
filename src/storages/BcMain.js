import { ref, h } from 'vue'
import { RouterLink } from 'vue-router'

// 菜单
export const menuOptions = ref([])

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
    nickName: null,
    newPassword: null
  },
  modifyMode: false,
  role: null,
  pageTitle: '个人资料'
})

export const createUserPage = ref({
  pageTitle: '创建用户',
  batchMode: false,
  createUserForm: {
    role: 'student',
    username: null,
    password: null,
    classId: null,
    nickName: null,
    validity: null,
    userList: []
  }
})
