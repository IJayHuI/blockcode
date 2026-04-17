import { supabase } from './supabase'

import { type ClassInfo, type ClassMemberInfo, type Profile, type Role } from '../stores'

export const getClassList = async (role: Role, userId: string): Promise<ClassInfo[]> => {
  if (role === 'admin') {
    const { data, error } = await supabase.from('classes').select('*')
    if (error) throw error
    return data.map((item) => ({
      id: item.id,
      name: item.name,
      createdAt: item.created_at
    }))
  } else {
    const { data, error } = await supabase.from('classes').select('*').eq('profile_id', userId)
    if (error) throw error
    return data.map((item) => ({
      id: item.id,
      name: item.name,
      createdAt: item.created_at
    }))
  }
}

export const getClassMembers = async (classId: number): Promise<ClassMemberInfo[]> => {
  const { data, error } = await supabase.from('class_members').select('id, profile_id(*)').eq('class_id', classId)
  if (error) throw error
  return data.map((member: any) => ({
    id: member.id,
    profile: {
      id: member.profile_id.id,
      username: member.profile_id.username,
      nickName: member.profile_id.nick_name,
      classIds: [],
      role: member.profile_id.role as Role,
      validity: member.profile_id.validity
    }
  }))
}

export const removeClassMember = async (classMemberId: number) => {
  const { error } = await supabase.from('class_members').delete().eq('id', classMemberId)
  if (error) throw error
}

export const addClassMembers = async (classId: number, memberIds: string[]) => {
  const { error } = await supabase.from('class_members').insert(
    memberIds.map((memberId) => ({
      class_id: classId,
      profile_id: memberId
    }))
  )
  if (error) throw error
}

export const getAvailableClassMembers = async (classId: number): Promise<Profile[]> => {
  const { data, error } = await supabase.rpc('get_available_class_members', {
    p_class_id: classId
  })
  if (error) throw error
  return data.map((member: any) => ({
    id: member.id,
    username: member.username,
    nickName: member.nick_name,
    classIds: [],
    role: member.role as Role,
    validity: member.validity
  }))
}
