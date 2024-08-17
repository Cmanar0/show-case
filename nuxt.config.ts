import { defineNuxtConfig } from 'nuxt/config'
import vuetify from 'vite-plugin-vuetify'
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  devtools: { enabled: true },

  // Define runtime configuration
  runtimeConfig: {
    public: {
      baseApiUrl: process.env.NUXT_PUBLIC_BASE_API_URL
    }
  },

  // Define custom plugins
  plugins: ['~/plugins/icons.ts'],

  // Modules configuration
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/test-utils/module',
    // Custom module for Vite configuration
    function (moduleOptions, nuxt) {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // Ensure plugins array exists
        config.plugins = config.plugins || []

        // Add Vuetify plugin with auto-import enabled
        config.plugins.push(vuetify({ autoImport: true }))

        // Add SVG loader plugin
        config.plugins.push(svgLoader())
      })
    }
  ],

  // Build configuration
  build: {
    transpile: ['vuetify']
  },

  // Vite configuration
  vite: {
    // Prefix environment variables
    envPrefix: 'NUXT_PUBLIC_',
    plugins: [svgLoader()],
  },

  // CSS configuration
  css: ['~/assets/css/main.css'],

  // Compatibility date configuration (Nuxt-specific)
  compatibilityDate: '2024-08-15'
})
