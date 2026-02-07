import {
  type InjectionKey,
  inject,
  onMounted,
  onUnmounted,
  provide,
  type Ref,
  ref,
  watch,
} from "vue"

export type Theme = "dark" | "light" | "system"

interface ThemeContext {
  theme: Ref<Theme>
  resolvedTheme: Ref<"dark" | "light">
  setTheme: (theme: Theme) => void
}

export const ThemeKey: InjectionKey<ThemeContext> = Symbol("theme")

export function provideTheme(
  defaultTheme: Theme = "system",
  storageKey = "vite-ui-theme",
) {
  const theme = ref<Theme>(
    (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  )

  const getResolvedTheme = (t: Theme): "dark" | "light" => {
    if (t === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    }
    return t
  }

  const resolvedTheme = ref<"dark" | "light">(getResolvedTheme(theme.value))

  const updateTheme = (newTheme: Theme) => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(newTheme)
    }
  }

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme)
    theme.value = newTheme
  }

  watch(theme, (newTheme) => {
    updateTheme(newTheme)
    resolvedTheme.value = getResolvedTheme(newTheme)
  })

  let mediaHandler: (() => void) | null = null

  onMounted(() => {
    updateTheme(theme.value)
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    mediaHandler = () => {
      if (theme.value === "system") {
        updateTheme("system")
        resolvedTheme.value = getResolvedTheme("system")
      }
    }
    mediaQuery.addEventListener("change", mediaHandler)
  })

  onUnmounted(() => {
    if (mediaHandler) {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", mediaHandler)
    }
  })

  const context: ThemeContext = { theme, resolvedTheme, setTheme }
  provide(ThemeKey, context)
  return context
}

export function useTheme(): ThemeContext {
  const context = inject(ThemeKey)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider (App.vue)")
  }
  return context
}
