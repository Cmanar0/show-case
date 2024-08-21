import { defineEventHandler, getQuery } from 'h3';

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const phoneNumber = query.phone as string;

  // Regular expression to match a phone number with a country code (e.g., +420123456789)
  const phonePattern = /^\+\d{2,3}\d{9}$/;

  // Validate the phone number
  if (!phonePattern.test(phoneNumber)) {
    event.res.statusCode = 400;
    return { error: 'Špatný požadavek: Telefonní číslo musí obsahovat platný kód země a 9 číslic.' };
  }

  // Simulate different scenarios based on the phone number (for testing purposes)
  if (phoneNumber === '+420123456789') {
    return {
      status: 200,
      meeting: {
        date: '2024-08-14',
        time: '15:00',
        location: 'Room 101',
        person: 'John Doe',
      },
    };
  } else if (phoneNumber === '+420error500') {
    event.res.statusCode = 500;
    return { error: 'Na serveru došlo k chybě' };
  } else if (phoneNumber === '+420error404') {
    event.res.statusCode = 404;
    return { error: 'Schůzka nebyla nalezena' };
  } else if (phoneNumber === '+420error403') {
    event.res.statusCode = 403;
    return { error: 'Zakázáno: Nemáte přístup k tomuto zdroji' };
  } else {
    event.res.statusCode = 400;
    return { error: 'Špatný požadavek: Telefonní číslo je neplatné' };
  }
});
