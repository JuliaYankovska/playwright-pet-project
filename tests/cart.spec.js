const { test, expect } = require('@playwright/test');
const { ProductsPage } = require('../page-objects/ProductsPage');

test('User can add a product to cart', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.goto();
  await productsPage.addFirstProductToCart();
  await expect(productsPage.addedModalTitle).toBeVisible();
});