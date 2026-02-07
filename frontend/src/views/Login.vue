<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from "vee-validate"
import { z } from "zod"
import type { Body_login_login_access_token as AccessToken } from "@/client"
import useAuth from "@/composables/useAuth"

const { loginMutation } = useAuth()

const formSchema = toTypedSchema(
  z.object({
    username: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
  }),
)

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: formSchema,
  initialValues: {
    username: "",
    password: "",
  },
})

const [username, usernameAttrs] = defineField("username")
const [password, passwordAttrs] = defineField("password")

const onSubmit = handleSubmit((values) => {
  if (loginMutation.isPending.value) return
  loginMutation.mutate(values as AccessToken)
})
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-6">
    <div class="flex flex-col items-center gap-2 text-center">
      <h1 class="text-2xl font-bold">Login to your account</h1>
    </div>

    <div class="grid gap-4">
      <div class="space-y-2">
        <label class="text-sm font-medium" for="username">Email</label>
        <Input
          id="username"
          v-model="username"
          v-bind="usernameAttrs"
          data-testid="email-input"
          placeholder="user@example.com"
          type="email"
        />
        <p v-if="errors.username" class="text-xs font-medium text-destructive">{{ errors.username }}</p>
      </div>

      <div class="space-y-2">
        <div class="flex items-center">
          <label class="text-sm font-medium" for="password">Password</label>
          <RouterLink
            to="/recover-password"
            class="ml-auto text-sm underline-offset-4 hover:underline"
          >
            Forgot your password?
          </RouterLink>
        </div>
        <Input
          id="password"
          v-model="password"
          v-bind="passwordAttrs"
          data-testid="password-input"
          placeholder="Password"
          type="password"
        />
        <p v-if="errors.password" class="text-xs font-medium text-destructive">{{ errors.password }}</p>
      </div>

      <Button type="submit" :disabled="loginMutation.isPending.value" class="w-full">
        <template v-if="loginMutation.isPending.value">
          <span class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        </template>
        Log In
      </Button>
    </div>

    <div class="text-center text-sm">
      Don't have an account yet?
      <RouterLink to="/signup" class="underline underline-offset-4">
        Sign up
      </RouterLink>
    </div>
  </form>
</template>
