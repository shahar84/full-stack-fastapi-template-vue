<script setup lang="ts">
import { computed } from "vue"
import useAuth from "@/composables/useAuth"

const { user: currentUser } = useAuth()

const tabsConfig = [
  { value: "my-profile", title: "My profile" },
  { value: "password", title: "Password" },
  { value: "danger-zone", title: "Danger zone" },
]

const finalTabs = computed(() =>
  currentUser.value?.is_superuser ? tabsConfig.slice(0, 3) : tabsConfig,
)
</script>

<template>
  <div v-if="currentUser" class="flex flex-col gap-6">
    <div>
      <h1 class="text-2xl font-bold tracking-tight">User Settings</h1>
      <p class="text-muted-foreground">Manage your account settings and preferences</p>
    </div>

    <Tabs default-value="my-profile">
      <TabsList>
        <TabsTrigger v-for="tab in finalTabs" :key="tab.value" :value="tab.value">
          {{ tab.title }}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="my-profile">
        <UserInformation />
      </TabsContent>
      <TabsContent value="password">
        <ChangePassword />
      </TabsContent>
      <TabsContent value="danger-zone">
        <DeleteAccount />
      </TabsContent>
    </Tabs>
  </div>
</template>
