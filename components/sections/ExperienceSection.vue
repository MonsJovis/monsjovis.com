<script setup lang="ts">
const { work } = useResume()
const { elementRef, isVisible } = useScrollAnimation()

function formatDateRange(start: string, end?: string): string {
  const fmt = (d: string) => {
    const [year, month] = d.split('-')
    if (!month) return year
    const date = new Date(parseInt(year), parseInt(month) - 1)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }
  return end ? `${fmt(start)} — ${fmt(end)}` : `${fmt(start)} — Present`
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
        Experience
      </h2>

      <div class="relative">
        <!-- Connecting line -->
        <div class="absolute left-[7px] top-2 hidden h-[calc(100%-16px)] w-px bg-border sm:block" />

        <div class="space-y-8">
          <div
            v-for="(job, i) in work"
            :key="`${job.name}-${job.startDate}`"
            class="relative pl-0 transition-all duration-500 sm:pl-8"
            :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
            :style="{ transitionDelay: `${i * 100 + 200}ms` }"
          >
            <!-- Dot -->
            <div class="absolute left-0 top-2 hidden size-[15px] rounded-full border-2 border-primary bg-background sm:block" />

            <div>
              <div class="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 class="font-serif text-lg font-semibold">{{ job.name }}</h3>
                <span class="text-sm text-muted-foreground">{{ job.position }}</span>
              </div>

              <p class="mb-3 text-xs text-muted-foreground">
                {{ formatDateRange(job.startDate, job.endDate) }}
              </p>

              <p v-if="job.summary" class="mb-3 text-sm text-muted-foreground">
                {{ job.summary }}
              </p>

              <ul v-if="job.highlights.length" class="space-y-1.5">
                <li
                  v-for="highlight in job.highlights"
                  :key="highlight"
                  class="flex gap-2 text-sm text-muted-foreground"
                >
                  <span class="mt-1.5 size-1 shrink-0 rounded-full bg-muted-foreground/50" />
                  <span v-html="highlight" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
