<script setup>
  import BcShowStudentFile from '@/components/BcClass/BcShowStudentFile.vue'

  import { useClassStore } from '@/stores/class'

  const classes = useClassStore()
  const props = defineProps({
    userId: { type: String, required: false, default: null }
  })

  const closeDrawer = () => {
    classes.setMemberFileListDrawerState(false)
  }
</script>
<template>
  <bc-show-student-file :username="classes.memberDrawerTitleUsername" :file-list="classes.memberFileList" :state="classes.memberFileListDrawerState" :close-drawer="closeDrawer" />
</template>
