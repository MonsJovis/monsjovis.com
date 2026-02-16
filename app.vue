<script setup lang="ts">
const colorMode = useColorMode()

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const chatOpen = ref(false)

function openChat() {
  chatOpen.value = true
}
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <!-- Skip to content -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
    >
      Skip to content
    </a>

    <!-- Dark mode toggle -->
    <button
      class="fixed right-4 top-4 z-40 flex size-9 items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-accent"
      aria-label="Toggle dark mode"
      @click="toggleColorMode"
    >
      <!-- Sun icon (shown in dark mode) -->
      <svg
        v-if="colorMode.value === 'dark'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
      <!-- Moon icon (shown in light mode) -->
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    </button>

    <NuxtPage @open-chat="openChat" />

    <!-- Chat Widget (lazy loaded, client only) -->
    <ClientOnly>
      <LazyChatsWidget v-model:open="chatOpen" />
    </ClientOnly>
  </div>
</template>
