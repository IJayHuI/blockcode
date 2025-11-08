import { createWebHistory, createRouter } from 'vue-router'
import { supabase } from '@/main'

// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/mains/BcMain.vue'),
      redirect: '/home',
      children: [
        { path: '/home', component: () => import('@/views/mains/BcHome.vue') },
        { path: '/file', component: () => import('@/views/mains/BcFile.vue') },
        { path: '/class', component: () => import('@/views/mains/BcClass.vue') },
        { path: '/profile', component: () => import('@/views/mains/BcProfile.vue') }
      ]
    },
    { path: '/login', component: () => import('@/views/BcLogin.vue') }
  ]
})

router.beforeEach(async (to, from) => {
  const {
    data: { session }
  } = await supabase.auth.getSession()

  // 未登录且目标路由不是登录页，重定向到登录页
  if (to.path !== '/login' && !session?.user) return '/login'
})

export default router
