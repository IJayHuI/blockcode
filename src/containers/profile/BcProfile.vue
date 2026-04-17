<script setup lang="ts">
  import BcProfile from '../../components/profile/BcProfile.vue'

  import { useStores, type UpdateProfile } from '../../stores'

  import { updateprofile } from '../../lib/profile'

  const { profile } = useStores()

  const handleUpdateProfile = async (newProfile: UpdateProfile) => {
    const oldProfile = {
      id: profile.id,
      username: profile.username,
      nickName: profile.nickName,
      password: ''
    } as UpdateProfile
    try {
      const response = await updateprofile(oldProfile, newProfile)
      if (oldProfile.nickName !== newProfile.nickName && newProfile.nickName !== null) profile.setNickName(newProfile.nickName)
      return response
    } catch (error) {
      throw error
    }
  }
</script>

<template>
  <bc-profile :id="profile.id" :role="profile.role" :update-profile="handleUpdateProfile" />
</template>
