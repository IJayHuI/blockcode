<script setup lang="ts">
  import { supabase } from '../../lib/supabase'

  import BcLogin from '../../components/login/BcLogin.vue'

  import { useStores } from '../../stores'

  import { getProfile } from '../../lib/profile'

  import router from '../../routes'

  const { profile, general } = useStores()
  const carouselImg = ['/login-carousels/login-carousel1.jpg', '/login-carousels/login-carousel2.jpg', '/login-carousels/login-carousel3.jpg', '/login-carousels/login-carousel4.jpg', '/login-carousels/login-carousel5.jpg']

  const login = async ({ username, password }: { username: string; password: string }) => {
    try {
      general.loadingEventAdd()
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: `${username}@blockcode.com.cn`,
        password
      })
      if (authError) throw authError
      const profileData = await getProfile(authData.user.id)

      profile.setId(profileData.id)
      profile.setUsername(profileData.username)
      profile.setNickName(profileData.nickName)
      profile.setClassIds(profileData.classIds || [])
      profile.setRole(profileData.role)

      router.push('/file')
    } catch (error) {
      throw error
    } finally {
      general.loadingEventSubtract()
    }
  }
</script>

<template>
  <bc-login :carousel-img="carouselImg" :login="login" />
</template>
