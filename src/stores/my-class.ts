import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { Profile } from './profile'

export type ClassInfo = {
  id: number
  name: string
  createdAt: string
}
export type ClassMemberInfo = {
  id: number
  profile: Profile
}

export const useMyClassStore = defineStore('my-class', () => {
  const classList = ref<ClassInfo[]>([])
  const classInfoDrawerVisible = ref(false)
  const studentFileDrawerVisible = ref(false)
  const classEditMemberDrawerVisible = ref(false)
  const classInfoDrawerId = ref<number | null>(null)
  const studentFileDrawerStudentId = ref<string>('')

  function setClassList(classes: ClassInfo[]) {
    classList.value = classes
  }
  function setClassInfoDrawerVisible(v: boolean) {
    classInfoDrawerVisible.value = v
  }
  function setStudentFileDrawerVisible(v: boolean) {
    studentFileDrawerVisible.value = v
  }
  function setClassEditMemberDrawerVisible(v: boolean) {
    classEditMemberDrawerVisible.value = v
  }
  function setClassInfoDrawerId(id: number | null) {
    classInfoDrawerId.value = id
  }
  function setStudentFileDrawerStudentId(studentId: string) {
    studentFileDrawerStudentId.value = studentId
  }

  return {
    classList,
    classInfoDrawerVisible,
    studentFileDrawerVisible,
    classEditMemberDrawerVisible,
    classInfoDrawerId,
    studentFileDrawerStudentId,
    setClassList,
    setClassInfoDrawerVisible,
    setStudentFileDrawerVisible,
    setClassEditMemberDrawerVisible,
    setClassInfoDrawerId,
    setStudentFileDrawerStudentId
  }
})
