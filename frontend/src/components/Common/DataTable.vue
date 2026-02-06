<script setup lang="ts" generic="TData, TValue">
import {
  type ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useVueTable,
} from "@tanstack/vue-table"
import { computed } from "vue"

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}>()

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
})

const _pageIndex = computed(() => table.getState().pagination.pageIndex)
const _pageSize = computed(() => table.getState().pagination.pageSize)
</script>

<template>
  <div class="flex flex-col gap-4">
    <Table>
      <TableHeader>
        <TableRow
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
          class="hover:bg-transparent"
        >
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <TableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
          >
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </TableCell>
          </TableRow>
        </template>
        <TableRow v-else class="hover:bg-transparent">
          <TableCell :colspan="columns.length" class="h-32 text-center text-muted-foreground">
            No results found.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <div
      v-if="table.getPageCount() > 1"
      class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border-t bg-muted/20"
    >
      <div class="flex flex-col sm:flex-row sm:items-center gap-4">
        <div class="text-sm text-muted-foreground">
          Showing {{ pageIndex * pageSize + 1 }} to
          {{ Math.min((pageIndex + 1) * pageSize, data.length) }} of
          <span class="font-medium text-foreground">{{ data.length }}</span>
          entries
        </div>
        <div class="flex items-center gap-x-2">
          <p class="text-sm text-muted-foreground">Rows per page</p>
          <Select
            :model-value="`${pageSize}`"
            @update:model-value="(val: string) => table.setPageSize(Number(val))"
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
          <span class="font-medium text-foreground">{{ table.getPageCount() }}</span>
        </div>

        <div class="flex items-center gap-x-1">
          <Button variant="outline" size="sm" class="h-8 w-8 p-0" :disabled="!table.getCanPreviousPage()" @click="table.setPageIndex(0)">
            <span class="sr-only">Go to first page</span>
            <ChevronsLeft class="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" class="h-8 w-8 p-0" :disabled="!table.getCanPreviousPage()" @click="table.previousPage()">
            <span class="sr-only">Go to previous page</span>
            <ChevronLeft class="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" class="h-8 w-8 p-0" :disabled="!table.getCanNextPage()" @click="table.nextPage()">
            <span class="sr-only">Go to next page</span>
            <ChevronRight class="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" class="h-8 w-8 p-0" :disabled="!table.getCanNextPage()" @click="table.setPageIndex(table.getPageCount() - 1)">
            <span class="sr-only">Go to last page</span>
            <ChevronsRight class="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
