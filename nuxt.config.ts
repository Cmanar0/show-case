import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      baseApiUrl: process.env.NUXT_PUBLIC_BASE_API_URL // Available on both client and server
    }
  },
  modules: [
    // '@pinia/nuxt',                // Pinia for state management
    '@nuxtjs/tailwindcss',        // Tailwind CSS integration
  ],
  css: ['~/assets/css/main.css'], // Ensure your Tailwind CSS file is listed here
})
