import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Dashboard from '~/components/Dashboard.vue'
import PhoneInput from '~/components/PhoneInput.vue'
import mittBus from '../utils/mitt.js'

vi.mock('../stores/errorsStore', () => ({
  addError: vi.fn(),
}))

vi.mock('../stores/notificationStore', () => ({
  addNotification: vi.fn(),
}))

vi.mock('../utils/mitt.js', () => ({
  default: {
    emit: vi.fn(),
  },
}))

describe('Dashboard.vue', () => {
  it('renders the welcome message correctly', () => {
    const wrapper = mount(Dashboard)
    expect(wrapper.find('[data-test="dashboard"]').text()).toContain('Welcome to the Kiosk')
  })

  it('renders PhoneInput component', () => {
    const wrapper = mount(Dashboard)
    const phoneInput = wrapper.find('[data-test="phone-input"]')
    expect(phoneInput.exists()).toBe(true)
  })

  it('emits loader-on and loader-off during fetchMeetingInfo', async () => {
    const wrapper = mount(Dashboard)

    // Trigger the fetchMeetingInfo function
    wrapper.vm.fetchMeetingInfo('123456789')

    // Check that the loader-on event was emitted
    expect(mittBus.emit).toHaveBeenCalledWith('loader-on')

    // Wait for the asynchronous operation to complete
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Check that the loader-off event was emitted
    expect(mittBus.emit).toHaveBeenCalledWith('loader-off')
  })

  it('triggers error simulation and checks if 404 error is handled', async () => {
    const wrapper = mount(Dashboard)
    const error404Button = wrapper.find('[data-test="error-404"]')

    await error404Button.trigger('click')

    expect(wrapper.text()).toContain('Not Found')
    expect(mittBus.emit).toHaveBeenCalledWith('loader-off')
  })

it('handles 500 error correctly', async () => {
  const wrapper = mount(Dashboard)
  const error500Button = wrapper.find('[data-test="error-500"]')

  await error500Button.trigger('click')

  expect(wrapper.text()).toContain('Server Error')
  expect(mittBus.emit).toHaveBeenCalledWith('loader-off')
})

it('handles 403 error correctly', async () => {
  const wrapper = mount(Dashboard)
  const error403Button = wrapper.find('[data-test="error-403"]')

  await error403Button.trigger('click')

  expect(wrapper.text()).toContain('Forbidden')
  expect(mittBus.emit).toHaveBeenCalledWith('loader-off')
})

it('handles 400 error correctly', async () => {
  const wrapper = mount(Dashboard)
  const error400Button = wrapper.find('[data-test="error-400"]')

  await error400Button.trigger('click')

  expect(wrapper.text()).toContain('Bad Request')
  expect(mittBus.emit).toHaveBeenCalledWith('loader-off')
})


})
