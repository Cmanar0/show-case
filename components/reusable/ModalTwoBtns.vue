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
          :class="`px-4 py-2 ${btnColor} text-white rounded-md hover:bg-opacity-75 focus:outline-none`"
        >
          {{ btnText }}
        </button>
        <button
          @click="closeModal"
          class="ml-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  header: String,
  content: String,
  btnText: String,
  btnColor: String
})

const emits = defineEmits(['confirm', 'close'])

const isVisible = ref(true)

const closeModal = () => {
  isVisible.value = false
  emits('close')
}

const confirmAction = () => {
  emits('confirm')
  closeModal()
}
</script>

