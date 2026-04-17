<script setup lang="ts">
  import { ref } from 'vue'
  import { useNotification, useLoadingBar } from 'naive-ui'
  import { UploadFileRound, CheckRound } from '@vicons/material'

  import type { CreateForm, Role } from '../../stores'

  const props = defineProps<{
    createUser: (users: CreateForm) => Promise<[]>
  }>()
  const createForm = ref<CreateForm>({
    userList: [],
    role: 'student',
    username: '',
    nickName: '',
    validity: null,
    password: '',
    batchMode: false
  })
  const notification = useNotification()
  const loadingBar = useLoadingBar()
  const createUserButtonLoading = ref(false)

  const handleCreateUser = async () => {
    try {
      loadingBar.start()
      createUserButtonLoading.value = true
      const response: [] = await props.createUser(createForm.value)
      notification.info({ title: '用户创建结果', content: response.map((item: any) => (item.success ? `✅ ${item.username} 创建成功` : `❌ ${item.username} 创建失败：${item.error || '未知错误'}`)).join('\n'), duration: 6000 })
    } catch (error) {
      loadingBar.error()
      notification.error({ title: String(error), duration: 6000 })
    } finally {
      createUserButtonLoading.value = false
      loadingBar.finish()
    }
  }
  const handleUpload = () => {}
  const handleChangeRole = (e: Event) => {
    createForm.value.role = (e.target as HTMLInputElement).value as Role
  }
</script>

<template>
  <n-form label-placement="left" label-width="auto" size="large">
    <n-form-item label="是否批量创建">
      <n-switch v-model:value="createForm.batchMode" :disabled="true"><template #checked>是</template><template #unchecked>否</template></n-switch>
    </n-form-item>
    <n-form-item label="账号类型">
      <n-radio @change="handleChangeRole" :checked="createForm.role === 'student'" value="student" label="学生" />
      <n-radio @change="handleChangeRole" :checked="createForm.role === 'teacher'" value="teacher" label="教师" />
      <n-radio @change="handleChangeRole" :checked="createForm.role === 'admin'" value="admin" label="管理员" />
    </n-form-item>
    <n-form-item label="账号">
      <n-input v-model:value="createForm.username" :disabled="createForm.batchMode" />
    </n-form-item>
    <n-form-item label="昵称">
      <n-input v-model:value="createForm.nickName" :disabled="createForm.batchMode" />
    </n-form-item>
    <n-form-item label="有效期">
      <n-date-picker v-model:value="createForm.validity" type="date" :disabled="createForm.role !== 'student'" />
    </n-form-item>
    <n-form-item label="密码">
      <n-input v-model:value="createForm.password" placeholder="请输入密码，为空则使用默认密码（blockcode）" />
    </n-form-item>
    <n-form-item label="批量注册账号名单">
      <n-upload :custom-request="handleUpload" :max="1" accept=".sb3" :disabled="!createForm.batchMode">
        <n-upload-dragger class="flex flex-col justify-center items-center !bg-transparent">
          <n-icon size="35"><UploadFileRound /></n-icon>
          <p class="text-base">点击或者拖动文件到该区域来上传</p>
          <p>只能上传1个.xlsx文件</p>
        </n-upload-dragger>
      </n-upload>
    </n-form-item>
    <n-form-item>
      <n-button :loading="createUserButtonLoading" @click="handleCreateUser" secondary type="success">
        <template #icon>
          <n-icon><CheckRound /></n-icon>
        </template>
        创建用户
      </n-button>
    </n-form-item>
  </n-form>
</template>
