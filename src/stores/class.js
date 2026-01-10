import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useClassStore = defineStore('class', () => {
  // ===== state =====
  const classList = ref([])
  const drawerState = ref(false)
  const addClassMemberDrawerState = ref(false)
  const memberFileListDrawerState = ref(false)
  const drawerClassId = ref(null)
  const drawerTitle = ref(null)
  const memberList = ref([])
  const availableMemberList = ref([])
  const memberFileList = ref([])

  // ===== action =====
  function setClassList(newList) {
    classList.value = newList
  }
  function addClass(newClass) {
    classList.value.push(newClass)
  }
  function deleteClass(id) {
    classList.value = classList.value.filter((cls) => cls.id !== id)
  }
  function clearClassList() {
    classList.value = []
  }
  function setDrawerState(newState) {
    drawerState.value = newState
  }
  function setAddClassMemberDrawerState(newState) {
    addClassMemberDrawerState.value = newState
  }
  function setMemberFileListDrawerState(newState) {
    memberFileListDrawerState.value = newState
  }
  function setDrawerClassId(newId) {
    drawerClassId.value = newId
  }
  function setDrawerTitle(newTitle) {
    drawerTitle.value = newTitle
  }
  function setMemberList(newList) {
    memberList.value = newList
  }
  function setMemberFileList(newList) {
    memberFileList.value = newList
  }
  function setAvailableMemberList(newList) {
    availableMemberList.value = newList
  }

  return {
    classList,
    drawerState,
    addClassMemberDrawerState,
    memberFileListDrawerState,
    drawerClassId,
    drawerTitle,
    memberList,
    memberFileList,
    availableMemberList,

    setClassList,
    addClass,
    deleteClass,
    clearClassList,
    setDrawerState,
    setAddClassMemberDrawerState,
    setMemberFileListDrawerState,
    setDrawerClassId,
    setDrawerTitle,
    setMemberList,
    setMemberFileList,
    setAvailableMemberList
  }
})
