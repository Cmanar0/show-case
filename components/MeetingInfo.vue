<template>
  <div class="flex flex-col align-start w-full">
    <h3 class="text-lg font-bold text-gray-800 mb-2">Your Meeting Information</h3>
    <p class="text-gray-600">Date: {{ meeting.date }}</p>
    <p class="text-gray-600">Time: {{ meeting.time }}</p>
    <p class="text-gray-600">Location: {{ meeting.location }}</p>
    <p class="text-gray-600">Person: {{ meeting.person }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  meeting: Object
})
</script>
