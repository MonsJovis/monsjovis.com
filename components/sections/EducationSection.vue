<script setup lang="ts">
const { education, languages } = useResume()
const { elementRef, isVisible } = useScrollAnimation()

function formatDateRange(start: string, end: string): string {
  const fmt = (d: string) => {
    const [year] = d.split('-')
    return year
  }
  return `${fmt(start)} — ${fmt(end)}`
}
</script>

<template>
  <section
    ref="elementRef"
    class="bg-muted/30 px-4 py-20"
  >
    <div class="mx-auto max-w-3xl">
      <h2
        class="mb-12 text-center text-3xl font-bold tracking-tight transition-all duration-600"
        :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
      >
        Education
      </h2>

      <div class="space-y-6">
        <div
          v-for="(edu, i) in education"
          :key="edu.institution"
          class="transition-all duration-500"
          :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
          :style="{ transitionDelay: `${i * 100 + 200}ms` }"
        >
          <h3 class="font-serif text-lg font-semibold">{{ edu.institution }}</h3>
          <p class="text-sm text-muted-foreground">
            {{ edu.studyType }} in {{ edu.area }}
          </p>
          <p class="text-xs text-muted-foreground">
            {{ formatDateRange(edu.startDate, edu.endDate) }}
          </p>
        </div>
      </div>

      <Separator class="my-10" />

      <div
        class="transition-all duration-500"
        :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
        style="transition-delay: 400ms"
      >
        <h3 class="mb-4 text-center font-serif text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Languages
        </h3>
        <div class="flex flex-wrap justify-center gap-3">
          <Badge
            v-for="lang in languages"
            :key="lang.language"
            variant="outline"
            class="px-3 py-1"
          >
            {{ lang.language }} — {{ lang.fluency }}
          </Badge>
        </div>
      </div>
    </div>
  </section>
</template>
