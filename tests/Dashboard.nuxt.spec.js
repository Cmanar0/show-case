import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Dashboard from '~/components/Dashboard.vue'
import PhoneInput from '~/components/PhoneInput.vue'
import MeetingInfo from '~/components/MeetingInfo.vue'
import { addError } from '../stores/errorsStore'
import mittBus from '../utils/mitt.js'
import { nextTick } from 'vue'
// Mock the functions
vi.mock('../stores/notificationStore', () => ({
  addNotification: vi.fn(),
}))

vi.mock('../stores/errorsStore', () => ({
  addError: vi.fn(),
}))

vi.mock('../utils/mitt.js', () => ({
  default: {
    emit: vi.fn(),
  },
}))

describe('Dashboard.vue', () => {
  it('renders the welcome message correctly', () => {
    const wrapper = mount(Dashboard)
    expect(wrapper.text()).toContain('Welcome to the Kiosk')
  })

  it('renders PhoneInput component', () => {
    const wrapper = mount(Dashboard)
    const phoneInput = wrapper.findComponent(PhoneInput)
    expect(phoneInput.exists()).toBe(true)
  })

  it('emits loader-on and loader-off during fetchMeetingInfo', async () => {
    const wrapper = mount(Dashboard)

    wrapper.vm.fetchMeetingInfo('123456789')

    expect(mittBus.emit).toHaveBeenCalledWith('loader-on')

    await new Promise((resolve) => setTimeout(resolve, 500))

    expect(mittBus.emit).toHaveBeenCalledWith('loader-off')
  })
})
