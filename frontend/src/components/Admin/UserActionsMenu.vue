<script setup lang="ts">
import { ref } from "vue"
import type { UserPublic } from "@/client"
import type DeleteUser from "./DeleteUser.vue"
import type EditUser from "./EditUser.vue"

defineProps<{ user: UserPublic; isCurrentUser: boolean }>()

const _editRef = ref<InstanceType<typeof EditUser>>()
const _deleteRef = ref<InstanceType<typeof DeleteUser>>()
</script>

<template>
  <template v-if="!isCurrentUser">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" size="icon" class="h-8 w-8">
          <MoreHorizontal class="h-4 w-4" />
          <span class="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem @click="editRef?.open()">
          <Pencil class="mr-2 h-4 w-4" />
          Edit User
        </DropdownMenuItem>
        <DropdownMenuItem @click="deleteRef?.open()" class="text-destructive">
          <Trash class="mr-2 h-4 w-4" />
          Delete User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <EditUser ref="editRef" :user="user" />
    <DeleteUser ref="deleteRef" :user="user" />
  </template>
</template>
