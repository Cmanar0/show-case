<template>
  <div class="min-h-screen flex bg-gray-100 p-8" data-test="dashboard">
    <div class="min-w-full">


      <!-- Flex column on medium screens and smaller -->
      <div class="flex align-center flex-col gap-4">
        <!-- First Card with min-width of 300px -->
        <div class="bg-white rounded-lg shadow-md text-center w-full md:w-1/3 min-w-[300px]">
          <h2 class="text-2xl text-left mb-2 p-6 font-bold text-gray-800">Welcome to the Kiosk</h2>
          <div class="flex justify-center">
              <PhoneInput 
                data-test="phone-input" 
                @phoneSubmitted="fetchMeetingInfo" 
                @phoneCleared="handlePhoneCleared" 
              />
          </div>
        </div>

        <!-- Second Card -->
        <div class="bg-white p-6 rounded-lg shadow-md text-center w-full flex-grow md:w-1/3 min-w-[300px]">
          <div class="flex justify-center">

            <h2 v-if="currentStep === 'input'" class="text-2xl font-bold text-gray-800 mb-4">Enter your phone number to find an appointment</h2>
            <MeetingInfo v-if="currentStep === 'info' && meeting" :meeting="meeting" data-test="meeting-info" />
            <ErrorMessage v-if="currentStep === 'error'" data-test="error-message" />
          </div>
        </div>

        <!-- Success Message Card -->
        <div v-if="showSuccessMessage" class="bg-green-100 p-6 rounded-lg shadow-md text-center w-full md:w-1/3 min-w-[300px] relative">
          <p class="text-lg font-bold text-green-800">Thank you for scheduling the appointment! Someone will come pick you up soon.</p>
          <button 
            @click="closeSuccessMessage" 
            class="absolute top-2 right-2 p-1 bg-transparent rounded-full text-gray-500 hover:text-gray-800 focus:outline-none" 
            data-test="close-success-button"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PhoneInput from '../components/PhoneInput.vue'
import MeetingInfo from '../components/MeetingInfo.vue'
import ErrorMessage from '../components/ErrorMessage.vue'
import { addError } from '../stores/errorsStore.js'
import mittBus from '../utils/mitt.js'
import type { Meeting } from '../types/meeting.js'

const currentStep = ref<'input' | 'info' | 'error'>('input')
const meeting = ref<Meeting | null>(null)
const isLoading = ref(false)
const showSuccessMessage = ref(false)

const fetchMeetingInfo = async (phoneNumber: string): Promise<void> => {
  try {
    mittBus.emit('loader-on')
    isLoading.value = true

    await new Promise((resolve) => setTimeout(resolve, 500))

    const response = await $fetch<{ meeting: Meeting, status: number, error: string }>(`/api/meeting?phone=${phoneNumber}`)
    if (response && response.meeting) {
      meeting.value = response.meeting
      currentStep.value = 'info'
      showSuccessMessage.value = true // Show success message
    } else {
      handleError(response.status, response.error)
      currentStep.value = 'error'
    }
  } catch (error: any) {
    handleError(error.response?.status, error.message)
    currentStep.value = 'error'
  } finally {
    mittBus.emit('loader-off')
    isLoading.value = false
  }
}

const handlePhoneCleared = (): void => {
  currentStep.value = 'input'
  showSuccessMessage.value = false // Hide success message when phone number is cleared
}

const handleError = (status: number, message: string): void => {
  let header = 'Error'
  let content = message || 'An unknown error occurred. Please try again.'

  switch (status) {
    case 404:
      header = 'Not Found'
      content = 'The meeting could not be found. Please check the phone number and try again.'
      break
    case 500:
      header = 'Server Error'
      content = 'A server error occurred. Please try again later.'
      break
    case 403:
      header = 'Forbidden'
      content = 'You do not have permission to access this resource.'
      break
    case 400:
      header = 'Bad Request'
      content = 'The request was invalid. Please enter a valid phone number.'
      break
    default:
      break
  }

  addError({
    header,
    content,
    btnText: 'Ok',
  })
}

const closeSuccessMessage = (): void => {
  showSuccessMessage.value = false
}
</script>

