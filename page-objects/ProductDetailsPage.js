class ProductDetailsPage {
  constructor(page) {
    this.page = page;

    this.productName = page.locator('.product-information h2');
    this.categoryText = page.getByText(/Category:/);
    this.priceText = page.locator('.product-information span').filter({ hasText: 'Rs.' }).last();
    this.availabilityText = page.getByText(/Availability:/);
    this.conditionText = page.getByText(/Condition:/);
    this.brandText = page.getByText(/Brand:/);

    this.quantityInput = page.locator('#quantity');
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    this.viewCartLink = page.getByRole('link', { name: 'View Cart' });

    this.reviewNameInput = page.locator('#name');
    this.reviewEmailInput = page.locator('#email');
    this.reviewTextarea = page.locator('#review');
    this.submitReviewButton = page.locator('#button-review');
    this.reviewSuccessMessage = page.getByText('Thank you for your review.');
  }

  async goto(productId) {
    await this.page.goto(`/product_details/${productId}`);
  }

  async setQuantity(qty) {
    await this.quantityInput.fill(String(qty));
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async submitReview(name, email, review) {
    await this.reviewNameInput.fill(name);
    await this.reviewEmailInput.fill(email);
    await this.reviewTextarea.fill(review);
    await this.submitReviewButton.click();
  }
}

module.exports = { ProductDetailsPage };