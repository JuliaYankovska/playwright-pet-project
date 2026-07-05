const { test, expect } = require('@playwright/test');
const { SignupPage } = require('../page-objects/SignupPage');
const { newUser } = require('../data/testData');

test('Register a new user successfully', async ({ page }) => {
  const signupPage = new SignupPage(page);
  await signupPage.goto();
  await signupPage.fillNameAndEmail(newUser.name, newUser.email);
  await signupPage.fillAccountDetails(newUser);
  await expect(signupPage.accountCreatedText).toBeVisible();
});