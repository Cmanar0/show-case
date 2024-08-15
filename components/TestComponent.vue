<template>
  <div class="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
    <p class="text-2xl font-bold mb-4">Count: {{ count }}</p>
    <p class="text-xl text-gray-600 mb-4">Double Count: {{ doubleCount }}</p>
    <div class="space-x-4">
      <button @click="increment" class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700">
        Increment
      </button>
      <button @click="decrement" class="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-700">
        Decrement
      </button>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '~/stores/counter'

const counterStore = useCounterStore()
const { count, doubleCount } = storeToRefs(counterStore)

function increment() {
  counterStore.increment()
}

function decrement() {
  counterStore.decrement()
}
</script>
