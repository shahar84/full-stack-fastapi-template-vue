<script setup lang="ts">

</script>

<template>
  <div class="grid min-h-svh lg:grid-cols-2">
    <div class="flex flex-col gap-4 p-6 md:p-10">
      <div class="flex justify-center gap-2 md:justify-start">
        <Logo />
      </div>
      <div class="flex flex-1 items-center justify-center">
        <div class="w-full max-w-xs">
          <RouterView />
        </div>
      </div>
      <div class="flex items-center justify-between">
        <Footer />
        <Appearance />
      </div>
    </div>
    <div class="relative hidden bg-muted lg:block">
      <div class="absolute inset-0 flex items-center justify-center">
        <img
          src="/assets/images/fastapi-logo.svg"
          alt="FastAPI"
          class="h-16 opacity-20"
        />
      </div>
    </div>
  </div>
</template>
