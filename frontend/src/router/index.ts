import { createRouter, createWebHistory } from "vue-router"
import { isLoggedIn } from "@/composables/useAuth"
import { UsersService } from "@/client"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/layouts/DefaultLayout.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "dashboard",
          component: () => import("@/views/Dashboard.vue"),
          meta: { title: "Dashboard - FastAPI Cloud" },
        },
        {
          path: "items",
          name: "items",
          component: () => import("@/views/Items.vue"),
          meta: { title: "Items - FastAPI Cloud" },
        },
        {
          path: "admin",
          name: "admin",
          component: () => import("@/views/Admin.vue"),
          meta: { title: "Admin - FastAPI Cloud", requiresSuperuser: true },
          beforeEnter: async () => {
            try {
              const user = await UsersService.readUserMe()
              if (!user.is_superuser) {
                return "/"
              }
            } catch {
              return "/login"
            }
          },
        },
        {
          path: "settings",
          name: "settings",
          component: () => import("@/views/Settings.vue"),
          meta: { title: "Settings - FastAPI Cloud" },
        },
      ],
    },
    {
      path: "/login",
      component: () => import("@/layouts/GuestLayout.vue"),
      children: [
        {
          path: "",
          name: "login",
          component: () => import("@/views/Login.vue"),
          meta: { title: "Log In - FastAPI Cloud" },
        },
      ],
      beforeEnter: () => {
        if (isLoggedIn()) return "/"
      },
    },
    {
      path: "/signup",
      component: () => import("@/layouts/GuestLayout.vue"),
      children: [
        {
          path: "",
          name: "signup",
          component: () => import("@/views/SignUp.vue"),
          meta: { title: "Sign Up - FastAPI Cloud" },
        },
      ],
      beforeEnter: () => {
        if (isLoggedIn()) return "/"
      },
    },
    {
      path: "/recover-password",
      component: () => import("@/layouts/GuestLayout.vue"),
      children: [
        {
          path: "",
          name: "recover-password",
          component: () => import("@/views/RecoverPassword.vue"),
          meta: { title: "Recover Password - FastAPI Cloud" },
        },
      ],
    },
    {
      path: "/reset-password",
      component: () => import("@/layouts/GuestLayout.vue"),
      children: [
        {
          path: "",
          name: "reset-password",
          component: () => import("@/views/ResetPassword.vue"),
          meta: { title: "Reset Password - FastAPI Cloud" },
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/components/Common/NotFound.vue"),
    },
  ],
})

router.beforeEach((to) => {
  // Set page title
  if (to.meta.title) {
    document.title = to.meta.title as string
  }

  // Auth guard
  if (to.meta.requiresAuth && !isLoggedIn()) {
    return "/login"
  }
})

export default router
