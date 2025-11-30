<script setup>
  import BcLoginIndex from '@/components/login/BcIndex.vue'

  import { useNotification } from 'naive-ui'
  import { login, getProfileFromSupabase } from '@/utils/BcLogin'
  import { loading } from '@/main'
  import router from '@/routes'

  const notification = useNotification()
  const carouselImg = ['/login-carousels/LoginCarousel1.jpg', '/login-carousels/LoginCarousel2.jpg', '/login-carousels/LoginCarousel3.jpg', '/login-carousels/LoginCarousel4.jpg', '/login-carousels/LoginCarousel5.jpg']
  const handleLogin = async (data) => {
    loading.value.missionCount++
    try {
      await login(data)
      await getProfileFromSupabase()
      router.push('/home')
    } catch (error) {
      notification.error({
        title: '登录失败',
        content: String(`错误原因：${error}`),
        duration: 4000
      })
    } finally {
      loading.value.missionCount--
    }
  }
</script>
<template>
  <bc-login-index :carouselImg="carouselImg" :login-func="handleLogin" />
</template>
