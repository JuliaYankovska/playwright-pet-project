const base = require('@playwright/test');
const { ApiClient } = require('./apiClient');
const { faker } = require('@faker-js/faker');

const test = base.test.extend({
  apiClient: async ({ request }, use) => {
    const apiClient = new ApiClient(request);
    await use(apiClient);
  },

  newUser: async ({}, use) => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    const userData = {
      name: faker.person.fullName(),
      email,
      password,
      title: 'Mr',
      birth_date: '1',
      birth_month: '1',
      birth_year: '1990',
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      company: faker.company.name(),
      address1: faker.location.streetAddress(),
      country: 'United States',
      zipcode: '12345',
      state: faker.location.state(),
      city: faker.location.city(),
      mobile_number: faker.phone.number(),
    };

    await use({ email, password, userData });
  },
});

module.exports = { test, expect: base.expect };