import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import MeetingInfo from '../components/MeetingInfo.vue'
import type { Meeting } from '../types/meeting'

describe('MeetingInfo.vue', () => {
  const mockMeeting: Meeting = {
    date: '2024-08-14',
    time: '15:00',
    location: 'Room 101',
    person: 'John Doe',
  }

  it('renders meeting details correctly', () => {
    const wrapper = mount(MeetingInfo, {
      props: {
        meeting: mockMeeting,
      },
    })

    expect(wrapper.find('[data-test="meeting-date"]').text()).toContain('Date: 2024-08-14')
    expect(wrapper.find('[data-test="meeting-time"]').text()).toContain('Time: 15:00')
    expect(wrapper.find('[data-test="meeting-location"]').text()).toContain('Location: Room 101')
    expect(wrapper.find('[data-test="meeting-person"]').text()).toContain('Person: John Doe')
  })
})
