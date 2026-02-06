<script setup lang="ts">
import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "vue"

defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <p :class="cn('text-[0.8rem] text-muted-foreground', $props.class)">
    <slot />
  </p>
</template>
