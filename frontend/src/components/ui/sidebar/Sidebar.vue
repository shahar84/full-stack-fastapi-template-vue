<script setup lang="ts">
import { cn } from "@/lib/utils"
import { inject, type HTMLAttributes, type Ref, type ComputedRef } from "vue"
import { Sheet, SheetContent } from "@/components/ui/sheet"

const props = withDefaults(
  defineProps<{ class?: HTMLAttributes["class"]; collapsible?: string; side?: string; variant?: string }>(),
  { collapsible: "offcanvas", side: "left", variant: "sidebar" },
)

const sidebar = inject<{
  open: Ref<boolean>
  openMobile: Ref<boolean>
  isMobile: Ref<boolean>
  state: ComputedRef<string>
  setOpenMobile: (value: boolean) => void
}>("sidebar")!
</script>

<template>
  <!-- Mobile sidebar -->
  <Sheet v-if="sidebar.isMobile.value" :open="sidebar.openMobile.value" @update:open="sidebar.setOpenMobile">
    <SheetContent
      data-sidebar="sidebar"
      data-mobile="true"
      class="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
      :side="side as any"
      :style="{ '--sidebar-width': '18rem' } as any"
    >
      <div class="flex h-full w-full flex-col">
        <slot />
      </div>
    </SheetContent>
  </Sheet>

  <!-- Desktop sidebar -->
  <div
    v-else
    class="group peer hidden md:block text-sidebar-foreground"
    :data-state="sidebar.state.value"
    :data-collapsible="sidebar.state.value === 'collapsed' ? collapsible : ''"
    :data-variant="variant"
    :data-side="side"
  >
    <div
      :class="cn(
        'relative h-svh w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear',
        'group-data-[collapsible=offcanvas]:w-0',
        'group-data-[side=right]:rotate-180',
        variant === 'floating' || variant === 'inset'
          ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]'
          : 'group-data-[collapsible=icon]:w-[--sidebar-width-icon]',
      )"
    />
    <div
      :class="cn(
        'fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear md:flex',
        side === 'left'
          ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
          : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
        variant === 'floating' || variant === 'inset'
          ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]'
          : 'group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l',
        props.class,
      )"
    >
      <div
        data-sidebar="sidebar"
        class="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
