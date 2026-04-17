import { defineStore } from 'pinia'
import { ref } from 'vue'

export type Role = 'student' | 'teacher' | 'admin'
export type Profile = {
  id: string
  username: string
  nickName: string
  classIds: number[] | null
  role: Role
  validity: string | null
}
export type UpdateProfile = {
  id: string
  username: string
  nickName: string | null
  password: string | null
}
export type CreateForm = {
  role: Role
  userList?: {
    username: string
    nickName: string
  }[]
  username: string
  nickName: string | null
  validity: number | null
  password: string
  batchMode: boolean
}
export type Session = {
  accessToken: string
  refreshToken: string
}

export const useProfileStore = defineStore(
  'profile',
  () => {
    const id = ref<string>('')
    const username = ref<string>('')
    const nickName = ref<string>('')
    const classIds = ref<number[]>([])
    const role = ref<Role>('student')

    function setId(v: string) {
      id.value = v
    }
    function setUsername(v: string) {
      username.value = v
    }
    function setNickName(v: string) {
      nickName.value = v
    }
    function setClassIds(v: number[]) {
      classIds.value = v
    }
    function setRole(v: Role) {
      role.value = v
    }
    function initProfile() {
      id.value = ''
      username.value = ''
      nickName.value = ''
      classIds.value = []
      role.value = 'student'
    }

    return {
      id,
      username,
      nickName,
      classIds,
      role,
      setId,
      setUsername,
      setNickName,
      setClassIds,
      setRole,
      initProfile
    }
  },
  { persist: true }
)
