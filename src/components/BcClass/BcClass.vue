<script setup>
  import { onMounted } from 'vue'

  import { ChevronRightRound } from '@vicons/material'
  import { useNotification, useLoadingBar, NDrawer } from 'naive-ui'
  import BcPageTitle from '@/containers/BcPageTitle.vue'
  import BcClassInfo from '@/components/BcClass/BcClassInfo.vue'

  const props = defineProps({
    pageTitle: { type: String, required: false, default: null },
    drawerTitle: { type: String, required: false, default: null },
    role: { type: String, required: false, default: 'student' },
    myClassList: { type: Array, required: false, default: [] },
    classList: { type: Array, required: false, default: [] },
    memberList: { type: Array, required: false, default: [] },
    availableMemberList: { type: Array, required: false, default: [] },
    memberFileList: { type: Array, required: false, default: [] },
    getClassList: { type: Function, required: false, default: () => {} },
    getClassInfo: { type: Function, required: false, default: () => {} },
    getAvailableClassMembers: { type: Function, required: false, default: () => {} },
    getMemberFileList: { type: Function, required: false, default: () => {} },
    setDrawerState: { type: Function, required: false, default: () => {} },
    setAddClassMemberDrawer: { type: Function, required: false, default: () => {} },
    setMemberFileListDrawer: { type: Function, required: false, default: () => {} },
    setDrawerContent: { type: Function, required: false, default: () => {} },
    deleteClassMember: { type: Function, required: false, default: () => {} },
    addClassMember: { type: Function, required: false, default: () => {} },
    drawerState: { type: Boolean, required: false, default: false },
    addClassMemberDrawerState: { type: Boolean, required: false, default: false },
    memberFileListDrawerState: { type: Boolean, required: false, default: false }
  })
  const notification = useNotification()
  const loadingBar = useLoadingBar()

  const handleGetClassList = async () => {
    try {
      loadingBar.start()
      await props.getClassList()
    } catch (error) {
      loadingBar.error()
      notification.error({
        title: '获取班级列表失败',
        content: error.message,
        duration: 6000
      })
    } finally {
      loadingBar.finish()
    }
  }
  const handleOpenDrawer = (classItem) => {
    props.setDrawerState(true)
    props.setDrawerContent(classItem)
  }
  const handleCloseDrawer = () => {
    props.setDrawerState(false)
  }
  onMounted(async () => await handleGetClassList())
</script>
<template>
  <bc-page-title :title="props.pageTitle" />
  <div class="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-2">
    <template v-for="(classItem, index) in props.classList" :key="index">
      <n-card v-if="props.myClassList.includes(classItem.id)" :title="classItem.name">
        <template #header-extra>
          <n-button secondary @click="handleOpenDrawer(classItem)">
            <template #icon>
              <n-icon>
                <ChevronRightRound />
              </n-icon>
            </template>
          </n-button>
        </template>
      </n-card>
    </template>
  </div>
  <div v-if="props.role === 'admin'">
    <p class="text-2xl font-bold">所有班级</p>
    <div class="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-2">
      <template v-for="(classItem, index) in props.classList" :key="index">
        <n-card :title="classItem.name">
          <template #header-extra>
            <n-button secondary @click="handleOpenDrawer(classItem)">
              <template #icon>
                <n-icon>
                  <ChevronRightRound />
                </n-icon>
              </template>
            </n-button>
          </template>
        </n-card>
      </template>
    </div>
  </div>
  <n-drawer @update:show="handleCloseDrawer" :show="props.drawerState" width="50%">
    <bc-class-info
      :title="props.drawerTitle"
      :get-class-info="props.getClassInfo"
      :member-list="props.memberList"
      :delete-class-member="props.deleteClassMember"
      :set-add-class-member-drawer="props.setAddClassMemberDrawer"
      :set-member-file-list-drawer="props.setMemberFileListDrawer"
      :add-class-member-drawer-state="props.addClassMemberDrawerState"
      :get-available-class-members="props.getAvailableClassMembers"
      :get-member-file-list="props.getMemberFileList"
      :available-member-list="props.availableMemberList"
      :add-class-member="props.addClassMember"
      :member-file-list-drawer-state="props.memberFileListDrawerState"
      :member-file-list="props.memberFileList" />
  </n-drawer>
</template>
