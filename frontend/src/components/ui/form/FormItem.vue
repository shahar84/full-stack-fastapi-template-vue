<script setup lang="ts">
import { cn } from "@/lib/utils"
import { provide, ref, type HTMLAttributes } from "vue"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()

const id = ref(`form-item-${Math.random().toString(36).slice(2, 9)}`)
provide("formItemId", id)
</script>

<template>
  <div :class="cn('space-y-2', props.class)">
    <slot />
  </div>
</template>
