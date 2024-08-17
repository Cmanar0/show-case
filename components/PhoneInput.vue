<template>
  <div class="max-w-sm min-w-[300px] p-6">
    <form @submit.prevent="submitPhoneNumber" class="space-y-4">
      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700">Enter Your Phone Number</label>
        
        <!-- Wrapper to position the clear button inside the input -->
        <div class="relative">
          <input
            id="phone"
            v-model="phoneNumber"
            type="text"
            placeholder="123456789"
            class="w-full p-3 text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 tracking-widest"
          />
          
          <!-- Clear Icon -->
          <button
            type="button"
            v-if="phoneNumber"
            @click="clearPhoneNumber"
            class="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
          >
            <svg class="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <span v-if="error" class="text-red-500 text-sm">{{ error }}</span>
      </div>
      <button type="submit" class="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
        Submit
      </button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{ (e: 'phoneSubmitted', phoneNumber: string): void }>()

const phoneNumber = ref<string>('')
const error = ref<string>('')

const validatePhoneNumber = (number: string): boolean => {
  const phoneRegex = /^\d{9}$/  
  return phoneRegex.test(number)
}

const submitPhoneNumber = (): void => {
  if (validatePhoneNumber(phoneNumber.value)) {
    error.value = ''
    emit('phoneSubmitted', phoneNumber.value)
  } else {
    error.value = 'Please enter a valid 9-digit phone number in the format 123456789'
  }
}

const clearPhoneNumber = (): void => {
  phoneNumber.value = ''
}
</script>
