<script setup>
  import BcBeian from '@/components/BcBeian.vue'
  import { NCarousel, NCarouselItem, useNotification } from 'naive-ui'
  import { ref } from 'vue'
  import { loginForm } from '@/storages/BcLogin'
  import { login, getProfile } from '@/utils/BcLogin'
  import { loading } from '@/main'
  import router from '@/routes'

  const notification = useNotification()
  const loginCarouselImgs = ref(['/login-carousels/LoginCarousel1.jpg', '/login-carousels/LoginCarousel2.jpg', '/login-carousels/LoginCarousel3.jpg', '/login-carousels/LoginCarousel4.jpg', '/login-carousels/LoginCarousel5.jpg'])
  const handleLogin = async () => {
    loading.value.missionCount++
    try {
      await login()
      console.log(await getProfile())
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
  <n-layout has-sider position="absolute">
    <n-layout content-class="flex items-center justify-center">
      <div class="w-full grid justify-items-center gap-4 grid-cols-1">
        <img class="w-1/4" src="/Logo.svg" alt="logo" />
        <p class="text-4xl font-bold">欢迎进入 BlockCode 编程创作平台</p>
        <n-carousel class="!h-100" effect="card" autoplay :interval="3000" :show-dots="false">
          <n-carousel-item v-for="img in loginCarouselImgs" class="!w-3/5">
            <img class="w-full h-full object-cover" :key="img" :src="img" />
          </n-carousel-item>
        </n-carousel>
      </div>
    </n-layout>
    <n-layout-sider width="30%" content-class="flex flex-col items-center">
      <div class="w-9/10 flex-1 flex flex-col justify-center gap-6">
        <p class="text-3xl font-bold">登录</p>
        <n-form label-placement="left">
          <n-form-item label="账号" path="loginForm.phoneNumber">
            <n-input v-model:value="loginForm.phoneNumber" type="text" placeholder="请输入账号" />
          </n-form-item>
          <n-form-item label="密码" path="loginForm.password">
            <n-input v-model:value="loginForm.password" type="password" placeholder="请输入密码" show-password-on="mousedown" />
          </n-form-item>
          <n-form-item>
            <n-button secondary type="primary" @click="handleLogin" class="w-9/10">登录</n-button>
          </n-form-item>
        </n-form>
      </div>
      <n-layout-footer><bc-beian /></n-layout-footer>
    </n-layout-sider>
  </n-layout>
</template>
