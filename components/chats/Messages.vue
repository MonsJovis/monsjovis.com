<script setup lang="ts">
import type { ChatMessage } from '~/types/chat'

const props = defineProps<{
  messages: readonly ChatMessage[]
  isLoading: boolean
}>()

const container = ref<HTMLElement | null>(null)

function scrollToBottom() {
  nextTick(() => {
    if (container.value) {
      container.value.scrollTop = container.value.scrollHeight
    }
  })
}

watch(() => props.messages.length, scrollToBottom)
watch(
  () => props.messages[props.messages.length - 1]?.content,
  scrollToBottom,
)
</script>

<template>
  <div
    ref="container"
    class="flex-1 space-y-3 overflow-y-auto px-4 py-4"
  >
    <ChatsMessage
      v-for="(msg, i) in messages"
      :key="i"
      :role="msg.role"
      :content="msg.content"
    />

    <ChatsTypingIndicator v-if="isLoading && messages[messages.length - 1]?.content === ''" />
  </div>
</template>
