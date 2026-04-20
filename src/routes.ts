import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import { useStores } from './stores'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/file'
  },
  {
    path: '/',
    component: () => import('./containers/main-page/BcMainPage.vue'),
    redirect: '/file',
    children: [
      {
        path: '/file',
        name: 'File',
        component: () => import('./containers/file/BcFile.vue'),
        meta: { roles: ['student', 'teacher', 'admin'], label: '我的文件' }
      },
      {
        path: '/class',
        name: 'Class',
        component: () => import('./containers/class/BcClass.vue'),
        meta: { roles: ['teacher', 'admin'], label: '我的班级' }
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('./containers/profile/BcProfile.vue'),
        meta: { roles: ['teacher', 'admin'], label: '个人中心' }
      },
      {
        path: '/create-user',
        name: 'CreateUser',
        component: () => import('./containers/create-user/BcCreateUser.vue'),
        meta: { roles: ['admin'], label: '创建用户' }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('./containers/login/BcLogin.vue')
  }
]

// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to, _from, next) => {
  const { profile } = useStores()

  const { id, username, nickName, classIds } = profile
  // 判断是否“未登录”（全部为空）
  const isEmptyProfile = !id && !username && !nickName && (!classIds || classIds.length === 0)

  // 未登录，且访问的不是 login
  if (isEmptyProfile && to.path !== '/login') return next('/login')
  // 已登录访问 login，直接跳首页
  if (!isEmptyProfile && to.path === '/login') return next('/file')

  next()
})

export default router
