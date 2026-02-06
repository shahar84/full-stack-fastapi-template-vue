<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner"
import { provideTheme } from "@/composables/useTheme"

provideTheme("dark", "vite-ui-theme")
</script>

<template>
  <RouterView />
  <Toaster rich-colors close-button />
</template>
