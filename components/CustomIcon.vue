<template>
  <component :is="iconComponent" v-if="iconComponent" class="custom-icon" :style="{ width: size, height: size, fill: color }" />
</template>

<script setup >
import { ref, watchEffect } from 'vue'
import { useNuxtApp } from '#app'

const props = defineProps({
  iconName: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'currentColor',
  },
  size: {
    type: String,
    default: '16px',
  },
})

const nuxtApp = useNuxtApp()
const iconComponent = ref(null)

watchEffect(async () => {
  const iconImport = await nuxtApp.$getIconComponent(props.iconName);
  if (iconImport && typeof iconImport === 'function') {
    iconComponent.value = await iconImport(); // Import the component
    console.log("GGG", iconComponent.value);  // Debugging: log the imported icon component
  } else {
    console.error(`Failed to import icon: ${props.iconName}`);
  }
});

</script>

<style scoped>
.custom-icon {
  display: inline-block;
  vertical-align: middle;
}
</style>
