class CartPage {
  constructor(page) {
    this.page = page;
    this.cartTable = page.locator('#cart_info_table');
    this.cartRows = page.locator('#cart_info_table tbody tr');
    this.checkoutButton = page.getByRole("link", { name: "Proceed To Checkout" });
    this.emptyCartMessage = page.getByText('Cart is empty! Click here to buy products.');
    this.registerLoginPrompt = page.getByText('Register / Login');
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async getCartItemsCount() {
    return this.cartRows.count();
  }
}

module.exports = { CartPage };