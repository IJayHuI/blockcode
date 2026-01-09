<script setup>
  import { UploadFileRound, CheckRound } from '@vicons/material'
  import { useNotification, useLoadingBar } from 'naive-ui'
  import BcPageTitle from '@/containers/BcPageTitle.vue'

  const props = defineProps({
    pageTitle: { type: String, required: false, default: null },
    batchMode: { type: Boolean, required: false, default: false },
    role: { type: String, required: false, default: 'student' },
    username: { type: String, required: false, default: null },
    nickName: { type: String, required: false, default: null },
    validity: { type: [String, Number], required: false, default: null },
    password: { type: String, required: false, default: null },
    setBatchMode: { type: Function, required: false, default: () => {} },
    setRole: { type: Function, required: false, default: () => {} },
    setUsername: { type: Function, required: false, default: () => {} },
    setNickName: { type: Function, required: false, default: () => {} },
    setValidity: { type: Function, required: false, default: () => {} },
    setPassword: { type: Function, required: false, default: () => {} },
    createUser: { type: Function, required: false, default: () => {} }
  })
  const notification = useNotification()
  const loadingBar = useLoadingBar()

  const handleUpload = () => {}
  const handleRadioChange = (e) => {
    props.setRole(e.target.value)
  }
  const handleCreateUser = async () => {
    try {
      loadingBar.start()
      const result = await props.createUser()
      notification.success({
        title: '创建成功',
        content: result.map((item) => (item.success ? `✅ ${item.username} 创建成功` : `❌ ${item.username} 创建失败：${item.error || '未知错误'}`)).join('\n'),
      })
    } catch (error) {
      loadingBar.error()
      notification.error({
        title: '创建失败',
        content: error.message,
        duration: 6000
      })
    } finally {
      loadingBar.finish()
    }
  }
</script>
<template>
  <bc-page-title :title="props.pageTitle" />
  <n-form label-placement="left" label-width="auto" size="large">
    <n-form-item label="是否批量创建">
      <n-switch :value="props.batchMode" @update:value="(val) => props.setBatchMode(val)"><template #checked>是</template><template #unchecked>否</template></n-switch>
    </n-form-item>
    <n-form-item label="账号类型">
      <n-radio @change="handleRadioChange" :checked="props.role === 'student'" value="student" label="学生" />
      <n-radio @change="handleRadioChange" :checked="props.role === 'teacher'" value="teacher" label="教师" />
      <n-radio @change="handleRadioChange" :checked="props.role === 'admin'" value="admin" label="管理员" />
    </n-form-item>
    <n-form-item label="账号">
      <n-input :value="props.username" @update:value="(val) => props.setUsername(val)" :disabled="props.batchMode" />
    </n-form-item>
    <n-form-item label="昵称">
      <n-input :value="props.nickName" @update:value="(val) => props.setNickName(val)" :disabled="props.batchMode" />
    </n-form-item>
    <n-form-item label="有效期">
      <n-date-picker :value="props.validity" @update:value="(val) => props.setValidity(val)" type="date" :disabled="props.role !== 'student'" />
    </n-form-item>
    <n-form-item label="密码">
      <n-input :value="props.password" @update:value="(val) => props.setPassword(val)" placeholder="请输入密码，为空则使用默认密码（blockcode）" />
    </n-form-item>
    <n-form-item label="批量注册账号名单">
      <n-upload :custom-request="handleUpload" :max="1" accept=".sb3" :disabled="!props.batchMode">
        <n-upload-dragger class="flex flex-col justify-center items-center !bg-transparent">
          <n-icon size="35"><UploadFileRound /></n-icon>
          <p class="text-base">点击或者拖动文件到该区域来上传</p>
          <p>只能上传1个.xlsx文件</p>
        </n-upload-dragger>
      </n-upload>
    </n-form-item>
    <n-form-item>
      <n-button @click="handleCreateUser" secondary type="success">
        <template #icon>
          <n-icon>
            <CheckRound />
          </n-icon>
        </template>
        创建用户
      </n-button>
    </n-form-item>
  </n-form>
</template>
