import { createApp } from "vue"
import { VueQueryPlugin, QueryClient, MutationCache, QueryCache } from "@tanstack/vue-query"
import App from "./App.vue"
import router from "./router"
import { ApiError, OpenAPI } from "./client"
import "./index.css"

OpenAPI.BASE = import.meta.env.VITE_API_URL
OpenAPI.TOKEN = async () => {
  return localStorage.getItem("access_token") || ""
}

const handleApiError = (error: Error) => {
  if (error instanceof ApiError && [401, 403].includes(error.status)) {
    localStorage.removeItem("access_token")
    window.location.href = "/login"
  }
}

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleApiError,
  }),
  mutationCache: new MutationCache({
    onError: handleApiError,
  }),
})

const app = createApp(App)
app.use(VueQueryPlugin, { queryClient })
app.use(router)
app.mount("#app")
