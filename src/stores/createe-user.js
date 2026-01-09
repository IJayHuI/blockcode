import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCreateUserStore = defineStore('create-user', () => {
  // ===== state =====
  const batchMode = ref(false)
  const role = ref('student')
  const username = ref(null)
  const password = ref(null)
  const classId = ref(null)
  const nickName = ref(null)
  const validity = ref(null)
  const userList = ref([])

  // ===== actions =====
  function setBatchMode(newState) {
    batchMode.value = newState
  }

  function setRole(newRole) {
    role.value = newRole
  }

  function setUsername(newUsername) {
    username.value = newUsername
  }

  function setPassword(newPassword) {
    password.value = newPassword
  }

  function setClassId(newClassId) {
    classId.value = newClassId
  }

  function setNickName(newNickName) {
    nickName.value = newNickName
  }

  function setValidity(newValidity) {
    validity.value = newValidity
  }

  function setUserList(newList) {
    userList.value = newList
  }

  // 重置表单（新增用户时很常用）
  function resetForm() {
    modifyMode.value = false
    role.value = 'student'
    username.value = null
    password.value = null
    classId.value = null
    nickName.value = null
    validity.value = null
  }

  return {
    // state
    batchMode,
    role,
    username,
    password,
    classId,
    nickName,
    validity,
    userList,

    // actions
    setBatchMode,
    setRole,
    setUsername,
    setPassword,
    setClassId,
    setNickName,
    setValidity,
    setUserList,
    resetForm
  }
})
