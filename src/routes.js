import { createWebHistory, createRouter } from 'vue-router'
import { supabase } from '@/main'
import routes from '@/storages/routes'
import { getProfile } from '@/utils/BcMain'

// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

router.beforeEach(async (to, from, next) => {
  const {
    data: { session }
  } = await supabase.auth.getSession()
  // 未登录且目标路由不是登录页，重定向到登录页
  if (to.path !== '/login' && !session?.user) return '/login'
  const profile = getProfile()
  if (to.meta.roles && !to.meta.roles.includes(profile.role)) {
    // 根据角色重定向
    if (profile.role === 'student') next('/file')
    else next('/home')
  } else next()
})

export default router
