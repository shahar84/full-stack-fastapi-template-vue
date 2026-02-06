<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query"
import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from "vee-validate"
import { z } from "zod"
import { LoginService } from "@/client"
import useCustomToast from "@/composables/useCustomToast"
import { handleError } from "@/lib/utils"

const { showSuccessToast, showErrorToast } = useCustomToast()

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email("Invalid email address"),
  }),
)

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: formSchema,
  initialValues: { email: "" },
})

const [email, emailAttrs] = defineField("email")

const mutation = useMutation({
  mutationFn: (data: { email: string }) =>
    LoginService.recoverPassword({ email: data.email }),
  onSuccess: () => {
    showSuccessToast("If that email exists, a recovery link has been sent.")
  },
  onError: handleError.bind({ showErrorToast }),
})

const onSubmit = handleSubmit((values) => {
  mutation.mutate(values)
})
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-6">
    <div class="flex flex-col items-center gap-2 text-center">
      <h1 class="text-2xl font-bold">Password Recovery</h1>
      <p class="text-sm text-muted-foreground">
        Enter your email to receive a recovery link
      </p>
    </div>

    <div class="grid gap-4">
      <div class="space-y-2">
        <label class="text-sm font-medium" for="email">Email</label>
        <Input id="email" v-model="email" v-bind="emailAttrs" data-testid="email-input" placeholder="user@example.com" type="email" />
        <p v-if="errors.email" class="text-xs font-medium text-destructive">{{ errors.email }}</p>
      </div>

      <Button type="submit" :disabled="mutation.isPending.value" class="w-full">
        <template v-if="mutation.isPending.value">
          <span class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        </template>
        Send Recovery Link
      </Button>
    </div>

    <div class="text-center text-sm">
      <RouterLink to="/login" class="underline underline-offset-4">
        Back to Login
      </RouterLink>
    </div>
  </form>
</template>
