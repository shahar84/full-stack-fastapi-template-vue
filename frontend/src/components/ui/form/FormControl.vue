<script setup lang="ts">
import { inject, type Ref } from "vue"

const formItemId = inject<Ref<string>>("formItemId")
</script>

<template>
  <div>
    <slot :id="formItemId" />
  </div>
</template>
