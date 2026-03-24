<script setup>
  import supabase from '@/lib/supabase'
  import router from '@/router/index'
  import { useProfileStore } from '@/stores/profile'

  import BcLogin from '@/components/BcLogin/BcLogin.vue'

  const profile = useProfileStore()
  const carouselImg = ['/login-carousels/LoginCarousel1.jpg', '/login-carousels/LoginCarousel2.jpg', '/login-carousels/LoginCarousel3.jpg', '/login-carousels/LoginCarousel4.jpg', '/login-carousels/LoginCarousel5.jpg']

  const login = async (credentials) => {
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: `${credentials.username}@blockcode.com.cn`,
      password: credentials.password
    })
    if (loginError) throw loginError

    const { data: profileData, error: profileError } = await supabase.from('profiles').select('*').eq('id', loginData.user.id).single()
    if (profileError) throw profileError

    const { data: classData, error: classError } = await supabase.from('class_members').select('class_id').eq('profile_id', loginData.user.id)
    if (classError) throw classError
    profile.setId(loginData.user.id)
    profile.setUsername(profileData.username)
    profile.setNickName(profileData.nick_name || profileData.username)
    profile.setRole(profileData.role)
    profile.setClassIds(classData.map((item) => item.class_id))

    router.push('/file')
  }
</script>
<template>
  <bc-login :carousel-img="carouselImg" :login="login" />
</template>
