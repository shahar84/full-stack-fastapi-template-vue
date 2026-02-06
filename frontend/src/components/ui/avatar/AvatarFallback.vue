<script setup lang="ts">
import { cn } from "@/lib/utils"
import { AvatarFallback, type AvatarFallbackProps } from "radix-vue"
import type { HTMLAttributes } from "vue"

const props = defineProps<AvatarFallbackProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <AvatarFallback
    :class="cn('flex h-full w-full items-center justify-center rounded-full bg-muted', props.class)"
  >
    <slot />
  </AvatarFallback>
</template>
