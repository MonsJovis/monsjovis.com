<script setup lang="ts">
const { elementRef, isVisible } = useScrollAnimation()

const services = [
  {
    icon: 'sparkles',
    title: 'Agentic Engineering',
    description: 'Your engineers work with AI agents every day. I set up toolchain, conventions, and a development cycle with clear human checkpoints. Then I coach until your leads run it themselves, with numbers that show whether it works.',
  },
  {
    icon: 'users',
    title: 'Fractional CTO & Head of Engineering',
    description: 'Part-time technical leadership: architecture calls, operating model, delivery process, and building the team that carries it after I leave.',
  },
  {
    icon: 'target',
    title: 'Product Strategy',
    description: 'From vision to roadmap: I set the product direction, prioritize hard, and align teams on outcomes.',
  },
]

const iconPaths: Record<string, string> = {
  target: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm0 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4z',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm13 14v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  sparkles: 'M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z',
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
        What I Do
      </h2>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card
          v-for="(service, i) in services"
          :key="service.title"
          class="transition-all duration-500"
          :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
          :style="{ transitionDelay: `${i * 100 + 200}ms` }"
        >
          <CardHeader>
            <div class="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                <path :d="iconPaths[service.icon]" />
              </svg>
            </div>
            <CardTitle class="text-lg">{{ service.title }}</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-sm leading-relaxed text-muted-foreground">
              {{ service.description }}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
