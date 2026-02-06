<script setup lang="ts">
import { ref } from "vue"
import { useForm } from "vee-validate"
import { toTypedSchema } from "@vee-validate/zod"
import { z } from "zod"
import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { type ItemPublic, ItemsService } from "@/client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { DialogHeader, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import useCustomToast from "@/composables/useCustomToast"
import { handleError } from "@/lib/utils"

const props = defineProps<{ item: ItemPublic }>()
const emit = defineEmits<{ success: [] }>()

const isOpen = ref(false)
const queryClient = useQueryClient()
const { showSuccessToast, showErrorToast } = useCustomToast()

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
  }),
)

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: formSchema,
  initialValues: {
    title: props.item.title,
    description: props.item.description ?? "",
  },
})

const [title, titleAttrs] = defineField("title")
const [description, descriptionAttrs] = defineField("description")

const mutation = useMutation({
  mutationFn: (data: { title: string; description?: string }) =>
    ItemsService.updateItem({ id: props.item.id, requestBody: data }),
  onSuccess: () => {
    showSuccessToast("Item updated successfully")
    isOpen.value = false
    emit("success")
  },
  onError: handleError.bind({ showErrorToast }),
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ["items"] })
  },
})

const onSubmit = handleSubmit((values) => {
  mutation.mutate(values)
})

const open = () => { isOpen.value = true }

defineExpose({ open })
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent class="sm:max-w-md">
      <form @submit="onSubmit">
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
          <DialogDescription>Update the item details below.</DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Title <span class="text-destructive">*</span></label>
            <Input v-model="title" v-bind="titleAttrs" placeholder="Title" type="text" />
            <p v-if="errors.title" class="text-xs text-destructive">{{ errors.title }}</p>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Description</label>
            <Input v-model="description" v-bind="descriptionAttrs" placeholder="Description" type="text" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose as-child>
            <Button variant="outline" :disabled="mutation.isPending.value">Cancel</Button>
          </DialogClose>
          <Button type="submit" :disabled="mutation.isPending.value">
            <template v-if="mutation.isPending.value">
              <span class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            </template>
            Save
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
