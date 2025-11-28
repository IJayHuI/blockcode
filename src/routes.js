import { createWebHistory, createRouter } from 'vue-router'
import { supabase } from '@/main'
import routes from '@/storages/routes'
import { getProfile } from '@/utils/BcMain'

// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

router.beforeEach(async (to, from) => {
  const {
    data: { session }
  } = await supabase.auth.getSession()
  // 未登录
  if (to.path !== '/login' && !session?.user) return '/login'
  const profile = getProfile()
  // 权限不足
  if (to.meta.roles && !to.meta.roles.includes(profile.role)) {
    if (profile.role === 'student') return '/file'
    else return '/home'
  }
  return true // 正常放行
})

export default router
