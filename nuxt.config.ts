import { defineNuxtConfig } from 'nuxt/config'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import svgLoader from 'vite-svg-loader'

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
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', config => {
        config.plugins = config.plugins || []
        config.plugins.push(vuetify({ autoImport: true }))
        config.plugins.push(svgLoader()) 
      })
    }
  ],
  build: {
    transpile: ['vuetify']
  },
  vite: {
    envPrefix: 'NUXT_PUBLIC_'
  },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2024-08-15'
})
