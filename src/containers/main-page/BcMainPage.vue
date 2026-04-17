<script setup lang="ts">
  import { ref, h } from 'vue'
  import { type MenuOption } from 'naive-ui'
  import { RouterLink } from 'vue-router'

  import { useStores } from '../../stores'

  import { routes } from '../../routes'
  import router from '../../routes'

  import BcMainPage from '../../components/main-page/BcMainPage.vue'
  import { supabase } from '../../lib/supabase'

  const { profile } = useStores()
  const menuOptions = ref<MenuOption[]>(
    routes
      .find((route) => route.path === '/')
      ?.children?.filter((child) => (child?.meta?.roles as string[])?.includes(profile.role))
      ?.map((child) => ({
        label: () =>
          h(
            RouterLink,
            {
              to: { name: child.name }
            },
            { default: () => child?.meta?.label }
          ),
        key: child.path
      })) || []
  )

  const signout = async () => {
    router.push('/login')
    await supabase.auth.signOut()
    profile.initProfile()
  }
</script>

<template>
  <bc-main-page :signout="signout" :menu-options="menuOptions" :nick-name="profile.nickName" :username="profile.username" />
</template>
