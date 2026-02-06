<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query"
import { computed } from "vue"
import { ItemsService } from "@/client"
import { columns } from "@/components/Items/columns"

const { data: items, isLoading } = useQuery({
  queryKey: ["items"],
  queryFn: () => ItemsService.readItems({ skip: 0, limit: 100 }),
})

const itemsData = computed(() => items.value?.data ?? [])
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Items</h1>
        <p class="text-muted-foreground">Create and manage your items</p>
      </div>
      <AddItem />
    </div>

    <PendingItems v-if="isLoading" />

    <template v-else-if="itemsData.length === 0">
      <div class="flex flex-col items-center justify-center text-center py-12">
        <div class="rounded-full bg-muted p-4 mb-4">
          <Search class="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 class="text-lg font-semibold">You don't have any items yet</h3>
        <p class="text-muted-foreground">Add a new item to get started</p>
      </div>
    </template>

    <DataTable v-else :columns="columns" :data="itemsData" />
  </div>
</template>
