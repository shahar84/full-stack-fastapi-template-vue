<script setup lang="ts">
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { PanelLeft } from "lucide-vue-next"
import { inject, type HTMLAttributes } from "vue"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()

const sidebar = inject<{
  toggleSidebar: () => void
}>("sidebar")!
</script>

<template>
  <Button
    variant="ghost"
    size="icon"
    :class="cn('h-7 w-7', props.class)"
    @click="sidebar.toggleSidebar()"
    data-sidebar="trigger"
  >
    <PanelLeft />
    <span class="sr-only">Toggle Sidebar</span>
  </Button>
</template>
