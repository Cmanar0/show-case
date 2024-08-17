<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 overflow-y-auto flex items-center justify-center z-50"
  >
    <div class="fixed inset-0 bg-black opacity-50" @click="closeModal"></div>
    <div
      ref="modalContent"
      class="relative bg-white rounded-lg shadow-lg w-96 p-6"
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">{{ header }}</h2>
        <button
          @click="closeModal"
          class="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <div>
        <p>{{ content }}</p>
      </div>
      <div class="mt-6 flex justify-end">
        <button
          @click="confirmAction"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          {{ btnText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, onMounted, onUnmounted } from 'vue'
import state from '../stores/errorsStore' // Import the global state

const isVisible = ref(false)
const header = ref('')
const content = ref('')
const btnText = ref('')
const modalContent = ref(null)

const closeModal = () => {
  isVisible.value = false
  // Check for the next error after closing the current modal
  setTimeout(showNextError, 0)
}

const confirmAction = () => {
  closeModal()
}

const showModal = error => {
  header.value = error.header
  content.value = error.content
  btnText.value = error.btnText
  isVisible.value = true
}

const showNextError = () => {
  if (state.errors.length > 0) {
    const error = state.errors.shift() // Get and remove the first error from the array
    showModal(error)
  }
}

const closeOnOutsideClick = event => {
  if (modalContent.value && !modalContent.value.contains(event.target)) {
    closeModal()
  }
}

// Initial check on mount
onMounted(() => {
  showNextError()
  document.addEventListener('click', closeOnOutsideClick)
})

// Watch for changes in the global state
watchEffect(() => {
  if (!isVisible.value && state.errors.length > 0) {
    showNextError()
  }
})

onUnmounted(() => {
  document.removeEventListener('click', closeOnOutsideClick)
})
</script>
