<template>
  <component
    v-if="iconComponent"
    :is="iconComponent"
    class="custom-icon"
    :style="{ width: size, height: size, fill: color }"
  />
  <span v-else class="fallback-message"> </span>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
// Import getIconComponent directly from your utility file
import { getIconComponent } from '../utils/icons'

// Define the props with explicit types
const props = defineProps<{
  iconName: string;
  color?: string;
  size?: string;
}>()

const iconComponent = ref(null)

watchEffect(async () => {
  const iconImport = await getIconComponent(props.iconName);
  if (iconImport) {
    iconComponent.value = iconImport;
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
