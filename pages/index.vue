<script setup lang="ts">
import { useResume } from '~/composables/useResume'

const { basics, education, email, languages, profiles, skills } = useResume()

const emit = defineEmits<{
  openChat: []
}>()

useHead({
  title: `${basics.value.name} | ${basics.value.label}`,
  meta: [
    { name: 'description', content: basics.value.summary.split('\n\n')[0] },
  ],
  link: [
    { rel: 'canonical', href: basics.value.url },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        url: basics.value.url,
        mainEntity: {
          '@type': 'Person',
          '@id': `${basics.value.url}#person`,
          name: basics.value.name,
          jobTitle: basics.value.label,
          description: basics.value.summary.split('\n\n')[0],
          email: `mailto:${email.value}`,
          url: basics.value.url,
          image: basics.value.image,
          sameAs: profiles.value.map(p => p.url),
          workLocation: basics.value.location.city.split('/').map(name => ({ '@type': 'Place', name })),
          knowsAbout: skills.value.find(s => s.name === 'Agentic Engineering')?.keywords,
          knowsLanguage: languages.value.map(l => l.language),
          alumniOf: education.value.map(e => ({ '@type': 'CollegeOrUniversity', name: e.institution })),
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
