export default [
  {
    path: '/',
    component: () => import('@/views/mains/BcMain.vue'),
    redirect: '/home',
    children: [
      { path: '/home', component: () => import('@/views/mains/BcHome.vue'), meta: { roles: ['teacher', 'admin'] }, label: '主页' },
      { path: '/file', component: () => import('@/views/mains/BcFile.vue'), meta: { roles: ['student', 'teacher', 'admin'] }, label: '我的文件' },
      { path: '/class', component: () => import('@/views/mains/BcClass.vue'), meta: { roles: ['teacher', 'admin'] }, label: '我的所有班级' },
      { path: '/profile', component: () => import('@/views/mains/BcProfile.vue'), meta: { roles: ['teacher', 'admin'] }, label: '个人资料' },
      { path: '/create-user', component: () => import('@/views/mains/BcCreateUser.vue'), meta: { roles: ['admin'] }, label: '创建用户' }
    ]
  },
  { path: '/login', component: () => import('@/views/BcLogin.vue') }
]
