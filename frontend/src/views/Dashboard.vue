<script setup lang="ts">
import useAuth from "@/composables/useAuth"

const { user } = useAuth()
</script>

<template>
  <div>
    <div>
      <h1 class="text-2xl truncate max-w-sm">
        Hi, {{ user?.full_name || user?.email }} 👋
      </h1>
      <p class="text-muted-foreground">
        Welcome back, nice to see you again!!!
      </p>
    </div>
  </div>
</template>
