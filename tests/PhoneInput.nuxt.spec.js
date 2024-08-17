import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import PhoneInput from '~/components/PhoneInput.vue'

describe('PhoneInput.vue', () => {
  it('renders the input and submit button correctly', () => {
    const wrapper = mount(PhoneInput)
    expect(wrapper.find('[data-test="phone-input"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="submit-button"]').exists()).toBe(true)
  })

  it('shows an error message for invalid phone number', async () => {
    const wrapper = mount(PhoneInput)
    await wrapper.find('[data-test="phone-input"]').setValue('12345')
    await wrapper.find('[data-test="submit-button"]').trigger('submit.prevent')
    expect(wrapper.find('[data-test="error-message"]').text()).toContain('Please enter a valid 9-digit phone number')
  })

  it('emits phoneSubmitted event with valid phone number', async () => {
    const wrapper = mount(PhoneInput)
    await wrapper.find('[data-test="phone-input"]').setValue('123456789')
    await wrapper.find('[data-test="submit-button"]').trigger('submit.prevent')
    expect(wrapper.emitted('phoneSubmitted')).toBeTruthy()
    expect(wrapper.emitted('phoneSubmitted')[0]).toEqual(['123456789'])
  })

  it('clears the phone number input', async () => {
    const wrapper = mount(PhoneInput)
    await wrapper.find('[data-test="phone-input"]').setValue('123456789')
    await wrapper.find('[data-test="clear-button"]').trigger('click')
    expect(wrapper.find('[data-test="phone-input"]').element.value).toBe('')
  })
})
