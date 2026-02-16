<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false })

const { isOpen, toggleChat } = useAiChat()

watch(open, (val) => {
  isOpen.value = val
})

watch(isOpen, (val) => {
  open.value = val
})
</script>

<template>
  <div>
    <ChatsButton v-if="!isOpen" @click="toggleChat" />
    <ChatsPanel v-if="isOpen" @close="toggleChat" />
  </div>
</template>
