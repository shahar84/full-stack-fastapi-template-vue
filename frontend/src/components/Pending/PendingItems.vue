<script setup lang="ts">
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow class="hover:bg-transparent">
        <TableHead>ID</TableHead>
        <TableHead>Title</TableHead>
        <TableHead>Description</TableHead>
        <TableHead class="w-[70px]">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="i in 5" :key="i">
        <TableCell><Skeleton class="h-4 w-[100px]" /></TableCell>
        <TableCell><Skeleton class="h-4 w-[150px]" /></TableCell>
        <TableCell><Skeleton class="h-4 w-[200px]" /></TableCell>
        <TableCell><Skeleton class="h-4 w-[30px]" /></TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
