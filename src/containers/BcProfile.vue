<script setup>
  import { useProfileStore } from '@/stores/profile'
  import supabase from '@/lib/supabase'

  import BcProfile from '@/components/BcProfile/BcProfile.vue'

  const profile = useProfileStore()
  const pageTitle = '个人资料'

  const setNewProfileForm = (newData) => {
    profile.setProfilePageForm(newData.nickName, newData.password, newData.modifyMode)
  }
  const initProfileForm = () => {
    profile.setProfilePageForm(profile.nickName, null, false)
  }
  const updateProfile = async () => {
    if (profile.nickName !== profile.profilePageForm.nickName) {
      const { error } = await supabase
        .from('profiles')
        .update({
          nick_name: profile.profilePageForm.nickName
        })
        .eq('id', profile.id)
      if (error) throw error
    }
    if (typeof profile.profilePageForm.password === 'string' && profile.profilePageForm.password.length > 0) {
      const { error } = await supabase.auth.updateUser({
        password: profile.profilePageForm.password
      })
      if (error) throw error
    }
    profile.setNickName(profile.profilePageForm.nickName)
  }
</script>
<template>
  <bc-profile :page-title="pageTitle" :role="profile.role" :profile-form="profile.profilePageForm" :init-profile-form="initProfileForm" :set-new-profile-form="setNewProfileForm" :update-profile="updateProfile" />
</template>
