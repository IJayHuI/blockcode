<script setup>
  import { onMounted } from 'vue'

  import { useNotification, useLoadingBar } from 'naive-ui'
  import { CheckRound } from '@vicons/material'
  import BcPageTitle from '@/containers/BcPageTitle.vue'

  const props = defineProps({
    pageTitle: { type: String, required: false, default: null },
    profileForm: { type: Object, required: false, default: {} },
    role: { type: String, required: false, default: 'student' },
    setNewProfileForm: { type: Function, required: false, default: () => {} },
    initProfileForm: { type: Function, required: false, default: () => {} },
    updateProfile: { type: Function, required: false, default: () => {} }
  })
  const loadingBar = useLoadingBar()
  const notification = useNotification()

  const handleUpdateProfile = async () => {
    try {
      loadingBar.start()
      await props.updateProfile()
      notification.success({
        title: '更新成功',
        duration: 3000
      })
    } catch (error) {
      loadingBar.error()
      console.error(error)
      notification.error({
        title: '更新失败',
        duration: 6000
      })
    } finally {
      loadingBar.finish()
    }
  }
  onMounted(() => props.initProfileForm())
</script>
<template>
  <bc-page-title :title="props.pageTitle" />
  <n-form label-placement="left" label-width="auto" size="large">
    <n-form-item label="是否更改信息" v-if="props.role !== 'student'">
      <n-switch :value="props.profileForm.modifyMode" @update:value="(val) => props.setNewProfileForm({ modifyMode: val })"><template #checked>是</template><template #unchecked>否</template></n-switch>
    </n-form-item>
    <n-form-item label="账号">
      <n-input :value="props.profileForm.username" :disabled="true" />
    </n-form-item>
    <n-form-item label="昵称">
      <n-input :value="props.profileForm.nickName" @update:value="(val) => props.setNewProfileForm({ nickName: val })" :disabled="!props.profileForm.modifyMode" />
    </n-form-item>
    <n-form-item label="更改密码" v-if="props.role !== 'student'">
      <n-input type="password" show-password-on="mousedown" :value="props.profileForm.password" @update:value="(val) => props.setNewProfileForm({ password: val })" placeholder="请输入新密码" :disabled="!props.profileForm.modifyMode" />
    </n-form-item>
    <n-form-item v-if="props.profileForm.modifyMode">
      <n-button @click="handleUpdateProfile" secondary type="success">
        <template #icon>
          <n-icon>
            <CheckRound />
          </n-icon>
        </template>
        提交更改
      </n-button>
    </n-form-item>
  </n-form>
</template>
