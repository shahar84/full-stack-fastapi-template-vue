<script setup lang="ts">
import { computed } from "vue"
import { useTheme } from "@/composables/useTheme"

withDefaults(
  defineProps<{
    variant?: "full" | "icon" | "responsive"
    link?: boolean
  }>(),
  {
    variant: "responsive",
    link: true,
  },
)

const { resolvedTheme } = useTheme()

const _logoSrc = computed(() =>
  resolvedTheme.value === "dark"
    ? "/assets/images/fastapi-logo-light.svg"
    : "/assets/images/fastapi-logo.svg",
)

const _iconSrc = computed(() =>
  resolvedTheme.value === "dark"
    ? "/assets/images/fastapi-icon-light.svg"
    : "/assets/images/fastapi-icon.svg",
)
</script>

<template>
  <component :is="link ? 'router-link' : 'div'" :to="link ? '/' : undefined" class="flex items-center gap-2">
    <template v-if="variant === 'icon'">
      <img :src="iconSrc" alt="Logo" class="h-6 w-6" />
    </template>
    <template v-else-if="variant === 'full'">
      <img :src="logoSrc" alt="Logo" class="h-8" />
    </template>
    <template v-else>
      <img :src="iconSrc" alt="Logo" class="h-6 w-6 md:hidden" />
      <img :src="logoSrc" alt="Logo" class="hidden h-8 md:block" />
    </template>
  </component>
</template>
