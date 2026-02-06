<script setup lang="ts">
import { ref } from "vue"
import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { type UserPublic, UsersService } from "@/client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { DialogHeader, DialogFooter } from "@/components/ui/dialog"
import useCustomToast from "@/composables/useCustomToast"
import { handleError } from "@/lib/utils"

const props = defineProps<{ user: UserPublic }>()

const isOpen = ref(false)
const queryClient = useQueryClient()
const { showSuccessToast, showErrorToast } = useCustomToast()

const mutation = useMutation({
  mutationFn: () => UsersService.deleteUser({ userId: props.user.id }),
  onSuccess: () => {
    showSuccessToast("User deleted successfully")
    isOpen.value = false
  },
  onError: handleError.bind({ showErrorToast }),
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ["users"] })
  },
})

const open = () => { isOpen.value = true }
defineExpose({ open })
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Delete User</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this user? All associated items will also be permanently deleted.
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
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
