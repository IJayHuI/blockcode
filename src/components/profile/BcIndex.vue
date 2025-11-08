<script setup>
  import { profile } from '@/storages/BcMain'
  import { updateProfile, changePassword } from '@/utils/BcMain'
  import { useNotification } from 'naive-ui'

  const notification = useNotification()
  const handleUpdateProfile = async () => {
    try {
      await updateProfile()
      await changePassword()
      notification.success({
        title: '更改成功',
        duration: 3000
      })
    } catch (error) {
      notification.error({
        title: '更改失败',
        content: String(error),
        duration: 4000
      })
    }
  }
</script>
<template>
  <n-form :model="profile" label-placement="left" label-width="auto" size="large" class="max-w-160">
    <n-form-item label="是否更改信息" v-if="profile.role !== 'student'">
      <n-switch v-model:value="profile.modifyMode"><template #checked>是</template><template #unchecked>否</template></n-switch>
    </n-form-item>
    <n-form-item label="账号">
      <n-input v-model:value="profile.profileForm.username" :disabled="true" />
    </n-form-item>
    <n-form-item label="昵称">
      <n-input v-model:value="profile.profileForm.nickName" :disabled="!profile.modifyMode" />
    </n-form-item>
    <n-form-item label="更改密码">
      <n-input v-model:value="profile.profileForm.newPassword" placeholder="请输入新密码" :disabled="!profile.modifyMode" />
    </n-form-item>
    <n-form-item v-if="profile.modifyMode">
      <n-button @click="handleUpdateProfile" secondary type="success">提交更改</n-button>
    </n-form-item>
  </n-form>
</template>
