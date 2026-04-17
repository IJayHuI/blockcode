<script setup lang="ts">
  import BcClass from '../../components/class/BcClass.vue'

  import { useStores } from '../../stores'

  import { getClassList } from '../../lib/my-class'

  const { profile, myClass } = useStores()

  const handleGetClassList = async () => {
    try {
      myClass.setClassList(await getClassList(profile.role, profile.id))
    } catch (error) {
      throw error
    }
  }
  const openDrawer = (id: number) => {
    myClass.setClassInfoDrawerId(id)
    myClass.setClassInfoDrawerVisible(true)
  }
</script>

<template>
  <bc-class :role="profile.role" :get-class-list="handleGetClassList" :class-list="myClass.classList" :profile-class-list="profile.classIds" :open-drawer="openDrawer" />
</template>
