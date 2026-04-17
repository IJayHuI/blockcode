import { supabase } from './supabase'

import { type CreateForm, type Profile, type Session, type UpdateProfile } from '../stores'

export const getProfile = async (userId: string): Promise<Profile> => {
  const { data: profileData, error: profileError } = await supabase.from('profiles').select(`*, class_members (class_id)`).eq('id', userId).single()
  if (profileError) throw profileError

  return {
    id: profileData.id,
    username: profileData.username,
    nickName: profileData.nick_name,
    classIds: profileData.class_members?.map((item: any) => item.class_id) || [],
    role: profileData.role,
    validity: profileData.validity
  }
}

export const getSession = async (): Promise<Session> => {
  const {
    data: { session },
    error
  } = await supabase.auth.getSession()
  if (error) throw error

  return {
    accessToken: session?.access_token || '',
    refreshToken: session?.refresh_token || ''
  }
}

export const updateprofile = async (oldProfile: UpdateProfile, newProfile: UpdateProfile) => {
  if (oldProfile.nickName !== newProfile.nickName && newProfile.nickName !== null) {
    const { error } = await supabase
      .from('profiles')
      .update({
        nick_name: newProfile.nickName
      })
      .eq('id', oldProfile.id)
    if (error) throw error
  }
  if (newProfile.password !== null && newProfile.password.length > 0) {
    const { error } = await supabase.auth.updateUser({
      password: newProfile.password
    })
    if (error) throw error
  }
}

export const createUser = async (users: CreateForm) => {
  if (users.username === '' || users.username === null) throw '用户名不得为空'
  const { data, error } = await supabase.functions.invoke('create-user', {
    body: JSON.stringify({
      users: users.batchMode
        ? users.userList
        : [
            {
              username: users.username,
              nickName: users.nickName
            }
          ],
      password: users.password,
      validity: users.validity,
      role: users.role
    })
  })
  if (error) throw error
  return data
}
