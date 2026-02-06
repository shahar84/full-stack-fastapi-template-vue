<script setup lang="ts">
import { ref } from "vue"
import { useMutation } from "@tanstack/vue-query"
import { UsersService } from "@/client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { DialogHeader, DialogFooter } from "@/components/ui/dialog"
import useAuth from "@/composables/useAuth"
import useCustomToast from "@/composables/useCustomToast"
import { handleError } from "@/lib/utils"

const isOpen = ref(false)
const { logout } = useAuth()
const { showSuccessToast, showErrorToast } = useCustomToast()

const mutation = useMutation({
  mutationFn: () => UsersService.deleteUserMe(),
  onSuccess: () => {
    showSuccessToast("Account deleted successfully")
    isOpen.value = false
    logout()
  },
  onError: handleError.bind({ showErrorToast }),
})
</script>

<template>
  <Dialog v-model:open="isOpen">
    <Button variant="destructive" @click="isOpen = true">
      Delete My Account
    </Button>
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogDescription>
          Are you sure you want to permanently delete your account? All your data will be lost. This action cannot be undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose as-child>
          <Button variant="outline" :disabled="mutation.isPending.value">Cancel</Button>
        </DialogClose>
        <Button variant="destructive" :disabled="mutation.isPending.value" @click="mutation.mutate()">
          <template v-if="mutation.isPending.value">
            <span class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </template>
          Delete Account
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
