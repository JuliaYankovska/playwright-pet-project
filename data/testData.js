require('dotenv').config();

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

module.exports = { invalidUser, validUser, validEmailWrongPassword };