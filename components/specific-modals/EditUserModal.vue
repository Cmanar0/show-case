<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Edit User</span>
      </v-card-title>
      <v-card-text>
        <form @submit.prevent="updateUser" class="space-y-4">
          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
            <input
              id="firstName"
              v-model="form.firstName"
              type="text"
              class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              id="lastName"
              v-model="form.lastName"
              type="text"
              class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </form>
      </v-card-text>
      <div class="p-6 gap-4 mt-6 flex justify-end">
        <button
          type="button"
          class="p-3 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-150"
          @click="closeModal"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="p-3 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-150"
          @click="updateUser"
        >
          Save
        </button>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { reactive, ref, watch, defineProps, defineEmits } from 'vue'
import apiService from '../services/api-request' // Update the path as necessary

const props = defineProps({
  user: Object
})

const emits = defineEmits(['close', 'update'])

const dialog = ref(false)
const initialForm = reactive({
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  password: ''
})
const form = reactive({
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  password: ''
})

watch(
  () => props.user,
  newUser => {
    if (newUser) {
      Object.assign(initialForm, newUser)
      Object.assign(form, newUser)
      form.password = ''
      dialog.value = true
    }
  },
  { immediate: true }
)

const closeModal = () => {
  dialog.value = false
  emits('close')
}

const updateUser = async () => {
  const updatedFields = Object.keys(form).reduce((acc, key) => {
    if (form[key] !== initialForm[key] && form[key] !== '') {
      acc[key] = form[key]
    }
    return acc
  }, {})
  try {
    const response = await apiService.patch(`/api/users/${props.user.id}`, updatedFields)
    const updatedUser = { ...props.user, ...updatedFields }
    
    // Update local storage
    localStorage.setItem('bv_user', JSON.stringify(updatedUser))

    emits('update', updatedFields)
    closeModal()
    window.location.reload()
  } catch (error) {
    console.error('Failed to update user:', error)
    // handle error notification
  }
}
</script>

<style scoped>
</style>
