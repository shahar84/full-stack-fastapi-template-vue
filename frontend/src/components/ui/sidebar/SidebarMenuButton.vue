<script setup lang="ts">
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { inject, type Ref, type ComputedRef, type HTMLAttributes } from "vue"

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    isActive?: boolean
    tooltip?: string
    size?: "default" | "sm" | "lg"
  }>(),
  { size: "default", isActive: false },
)

const sidebar = inject<{
  open: Ref<boolean>
  state: ComputedRef<string>
  isMobile: Ref<boolean>
}>("sidebar")!
</script>

<template>
  <TooltipProvider v-if="tooltip && sidebar.state.value === 'collapsed' && !sidebar.isMobile.value">
    <Tooltip>
      <TooltipTrigger as-child>
        <button
          :class="cn(
            'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
            size === 'sm' && 'text-xs',
            size === 'lg' && 'group-data-[collapsible=icon]:!p-0 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground',
            props.class,
          )"
          :data-active="isActive"
          data-sidebar="menu-button"
          :data-size="size"
        >
          <slot />
        </button>
      </TooltipTrigger>
      <TooltipContent side="right">
        {{ tooltip }}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  <button
    v-else
    :class="cn(
      'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
      size === 'sm' && 'text-xs',
      size === 'lg' && 'group-data-[collapsible=icon]:!p-0 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground',
      props.class,
    )"
    :data-active="isActive"
    data-sidebar="menu-button"
    :data-size="size"
  >
    <slot />
  </button>
</template>
