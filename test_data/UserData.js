const { faker } = require("@faker-js/faker");

function generateUserData() {
  const email = faker.internet.email({ provider: "gmail.com" });
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const phone = `512${faker.string.numeric(7)}`;

  const password =
    faker.string.alpha({ length: 4, casing: "lower" }) +
    faker.string.alpha({ length: 2, casing: "upper" }) +
    faker.string.numeric(2) +
    "!";

  return {
    email,
    firstName,
    lastName,
    phone,
    password
  };
}

module.exports = { generateUserData };