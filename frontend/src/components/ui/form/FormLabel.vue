<script setup lang="ts">
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { inject, type HTMLAttributes, type Ref } from "vue"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()

const formItemId = inject<Ref<string>>("formItemId")
</script>

<template>
  <Label :for="formItemId" :class="cn('text-sm font-medium', props.class)">
    <slot />
  </Label>
</template>
