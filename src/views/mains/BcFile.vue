<script setup>
  import BcCreateAndUpload from '@/components/file/BcCreateAndUpload.vue'
  import BcFileList from '@/components/file/BcFileList.vue'
</script>
<template>
  <p class="text-3xl font-bold mb-2">我的文件</p>
  <div class="flex flex-col gap-2">
    <div><bc-create-and-upload /></div>
    <div>
      <p class="text-2xl font-bold">文件列表</p>
      <bc-file-list />
    </div>
  </div>
</template>
