<script setup>
  import router from '@/router/index'
  import routes from '@/router/routes'
  import supabase from '@/lib/supabase'
  import { useProfileStore } from '@/stores/profile'
  import { useFileStore } from '@/stores/file'
  import { onMounted, ref, h } from 'vue'

  import { RouterLink } from 'vue-router'
  import BcMenu from '@/components/BcMenu/BcMenu.vue'

  const profile = useProfileStore()
  const file = useFileStore()
  const menuOptions = ref([])

  const signout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error

    profile.clearProfile()
    file.clearFileList()

    router.push({ name: 'login' })
  }

  onMounted(() => {
    menuOptions.value = routes
      .find((item) => item.path === '/')
      .children.filter((route) => route.meta.roles.includes(profile.role))
      .map((route) => {
        return {
          label: () => h(RouterLink, { to: route.path }, { default: () => route.label }),
          key: route.path.substring(1)
        }
      })
  })
</script>
<template>
  <bc-menu :signout="signout" :menu-options="menuOptions" />
</template>
