<script setup lang="ts">
import { cn } from "@/lib/utils"
import { provide, ref, computed, type HTMLAttributes } from "vue"
import { useMediaQuery } from "@vueuse/core"

const props = defineProps<{ class?: HTMLAttributes["class"]; defaultOpen?: boolean }>()

const isMobile = useMediaQuery("(max-width: 768px)")
const open = ref(props.defaultOpen ?? true)
const openMobile = ref(false)

const state = computed(() => (open.value ? "expanded" : "collapsed"))

provide("sidebar", {
  open,
  openMobile,
  isMobile,
  state,
  toggleSidebar: () => {
    if (isMobile.value) {
      openMobile.value = !openMobile.value
    } else {
      open.value = !open.value
    }
  },
  setOpenMobile: (value: boolean) => {
    openMobile.value = value
  },
})
</script>

<template>
  <div
    :class="cn('group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar', props.class)"
    :style="{ '--sidebar-width': '16rem', '--sidebar-width-icon': '3rem' } as any"
  >
    <slot />
  </div>
</template>
