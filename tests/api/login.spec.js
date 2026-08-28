const { test, expect } = require('../../api/fixtures');

test.describe('Login API', () => {
  test('valid credentials return 200 and success message', async ({ apiClient }) => {
    const response = await apiClient.verifyLogin(
      process.env.VALID_USER_EMAIL,
      process.env.VALID_USER_PASSWORD
    );

    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(200);
    expect(body.message).toBe('User exists!');
  });

  test('non-existent email returns 404', async ({ apiClient }) => {
    const response = await apiClient.verifyLogin('nonexistent_user_12345@test.com', 'anyPassword123');
    const body = await response.json();

    expect(body.responseCode).toBe(404);
    expect(body.message).toBe('User not found!');
  });

  test('correct email with wrong password returns 404', async ({ apiClient }) => {
    const response = await apiClient.verifyLogin(process.env.VALID_USER_EMAIL, 'wrongPassword999');
    const body = await response.json();

    expect(body.responseCode).toBe(404);
  });

  test('empty email returns 404', async ({ apiClient }) => {
    const response = await apiClient.verifyLogin('', 'somePassword');
    const body = await response.json();

    expect(body.responseCode).toBe(404);
  });

  test('empty password returns 404', async ({ apiClient }) => {
    const response = await apiClient.verifyLogin(process.env.VALID_USER_EMAIL, '');
    const body = await response.json();

    expect(body.responseCode).toBe(404);
  });
});