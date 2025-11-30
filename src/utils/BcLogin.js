import { supabase } from '@/main'
import { menuOptions } from '@/storages/BcMain'
import supabaseErrorMap from '@/utils/BcSupabaseErrorMap'
import { RouterLink } from 'vue-router'
import routes from '@/storages/routes'
import { getProfile } from '@/utils/BcMain'
import { h } from 'vue'

export const login = async (data) => {
  const { data: resultData, error } = await supabase.auth.signInWithPassword({
    email: `${data.phoneNumber}@blockcode.com.cn`,
    password: data.password
  })
  if (error) throw supabaseErrorMap[error.message] || error.message
  return resultData
}

export const getProfileFromSupabase = async () => {
  const {
    data: {
      session: { user }
    }
  } = await supabase.auth.getSession()
  const { data, error } = await supabase.from('profiles').select(`*,classes:class_members(class_id(*))`).eq('id', user.id).maybeSingle()
  data.user = user
  if (error) throw supabaseErrorMap[error.message] || error.message
  localStorage.setItem('bc-profile', JSON.stringify(data))
}

export const generateMenu = () => {
  menuOptions.value = routes
    .find((item) => item.path === '/')
    .children.filter((route) => route.meta.roles.includes(getProfile().role))
    .map((route) => {
      return {
        label: () => h(RouterLink, { to: route.path }, { default: () => route.label }),
        key: route.path.substring(1)
      }
    })
}
