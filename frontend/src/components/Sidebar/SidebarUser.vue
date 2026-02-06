<script setup lang="ts">
import { inject, type Ref } from "vue"
import useAuth from "@/composables/useAuth"

defineProps<{ user: any }>()

const { logout } = useAuth()
const sidebar = inject<{
  isMobile: Ref<boolean>
  setOpenMobile: (value: boolean) => void
}>("sidebar")

const _handleMenuClick = () => {
  if (sidebar?.isMobile.value) {
    sidebar.setOpenMobile(false)
  }
}
</script>

<template>
  <SidebarMenu v-if="user">
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            data-testid="user-menu"
          >
            <div class="flex items-center gap-2.5 w-full min-w-0">
              <Avatar class="size-8">
                <AvatarFallback class="bg-zinc-600 text-white">
                  {{ getInitials(user?.full_name || "User") }}
                </AvatarFallback>
              </Avatar>
              <div class="flex flex-col items-start min-w-0">
                <p class="text-sm font-medium truncate w-full">{{ user?.full_name }}</p>
                <p class="text-xs text-muted-foreground truncate w-full">{{ user?.email }}</p>
              </div>
            </div>
            <ChevronsUpDown class="ml-auto size-4 text-muted-foreground" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-56 rounded-lg"
          :side="sidebar?.isMobile.value ? 'bottom' : 'right'"
          align="end"
          :side-offset="4"
        >
          <DropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2.5 px-2 py-1.5">
              <Avatar class="size-8">
                <AvatarFallback class="bg-zinc-600 text-white">
                  {{ getInitials(user?.full_name || "User") }}
                </AvatarFallback>
              </Avatar>
              <div class="flex flex-col items-start min-w-0">
                <p class="text-sm font-medium truncate w-full">{{ user?.full_name }}</p>
                <p class="text-xs text-muted-foreground truncate w-full">{{ user?.email }}</p>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <router-link to="/settings" @click="handleMenuClick">
            <DropdownMenuItem>
              <Settings class="mr-2 h-4 w-4" />
              User Settings
            </DropdownMenuItem>
          </router-link>
          <DropdownMenuItem @click="logout">
            <LogOut class="mr-2 h-4 w-4" />
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
