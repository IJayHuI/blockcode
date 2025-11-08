<script setup>
  import { classes } from '@/storages/BcMain'
  import { getClasses, getClassMembers } from '@/utils/BcMain'
  import { onMounted } from 'vue'
  import { useNotification } from 'naive-ui'
  import BcIndex from '@/components/class/BcIndex.vue'

  const notification = useNotification()
  onMounted(async () => {
    try {
      await getClasses()
      await getClassMembers()
    } catch (error) {
      notification.error({
        title: '数据获取失败',
        content: String(error),
        duration: 4000
      })
    }
  })
</script>
<template>
  <p class="text-3xl font-bold mb-2">{{ classes.pageTitle }}</p>
  <div class="flex flex-col gap-2">
    <bc-index />
  </div>
</template>
