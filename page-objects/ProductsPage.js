class ProductsPage {
  constructor(page) {
    this.page = page;
    this.firstProductAddToCart = page.locator('a[data-product-id="1"]').first();
    this.addedModalTitle = page.getByText("Added!");
    this.continueShoppingButton = page.getByRole("button", { name: "Continue Shopping" });
    this.viewCartLink = page.getByRole("link", { name: "View Cart" });
    this.allProductsHeading = page.getByRole("heading", { name: "All Products" });
    this.productCards = page.locator('.product-image-wrapper'); // додано
  }

  async goto() {
    await this.page.goto("/products");
  }

  async addFirstProductToCart() {
    await this.firstProductAddToCart.click();
  }

  async clickContinueShoppingButton() {
    await this.continueShoppingButton.click();
  }

  async addProductToCartByIndex(index) {
    const productCard = this.productCards.nth(index);
    await productCard.scrollIntoViewIfNeeded();
    await productCard.hover();
    await productCard.getByText("Add to cart").first().click();
  }

  async isLoaded() {
  return this.allProductsHeading.isVisible();
}
}

module.exports = { ProductsPage };