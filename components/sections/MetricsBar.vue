<script setup lang="ts">
const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.3 });

const metrics = [
  { value: 15, suffix: "+", label: "Years", sublabel: "in Tech" },
  { value: 10, suffix: "+", label: "Engagements", sublabel: "delivered" },
  {
    value: 5,
    label: "Industries",
    sublabel: "HRTech, EdTech, Media, Online Marketing, SaaS",
  },
  { value: 4, label: "AI Products", sublabel: "shipped" },
];

const counters = metrics.map((m) => useCountUp(m.value));

watch(isVisible, (visible) => {
  if (visible) {
    counters.forEach((c) => c.start());
  }
});
</script>

<template>
  <section ref="elementRef" class="border-y border-border bg-muted/50 py-10">
    <div
      class="mx-auto flex max-w-5xl flex-wrap items-start justify-center gap-8 px-4 sm:gap-12 md:justify-between"
      :class="
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      "
      style="transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
    >
      <div
        v-for="(metric, i) in metrics"
        :key="metric.label"
        class="flex flex-col items-center text-center"
      >
        <span class="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
          {{ metric.prefix }}{{ counters[i].current.value }}{{ metric.suffix }}
        </span>
        <span class="mt-1 text-sm text-muted-foreground">
          {{ metric.label }}
        </span>
        <span class="mt-0.5 max-w-32 text-xs text-muted-foreground/70">
          {{ metric.sublabel }}
        </span>
      </div>
    </div>
  </section>
</template>
