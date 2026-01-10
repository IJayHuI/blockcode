<script setup>
  import { ref } from 'vue'
  import { useLoadingStore } from '@/stores/loading'

  import BcBeian from '@/containers/BcBeian.vue'
  import { KeyboardReturnRound } from '@vicons/material'
  import { NCarousel, NCarouselItem, useNotification, NTag } from 'naive-ui'

  const props = defineProps({
    carouselImg: { type: Array, required: false, default: [] },
    login: { type: Function, required: false, default: () => {} }
  })

  const loading = useLoadingStore()
  const notification = useNotification()
  const loginForm = ref({
    username: '',
    password: ''
  })

  const handleLogin = async () => {
    try {
      loading.start('正在登录...')
      await props.login(loginForm.value)
      notification.success({
        title: '登录成功',
        duration: 3000
      })
    } catch (error) {
      console.error(error)
      notification.error({
        title: '登录失败',
        content: error.message || '请稍后再试',
        duration: 6000
      })
    } finally {
      loading.end()
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
          <n-carousel-item v-for="(img, index) in props.carouselImg" :key="index" class="!w-3/5">
            <img class="w-full h-full object-cover" :src="img" />
          </n-carousel-item>
        </n-carousel>
      </div>
    </n-layout>
    <n-layout-sider width="35%" content-class="flex flex-col items-center">
      <div class="w-9/10 flex-1 flex flex-col justify-center gap-6">
        <p class="text-3xl font-bold">登录</p>
        <n-form label-placement="left" size="large" @keyup.enter="handleLogin">
          <n-form-item label="账号">
            <n-input v-model:value="loginForm.username" type="text" placeholder="请输入账号" />
          </n-form-item>
          <n-form-item label="密码">
            <n-input v-model:value="loginForm.password" type="password" placeholder="请输入密码" show-password-on="mousedown" />
          </n-form-item>
          <n-form-item>
            <n-button secondary type="primary" @click="handleLogin" class="w-9/10" icon-placement="right">
              登录
              <template #icon>
                <n-icon>
                  <KeyboardReturnRound />
                </n-icon>
              </template>
            </n-button>
          </n-form-item>
        </n-form>
      </div>
      <n-layout-footer class="flex gap-1"><bc-beian /></n-layout-footer>
    </n-layout-sider>
  </n-layout>
</template>
