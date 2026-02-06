<script setup lang="ts">

</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header class="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger class="-ml-1 text-muted-foreground" />
      </header>
      <main class="flex-1 p-6 md:p-8">
        <div class="mx-auto max-w-7xl">
          <RouterView />
        </div>
      </main>
      <Footer />
    </SidebarInset>
  </SidebarProvider>
</template>
