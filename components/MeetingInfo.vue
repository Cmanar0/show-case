<template>
  <div class="flex flex-col align-start w-full">
    <h3 class="text-lg font-bold text-gray-800 mb-2">Your Meeting Information</h3>
    <p class="text-gray-600" data-test="meeting-date">Date: {{ props.meeting.date }}</p>
    <p class="text-gray-600" data-test="meeting-time">Time: {{ props.meeting.time }}</p>
    <p class="text-gray-600" data-test="meeting-location">Location: {{ props.meeting.location }}</p>
    <p class="text-gray-600" data-test="meeting-person">Person: {{ props.meeting.person }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Meeting } from '../types/meeting'

const props = defineProps<{ meeting: Meeting }>()
</script>
