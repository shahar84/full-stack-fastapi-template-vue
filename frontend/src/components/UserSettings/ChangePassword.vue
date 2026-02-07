<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query"
import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from "vee-validate"
import { z } from "zod"
import { UsersService } from "@/client"
import useCustomToast from "@/composables/useCustomToast"
import { handleError } from "@/lib/utils"

const { showSuccessToast, showErrorToast } = useCustomToast()

const formSchema = toTypedSchema(
  z
    .object({
      current_password: z
        .string()
        .min(8, "Password must be at least 8 characters"),
      new_password: z.string().min(8, "Password must be at least 8 characters"),
      confirm_password: z.string(),
    })
    .refine((data) => data.new_password === data.confirm_password, {
      message: "Passwords don't match",
      path: ["confirm_password"],
    }),
)

const { handleSubmit, defineField, errors, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: {
    current_password: "",
    new_password: "",
    confirm_password: "",
  },
})

const [currentPassword, currentPasswordAttrs] = defineField("current_password")
const [newPassword, newPasswordAttrs] = defineField("new_password")
const [confirmPassword, confirmPasswordAttrs] = defineField("confirm_password")

const mutation = useMutation({
  mutationFn: (data: { current_password: string; new_password: string }) =>
    UsersService.updatePasswordMe({ requestBody: data }),
  onSuccess: () => {
    showSuccessToast("Password changed successfully")
    resetForm()
  },
  onError: handleError.bind({ showErrorToast }),
})

const onSubmit = handleSubmit((values) => {
  mutation.mutate({
    current_password: values.current_password,
    new_password: values.new_password,
  })
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Change Password</CardTitle>
    </CardHeader>
    <CardContent>
      <form @submit="onSubmit" class="space-y-4 max-w-md">
        <div class="space-y-2">
          <label class="text-sm font-medium">Current Password</label>
          <Input v-model="currentPassword" v-bind="currentPasswordAttrs" data-testid="current-password-input" type="password" placeholder="Current password" />
          <p v-if="errors.current_password" class="text-xs text-destructive">{{ errors.current_password }}</p>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium">New Password</label>
          <Input v-model="newPassword" v-bind="newPasswordAttrs" data-testid="new-password-input" type="password" placeholder="New password" />
          <p v-if="errors.new_password" class="text-xs text-destructive">{{ errors.new_password }}</p>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium">Confirm New Password</label>
          <Input v-model="confirmPassword" v-bind="confirmPasswordAttrs" data-testid="confirm-password-input" type="password" placeholder="Confirm password" />
          <p v-if="errors.confirm_password" class="text-xs text-destructive">{{ errors.confirm_password }}</p>
        </div>
        <Button type="submit" :disabled="mutation.isPending.value">
          Change Password
        </Button>
      </form>
    </CardContent>
  </Card>
</template>
