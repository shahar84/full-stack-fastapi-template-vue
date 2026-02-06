<script setup lang="ts">
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow class="hover:bg-transparent">
        <TableHead>Full Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Role</TableHead>
        <TableHead>Status</TableHead>
        <TableHead class="w-[70px]">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="i in 5" :key="i">
        <TableCell><Skeleton class="h-4 w-[120px]" /></TableCell>
        <TableCell><Skeleton class="h-4 w-[180px]" /></TableCell>
        <TableCell><Skeleton class="h-4 w-[80px]" /></TableCell>
        <TableCell><Skeleton class="h-4 w-[60px]" /></TableCell>
        <TableCell><Skeleton class="h-4 w-[30px]" /></TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
