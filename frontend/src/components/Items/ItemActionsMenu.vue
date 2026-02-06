<script setup lang="ts">
import { ref } from "vue"
import type { ItemPublic } from "@/client"
import type DeleteItem from "./DeleteItem.vue"
import type EditItem from "./EditItem.vue"

defineProps<{ item: ItemPublic }>()

const _editRef = ref<InstanceType<typeof EditItem>>()
const _deleteRef = ref<InstanceType<typeof DeleteItem>>()
</script>

<template>
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
        Edit Item
      </DropdownMenuItem>
      <DropdownMenuItem @click="deleteRef?.open()" class="text-destructive">
        <Trash class="mr-2 h-4 w-4" />
        Delete Item
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <EditItem ref="editRef" :item="item" />
  <DeleteItem ref="deleteRef" :item="item" />
</template>
