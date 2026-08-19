const { test, expect } = require("@playwright/test");
const { ProductsPage } = require("../page-objects/ProductsPage");
const { ProductDetailsPage } = require("../page-objects/ProductDetailsPage");
const { CartPage } = require("../page-objects/CartPage");
const { reviewData } = require("../data/testData");
const { blockAds } = require('../fixtures/blockAds');

test.describe('Product details page', () => {
    let productsPage;
    let detailsPage;
    let cartPage;

    test.beforeEach(async ({ page }) => {
        await blockAds(page);
        productsPage = new ProductsPage(page);
        detailsPage = new ProductDetailsPage(page);
        cartPage = new CartPage(page);
    });

  test("Product added with custom quantity keeps exact quantity in cart", async () => {
    await detailsPage.goto(1);
    await detailsPage.setQuantity(4);
    await detailsPage.addToCart();
    await detailsPage.viewCartLink.click();

    await expect(cartPage.cartTable).toBeVisible();
    expect(await cartPage.getQuantityByIndex(0)).toBe("4");
  });

  test("Submitting a product review shows a success message", async () => {
    await detailsPage.goto(1);
    await detailsPage.submitReview(
      reviewData.name,
      reviewData.email,
      reviewData.review,
    );

    await expect(detailsPage.reviewSuccessMessage).toBeVisible();
  });

  test("View Product shows correct product details", async () => {
    await productsPage.goto();
    await productsPage.viewProductByIndex(0);

    await expect(detailsPage.categoryText).toBeVisible();
    await expect(detailsPage.availabilityText).toBeVisible();
    await expect(detailsPage.conditionText).toBeVisible();
    await expect(detailsPage.brandText).toBeVisible();
    await expect(detailsPage.addToCartButton).toBeVisible();
  });

  test("Category navigation shows correct category title", async ({ page }) => {
    await productsPage.goto();
    await productsPage.clickCategory("Women", "1");

    await expect(page).toHaveURL(/category_products\/1/);
    await expect(productsPage.categoryPageTitle).toContainText(/women\s*-\s*dress products/i);
  });

    test('Clicking a brand navigates to the brand page', async ({ page }) => {
        await productsPage.goto();
        await productsPage.clickBrand('Polo');

        await expect(page).toHaveURL(/brand_products\/Polo/);
        await expect(productsPage.categoryPageTitle).toContainText(/polo/i);
    });
});
