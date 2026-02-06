<script setup lang="ts">
import DeleteConfirmation from "./DeleteConfirmation.vue"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
</script>

<template>
  <Card class="border-destructive">
    <CardHeader>
      <CardTitle class="text-destructive">Delete Account</CardTitle>
      <CardDescription>
        Permanently delete your account and all associated data. This action cannot be undone.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <DeleteConfirmation />
    </CardContent>
  </Card>
</template>
