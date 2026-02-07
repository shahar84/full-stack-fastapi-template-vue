<script setup lang="ts">
import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from "vee-validate"
import { ref } from "vue"
import { z } from "zod"
import { UsersService } from "@/client"
import useAuth from "@/composables/useAuth"
import useCustomToast from "@/composables/useCustomToast"
import { handleError } from "@/lib/utils"

const { user } = useAuth()
const queryClient = useQueryClient()
const { showSuccessToast, showErrorToast } = useCustomToast()
const isEditing = ref(false)

const formSchema = toTypedSchema(
  z.object({
    full_name: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email"),
  }),
)

const { handleSubmit, defineField, errors, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: {
    full_name: user.value?.full_name ?? "",
    email: user.value?.email ?? "",
  },
})

const [fullName, fullNameAttrs] = defineField("full_name")
const [email, emailAttrs] = defineField("email")

const mutation = useMutation({
  mutationFn: (data: { full_name?: string; email?: string }) =>
    UsersService.updateUserMe({ requestBody: data }),
  onSuccess: () => {
    showSuccessToast("Profile updated successfully")
    isEditing.value = false
  },
  onError: handleError.bind({ showErrorToast }),
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ["currentUser"] })
  },
})

const onSubmit = handleSubmit((values) => {
  mutation.mutate(values)
})

const cancel = () => {
  resetForm({
    values: {
      full_name: user.value?.full_name ?? "",
      email: user.value?.email ?? "",
    },
  })
  isEditing.value = false
}
</script>

<template>
  <Card>
    <CardHeader>
      <div class="flex items-center justify-between">
        <CardTitle>User Information</CardTitle>
        <Button v-if="!isEditing" variant="outline" size="sm" @click="isEditing = true">
          Edit
        </Button>
      </div>
    </CardHeader>
    <CardContent>
      <form v-if="isEditing" @submit="onSubmit" class="space-y-4">
        <div class="space-y-2">
          <label class="text-sm font-medium">Full Name</label>
          <Input v-model="fullName" v-bind="fullNameAttrs" />
          <p v-if="errors.full_name" class="text-xs text-destructive">{{ errors.full_name }}</p>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium">Email</label>
          <Input v-model="email" v-bind="emailAttrs" type="email" />
          <p v-if="errors.email" class="text-xs text-destructive">{{ errors.email }}</p>
        </div>
        <div class="flex gap-2">
          <Button type="submit" :disabled="mutation.isPending.value">Save</Button>
          <Button variant="outline" type="button" @click="cancel">Cancel</Button>
        </div>
      </form>
      <div v-else class="space-y-4">
        <div>
          <p class="text-sm font-medium text-muted-foreground">Full Name</p>
          <p>{{ user?.full_name || "N/A" }}</p>
        </div>
        <div>
          <p class="text-sm font-medium text-muted-foreground">Email</p>
          <p>{{ user?.email }}</p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
