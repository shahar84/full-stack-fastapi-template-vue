<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-vue-next"

defineProps<{
  pageIndex: number
  pageSize: number
  pageCount: number
  totalItems: number
  canPreviousPage: boolean
  canNextPage: boolean
}>()

defineEmits<{
  "update:pageIndex": [value: number]
  "update:pageSize": [value: number]
}>()
</script>

<template>
  <div v-if="pageCount > 1" class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border-t bg-muted/20">
    <div class="flex flex-col sm:flex-row sm:items-center gap-4">
      <div class="text-sm text-muted-foreground">
        Showing {{ pageIndex * pageSize + 1 }} to {{ Math.min((pageIndex + 1) * pageSize, totalItems) }} of
        <span class="font-medium text-foreground">{{ totalItems }}</span> entries
      </div>
      <div class="flex items-center gap-x-2">
        <p class="text-sm text-muted-foreground">Rows per page</p>
        <Select
          :model-value="`${pageSize}`"
          @update:model-value="$emit('update:pageSize', Number($event))"
        >
          <SelectTrigger class="h-8 w-[70px]">
            <SelectValue :placeholder="`${pageSize}`" />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem v-for="size in [5, 10, 25, 50]" :key="size" :value="`${size}`">
              {{ size }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    <div class="flex items-center gap-x-6">
      <div class="flex items-center gap-x-1 text-sm text-muted-foreground">
        <span>Page</span>
        <span class="font-medium text-foreground">{{ pageIndex + 1 }}</span>
        <span>of</span>
        <span class="font-medium text-foreground">{{ pageCount }}</span>
      </div>

      <div class="flex items-center gap-x-1">
        <Button variant="outline" size="sm" class="h-8 w-8 p-0" :disabled="!canPreviousPage" @click="$emit('update:pageIndex', 0)">
          <span class="sr-only">Go to first page</span>
          <ChevronsLeft class="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" class="h-8 w-8 p-0" :disabled="!canPreviousPage" @click="$emit('update:pageIndex', pageIndex - 1)">
          <span class="sr-only">Go to previous page</span>
          <ChevronLeft class="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" class="h-8 w-8 p-0" :disabled="!canNextPage" @click="$emit('update:pageIndex', pageIndex + 1)">
          <span class="sr-only">Go to next page</span>
          <ChevronRight class="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" class="h-8 w-8 p-0" :disabled="!canNextPage" @click="$emit('update:pageIndex', pageCount - 1)">
          <span class="sr-only">Go to last page</span>
          <ChevronsRight class="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
</template>
