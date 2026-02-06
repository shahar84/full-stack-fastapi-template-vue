import { ref } from "vue"

export default function useCopyToClipboard() {
  const copiedText = ref<string | null>(null)

  const copy = async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported")
      return false
    }

    try {
      await navigator.clipboard.writeText(text)
      copiedText.value = text
      setTimeout(() => {
        copiedText.value = null
      }, 2000)
      return true
    } catch (err) {
      console.warn("Copy failed", err)
      copiedText.value = null
      return false
    }
  }

  return { copiedText, copy }
}
