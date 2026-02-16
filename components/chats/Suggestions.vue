<script setup lang="ts">
const emit = defineEmits<{
  select: [content: string]
}>()

const suggestions = [
  "What's Markus's experience with AI?",
  'Tell me about the reteach journey',
  'What tech stack does he work with?',
  'Is he available for projects?',
]
</script>

<template>
  <div class="px-4 pb-3">
    <p class="mb-2 text-xs text-muted-foreground">Try asking:</p>
    <div class="flex flex-wrap gap-1.5">
      <button
        v-for="suggestion in suggestions"
        :key="suggestion"
        class="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
        @click="emit('select', suggestion)"
      >
        {{ suggestion }}
      </button>
    </div>
  </div>
</template>
