<script setup>
  import { createUserPage } from '@/storages/BcMain'
  import { createUser } from '@/utils/BcMain'
  import { useNotification } from 'naive-ui'
  import { UploadFileRound } from '@vicons/material'

  const notification = useNotification()
  const handleCreateUser = async () => {
    try {
      await createUser()
      notification.success({
        title: '创建成功',
        duration: 3000
      })
    } catch (error) {
      notification.error({
        title: '创建',
        content: String(error),
        duration: 4000
      })
    }
  }
  const handleRadioChange = (e) => {
    createUserPage.value.createUserForm.role = e.target.value
  }
  const handleUpload = () => {}
</script>
<template>
  <n-form :model="createUserPage" label-placement="left" label-width="auto" size="large">
    <n-form-item label="是否批量创建">
      <n-switch v-model:value="createUserPage.batchMode"><template #checked>是</template><template #unchecked>否</template></n-switch>
    </n-form-item>
    <n-form-item label="账号类型">
      <n-radio @change="handleRadioChange" :checked="createUserPage.createUserForm.role === 'student'" value="student" label="学生" />
      <n-radio @change="handleRadioChange" :checked="createUserPage.createUserForm.role === 'teacher'" value="teacher" label="教师" />
      <n-radio @change="handleRadioChange" :checked="createUserPage.createUserForm.role === 'admin'" value="admin" label="管理员" />
    </n-form-item>
    <n-form-item label="账号">
      <n-input v-model:value="createUserPage.createUserForm.username" :disabled="createUserPage.batchMode" />
    </n-form-item>
    <n-form-item label="昵称">
      <n-input v-model:value="createUserPage.createUserForm.nickName" :disabled="createUserPage.batchMode" />
    </n-form-item>
    <n-form-item label="有效期">
      <n-date-picker v-model:value="createUserPage.createUserForm.validity" type="date" :disabled="createUserPage.createUserForm.role !== 'student'" />
    </n-form-item>
    <n-form-item label="密码">
      <n-input v-model:value="createUserPage.createUserForm.password" placeholder="请输入密码，为空则使用默认密码（blockcode）" />
    </n-form-item>
    <n-form-item label="批量注册账号名单">
      <n-upload :custom-request="handleUpload" :max="1" accept=".sb3" :disabled="!createUserPage.batchMode">
        <n-upload-dragger class="flex flex-col justify-center items-center !bg-transparent">
          <n-icon size="35"><UploadFileRound /></n-icon>
          <p class="text-base">点击或者拖动文件到该区域来上传</p>
          <p>只能上传1个.xlsx文件</p>
        </n-upload-dragger>
      </n-upload>
    </n-form-item>
    <n-form-item>
      <n-button @click="handleCreateUser" secondary type="success">创建用户</n-button>
    </n-form-item>
  </n-form>
</template>
