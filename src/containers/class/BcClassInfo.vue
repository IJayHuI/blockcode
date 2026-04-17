<script setup lang="ts">
  import { ref, watch } from 'vue'
  import BcClassInfo from '../../components/class/BcClassInfo.vue'

  import { useStores, type ClassMemberInfo } from '../../stores'

  import { getClassMembers, removeClassMember } from '../../lib/my-class'

  const { myClass } = useStores()
  const memberList = ref<ClassMemberInfo[]>([])
  const title = ref('班级信息')

  const closeDrawer = () => {
    myClass.setClassInfoDrawerId(null)
    title.value = '班级信息'
    memberList.value = []
    myClass.setClassInfoDrawerVisible(false)
  }
  const openEditMemberDrawer = () => {
    myClass.setClassEditMemberDrawerVisible(true)
  }
  const openStudentFileDrawer = (studentId: string) => {
    myClass.setStudentFileDrawerStudentId(studentId)
    myClass.setStudentFileDrawerVisible(true)
  }
  const handelGetClassMembers = async (id: number) => {
    try {
      const response = await getClassMembers(id)
      memberList.value = response
      title.value = myClass.classList.find((c) => c.id === id)?.name || '班级信息'
    } catch (error) {}
  }
  const handelRemoveClassMember = async (member: ClassMemberInfo) => {
    try {
      await removeClassMember(member.id)
      memberList.value = memberList.value.filter((m) => m.id !== member.id)
    } catch (error) {
      throw error
    }
  }

  watch(
    () => myClass.classInfoDrawerId,
    (newId) => {
      if (newId !== null) handelGetClassMembers(newId)
    }
  )
</script>
<template>
  <bc-class-info
    :open-student-file-drawer="openStudentFileDrawer"
    :remove-class-member="handelRemoveClassMember"
    :drawer-state="myClass.classInfoDrawerVisible"
    :member-list="memberList"
    :title="title"
    :close-drawer="closeDrawer"
    :open-edit-member-drawer="openEditMemberDrawer" />
</template>
