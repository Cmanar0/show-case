import { defineNuxtPlugin } from '#app'
import { getIconComponent } from '~/utils/icons'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('getIconComponent', getIconComponent)
})
