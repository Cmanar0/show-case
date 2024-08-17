<template>
  <div class="min-h-screen flex bg-gray-100 p-8" data-test="dashboard">
    <div class="min-w-full">

      <!-- Row of Tailwind buttons to simulate different errors -->
      <div class="flex bg-white p-6 rounded-lg shadow-md  justify-between gap-4 mb-4 flex-col md:flex-row" data-test="error-buttons">
        <h2 class="text-2xl flex font-bold text-gray-800">Simulate Responces:</h2>
        <span class="flex gap-2">
          <button @click="simulateError('error404')" class="bg-red-300 text-white px-4 py-2 rounded hover:bg-red-400" data-test="error-404">
            Simulate 404 Not Found
          </button>
          <button @click="simulateError('error500')" class="bg-yellow-200 text-white px-4 py-2 rounded hover:bg-yellow-400" data-test="error-500">
            Simulate 500 Server Error
          </button>
          <button @click="simulateError('error403')" class="bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-400" data-test="error-403">
            Simulate 403 Forbidden
          </button>
          <button @click="simulateError('error400')" class="bg-green-300 text-white px-4 py-2 rounded hover:bg-green-400" data-test="error-400">
            Simulate 400 Bad Request
          </button>
        </span>
      </div>

      <!-- Flex column on medium screens and smaller -->
      <div class="flex flex-col md:flex-row gap-4">
        <!-- First Card with min-width of 300px -->
        <div class="bg-white rounded-lg shadow-md text-center w-full md:w-1/3 min-w-[300px]">
          <h2 class="text-2xl text-left mb-2 p-6 font-bold text-gray-800">Welcome to the Kiosk</h2>
          <div class="flex justify-center">
              <PhoneInput @phoneSubmitted="fetchMeetingInfo" data-test="phone-input" />
          </div>
        </div>

        <!-- Second Card -->
        <div class="bg-white p-6 rounded-lg shadow-md text-center w-full flex-grow">
          <div class="flex justify-center">

            <h2 v-if="currentStep === 'input'" class="text-2xl font-bold text-gray-800 mb-4">Enter your phone number to find an appointment</h2>
            <MeetingInfo v-if="currentStep === 'info' && meeting" :meeting="meeting" data-test="meeting-info" />
            <ErrorMessage v-if="currentStep === 'error'" data-test="error-message" />
          </div>
        </div>
      </div>

      <!-- Third Card with min-width of 300px -->
      <IconLabelBtnPlayground data-test="icon-label-btn-playground" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PhoneInput from '../components/PhoneInput.vue'
import MeetingInfo from '../components/MeetingInfo.vue'
import ErrorMessage from '../components/ErrorMessage.vue'
import { addError } from '../stores/errorsStore' // Import addError function
import { addNotification } from '../stores/notificationStore' // Import addNotification function
import mittBus from '../utils/mitt.js' // Import mittBus for loader
import type { Meeting } from '../types/meeting.d'
import IconLabelBtnPlayground from '../components/IconLabelBtnPlayground.vue'

const currentStep = ref<'input' | 'info' | 'error'>('input')
const meeting = ref<Meeting | null>(null);
const isLoading = ref(false)

const fetchMeetingInfo = async (phoneNumber: string): Promise<void> => {
  try {
    mittBus.emit('loader-on')
    isLoading.value = true

    await new Promise((resolve) => setTimeout(resolve, 500))

const response = await $fetch<{ meeting: Meeting, status: number, error: string }>(`/api/meeting?phone=${phoneNumber}`);
    if (response && response.meeting) {
      meeting.value = response.meeting
      currentStep.value = 'info'

      addNotification({
        title: 'Meeting Found',
        message: `Your meeting is scheduled with ${response.meeting.person} at ${response.meeting.time} in ${response.meeting.location}. Please wait to be picked up.`,
        background: '#87efaa'
      })
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

const simulateError = (errorType: string): void => {
  fetchMeetingInfo(errorType)
}
</script>
