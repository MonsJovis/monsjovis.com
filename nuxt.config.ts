import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,

  app: {
    head: {
      title: 'Markus Aurich — Fractional CTO & CPO',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Fractional CTO & CPO — AI-first product leadership, team building, and hands-on engineering. Decade of founder experience across product strategy and startup scaling.' },
        { property: 'og:title', content: 'Markus Aurich — Fractional CTO & CPO' },
        { property: 'og:description', content: 'AI-first product leadership, team building, and hands-on engineering.' },
        { property: 'og:image', content: 'https://monsjovis.com/avatar-300x300.jpg' },
        { property: 'og:url', content: 'https://monsjovis.com' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Markus Aurich — Fractional CTO & CPO' },
        { name: 'twitter:description', content: 'AI-first product leadership, team building, and hands-on engineering.' },
        { name: 'twitter:image', content: 'https://monsjovis.com/avatar-300x300.jpg' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: [
    '@nuxtjs/google-fonts',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
  ],

  googleFonts: {
    families: {
      'Roboto Slab': [300, 400, 700],
      'Inter': [300, 400, 500, 600, 700],
    },
  },

  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },

  colorMode: {
    preference: 'system',
    fallback: 'dark',
    classSuffix: '',
  },

  runtimeConfig: {
    public: {
      chatApiUrl: '',
    },
  },

  icon: {
    serverBundle: 'local',
  },
})
