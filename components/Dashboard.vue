<template>
  <div class="min-h-screen flex bg-gray-100 p-8">
    <div class="min-w-full">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Welcome to the Kiosk</h2>
      <!-- Flex column on medium screens and smaller -->
      <div class="flex flex-col md:flex-row gap-4">
        <!-- First Card with min-width of 300px -->
        <div class="bg-white rounded-lg shadow-md text-center w-full md:w-1/3 min-w-[300px]">
          <div class="flex justify-center">
            <PhoneInput  @phoneSubmitted="fetchMeetingInfo" />
          </div>
        </div>
        <!-- Second Card -->
        <div class="bg-white p-6 rounded-lg shadow-md text-center w-full flex-grow">
          <div class="flex justify-center">
            <MeetingInfo v-if="currentStep === 'info'" :meeting="meeting" />
            <ThankYouMessage v-if="currentStep === 'thankYou'" />
            <ErrorMessage v-if="currentStep === 'error'" />
            <h2 v-else class="text-2xl font-bold text-gray-800 mb-4">Welcome to the Kiosk</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref } from 'vue'
import PhoneInput from './PhoneInput.vue'
import MeetingInfo from './MeetingInfo.vue'
import ThankYouMessage from './ThankYouMessage.vue'
import ErrorMessage from './ErrorMessage.vue'

// State management
const currentStep = ref('input') // Can be 'input', 'info', 'thankYou', or 'error'
const meeting = ref(null)

const fetchMeetingInfo = async (phoneNumber) => {
  try {
    // Simulate API call
    const response = await fetch(`https://api.example.com/meeting?phone=${phoneNumber}`)
    if (response.ok) {
      const data = await response.json()
      if (data.meeting) {
        meeting.value = data.meeting
        currentStep.value = 'info'
        setTimeout(() => {
          currentStep.value = 'thankYou'
        }, 3000) // Delay before showing thank you message
      } else {
        currentStep.value = 'error'
      }
    } else {
      currentStep.value = 'error'
    }
  } catch (error) {
    currentStep.value = 'error'
  }
}
</script>
