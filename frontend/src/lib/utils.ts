import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function handleError(
  this: { showErrorToast: (msg: string) => void },
  error: unknown,
) {
  const showErrorToast = this?.showErrorToast
  if (!showErrorToast) return

  if (error instanceof Error && "body" in error) {
    const apiError = error as {
      body?: { detail?: string | Array<{ msg: string }> }
    }
    const detail = apiError.body?.detail
    if (typeof detail === "string") {
      showErrorToast(detail)
      return
    }
    if (Array.isArray(detail)) {
      showErrorToast(detail.map((d) => d.msg).join(", "))
      return
    }
  }
  showErrorToast("An unexpected error occurred")
}
