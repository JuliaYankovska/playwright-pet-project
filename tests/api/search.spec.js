const { test, expect } = require('../../api/fixtures');

test.describe('Search API', () => {
  test('search results actually contain the search term', async ({ apiClient }) => {
    const response = await apiClient.searchProduct('dress');
    const body = await response.json();

    expect(body.responseCode).toBe(200);
    expect(body.products.length).toBeGreaterThan(0);

    for (const product of body.products) {
      const nameMatches = product.name.toLowerCase().includes('dress');
      const categoryMatches = product.category.category.toLowerCase().includes('dress');
      expect(nameMatches || categoryMatches).toBeTruthy();
    }
  });

  test('search with empty term does not crash API', async ({ apiClient }) => {
    const response = await apiClient.searchProduct('');
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(Array.isArray(body.products)).toBeTruthy();
  });

  test('search with special characters returns no results, not an error', async ({ apiClient }) => {
    const response = await apiClient.searchProduct('!!!@@@###');
    const body = await response.json();

    expect(body.responseCode).toBe(200);
    expect(body.products.length).toBe(0);
  });

  test('search results exist in the full product catalog', async ({ apiClient }) => {
    const fullListResponse = await apiClient.getProductsList();
    const fullListBody = await fullListResponse.json();
    const fullListIds = fullListBody.products.map((p) => p.id);

    const searchResponse = await apiClient.searchProduct('top');
    const searchBody = await searchResponse.json();

    for (const product of searchBody.products) {
      expect(fullListIds.includes(product.id)).toBeTruthy();
    }
  });
});