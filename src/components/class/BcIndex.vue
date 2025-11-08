<script setup>
  import { classes } from '@/storages/BcMain'
  import BcUserFileList from '@/components/class/BcUserFileList.vue'
  import { ref, h } from 'vue'
  import { NButton, NSpace } from 'naive-ui'

  const columns = ref([
    {
      type: 'expand',
      expandable: (rowData) => rowData.role === 'student',
      renderExpand: (row) => h(BcUserFileList, { userId: row.id })
    },
    {
      title: '昵称',
      key: 'nick_name'
    },
    {
      title: '角色',
      key: 'role',
      align: 'center',
      render(row) {
        switch (row.role) {
          case 'student':
            return '学生'
          case 'teacher':
            return '教师'
          case 'admin':
            return '管理员'
        }
      }
    }
  ])
</script>
<template>
  <div v-for="classItem in classes.classes">
    <p class="text-2xl font-bold">{{ classItem.name }}</p>
    <n-data-table :columns="columns" :data="classes.classMembers?.[classItem.id]" />
  </div>
</template>
