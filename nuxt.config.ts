import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      baseApiUrl: process.env.NUXT_PUBLIC_BASE_API_URL // Available on both client and server
    }
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/test-utils/module',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', config => {
        config.plugins = config.plugins || []
      })
    }
  ],
    vite: {
    envPrefix: 'NUXT_PUBLIC_'
  },
  // Ensure your Tailwind CSS file is listed here
  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-08-15'
})