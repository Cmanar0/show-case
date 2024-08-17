import { defineNuxtPlugin } from '#app'
import { getIconComponent } from '~/utils/icons'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('getIconComponent', (iconName: any) => {
    try {
      return import(`~/components/icons/${iconName}.vue`) // Adjust the path as per your project structure
    } catch (error) {
      console.error(`Icon component not found for: ${iconName}`, error)
      return null
    }
  })
})
