<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query"
import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from "vee-validate"
import { useRoute, useRouter } from "vue-router"
import { z } from "zod"
import { LoginService } from "@/client"
import useCustomToast from "@/composables/useCustomToast"
import { handleError } from "@/lib/utils"

const route = useRoute()
const router = useRouter()
const { showSuccessToast, showErrorToast } = useCustomToast()

const formSchema = toTypedSchema(
  z
    .object({
      new_password: z.string().min(8, "Password must be at least 8 characters"),
      confirm_password: z.string(),
    })
    .refine((data) => data.new_password === data.confirm_password, {
      message: "Passwords don't match",
      path: ["confirm_password"],
    }),
)

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: formSchema,
  initialValues: { new_password: "", confirm_password: "" },
})

const [newPassword, newPasswordAttrs] = defineField("new_password")
const [confirmPassword, confirmPasswordAttrs] =
  defineField("confirm_password")

const mutation = useMutation({
  mutationFn: (data: { new_password: string }) =>
    LoginService.resetPassword({
      requestBody: {
        token: route.query.token as string,
        new_password: data.new_password,
      },
    }),
  onSuccess: () => {
    showSuccessToast("Password has been reset successfully")
    router.push("/login")
  },
  onError: handleError.bind({ showErrorToast }),
})

const onSubmit = handleSubmit((values) => {
  mutation.mutate({ new_password: values.new_password })
})
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-6">
    <div class="flex flex-col items-center gap-2 text-center">
      <h1 class="text-2xl font-bold">Reset Password</h1>
      <p class="text-sm text-muted-foreground">
        Enter your new password below
      </p>
    </div>

    <div class="grid gap-4">
      <div class="space-y-2">
        <label class="text-sm font-medium" for="new_password">New Password</label>
        <Input id="new_password" v-model="newPassword" v-bind="newPasswordAttrs" placeholder="New Password" type="password" />
        <p v-if="errors.new_password" class="text-xs font-medium text-destructive">{{ errors.new_password }}</p>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-medium" for="confirm_password">Confirm Password</label>
        <Input id="confirm_password" v-model="confirmPassword" v-bind="confirmPasswordAttrs" placeholder="Confirm Password" type="password" />
        <p v-if="errors.confirm_password" class="text-xs font-medium text-destructive">{{ errors.confirm_password }}</p>
      </div>

      <Button type="submit" :disabled="mutation.isPending.value" class="w-full">
        <template v-if="mutation.isPending.value">
          <span class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        </template>
        Reset Password
      </Button>
    </div>

    <div class="text-center text-sm">
      <RouterLink to="/login" class="underline underline-offset-4">
        Back to Login
      </RouterLink>
    </div>
  </form>
</template>
