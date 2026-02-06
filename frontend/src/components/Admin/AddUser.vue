<script setup lang="ts">
import { ref } from "vue"
import { useForm } from "vee-validate"
import { toTypedSchema } from "@vee-validate/zod"
import { z } from "zod"
import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { Plus } from "lucide-vue-next"
import { type UserCreate, UsersService } from "@/client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { DialogHeader, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import useCustomToast from "@/composables/useCustomToast"
import { handleError } from "@/lib/utils"

const isOpen = ref(false)
const queryClient = useQueryClient()
const { showSuccessToast, showErrorToast } = useCustomToast()

const formSchema = toTypedSchema(
  z
    .object({
      email: z.string().email("Invalid email"),
      full_name: z.string().min(1, "Full name is required"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      confirm_password: z.string(),
      is_superuser: z.boolean().default(false),
      is_active: z.boolean().default(true),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "Passwords don't match",
      path: ["confirm_password"],
    }),
)

const { handleSubmit, defineField, errors, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: "",
    full_name: "",
    password: "",
    confirm_password: "",
    is_superuser: false,
    is_active: true,
  },
})

const [email, emailAttrs] = defineField("email")
const [fullName, fullNameAttrs] = defineField("full_name")
const [password, passwordAttrs] = defineField("password")
const [confirmPassword, confirmPasswordAttrs] = defineField("confirm_password")
const [isSuperuser] = defineField("is_superuser")
const [isActive] = defineField("is_active")

const mutation = useMutation({
  mutationFn: (data: UserCreate) =>
    UsersService.createUser({ requestBody: data }),
  onSuccess: () => {
    showSuccessToast("User created successfully")
    resetForm()
    isOpen.value = false
  },
  onError: handleError.bind({ showErrorToast }),
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ["users"] })
  },
})

const onSubmit = handleSubmit((values) => {
  mutation.mutate({
    email: values.email,
    full_name: values.full_name,
    password: values.password,
    is_superuser: values.is_superuser,
    is_active: values.is_active,
  } as UserCreate)
})
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button class="my-4">
        <Plus class="mr-2" />
        Add User
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Add User</DialogTitle>
        <DialogDescription>Create a new user account.</DialogDescription>
      </DialogHeader>
      <form @submit="onSubmit">
        <div class="grid gap-4 py-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Email <span class="text-destructive">*</span></label>
            <Input v-model="email" v-bind="emailAttrs" placeholder="user@example.com" type="email" />
            <p v-if="errors.email" class="text-xs text-destructive">{{ errors.email }}</p>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Full Name <span class="text-destructive">*</span></label>
            <Input v-model="fullName" v-bind="fullNameAttrs" placeholder="Full Name" />
            <p v-if="errors.full_name" class="text-xs text-destructive">{{ errors.full_name }}</p>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Password <span class="text-destructive">*</span></label>
            <Input v-model="password" v-bind="passwordAttrs" placeholder="Password" type="password" />
            <p v-if="errors.password" class="text-xs text-destructive">{{ errors.password }}</p>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Confirm Password <span class="text-destructive">*</span></label>
            <Input v-model="confirmPassword" v-bind="confirmPasswordAttrs" placeholder="Confirm Password" type="password" />
            <p v-if="errors.confirm_password" class="text-xs text-destructive">{{ errors.confirm_password }}</p>
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
