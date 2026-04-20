<script setup lang="ts">
  import BcCreateUser from '../../components/create-user/BcCreateUser.vue'

  import { createUser } from '../../lib/profile'

  import { type CreateForm } from '../../stores'

  const handleCreateUser = async (users: CreateForm) => {
    try {
      return await createUser(users)
    } catch (error) {
      throw error
    }
  }
</script>

<template>
  <bc-create-user :create-user="handleCreateUser" />
</template>
