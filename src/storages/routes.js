export default [
  {
    path: '/',
    component: () => import('@/containers/mains/BcMain.vue'),
    redirect: '/home',
    children: [
      { path: '/home', component: () => import('@/containers/mains/BcHome.vue'), meta: { roles: ['teacher', 'admin'] }, label: '主页' },
      { path: '/file', component: () => import('@/containers/mains/BcFile.vue'), meta: { roles: ['student', 'teacher', 'admin'] }, label: '我的文件' },
      { path: '/class', component: () => import('@/containers/mains/BcClass.vue'), meta: { roles: ['teacher', 'admin'] }, label: '我的班级' },
      { path: '/profile', component: () => import('@/containers/mains/BcProfile.vue'), meta: { roles: ['teacher', 'admin'] }, label: '个人资料' },
      { path: '/create-user', component: () => import('@/containers/mains/BcCreateUser.vue'), meta: { roles: ['admin'] }, label: '创建用户' }
    ]
  },
  { path: '/login', component: () => import('@/containers/BcLogin.vue') }
]
