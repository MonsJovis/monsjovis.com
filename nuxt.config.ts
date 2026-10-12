import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,

  app: {
    head: {
      title: 'Markus Aurich | Agentic Engineering Consultant & Fractional CTO',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'I help product and engineering teams build the harness and processes to ship better products with AI agents. Agentic engineering consultant and fractional CTO, with 10+ years as a founder and CTO.' },
        { property: 'og:title', content: 'Markus Aurich | Agentic Engineering Consultant & Fractional CTO' },
        { property: 'og:description', content: 'I help product and engineering teams build the harness and processes to ship better products with AI agents.' },
        { property: 'og:image', content: 'https://monsjovis.com/avatar-300x300.jpg' },
        { property: 'og:url', content: 'https://monsjovis.com' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Markus Aurich | Agentic Engineering Consultant & Fractional CTO' },
        { name: 'twitter:description', content: 'I help product and engineering teams build the harness and processes to ship better products with AI agents.' },
        { name: 'twitter:image', content: 'https://monsjovis.com/avatar-300x300.jpg' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
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
