<script setup lang="ts">
  import { ref } from 'vue'

  import BcStudentFile from '../../components/class/BcStudentFile.vue'

  import { useStores } from '../../stores'

  const { myClass } = useStores()
  const title = ref('学生文件')

  const closeDrawer = () => {
    myClass.setStudentFileDrawerVisible(false)
  }
</script>
<template>
  <bc-student-file :student-id="myClass.studentFileDrawerStudentId" :drawer-state="myClass.studentFileDrawerVisible" :close-drawer="closeDrawer" :title="title" />
</template>
