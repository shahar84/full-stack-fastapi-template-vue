<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query"
import { computed } from "vue"
import { type UserPublic, UsersService } from "@/client"
import { columns } from "@/components/Admin/columns"
import type { UserTableData } from "@/components/Admin/columns"
import useAuth from "@/composables/useAuth"

const { user: currentUser } = useAuth()

const { data: users, isLoading } = useQuery({
  queryKey: ["users"],
  queryFn: () => UsersService.readUsers({ skip: 0, limit: 100 }),
})

const tableData = computed<UserTableData[]>(() =>
  (users.value?.data ?? []).map((user: UserPublic) => ({
    ...user,
    isCurrentUser: currentUser.value?.id === user.id,
  })),
)
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Users</h1>
        <p class="text-muted-foreground">Manage user accounts and permissions</p>
      </div>
      <AddUser />
    </div>

    <PendingUsers v-if="isLoading" />
    <DataTable v-else :columns="columns" :data="tableData" />
  </div>
</template>
