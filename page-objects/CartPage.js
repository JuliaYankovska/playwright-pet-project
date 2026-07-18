class CartPage {
  constructor(page) {
    this.page = page;
    this.cartTable = page.locator('#cart_info_table');
    this.cartRows = page.locator('#cart_info_table tbody tr');
    this.checkoutButton = page.getByRole("link", { name: "Proceed To Checkout" });
    this.emptyCartMessage = page.getByText('Cart is empty! Click here to buy products.');
    this.registerLoginPrompt = page.getByText('Register / Login');
  }

  deleteButtonForRow(index) {
    return this.cartRows.nth(index).locator('.cart_quantity_delete');
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async getCartItemsCount() {
    return this.cartRows.count();
  }

  async removeProductByIndex(index) {
    await this.deleteButtonForRow(index).click();
  }

  async removeFirstProduct() {
    await this.removeProductByIndex(0);
  }
}

module.exports = { CartPage };