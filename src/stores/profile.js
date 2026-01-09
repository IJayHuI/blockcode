import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProfileStore = defineStore(
  'profile',
  () => {
    // ===== initialState =====
    const id = ref(null)
    const username = ref(null)
    const nickName = ref(null)
    const role = ref(null)
    const classIds = ref([])
    const profilePageForm = ref({
      username: null,
      nickName: null,
      password: null,
      modifyMode: false
    })

    // ===== actions =====
    function setId(newId) {
      id.value = newId
    }
    function setUsername(newUsername) {
      username.value = newUsername
    }
    function setNickName(newNickName) {
      nickName.value = newNickName
    }
    function setRole(newRole) {
      role.value = newRole
    }
    function clearProfile() {
      id.value = null
      username.value = null
      nickName.value = null
      role.value = null
      classIds.value = []
    }
    function setClassIds(newClassIds) {
      classIds.value = newClassIds
    }
    function setProfilePageForm(newNickName, newPassword, newModifyMode) {
      if (newNickName !== undefined) profilePageForm.value.nickName = newNickName
      if (newPassword !== undefined) profilePageForm.value.password = newPassword
      if (profilePageForm.value.modifyMode !== newModifyMode && newModifyMode !== undefined) profilePageForm.value.modifyMode = newModifyMode
    }

    return {
      id,
      username,
      nickName,
      role,
      classIds,
      profilePageForm,

      setId,
      setUsername,
      setNickName,
      setRole,
      clearProfile,
      setClassIds,
      setProfilePageForm
    }
  },
  { persist: true }
)
