<script setup>
  import BcIndex from '@/components/class/BcIndex.vue'

  import { getClasses, getClassMembers, getUserFiles } from '@/utils/BcMain'
  import { onMounted, ref } from 'vue'
  import { useNotification } from 'naive-ui'

  const classes = ref([])
  const classMembers = ref([])
  const notification = useNotification()
  onMounted(async () => {
    try {
      classes.value = await getClasses()
      classMembers.value = await getClassMembers()
    } catch (error) {
      notification.error({
        title: '数据获取失败',
        content: String(error),
        duration: 4000
      })
    }
  })

  const handleGetUserFile = (userId) => {
    return getUserFiles(userId)
  }
</script>
<template>
  <bc-index :get-user-file-func="handleGetUserFile" :class-list="classes" :class-member-list="classMembers" />
</template>
