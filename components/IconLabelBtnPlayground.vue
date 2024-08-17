<template>
  <div class="w-full bg-white rounded-lg shadow-md p-6 mt-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Play with IconLabelBtn</h2>
    <!-- Display the button with the props -->
    <div class="mb-6">
      <IconLabelBtn
        :label="form.label"
        :iconName="form.iconName"
        :iconColor="form.iconColor"
        :iconSize="`${form.iconSize}px`"
        :textSize="`${form.textSize}px`"
        :textColor="form.textColor"
        :bold="form.bold"
        :iconPosition="form.iconPosition"
        :color="form.color"
        :fullWidth="form.fullWidth"
        :spaceBetween="form.spaceBetween"
        :disabled="form.disabled"
        :paddingX="`${form.paddingX}px`"
        :paddingY="`${form.paddingY}px`"
        :borderRadius="`${form.borderRadius}px`"
        :position="form.position"
        @click="handleClick"
      />
    </div>
    <form class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Label -->
      <div>
        <label for="label" class="block text-sm font-medium text-gray-700">Label</label>
        <input
          v-model="form.label"
          id="label"
          type="text"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <!-- Icon Name -->
      <div>
        <label for="iconName" class="block text-sm font-medium text-gray-700">Icon Name</label>
        <select
          v-model="form.iconName"
          id="iconPosition"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="sample-icon">sample-icon</option>
          <option value="square">square</option>
        </select>
      </div>

      <!-- Background Color -->
      <div>
        <label for="color" class="block text-sm font-medium text-gray-700">Background Color</label>
        <input
          v-model="form.color"
          id="color"
          type="color"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <!-- Icon Color -->
      <div>
        <label for="iconColor" class="block text-sm font-medium text-gray-700">Icon Color</label>
        <input
          v-model="form.iconColor"
          id="iconColor"
          type="color"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <!-- Text Color -->
      <div>
        <label for="textColor" class="block text-sm font-medium text-gray-700">Text Color</label>
        <input
          v-model="form.textColor"
          id="textColor"
          type="color"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <!-- Notification Color -->
      <div>
        <label for="notificationColor" class="block text-sm font-medium text-gray-700">Notification Color (Text color will adjust automatically based on the background color)</label>
        <input
          v-model="form.notificationColor"
          id="notificationColor"
          type="color"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div class="grid grid-cols-3 md:grid-cols-3 gap-4">
        <!-- Bold -->
        <div>
            <label class="block text-sm font-medium text-gray-700">Bold</label>
            <input
            v-model="form.bold"
            type="checkbox"
            class="mt-1"
            />
        </div>

        <!-- Full Width -->
        <div>
            <label class="block text-sm font-medium text-gray-700">Full Width</label>
            <input
            v-model="form.fullWidth"
            type="checkbox"
            class="mt-1"
            />
        </div>

        <!-- Space Between -->
        <div>
            <label class="block text-sm font-medium text-gray-700">Space Between</label>
            <input
            v-model="form.spaceBetween"
            type="checkbox"
            class="mt-1"
            />
        </div>
      </div>

      <!-- Icon Position -->
      <div>
        <label for="iconPosition" class="block text-sm font-medium text-gray-700">Icon Position</label>
        <select
          v-model="form.iconPosition"
          id="iconPosition"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select>
      </div>

      <!-- Button Position -->
      <div>
        <label for="position" class="block text-sm font-medium text-gray-700">Button Position</label>
        <select
          v-model="form.position"
          id="position"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="left">Left</option>
          <option value="middle">Middle</option>
          <option value="right">Right</option>
        </select>
      </div>

      <!-- Number Inputs Group -->
      <div class="flex gap-4">
        <div>
          <label for="iconSize" class="block text-sm font-medium text-gray-700">Icon Size</label>
          <input
            v-model.number="form.iconSize"
            id="iconSize"
            type="number"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label for="textSize" class="block text-sm font-medium text-gray-700">Text Size</label>
          <input
            v-model.number="form.textSize"
            id="textSize"
            type="number"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label for="paddingX" class="block text-sm font-medium text-gray-700">Padding X</label>
          <input
            v-model.number="form.paddingX"
            id="paddingX"
            type="number"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label for="paddingY" class="block text-sm font-medium text-gray-700">Padding Y</label>
          <input
            v-model.number="form.paddingY"
            id="paddingY"
            type="number"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label for="borderRadius" class="block text-sm font-medium text-gray-700">Border Radius</label>
          <input
            v-model.number="form.borderRadius"
            id="borderRadius"
            type="number"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import IconLabelBtn from '../components/reusable/IconLabelBtn.vue';
import { addNotification } from '../stores/notificationStore'

const handleClick = () => {
  addNotification({
    title: form.value.label, 
    message: 'Button Clicked',
    background: form.value.notificationColor,  
  });
};

const form = ref({
  label: 'Button Label',
  iconName: 'sample-icon',
  iconColor: '#FFFFFF',
  iconSize: 24,
  textSize: 16,
  textColor: '#FFFFFF',
  bold: true,
  iconPosition: 'left',
  color: '#3490dc',
  fullWidth: true,
  spaceBetween: true,
  disabled: false,
  paddingX: 20,
  paddingY: 10,
  borderRadius: 8,
  position: 'left',  // Default position
  notificationColor: '#96FFD5',
});
</script>
