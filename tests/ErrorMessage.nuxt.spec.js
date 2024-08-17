import { mount } from '@vue/test-utils'
import ErrorMessage from '~/components/ErrorMessage.vue'
import { describe, it, expect } from 'vitest'

describe('ErrorMessage.vue', () => {
  it('renders error message correctly', () => {
    const wrapper = mount(ErrorMessage)
    const errorMessage = wrapper.find('[data-test="error-message"]')
    expect(errorMessage.text()).toContain("We couldn't find a meeting with the provided phone number. Please try again.")
  })
})
