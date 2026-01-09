<script setup>
  import { useCreateUserStore } from '@/stores/createe-user'
  import supabase from '@/lib/supabase'

  import BcCreateUser from '@/components/BcCreateUser/BcCreateUser.vue'

  const createUserStore = useCreateUserStore()
  const pageTitle = '创建用户'

  const createUser = async () => {
    const { data, error } = await supabase.functions.invoke('create-user', {
      body: JSON.stringify({
        users: createUserStore.batchMode
          ? createUserStore.userList
          : [
              {
                username: createUserStore.username,
                nickName: createUserStore.nickName
              }
            ],
        password: createUserStore.password,
        validity: createUserStore.validity,
        role: createUserStore.role
      })
    })
    if (error) throw error
    return data
  }
</script>
<template>
  <bc-create-user
    :page-title="pageTitle"
    :batch-mode="createUserStore.batchMode"
    :role="createUserStore.role"
    :username="createUserStore.username"
    :nick-name="createUserStore.nickName"
    :validity="createUserStore.validity"
    :password="createUserStore.password"
    :set-batch-mode="createUserStore.setBatchMode"
    :set-role="createUserStore.setRole"
    :set-username="createUserStore.setUsername"
    :set-nickName="createUserStore.setNickName"
    :set-validity="createUserStore.setValidity"
    :set-password="createUserStore.setPassword"
    :create-user="createUser" />
</template>
