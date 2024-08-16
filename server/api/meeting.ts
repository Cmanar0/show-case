import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const phoneNumber = query.phone as string

  // Simulate different scenarios based on phone number
  if (phoneNumber === '123456789') {
    return {
      meeting: {
        date: '2024-08-14',
        time: '15:00',
        location: 'Room 101',
        person: 'John Doe',
      },
    }
  } else if (phoneNumber === 'error500') {
    event.res.statusCode = 500
    return { error: 'Server error occurred' }
  } else if (phoneNumber === 'error404') {
    event.res.statusCode = 404
    return { error: 'Meeting not found' }
  } else if (phoneNumber === 'error403') {
    event.res.statusCode = 403
    return { error: 'Forbidden: You do not have access to this resource' }
  } else if (phoneNumber.match(/^\d{9}$/)) {
    event.res.statusCode = 400
    return { error: 'Bad request: Invalid phone number' }
  } else {
    event.res.statusCode = 400
    return { error: 'Bad request: Phone number must be 9 digits' }
  }
})
