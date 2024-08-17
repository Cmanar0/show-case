import { defineNuxtConfig } from 'nuxt/config'
import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      baseApiUrl: process.env.NUXT_PUBLIC_BASE_API_URL
    }
  },
  plugins: ['~/plugins/icons.ts'],

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/test-utils/module',
    function (moduleOptions, nuxt) {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins = config.plugins || []

        // Add Vuetify plugin
        config.plugins.push(vuetify({ autoImport: true }))

        // Add SVG loader plugin dynamically
        const svgLoader = require('vite-svg-loader').default
        config.plugins.push(svgLoader())
      })
    }
  ],

  build: {
    transpile: ['vuetify']
  },

  vite: {
    envPrefix: 'NUXT_PUBLIC_',
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-08-15'
})
