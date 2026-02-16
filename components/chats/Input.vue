<script setup lang="ts">
const props = defineProps<{
  isLoading: boolean
}>()

const emit = defineEmits<{
  send: [content: string]
}>()

const input = ref('')
const textarea = ref<HTMLTextAreaElement | null>(null)

function send() {
  const trimmed = input.value.trim()
  if (!trimmed || props.isLoading) return
  emit('send', trimmed)
  input.value = ''
  nextTick(() => {
    if (textarea.value) {
      textarea.value.style.height = 'auto'
    }
  })
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    send()
  }
}

function autoResize() {
  if (!textarea.value) return
  textarea.value.style.height = 'auto'
  textarea.value.style.height = Math.min(textarea.value.scrollHeight, 120) + 'px'
}
</script>

<template>
  <div class="border-t border-border p-3">
    <div class="flex items-end gap-2">
      <textarea
        ref="textarea"
        v-model="input"
        placeholder="Ask about Markus..."
        rows="1"
        class="max-h-[120px] min-h-[38px] flex-1 resize-none rounded-lg border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        :disabled="isLoading"
        @keydown="handleKeydown"
        @input="autoResize"
      />
      <button
        class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity disabled:opacity-50"
        :disabled="!input.trim() || isLoading"
        aria-label="Send message"
        @click="send"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.629a.498.498 0 0 0 .682.627l18.168-8.215a.5.5 0 0 0 0-.904z" />
          <path d="M6 12h16" />
        </svg>
      </button>
    </div>
  </div>
</template>
