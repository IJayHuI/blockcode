<script setup lang="ts">
  import { ref } from 'vue'
  import { CheckRound } from '@vicons/material'
  import { useNotification } from 'naive-ui'

  import type { UpdateProfile } from '../../stores'

  const props = defineProps<{
    role: string
    id: string
    updateProfile: (newProfile: UpdateProfile) => Promise<void>
  }>()
  const profileForm = ref({
    username: '',
    nickName: null,
    password: null
  })
  const modifyMode = ref(false)
  const notification = useNotification()

  const handleUpdateProfile = async () => {
    try {
      await props.updateProfile({ id: props.id, ...profileForm.value })
      notification.success({
        title: '信息更改成功',
        duration: 3000
      })
    } catch (error) {
      notification.success({
        title: '信息更改失败',
        duration: 6000
      })
    }
  }
</script>
<template>
  <n-form label-placement="left" label-width="auto" size="large">
    <n-form-item label="是否更改信息" v-if="props.role !== 'student'">
      <n-switch v-model:value="modifyMode"><template #checked>是</template><template #unchecked>否</template></n-switch>
    </n-form-item>
    <n-form-item label="账号">
      <n-input :value="profileForm.username" :disabled="true" />
    </n-form-item>
    <n-form-item label="昵称">
      <n-input v-model:value="profileForm.nickName" :disabled="!modifyMode" />
    </n-form-item>
    <n-form-item label="更改密码" v-if="props.role !== 'student'">
      <n-input type="password" show-password-on="mousedown" v-model:value="profileForm.password" placeholder="请输入新密码" :disabled="!modifyMode" />
    </n-form-item>
    <n-form-item v-if="modifyMode">
      <n-button @click="handleUpdateProfile" secondary type="success">
        <template #icon>
          <n-icon><CheckRound /></n-icon>
        </template>
        提交更改
      </n-button>
    </n-form-item>
  </n-form>
</template>
