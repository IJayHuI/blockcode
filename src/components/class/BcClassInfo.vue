<script setup lang="ts">
  import { h } from 'vue'
  import { NAvatar, NSpace, NButton, useNotification } from 'naive-ui'
  import { AddRound } from '@vicons/material';

  import BcClassEditMember from '../../containers/class/BcClassEditMember.vue'

  import type { ClassMemberInfo } from '../../stores'

  const props = defineProps<{
    drawerState: boolean
    title: string
    memberList: ClassMemberInfo[]
    closeDrawer: () => void
    removeClassMember: (member: ClassMemberInfo) => Promise<void>
    openEditMemberDrawer: () => void
    openStudentFileDrawer: (studentId: string) => void
  }>()
  const tableColumns = [
    {
      width: 70,
      align: 'center',
      render(row: ClassMemberInfo) {
        return h(NAvatar, {}, { default: () => (row.profile.nickName ? row.profile.nickName.substring(0, 1) : row.profile.username.substring(0, 1)) })
      }
    },
    {
      title: '用户名',
      key: 'profile.username',
      width: 150
    },
    {
      title: '昵称',
      key: 'profile.nickName',
      width: 200
    },
    {
      title: '操作',
      key: 'actions',
      align: 'center',
      render(row: ClassMemberInfo) {
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
                    onClick: async () => handleRemoveClassMember(row)
                  },
                  { default: () => '移除' }
                )
              ]
              // 只有 student 才显示第二个按钮
              if (row.profile.role === 'student') {
                buttons.push(
                  h(
                    NButton,
                    {
                      secondary: true,
                      type: 'success',
                      onClick: () => props.openStudentFileDrawer(row.profile.id)
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
  ]
  const notification = useNotification()

  const handleRemoveClassMember = async (member: ClassMemberInfo) => {
    try {
      await props.removeClassMember(member)
      notification.success({
        content: '移除成员成功',
        duration: 3000
      })
    } catch (error) {
      notification.error({
        content: '移除成员失败',
        duration: 6000
      })
      throw error
    }
  }
</script>
<template>
  <n-drawer closeable :show="props.drawerState" width="60%" @update:show="props.closeDrawer">
    <n-drawer-content :title="props.title" closable body-content-class="flex flex-col gap-4">
      <n-button size="large" secondary @click="props.openEditMemberDrawer">
        <template #icon>
          <n-icon><AddRound /></n-icon>
        </template>
        添加人员
      </n-button>
      <div>
        <p class="text-base">管理员</p>
        <n-data-table :columns="tableColumns" :data="props.memberList.filter((member) => member.profile.role === 'admin')" />
      </div>
      <div>
        <p class="text-base">教师</p>
        <n-data-table :columns="tableColumns" :data="props.memberList.filter((member) => member.profile.role === 'teacher')" />
      </div>
      <div>
        <p class="text-base">学生</p>
        <n-data-table :columns="tableColumns" :data="props.memberList.filter((member) => member.profile.role === 'student')" />
      </div>
    </n-drawer-content>
  </n-drawer>
  <bc-class-edit-member />
</template>
