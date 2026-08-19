class ProductsPage {
  constructor(page) {
    this.page = page;
    this.firstProductAddToCart = page.locator('a[data-product-id="1"]').first();
    this.addedModalTitle = page.getByText("Added!");
    this.continueShoppingButton = page.getByRole("button", {
      name: "Continue Shopping",
    });
    this.viewCartLink = page.getByRole("link", { name: "View Cart" });
    this.allProductsHeading = page.getByRole("heading", {
      name: "All Products",
    });
    this.productCards = page.locator(".product-image-wrapper");
    this.viewProductLinks = page.getByRole("link", { name: "View Product" });
    this.categoryPanel = page.locator("#accordian");
    this.brandsList = page.locator(".brands-name");
    this.categoryPageTitle = page.locator(".title.text-center");
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

  async viewProductByIndex(index) {
    const productCard = this.productCards.nth(index);
    await productCard.scrollIntoViewIfNeeded();
    await productCard.hover();
    await productCard.getByRole("link", { name: "View Product" }).click();
    await this.page.waitForURL(/product_details/);
  }

  async viewFirstProductViaLink() {
    await this.viewProductLinks.first().click();
    await this.page.waitForURL(/product_details/);
  }

  async clickCategory(mainCategory, categoryPath) {
    await this.page.locator(`a[href="#${mainCategory}"]`).click();
    const subCategoryLink = this.page.locator(
      `#${mainCategory} a[href="/category_products/${categoryPath}"]`
    );
    await subCategoryLink.waitFor({ state: "visible" });
    await subCategoryLink.click();

  }

  async clickBrand(brandName) {
    await this.brandsList
      .locator(`a[href="/brand_products/${brandName}"]`)
      .click();
  }
}

module.exports = { ProductsPage };