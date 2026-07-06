const { test, expect } = require('@playwright/test');
const { SignupPage } = require('../page-objects/SignupPage');
const { newUser, validUser } = require('../data/testData');

test('Register a new user successfully', async ({ page }) => {
  const signupPage = new SignupPage(page);
  await signupPage.goto();
  await signupPage.fillNameAndEmail(newUser.name, newUser.email);
  await signupPage.fillAccountDetails(newUser);
  await expect(signupPage.accountCreatedText).toBeVisible();
});

test('Shows error when registering with an email that already exists', async ({ page }) => {
  const signupPage = new SignupPage(page);
  await signupPage.goto();
  await signupPage.fillNameAndEmail(newUser.name, validUser.email);
  await expect(signupPage.emailExistsError).toBeVisible();
});

test('User can delete account', async ({ page }) => {
  const signupPage = new SignupPage(page);
  await signupPage.goto();
  await signupPage.fillNameAndEmail(newUser.name, newUser.email);
  await signupPage.fillAccountDetails(newUser);
  await signupPage.continueButton.click();
  await signupPage.deleteAccountLink.click();
  await expect(signupPage.accountDeletedText).toBeVisible();
});