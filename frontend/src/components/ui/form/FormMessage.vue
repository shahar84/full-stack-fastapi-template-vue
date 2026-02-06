<script setup lang="ts">
import { cn } from "@/lib/utils"
import { ErrorMessage } from "vee-validate"
import type { HTMLAttributes } from "vue"

defineProps<{
  class?: HTMLAttributes["class"]
  name?: string
}>()
</script>

<template>
  <ErrorMessage v-if="name" :name="name" v-slot="{ message }">
    <p :class="cn('text-[0.8rem] font-medium text-destructive', $props.class)">
      {{ message }}
    </p>
  </ErrorMessage>
  <slot v-else />
</template>
