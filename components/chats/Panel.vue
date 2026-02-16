<script setup lang="ts">
const emit = defineEmits<{
  close: []
}>()

const { messages, isLoading, error, sendMessage } = useAiChat()

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div
    class="fixed inset-x-0 bottom-0 z-50 flex h-[min(600px,85vh)] flex-col rounded-t-2xl border border-border bg-background shadow-2xl sm:inset-x-auto sm:bottom-6 sm:right-6 sm:h-[min(600px,80vh)] sm:w-[400px] sm:rounded-2xl"
  >
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-border px-4 py-3">
      <div class="flex items-center gap-2">
        <div class="flex size-7 items-center justify-center rounded-full bg-primary/10">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
          </svg>
        </div>
        <span class="text-sm font-medium">Ask about Markus</span>
      </div>
      <button
        class="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        aria-label="Close chat"
        @click="emit('close')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Messages -->
    <ChatsMessages :messages="messages" :is-loading="isLoading" />

    <!-- Error -->
    <div v-if="error" class="mx-4 mb-2 rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">
      {{ error }}
    </div>

    <!-- Suggestions (when no messages) -->
    <ChatsSuggestions
      v-if="messages.length === 0 && !isLoading"
      @select="sendMessage"
    />

    <!-- Input -->
    <ChatsInput :is-loading="isLoading" @send="sendMessage" />
  </div>
</template>
