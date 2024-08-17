<template>
  <div class="w-full" :class="{ 'middle': position === 'middle', 'left': position === 'left', 'right': position === 'right' }">
    <button
      :class="[
        'flex',
        'centered-vertical',
        'button',
        {
          'w-full': fullWidth,  
          'justify-between': spaceBetween,  
          'justify-center': !spaceBetween, 
          'opacity-50 cursor-not-allowed': disabled,  
        },
      ]"
      :disabled="disabled"
      :style="{ backgroundColor: color, padding: `${paddingY} ${paddingX}`, borderRadius: borderRadius }"
    >
      <template v-if="iconPosition === 'left'">
        <CustomIcon :iconName="iconName" :color="iconColor" :size="iconSize" class="button__icon--left" />
      </template>
      <span :class="{ 'text--bold': bold }" :style="{ fontSize: textSize, color: textColor }">{{ label }}</span>
      <template v-if="iconPosition === 'right'">
        <CustomIcon :iconName="iconName" :color="iconColor" :size="iconSize" class="button__icon--right" />
      </template>
    </button>
  </div>
</template>

<script setup>
import CustomIcon from '../CustomIcon.vue'
defineProps({
  label: {
    type: String,
    required: true,
  },
  iconName: {
    type: String,
    required: false,
  },
  iconPosition: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right'].includes(value),
  },
  iconColor: {
    type: String,
    default: '#FFFFFF',  // Default to white
  },
  iconSize: {
    type: String,
    default: '16px',
  },
  textSize: {
    type: String,
    default: '16px',
  },
  textColor: {
    type: String,
    default: '#FFFFFF',  // Default to white
  },
  bold: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: '#3490dc',  // Default to a blue color
    validator: (value) => /^#([0-9A-F]{3}){1,2}$/i.test(value) || /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/i.test(value) || /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0|1|0?\.\d+)\)$/i.test(value),
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  spaceBetween: {
    type: Boolean,
    default: false,
  },
  position: {
    type: String,
    default: 'left',  // Default position to left
    validator: (value) => ['left', 'middle', 'right'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  paddingX: {
    type: String,
    default: '15px',
  },
  paddingY: {
    type: String,
    default: '8px',
  },
  borderRadius: {
    type: String,
    default: '4px',  // Default border-radius
  },
});
</script>

<style scoped>
.button__icon--left {
  margin-right: 8px;
}

.button__icon--right {
  margin-left: 8px;
}

.text--bold {
  font-weight: bold;
}

.button--centered {
  justify-content: center;
}
.middle {
  display: flex;
  justify-content: center;
}
.left {
  display: flex;
  justify-content: flex-start;
}
.right {
  display: flex;
  justify-content: flex-end;
}
.centered-vertical {
  align-items: center;
}

/* Hover effect for buttons when not disabled */
button:not(:disabled):hover {
  filter: brightness(0.9); /* Slightly darken the button */
}
</style>
