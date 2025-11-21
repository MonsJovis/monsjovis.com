import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,

  app: {
    head: {
      title: 'Markus Aurich',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Tech Leader | Product Innovator | Startup Enthusiast' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()]
  },

  modules: ['@nuxtjs/google-fonts'],

  googleFonts: {
    families: {
      'Roboto Slab': [400]
    }
  }
})
