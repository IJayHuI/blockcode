<script setup>
  import { ref, onMounted, h } from 'vue'

  import BcFileList from '@/components/BcFile/BcFileList.vue'
  import { NDrawer, NDrawerContent, useNotification, useLoadingBar, NButton, NAvatar, NSpace } from 'naive-ui'

  const props = defineProps({
    title: { type: String, required: false, default: null },
    getClassInfo: { type: Function, required: false, default: () => {} },
    getAvailableClassMembers: { type: Function, required: false, default: () => {} },
    getMemberFileList: { type: Function, required: false, default: () => {} },
    addClassMember: { type: Function, required: false, default: () => {} },
    deleteClassMember: { type: Function, required: false, default: () => {} },
    setAddClassMemberDrawer: { type: Function, required: false, default: () => {} },
    setMemberFileListDrawer: { type: Function, required: false, default: () => {} },
    memberList: { type: Array, required: false, default: [] },
    availableMemberList: { type: Array, required: false, default: [] },
    memberFileList: { type: Array, required: false, default: [] },
    addClassMemberDrawerState: { type: Boolean, required: false, default: false },
    memberFileListDrawerState: { type: Boolean, required: false, default: false }
  })
  const loadingBar = useLoadingBar()
  const notification = useNotification()
  const classInfoColumns = ref([
    {
      width: 70,
      align: 'center',
      render(row) {
        return h(NAvatar, {}, { default: () => (row.nick_name ? row.nick_name.substring(0, 1) : row.username.substring(0, 1)) })
      }
    },
    {
      title: '用户名',
      key: 'username',
      width: 150
    },
    {
      title: '昵称',
      key: 'nick_name',
      width: 200
    },
    {
      title: '操作',
      key: 'actions',
      align: 'center',
      render(row) {
        return h(
          NSpace,
          {
            justify: 'center'
          },
          {
            default: () => {
              const buttons = [
                h(
                  NButton,
                  {
                    secondary: true,
                    type: 'error',
                    onClick: async () => handleDeleteClassMember(row)
                  },
                  { default: () => '移除' }
                )
              ]

              // ⭐ 只有 student 才显示第二个按钮
              if (row.role === 'student') {
                buttons.push(
                  h(
                    NButton,
                    {
                      secondary: true,
                      type: 'success',
                      onClick: async () => handleOpenMemberFileListDrawer(row)
                    },
                    { default: () => '查看文件' }
                  )
                )
              }

              return buttons
            }
          }
        )
      }
    }
  ])
  const addClassMemberColumns = ref([
    {
      type: 'selection'
    },
    {
      align: 'center',
      render(row) {
        return h(NAvatar, {}, { default: () => (row.nick_name ? row.nick_name.substring(0, 1) : row.username.substring(0, 1)) })
      }
    },
    {
      title: '用户名',
      key: 'username',
      width: 150
    },
    {
      title: '昵称',
      key: 'nick_name',
      width: 200
    }
  ])
  const checkRows = ref([])

  const handleGetClassInfo = async () => {
    try {
      loadingBar.start()
      await props.getClassInfo()
    } catch (error) {
      loadingBar.error()
      console.error('获取班级信息失败:', error)
      notification.error({
        title: '获取班级信息失败',
        content: error.message,
        duration: 6000
      })
    } finally {
      loadingBar.finish()
    }
  }
  const handleDeleteClassMember = async (member) => {
    try {
      loadingBar.start()
      await props.deleteClassMember(member)
      notification.success({
        title: '移除成功',
        duration: 3000
      })
    } catch (error) {
      loadingBar.error()
      notification.error({
        title: '移除人员失败',
        content: error.message,
        duration: 6000
      })
    } finally {
      loadingBar.finish()
    }
  }
  const handleGetAvailableClassMember = async () => {
    try {
      loadingBar.start()
      await props.getAvailableClassMembers()
    } catch (error) {
      loadingBar.error()
      notification.error({
        title: '获取可添加用户列表失败',
        content: error.message,
        duration: 6000
      })
    } finally {
      loadingBar.finish()
    }
  }
  const handleOpenAddClassMemberDrawer = () => {
    props.setAddClassMemberDrawer(true)
  }
  const handleCloseAddClassMemberDrawer = () => {
    props.setAddClassMemberDrawer(false)
  }
  const handleOpenMemberFileListDrawer = async (row) => {
    try {
      loadingBar.start()
      props.setMemberFileListDrawer(true)
      await props.getMemberFileList(row.id)
    } catch (error) {
      console.error(error)
      loadingBar.error()
      notification.error({
        title: '获取文件列表失败',
        content: error.message,
        duration: 6000
      })
    } finally {
      loadingBar.finish()
    }
  }
  const handleCloseMemberFileListDrawer = () => {
    props.setMemberFileListDrawer(false)
  }
  const handleClickConfirm = async () => {
    try {
      loadingBar.start()
      if (checkRows.value.length > 0) {
        await props.addClassMember(checkRows.value)
        notification.success({ title: '添加成功', duration: 3000 })
      }
    } catch (error) {
      loadingBar.error()
      notification.error({
        title: '添加到班级失败',
        content: error.message,
        duration: 6000
      })
    } finally {
      loadingBar.finish()
      props.setAddClassMemberDrawer(false)
    }
  }
  onMounted(async () => await handleGetClassInfo())
</script>
<template>
  <n-drawer-content :title="props.title" closable body-content-class="flex flex-col gap-2">
    <n-button secondary @click="handleOpenAddClassMemberDrawer">添加人员</n-button>
    <div>
      <p class="text-base">管理员</p>
      <n-data-table :columns="classInfoColumns" :data="props.memberList.filter((member) => member.role === 'admin')" />
    </div>
    <div>
      <p class="text-base">教师</p>
      <n-data-table :columns="classInfoColumns" :data="props.memberList.filter((member) => member.role === 'teacher')" />
    </div>
    <div>
      <p class="text-base">学生</p>
      <n-data-table :columns="classInfoColumns" :data="props.memberList.filter((member) => member.role === 'student')" />
    </div>

    <n-drawer :show="props.addClassMemberDrawerState" width="40%" @after-enter="handleGetAvailableClassMember">
      <n-drawer-content title="请选择要添加的用户">
        <n-data-table :columns="addClassMemberColumns" :data="props.availableMemberList" @update:checked-row-keys="(keys) => (checkRows = keys)" :row-key="(row) => row.id" />
        <template #footer>
          <n-space>
            <n-button secondary @click="handleCloseAddClassMemberDrawer">取消</n-button>
            <n-button secondary @click="handleClickConfirm" type="success">确定</n-button>
          </n-space>
        </template>
      </n-drawer-content>
    </n-drawer>
    <n-drawer @update:show="handleCloseMemberFileListDrawer" :show="props.memberFileListDrawerState" width="40%">
      <n-drawer-content closable :title="`的文件`">
        <bc-file-list :show-scratch-button="true" :file-list="props.memberFileList" />
      </n-drawer-content>
    </n-drawer>
  </n-drawer-content>
</template>
