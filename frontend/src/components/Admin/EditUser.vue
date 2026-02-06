<script setup lang="ts">
import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from "vee-validate"
import { ref } from "vue"
import { z } from "zod"
import { type UserPublic, UsersService } from "@/client"
import useCustomToast from "@/composables/useCustomToast"
import { handleError } from "@/lib/utils"

const props = defineProps<{ user: UserPublic }>()

const isOpen = ref(false)
const queryClient = useQueryClient()
const { showSuccessToast, showErrorToast } = useCustomToast()

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email("Invalid email"),
    full_name: z.string().min(1, "Full name is required"),
    password: z.string().optional(),
    is_superuser: z.boolean(),
    is_active: z.boolean(),
  }),
)

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: props.user.email,
    full_name: props.user.full_name ?? "",
    password: "",
    is_superuser: props.user.is_superuser,
    is_active: props.user.is_active,
  },
})

const [_email, _emailAttrs] = defineField("email")
const [_fullName, _fullNameAttrs] = defineField("full_name")
const [_password, _passwordAttrs] = defineField("password")
const [_isSuperuser] = defineField("is_superuser")
const [_isActive] = defineField("is_active")

const mutation = useMutation({
  mutationFn: (data: any) =>
    UsersService.updateUser({ userId: props.user.id, requestBody: data }),
  onSuccess: () => {
    showSuccessToast("User updated successfully")
    isOpen.value = false
  },
  onError: handleError.bind({ showErrorToast }),
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ["users"] })
  },
})

const _onSubmit = handleSubmit((values) => {
  const data: any = {
    email: values.email,
    full_name: values.full_name,
    is_superuser: values.is_superuser,
    is_active: values.is_active,
  }
  if (values.password) {
    data.password = values.password
  }
  mutation.mutate(data)
})

const open = () => {
  isOpen.value = true
}
defineExpose({ open })
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent class="sm:max-w-md">
      <form @submit="onSubmit">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Update user details.</DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Email</label>
            <Input v-model="email" v-bind="emailAttrs" type="email" />
            <p v-if="errors.email" class="text-xs text-destructive">{{ errors.email }}</p>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Full Name</label>
            <Input v-model="fullName" v-bind="fullNameAttrs" />
            <p v-if="errors.full_name" class="text-xs text-destructive">{{ errors.full_name }}</p>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Password (leave empty to keep current)</label>
            <Input v-model="password" v-bind="passwordAttrs" type="password" placeholder="New password" />
          </div>
          <div class="flex items-center gap-4">
            <label class="flex items-center gap-2 text-sm">
              <input type="checkbox" v-model="isSuperuser" class="rounded border-input" />
              Superuser
            </label>
            <label class="flex items-center gap-2 text-sm">
              <input type="checkbox" v-model="isActive" class="rounded border-input" />
              Active
            </label>
          </div>
        </div>
        <DialogFooter>
          <DialogClose as-child>
            <Button variant="outline" :disabled="mutation.isPending.value">Cancel</Button>
          </DialogClose>
          <Button type="submit" :disabled="mutation.isPending.value">Save</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
