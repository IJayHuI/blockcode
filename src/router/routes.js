export default [
  {
    path: '/',
    component: () => import('@/components/BcMain/BcMain.vue'),
    redirect: '/file',
    children: [
      { path: '/file', name: 'file', component: () => import('@/containers/BcFile.vue'), meta: { roles: ['student', 'teacher', 'admin'] }, label: '我的文件' },
      { path: '/class', name: 'class', component: () => import('@/containers/BcClass.vue'), meta: { roles: ['teacher', 'admin'] }, label: '我的班级' },
      { path: '/profile', name: 'profile', component: () => import('@/containers/BcProfile.vue'), meta: { roles: ['teacher', 'admin'] }, label: '个人资料' },
      { path: '/create-user', name: 'create-user', component: () => import('@/containers/BcCreateUser.vue'), meta: { roles: ['admin'] }, label: '创建用户' }
    ]
  },
  { path: '/login', name: 'login', component: () => import('@/containers/BcLogin.vue') }
]
