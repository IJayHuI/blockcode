<script lang="ts" setup>
  import { h, ref } from 'vue'
  import { NAvatar, NButton, NSpace, useNotification } from 'naive-ui'
  import type { Profile } from '../../stores'

  const props = defineProps<{
    drawerState: boolean
    memberList: Profile[]
    closeDrawer: () => void
    confirmAddMembers: (members: string[]) => Promise<void>
  }>()
  const tableColumns = [
    {
      type: 'selection'
    },
    {
      align: 'center',
      render(row: Profile) {
        return h(NAvatar, {}, { default: () => (row.nickName ? row.nickName.substring(0, 1) : row.username.substring(0, 1)) })
      }
    },
    {
      title: '用户名',
      key: 'username',
      width: 150
    },
    {
      title: '昵称',
      key: 'nickName',
      width: 200
    }
  ]
  const checkRows = ref<string[]>([])
  const notification = useNotification()

  const handleClickConfirm = async () => {
    try {
      await props.confirmAddMembers(checkRows.value)
      notification.success({
        content: '添加成员成功',
        duration: 3000
      })
      props.closeDrawer()
    } catch (error) {
      notification.error({
        content: '添加成员失败',
        duration: 6000
      })
    }
  }
</script>
<template>
  <n-drawer :show="props.drawerState" width="40%" @update:show="props.closeDrawer">
    <n-drawer-content title="请选择要添加的用户">
      <n-data-table :columns="tableColumns" :data="props.memberList" @update:checked-row-keys="(keys: string[]) => (checkRows = keys)" :row-key="(row: Profile) => row.id" />
      <template #footer>
        <n-space>
          <n-button secondary @click="props.closeDrawer">取消</n-button>
          <n-button secondary @click="handleClickConfirm" type="success">确定</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>
