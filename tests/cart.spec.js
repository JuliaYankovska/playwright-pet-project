const { test, expect } = require('@playwright/test');
const { ProductsPage } = require('../page-objects/ProductsPage');
const { CartPage } = require('../page-objects/CartPage');

test.describe('Cart', () => {
  let productsPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    await productsPage.goto();
  });

  test('User can add a product to cart', async () => {
    await productsPage.addFirstProductToCart();
    await expect(productsPage.addedModalTitle).toBeVisible();
  });

  test('should see added product reflected in cart', async () => {
    await productsPage.addFirstProductToCart();
    await expect(productsPage.addedModalTitle).toBeVisible();
    await productsPage.viewCartLink.click();
    await expect(cartPage.cartTable).toBeVisible();
    expect(await cartPage.getCartItemsCount()).toBeGreaterThan(0);
  });

  test('should close modal and stay on products page after Continue Shopping', async () => {
    await productsPage.addFirstProductToCart();
    await expect(productsPage.addedModalTitle).toBeVisible();
    await productsPage.clickContinueShoppingButton();
    await expect(productsPage.addedModalTitle).not.toBeVisible();
    await expect(productsPage.allProductsHeading).toBeVisible();
  });

  test('should add exact number of products to cart', async () => {
    await productsPage.addFirstProductToCart();
    await productsPage.clickContinueShoppingButton();
    await productsPage.addProductToCartByIndex(1);
    await productsPage.viewCartLink.click();
    expect(await cartPage.getCartItemsCount()).toBe(2);
  });
});