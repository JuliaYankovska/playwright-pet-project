const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page-objects/LoginPage');
const { invalidUser } = require('../data/testData');

test('Shows an error message when logging in with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(invalidUser.email, invalidUser.password);
  await expect(loginPage.loginErrorMessage).toBeVisible();
});