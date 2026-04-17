<script lang="ts" setup>
  import { ref, watch } from 'vue'

  import { useStores, type Profile } from '../../stores'

  import BcClassEditMember from '../../components/class/BcClassEditMember.vue'

  import { getAvailableClassMembers, addClassMembers } from '../../lib/my-class'

  const { myClass } = useStores()
  const memberList = ref<Profile[]>([])

  const closeDrawer = () => {
    myClass.setClassEditMemberDrawerVisible(false)
  }
  const confirmAddMembers = async (members: string[]) => {
    try {
      await addClassMembers(myClass.classInfoDrawerId!, members)
    } catch (error) {
      throw error
    }
  }
  const handelGetAvailableMembers = async (classId: number) => {
    try {
      const response = await getAvailableClassMembers(classId)
      memberList.value = response
    } catch (error) {
      throw error
    }
  }

  watch(
    () => myClass.classEditMemberDrawerVisible,
    (newState) => {
      if (newState && myClass.classInfoDrawerId) handelGetAvailableMembers(myClass.classInfoDrawerId)
    }
  )
</script>
<template>
  <bc-class-edit-member :confirm-add-members="confirmAddMembers" :close-drawer="closeDrawer" :drawer-state="myClass.classEditMemberDrawerVisible" :member-list="memberList" />
</template>
