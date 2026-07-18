class SearchPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.searchedProductsHeading = page.getByRole('heading', { name: 'Searched Products' });
    this.productCards = page.locator('.product-image-wrapper');
  }

  async goto() {
    await this.page.goto('/products');
  }

  async searchFor(term) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async getResultsCount() {
    return this.productCards.count();
  }

  productNameLocator(index) {
    return this.productCards.nth(index).locator('.productinfo p');
  }

  async getProductNameByIndex(index) {
    return (await this.productNameLocator(index).textContent()).trim();
  }

  async getAllVisibleProductNames() {
    const count = await this.getResultsCount();
    const names = [];
    for (let i = 0; i < count; i++) {
      names.push(await this.getProductNameByIndex(i));
    }
    return names;
  }
}

module.exports = { SearchPage };