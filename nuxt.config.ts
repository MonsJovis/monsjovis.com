import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import tailwindcss from '@tailwindcss/vite'

// Content hash in the icon URL: a changed icon gets a new URL, so no browser keeps the old one
const versioned = (file: string) => {
  const hash = createHash('sha256').update(readFileSync(new URL(`./public/${file}`, import.meta.url))).digest('hex').slice(0, 8)
  return `/${file}?v=${hash}`
}

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
        { property: 'og:image', content: 'https://monsjovis.com/avatar-9be08fda.jpg' },
        { property: 'og:url', content: 'https://monsjovis.com' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Markus Aurich | Agentic Engineering Consultant & Fractional CTO' },
        { name: 'twitter:description', content: 'I help product and engineering teams build the harness and processes to ship better products with AI agents.' },
        { name: 'twitter:image', content: 'https://monsjovis.com/avatar-9be08fda.jpg' },
      ],
      link: [
        { rel: 'icon', href: versioned('favicon.ico'), sizes: '32x32' },
        { rel: 'icon', type: 'image/svg+xml', href: versioned('favicon.svg') },
        { rel: 'apple-touch-icon', href: versioned('apple-touch-icon.png') },
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
