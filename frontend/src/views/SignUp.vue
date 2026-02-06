<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from "vee-validate"
import { z } from "zod"
import useAuth from "@/composables/useAuth"

const { signUpMutation } = useAuth()

const formSchema = toTypedSchema(
  z
    .object({
      email: z.string().email("Invalid email address"),
      full_name: z.string().min(1, "Full name is required"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      confirm_password: z.string(),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "Passwords don't match",
      path: ["confirm_password"],
    }),
)

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: "",
    full_name: "",
    password: "",
    confirm_password: "",
  },
})

const [email, emailAttrs] = defineField("email")
const [fullName, fullNameAttrs] = defineField("full_name")
const [password, passwordAttrs] = defineField("password")
const [confirmPassword, confirmPasswordAttrs] =
  defineField("confirm_password")

const onSubmit = handleSubmit((values) => {
  if (signUpMutation.isPending.value) return
  signUpMutation.mutate({
    email: values.email,
    full_name: values.full_name,
    password: values.password,
  })
})
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-6">
    <div class="flex flex-col items-center gap-2 text-center">
      <h1 class="text-2xl font-bold">Create an account</h1>
    </div>

    <div class="grid gap-4">
      <div class="space-y-2">
        <label class="text-sm font-medium" for="full_name">Full Name</label>
        <Input id="full_name" v-model="fullName" v-bind="fullNameAttrs" placeholder="Full Name" type="text" />
        <p v-if="errors.full_name" class="text-xs font-medium text-destructive">{{ errors.full_name }}</p>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-medium" for="email">Email</label>
        <Input id="email" v-model="email" v-bind="emailAttrs" placeholder="user@example.com" type="email" />
        <p v-if="errors.email" class="text-xs font-medium text-destructive">{{ errors.email }}</p>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-medium" for="password">Password</label>
        <Input id="password" v-model="password" v-bind="passwordAttrs" placeholder="Password" type="password" />
        <p v-if="errors.password" class="text-xs font-medium text-destructive">{{ errors.password }}</p>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-medium" for="confirm_password">Confirm Password</label>
        <Input id="confirm_password" v-model="confirmPassword" v-bind="confirmPasswordAttrs" placeholder="Confirm Password" type="password" />
        <p v-if="errors.confirm_password" class="text-xs font-medium text-destructive">{{ errors.confirm_password }}</p>
      </div>

      <Button type="submit" :disabled="signUpMutation.isPending.value" class="w-full">
        <template v-if="signUpMutation.isPending.value">
          <span class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        </template>
        Sign Up
      </Button>
    </div>

    <div class="text-center text-sm">
      Already have an account?
      <RouterLink to="/login" class="underline underline-offset-4">
        Log in
      </RouterLink>
    </div>
  </form>
</template>
