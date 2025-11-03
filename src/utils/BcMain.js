import { supabase } from '@/main'

export const signout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}
