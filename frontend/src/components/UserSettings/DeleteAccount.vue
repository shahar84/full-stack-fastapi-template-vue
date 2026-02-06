<script setup lang="ts">

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
