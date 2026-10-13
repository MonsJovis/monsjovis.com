import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import tailwindcss from '@tailwindcss/vite'

// Content hash in the icon URL: a changed icon gets a new URL, so no browser keeps the old one
const versioned = (file: string) => {
  const hash = createHash('sha256').update(readFileSync(new URL(`./public/${file}`, import.meta.url))).digest('hex').slice(0, 8)
  return `/${file}?v=${hash}`
}

// The avatar URL lives in resume.json only. The hero serves WebP sizes next to it, so the build
// fails instead of shipping a broken image when a new avatar comes without them (see AGENTS.md)
const avatar: string = JSON.parse(readFileSync(new URL('./resume.json', import.meta.url), 'utf8')).basics.image
const avatarBase = new URL(avatar).pathname.replace(/\.jpg$/, '')
for (const file of [`${avatarBase}.jpg`, ...[288, 576, 864].map(w => `${avatarBase}-${w}.webp`)]) {
  if (!existsSync(new URL(`./public${file}`, import.meta.url))) throw new Error(`Avatar file missing: public${file}`)
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
        { name: 'author', content: 'Markus Aurich' },
        { property: 'og:image', content: avatar },
        { property: 'og:image:width', content: '1600' },
        { property: 'og:image:height', content: '1600' },
        { property: 'og:image:alt', content: 'Markus Aurich' },
        { property: 'og:url', content: 'https://monsjovis.com/' },
        { property: 'og:type', content: 'profile' },
        { property: 'og:site_name', content: 'Markus Aurich' },
        { property: 'og:locale', content: 'en_US' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Markus Aurich | Agentic Engineering Consultant & Fractional CTO' },
        { name: 'twitter:description', content: 'I help product and engineering teams build the harness and processes to ship better products with AI agents.' },
        { name: 'twitter:image', content: avatar },
      ],
      link: [
        { rel: 'icon', href: versioned('favicon.ico'), sizes: '32x32' },
        { rel: 'icon', type: 'image/svg+xml', href: versioned('favicon.svg') },
        { rel: 'apple-touch-icon', href: versioned('apple-touch-icon.png') },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  // All CSS inline in the HTML: no render-blocking stylesheet request before the first paint
  features: {
    inlineStyles: true,
  },

  nitro: {
    prerender: {
      routes: ['/llms.txt'],
    },
  },

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
