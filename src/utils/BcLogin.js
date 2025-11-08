import { supabase } from '@/main'
import { loginForm } from '@/storages/BcLogin'
import supabaseErrorMap from '@/utils/BcSupabaseErrorMap'

export const login = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: `${loginForm.value.phoneNumber}@blockcode.com.cn`,
    password: loginForm.value.password
  })
  if (error) throw supabaseErrorMap[error.message] || error.message
  return data
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
