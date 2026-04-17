<script setup lang="ts">
  import { ChevronRightRound } from '@vicons/material'
  import { useLoadingBar } from 'naive-ui'

  import { type ClassInfo, type Role } from '../../stores'

  import BcClassInfo from '../../containers/class/BcClassInfo.vue'
  import BcStudentFile from '../../containers/class/BcStudentFile.vue'

  const props = withDefaults(
    defineProps<{
      profileClassList: number[]
      classList: ClassInfo[]
      role: Role
      getClassList: () => Promise<any>
      openDrawer: (id: number) => void
    }>(),
    {
      role: 'student'
    }
  )
  const loadingBar = useLoadingBar()

  const handleGetClassList = async () => {
    try {
      loadingBar.start()
      await props.getClassList()
    } catch (error) {
      loadingBar.error()
    } finally {
      loadingBar.finish()
    }
  }

  handleGetClassList()
</script>
<template>
  <div class="flex flex-col gap-4">
    <div>
      <p class="text-2xl font-bold">我加入的班级</p>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-4">
        <template v-for="(classItem, index) in props.classList" :key="index">
          <n-card :title="classItem.name" v-if="props.profileClassList.includes(classItem.id)">
            <template #header-extra>
              <n-button secondary @click="props.openDrawer(classItem.id)">
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
    <div v-if="props.role === 'admin'">
      <p class="text-2xl font-bold">所有班级</p>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-4">
        <template v-for="(classItem, index) in props.classList" :key="index">
          <n-card :title="classItem.name">
            <template #header-extra>
              <n-button secondary @click="props.openDrawer(classItem.id)">
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
    <bc-class-info />
    <bc-student-file />
  </div>
</template>
