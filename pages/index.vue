<script setup lang="ts">
import { useResume } from '~/composables/useResume'

const { basics, email, profiles } = useResume()

const emit = defineEmits<{
  openChat: []
}>()

useHead({
  title: `${basics.value.name} — ${basics.value.label}`,
  meta: [
    { name: 'description', content: basics.value.summary.split('\n\n')[0] },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: basics.value.name,
        jobTitle: 'Fractional CTO & CPO',
        email: `mailto:${email.value}`,
        url: basics.value.url,
        image: basics.value.image,
        sameAs: profiles.value.map(p => p.url),
        address: {
          '@type': 'PostalAddress',
          addressLocality: basics.value.location.city,
          addressCountry: basics.value.location.countryCode,
        },
      }),
    },
  ],
})
</script>

<template>
  <main id="main-content">
    <SectionsHeroSection @open-chat="emit('openChat')" />
    <SectionsMetricsBar />
    <SectionsServicesSection />
    <SectionsProjectsSection />
    <SectionsExperienceSection />
    <SectionsSkillsSection />
    <SectionsEducationSection />
    <SectionsFooterSection />
  </main>
</template>
