const { test, expect } = require('@playwright/test');
const { SearchPage } = require('../page-objects/SearchPage');

test.describe('Product Search', () => {
  let searchPage;

  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
    await searchPage.goto();
  });

  test('should show matching products for a valid search term', async () => {
    await searchPage.searchFor('Dress');

    await expect(searchPage.searchedProductsHeading).toBeVisible();
    expect(await searchPage.getResultsCount()).toBeGreaterThan(0);
  });

  test('should show only products relevant to the search term', async () => {
    await searchPage.searchFor('Jeans');

    const productNames = await searchPage.getAllVisibleProductNames();
    for (const name of productNames) {
      expect(name.toLowerCase()).toContain('jean');
    }
  });

  test('should show no results for a term that does not match any product', async () => {
    await searchPage.searchFor('asdfghqwerty12345');

    await expect(searchPage.searchedProductsHeading).toBeVisible();
    expect(await searchPage.getResultsCount()).toBe(0);
  });

  test('should handle empty search input gracefully', async () => {
    await searchPage.searchFor('');

    await expect(searchPage.page).not.toHaveURL(/error/);
  });
});