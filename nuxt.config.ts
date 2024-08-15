import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      baseApiUrl: process.env.NUXT_PUBLIC_BASE_API_URL // Available on both client and server
    }
  },

  modules: [
    '@pinia/nuxt',                // Pinia for state management
    '@nuxtjs/tailwindcss',        // Tailwind CSS integration
  ],

  // Ensure your Tailwind CSS file is listed here
  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-08-15'
})