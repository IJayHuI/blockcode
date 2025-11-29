<script setup>
  import BcUserFileList from '@/components/BcUserFileList.vue'
  import BcPageTitle from '@/components/BcPageTitle.vue'

  import { ref, h } from 'vue'
  import { NSpin } from 'naive-ui'

  const props = defineProps({
    title: { type: String, required: false, default: '我的班级' },
    getUserFileFunc: { type: Function, required: false, default: () => {} },
    classList: { type: Array, required: false, default: [] },
    classMemberList: { type: Array, required: false, default: [] }
  })
  const expandFileMap = ref({}) // 存储每行 fileList
  const loadingMap = ref({}) // 可选：存储加载状态
  const columns = ref([
    {
      title: '查看文件',
      width: 100,
      type: 'expand',
      align: 'center',
      expandable: (rowData) => rowData.role === 'student',
      renderExpand: (row) => loadUserFiles(row.id)
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

  const loadUserFiles = (userId) => {
    const fileList = expandFileMap.value[userId]
    // 如果没数据，而且没在加载 → 发请求
    if (!fileList && !loadingMap.value[userId]) {
      loadingMap.value[userId] = true
      props.getUserFileFunc(userId).then((res) => {
        expandFileMap.value[userId] = res
        loadingMap.value[userId] = false
      })
    }
    // 展开内容：加载中显示加载动画
    if (loadingMap.value[userId]) return h('div', { class: 'p-4 flex justify-center' }, [h(NSpin)])
    return h(BcUserFileList, {
      showScratchButton: true,
      fileList: fileList || []
    })
  }
  const handleClassData = (classMemberList) => {
    const formated = {}
    classMemberList.forEach((member) => {
      member.user.key = member.user.id
      const classId = member.class.id
      if (!formated[classId]) formated[classId] = []
      formated[classId].push(member.user)
    })
    return formated
  }
</script>
<template>
  <bc-page-title :title="props.title" />
  <p v-if="props.classList.length === 0" class="text-2xl font-bold">您还没有班级</p>
  <div v-else class="flex flex-col gap-2">
    <div v-for="classItem in props.classList">
      <p class="text-2xl font-bold">{{ classItem.name }}</p>
      <n-data-table :columns="columns" :data="handleClassData(props.classMemberList)[classItem.id]" />
    </div>
  </div>
</template>
