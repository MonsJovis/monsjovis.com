<script setup lang="ts">
const { projects } = useResume()
const { elementRef, isVisible } = useScrollAnimation()

const showAll = ref(false)

const featuredProjects = computed(() => projects.value.slice(0, 3))
const remainingProjects = computed(() => projects.value.slice(3))

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
    class="px-4 py-20"
  >
    <div class="mx-auto max-w-5xl">
      <h2
        class="mb-12 text-center text-3xl font-bold tracking-tight transition-all duration-600"
        :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
      >
        Selected Work
      </h2>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card
          v-for="(project, i) in featuredProjects"
          :key="project.name"
          class="flex flex-col transition-all duration-500"
          :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
          :style="{ transitionDelay: `${i * 100 + 200}ms` }"
        >
          <CardHeader>
            <div class="mb-1 flex items-center justify-between">
              <Badge v-if="project.entity" variant="outline" class="text-xs">
                {{ project.entity }}
              </Badge>
              <span class="text-xs text-muted-foreground">
                {{ formatDateRange(project.startDate, project.endDate) }}
              </span>
            </div>
            <CardTitle class="text-base leading-snug">{{ project.name }}</CardTitle>
          </CardHeader>
          <CardContent class="flex-1">
            <p class="mb-4 text-sm leading-relaxed text-muted-foreground">
              {{ project.description }}
            </p>
            <div class="flex flex-wrap gap-1.5">
              <Badge
                v-for="keyword in project.keywords.slice(0, 5)"
                :key="keyword"
                variant="secondary"
                class="text-xs"
              >
                {{ keyword }}
              </Badge>
              <Badge
                v-if="project.keywords.length > 5"
                variant="secondary"
                class="text-xs"
              >
                +{{ project.keywords.length - 5 }}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div v-if="remainingProjects.length > 0" class="mt-8">
        <Button
          variant="ghost"
          class="mx-auto flex items-center gap-2"
          @click="showAll = !showAll"
        >
          {{ showAll ? 'Show less' : `Show ${remainingProjects.length} more projects` }}
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
            class="transition-transform duration-200"
            :class="showAll ? 'rotate-180' : ''"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </Button>

        <div
          v-if="showAll"
          class="mt-6 grid gap-4 sm:grid-cols-2"
        >
          <Card
            v-for="project in remainingProjects"
            :key="project.name"
            class="p-4"
          >
            <div class="mb-1 flex items-center justify-between">
              <Badge v-if="project.entity" variant="outline" class="text-xs">
                {{ project.entity }}
              </Badge>
              <span class="text-xs text-muted-foreground">
                {{ formatDateRange(project.startDate, project.endDate) }}
              </span>
            </div>
            <h3 class="mb-2 font-serif text-sm font-semibold">{{ project.name }}</h3>
            <p class="mb-3 text-xs leading-relaxed text-muted-foreground">
              {{ project.description }}
            </p>
            <div class="flex flex-wrap gap-1">
              <Badge
                v-for="keyword in project.keywords.slice(0, 4)"
                :key="keyword"
                variant="secondary"
                class="text-xs"
              >
                {{ keyword }}
              </Badge>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </section>
</template>
