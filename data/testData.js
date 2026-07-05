require('dotenv').config();
const { faker } = require('@faker-js/faker');

const invalidUser = {
  email: 'wrong@example.com',
  password: 'wrongpassword123',
};

const validUser = {
  email: process.env.VALID_USER_EMAIL,
  password: process.env.VALID_USER_PASSWORD,
};

const validEmailWrongPassword = {
  email: process.env.VALID_USER_EMAIL,
  password: 'completelyWrongPassword999',
};

const newUser = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password({ length: 10 }),
  day: String(faker.number.int({ min: 1, max: 28 })),
  month: faker.date.month(),
  year: String(faker.number.int({ min: 1970, max: 2005 })),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  address: faker.location.streetAddress(),
  state: 'TX',
  city: 'Austin',
  zipcode: faker.location.zipCode('#####'),
  mobileNumber: faker.phone.number('##########'),
};

module.exports = { invalidUser, validUser, validEmailWrongPassword, newUser }