class ProductsPage {
    constructor(page) {
        this.page = page;
        this.firstProductAddToCart = page.locator('a[data-product-id="1"]').first();
        this.addedModalTitle = page.getByText('Added!');
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
        this.viewCartLink = page.getByRole('link', { name: 'View Cart' });
    }

    async goto() {
        await this.page.goto('/products');
    }

    async addFirstProductToCart() {
        await this.firstProductAddToCart.click();
    }
}

module.exports = { ProductsPage };