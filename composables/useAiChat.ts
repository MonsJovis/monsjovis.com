import type { ChatMessage } from '~/types/chat'

const MAX_MESSAGES = 20

const messages = ref<ChatMessage[]>([])
const isOpen = ref(false)
const isLoading = ref(false)
const error = ref<string | null>(null)

export function useAiChat() {
  const config = useRuntimeConfig()

  function toggleChat() {
    isOpen.value = !isOpen.value
  }

  function clearMessages() {
    messages.value = []
    error.value = null
  }

  async function sendMessage(content: string) {
    if (!content.trim() || isLoading.value) return

    error.value = null
    messages.value.push({ role: 'user', content: content.trim() })
    messages.value.push({ role: 'assistant', content: '' })
    isLoading.value = true

    const assistantIndex = messages.value.length - 1

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 30_000)

    try {
      const response = await fetch(config.public.chatApiUrl as string, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.value.slice(0, -1).slice(-MAX_MESSAGES).map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
        signal: controller.signal,
      })

      if (response.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.')
      }

      if (!response.ok) {
        throw new Error('Failed to get response. Please try again.')
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response stream')

      const decoder = new TextDecoder()
      let buffer = ''
      let streamDone = false

      while (!streamDone) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()
          if (data === '[DONE]') {
            streamDone = true
            break
          }

          try {
            const parsed = JSON.parse(data)
            if (parsed.text) {
              messages.value[assistantIndex].content += parsed.text
            }
            if (parsed.error) {
              throw new Error(parsed.error)
            }
          } catch (e) {
            if (e instanceof SyntaxError) continue
            throw e
          }
        }
      }

      if (!messages.value[assistantIndex].content) {
        throw new Error('Empty response received')
      }
    } catch (e: unknown) {
      const msg = e instanceof Error
        ? e.name === 'AbortError'
          ? 'Request timed out. Please try again.'
          : e.message
        : 'Something went wrong'

      error.value = msg

      // Remove empty assistant message on error
      if (!messages.value[assistantIndex].content) {
        messages.value.splice(assistantIndex, 1)
      }
    } finally {
      clearTimeout(timeout)
      isLoading.value = false
    }
  }

  return {
    messages: readonly(messages),
    isOpen,
    isLoading: readonly(isLoading),
    error: readonly(error),
    sendMessage,
    toggleChat,
    clearMessages,
  }
}
