<script setup>
  import { useProfileStore } from '@/stores/profile'
  import { useClassStore } from '@/stores/class'
  import supabase from '@/lib/supabase'

  import BcClass from '@/components/BcClass/BcClass.vue'

  const profile = useProfileStore()
  const pageTitle = '我的班级'
  const classes = useClassStore()

  const getClassList = async () => {
    if (profile.role === 'admin') {
      const { data, error } = await supabase.from('classes').select('*')
      if (error) throw error
      classes.setClassList(data)
    }
  }
  const setDrawer = (state) => {
    classes.setDrawerState(state)
  }
  const setDrawerContent = (content) => {
    classes.setDrawerTitle(content.name)
    classes.setDrawerClassId(content.id)
  }
  const getClassInfo = async () => {
    const classId = classes.drawerClassId
    const { data, error } = await supabase.from('class_members').select('*').eq('class_id', classId)
    if (error) throw error
    const { data: classMenberData, error: classMenberError } = await supabase
      .from('profiles')
      .select('*')
      .in(
        'id',
        data.map((item) => item.profile_id)
      )
    if (classMenberError) throw classMenberError
    classes.setMemberList(classMenberData)
  }
  const deleteClassMember = async (member) => {
    const { error } = await supabase.from('class_members').delete().match({ profile_id: member.id, class_id: classes.drawerClassId })
    if (error) throw error
    classes.setMemberList(classes.memberList.filter((i) => i != member))
  }
  // 得到可以添加到当前班级的所有人
  const getAvailableClassMembers = async () => {
    const { data, error } = await supabase.rpc('get_available_class_members', {
      p_class_id: classes.drawerClassId
    })
    if (error) throw error
    classes.setAvailableMemberList(data)
  }
  const setAddClassMemberDrawer = (state) => {
    classes.setAddClassMemberDrawerState(state)
  }
  const addClassMember = async (memberList) => {
    const { data, error } = await supabase
      .from('class_members')
      .insert(
        memberList.map((member) => {
          return {
            class_id: classes.drawerClassId,
            profile_id: member
          }
        })
      )
      .select('profiles(*)')
    if (error) throw error
    const profiles = data.map((item) => item.profiles)
    classes.setMemberList([...profiles, ...classes.memberList])
  }
</script>
<template>
  <bc-class
    :page-title="pageTitle"
    :role="profile.role"
    :get-class-list="getClassList"
    :get-class-info="getClassInfo"
    :class-list="classes.classList"
    :my-class-list="profile.classIds"
    :set-drawer-state="setDrawer"
    :drawer-state="classes.drawerState"
    :set-drawer-content="setDrawerContent"
    :drawer-title="classes.drawerTitle"
    :member-list="classes.memberList"
    :delete-class-member="deleteClassMember"
    :set-add-class-member-drawer="setAddClassMemberDrawer"
    :add-class-member-drawer-state="classes.addClassMemberDrawerState"
    :get-available-class-members="getAvailableClassMembers"
    :available-member-list="classes.availableMemberList"
    :add-class-member="addClassMember" />
</template>
