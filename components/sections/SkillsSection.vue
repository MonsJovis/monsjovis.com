<script setup lang="ts">
const { skills, domains } = useResume()
const { elementRef, isVisible } = useScrollAnimation()
</script>

<template>
  <section
    ref="elementRef"
    class="px-4 py-20"
  >
    <div class="mx-auto max-w-4xl">
      <h2
        class="mb-12 text-center text-3xl font-bold tracking-tight transition-all duration-600"
        :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
      >
        Skills & Tech
      </h2>

      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(group, i) in skills"
          :key="group.name"
          class="transition-all duration-500"
          :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
          :style="{ transitionDelay: `${i * 80 + 200}ms` }"
        >
          <h3 class="mb-3 font-serif text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {{ group.name }}
          </h3>
          <div class="flex flex-wrap gap-2">
            <Badge
              v-for="keyword in group.keywords"
              :key="keyword"
              variant="secondary"
            >
              {{ keyword }}
            </Badge>
          </div>
        </div>
      </div>

      <div
        class="mt-8 transition-all duration-500"
        :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
        :style="{ transitionDelay: `${skills.length * 80 + 200}ms` }"
      >
        <h3 class="mb-3 font-serif text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Domain Experience
        </h3>
        <div class="flex flex-wrap gap-2">
          <Badge
            v-for="domain in domains"
            :key="domain"
            variant="secondary"
          >
            {{ domain }}
          </Badge>
        </div>
      </div>
    </div>
  </section>
</template>
