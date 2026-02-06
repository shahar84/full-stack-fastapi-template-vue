<script setup lang="ts">
import { Briefcase, Home, Users } from "lucide-vue-next"
import { computed } from "vue"
import useAuth from "@/composables/useAuth"

const { user: currentUser } = useAuth()

const baseItems = [
  { icon: Home, title: "Dashboard", path: "/" },
  { icon: Briefcase, title: "Items", path: "/items" },
]

const _items = computed(() =>
  currentUser.value?.is_superuser
    ? [...baseItems, { icon: Users, title: "Admin", path: "/admin" }]
    : baseItems,
)
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarHeader class="px-4 py-6 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:items-center">
      <Logo variant="responsive" />
    </SidebarHeader>
    <SidebarContent>
      <SidebarMain :items="items" />
    </SidebarContent>
    <SidebarFooter>
      <Appearance />
      <SidebarUser :user="currentUser" />
    </SidebarFooter>
  </Sidebar>
</template>
