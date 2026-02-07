<script setup lang="ts">
import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from "vee-validate"
import { ref } from "vue"
import { z } from "zod"
import { type ItemCreate, ItemsService } from "@/client"
import useCustomToast from "@/composables/useCustomToast"
import { handleError } from "@/lib/utils"

const isOpen = ref(false)
const queryClient = useQueryClient()
const { showSuccessToast, showErrorToast } = useCustomToast()

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
  }),
)

const { handleSubmit, defineField, errors, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: { title: "", description: "" },
})

const [title, titleAttrs] = defineField("title")
const [description, descriptionAttrs] = defineField("description")

const mutation = useMutation({
  mutationFn: (data: ItemCreate) =>
    ItemsService.createItem({ requestBody: data }),
  onSuccess: () => {
    showSuccessToast("Item created successfully")
    resetForm()
    isOpen.value = false
  },
  onError: handleError.bind({ showErrorToast }),
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ["items"] })
  },
})

const onSubmit = handleSubmit((values) => {
  mutation.mutate(values as ItemCreate)
})
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button class="my-4">
        <Plus class="mr-2" />
        Add Item
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Add Item</DialogTitle>
        <DialogDescription>Fill in the details to add a new item.</DialogDescription>
      </DialogHeader>
      <form @submit="onSubmit">
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
