<script setup lang="ts">
import { type Component, inject, type Ref } from "vue"
import { useRoute } from "vue-router"

export interface NavItem {
  icon: Component
  title: string
  path: string
}

defineProps<{ items: NavItem[] }>()

const _route = useRoute()
const sidebar = inject<{
  isMobile: Ref<boolean>
  setOpenMobile: (value: boolean) => void
}>("sidebar")

const _handleClick = () => {
  if (sidebar?.isMobile.value) {
    sidebar.setOpenMobile(false)
  }
}
</script>

<template>
  <SidebarGroup>
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem v-for="item in items" :key="item.title">
          <SidebarMenuButton
            :tooltip="item.title"
            :is-active="route.path === item.path"
          >
            <router-link :to="item.path" class="flex w-full items-center gap-2" @click="handleClick">
              <component :is="item.icon" />
              <span>{{ item.title }}</span>
            </router-link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>
