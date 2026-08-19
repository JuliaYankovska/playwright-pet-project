const { test, expect } = require('@playwright/test');
const { ProductsPage } = require('../page-objects/ProductsPage');
const { ProductDetailsPage } = require('../page-objects/ProductDetailsPage');
const { CartPage } = require('../page-objects/CartPage');
const { reviewData } = require('../data/testData');

test.describe('Product details page', () => {
  test('Product added with custom quantity keeps exact quantity in cart', async ({ page }) => {
    const detailsPage = new ProductDetailsPage(page);
    const cartPage = new CartPage(page);

    await detailsPage.goto(1);
    await detailsPage.setQuantity(4);
    await detailsPage.addToCart();
    await detailsPage.viewCartLink.click();

    await expect(cartPage.cartTable).toBeVisible();
    expect(await cartPage.getQuantityByIndex(0)).toBe('4');
  });

  test('Submitting a product review shows a success message', async ({ page }) => {
    const detailsPage = new ProductDetailsPage(page);

    await detailsPage.goto(1);
    await detailsPage.submitReview(reviewData.name, reviewData.email, reviewData.review);

    await expect(detailsPage.reviewSuccessMessage).toBeVisible();
  });
});