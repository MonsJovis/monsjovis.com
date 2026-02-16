<script setup lang="ts">
const { basics, city, email } = useResume();

const emit = defineEmits<{
  openChat: [];
}>();

const isVisible = ref(false);

onMounted(() => {
  requestAnimationFrame(() => {
    isVisible.value = true;
  });
});
</script>

<template>
  <section
    class="relative flex min-h-[85vh] items-center justify-center px-4 py-20"
  >
    <div
      class="mx-auto flex max-w-2xl flex-col items-center text-center transition-all duration-700"
      :class="
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      "
    >
      <img
        :src="basics.image"
        :alt="basics.name"
        class="mb-8 size-72 rounded-full object-cover ring-2 ring-border"
      />

      <h1 class="mb-3 text-4xl font-bold tracking-tight sm:text-5xl">
        {{ basics.name }}
      </h1>

      <p class="mb-4 text-lg text-muted-foreground sm:text-xl">
        {{ basics.label }}
      </p>

      <Badge variant="secondary" class="mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="mr-1.5"
        >
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        {{ city }}
      </Badge>

      <p
        class="mb-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
      >
        I come in when products need direction<br class="hidden sm:block" />
        and engineering needs structure.
      </p>

      <div class="flex flex-wrap items-center justify-center gap-3">
        <Button as="a" :href="`mailto:${email}`" size="lg"> Let's talk </Button>
        <Button variant="outline" size="lg" @click="emit('openChat')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="mr-2"
          >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          </svg>
          Ask my AI
        </Button>
      </div>
    </div>
  </section>
</template>
