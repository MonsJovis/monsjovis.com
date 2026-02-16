<script setup lang="ts">
import { Marked } from 'marked'
import DOMPurify from 'dompurify'

const props = defineProps<{
  role: 'user' | 'assistant'
  content: string
}>()

const marked = new Marked({ breaks: true, gfm: true })

const parsedContent = computed(() => {
  if (!props.content) return ''
  if (props.role === 'user') return props.content
  return DOMPurify.sanitize(marked.parse(props.content) as string)
})
</script>

<template>
  <div
    class="flex"
    :class="role === 'user' ? 'justify-end' : 'justify-start'"
  >
    <div
      class="max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed"
      :class="
        role === 'user'
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted text-foreground'
      "
    >
      <p v-if="role === 'user' && content" class="whitespace-pre-wrap">
        {{ content }}
      </p>
      <div v-else-if="content" class="prose-chat" v-html="parsedContent" />
    </div>
  </div>
</template>

<style scoped>
.prose-chat :deep(p) {
  margin: 0;
}

.prose-chat :deep(p + p) {
  margin-top: 0.5em;
}

.prose-chat :deep(strong) {
  font-weight: 600;
}

.prose-chat :deep(ul),
.prose-chat :deep(ol) {
  margin: 0.25em 0;
  padding-left: 1.25em;
}

.prose-chat :deep(li) {
  margin: 0.125em 0;
}

.prose-chat :deep(ul) {
  list-style-type: disc;
}

.prose-chat :deep(ol) {
  list-style-type: decimal;
}

.prose-chat :deep(code) {
  font-size: 0.85em;
  padding: 0.15em 0.3em;
  border-radius: 0.25em;
  background: rgb(0 0 0 / 0.1);
}

.prose-chat :deep(pre) {
  margin: 0.5em 0;
  padding: 0.5em;
  border-radius: 0.375em;
  background: rgb(0 0 0 / 0.1);
  overflow-x: auto;
}

.prose-chat :deep(pre code) {
  padding: 0;
  background: none;
}

.prose-chat :deep(a) {
  text-decoration: underline;
  text-underline-offset: 2px;
}
</style>
