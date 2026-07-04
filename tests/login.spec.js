const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page-objects/LoginPage');
const { invalidUser, validUser, validEmailWrongPassword } = require('../data/testData');

test('Shows an error message when logging in with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(invalidUser.email, invalidUser.password);
  await expect(loginPage.loginErrorMessage).toBeVisible();
});

test('Successful login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(validUser.email, validUser.password);
  await expect(loginPage.logoutButton).toBeVisible();
});

test('Shows error when password is incorrect for existing email', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(validEmailWrongPassword.email, validEmailWrongPassword.password);
  await expect(loginPage.loginErrorMessage).toBeVisible();
});