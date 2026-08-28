const { test, expect } = require('../../api/fixtures');

test.describe('Products API', () => {
  test('GET productsList returns 200 and product array', async ({ apiClient }) => {
    const response = await apiClient.getProductsList();
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.products)).toBeTruthy();
    expect(body.products.length).toBeGreaterThan(0);
  });

  test('POST productsList (wrong method) returns 405', async ({ request }) => {
    const response = await request.post('/api/productsList');
    const body = await response.json();

    expect(body.responseCode).toBe(405);
  });

  test('GET brandsList returns list of brands', async ({ apiClient }) => {
    const response = await apiClient.getBrandsList();
    const body = await response.json();

    expect(body.responseCode).toBe(200);
    expect(body.brands.length).toBeGreaterThan(0);
  });
});

test.describe('Products API - data validation', () => {
  test('every product has valid price format', async ({ apiClient }) => {
    const response = await apiClient.getProductsList();
    const { products } = await response.json();

    for (const product of products) {
      expect(product.price, `Product id ${product.id} has invalid price: "${product.price}"`).toMatch(/^Rs\.\s?\d+$/);
    }
  });

  test('all product IDs are unique', async ({ apiClient }) => {
    const response = await apiClient.getProductsList();
    const { products } = await response.json();

    const ids = products.map((p) => p.id);
    const uniqueIds = new Set(ids);

    expect(uniqueIds.size).toBe(ids.length);
  });

  test('every product has name and brand populated', async ({ apiClient }) => {
    const response = await apiClient.getProductsList();
    const { products } = await response.json();

    for (const product of products) {
      expect(product.name.trim().length, `Product id ${product.id} has empty name`).toBeGreaterThan(0);
      expect(product.brand.trim().length, `Product id ${product.id} has empty brand`).toBeGreaterThan(0);
    }
  });
});