const { test, expect } = require('../../api/fixtures');

test.describe('Account API - full lifecycle', () => {
  test('create account, verify it exists, then delete it', async ({ apiClient, newUser }) => {
    const { email, password, userData } = newUser;

    const createResponse = await apiClient.createAccount(userData);
    const createBody = await createResponse.json();
    expect(createResponse.status()).toBe(200);
    expect(createBody.responseCode).toBe(201);

    const loginResponse = await apiClient.verifyLogin(email, password);
    const loginBody = await loginResponse.json();
    expect(loginBody.responseCode).toBe(200);
    expect(loginBody.message).toBe('User exists!');

    const deleteResponse = await apiClient.deleteAccount(email, password);
    const deleteBody = await deleteResponse.json();
    expect(deleteBody.responseCode).toBe(200);

    const verifyDeletedResponse = await apiClient.verifyLogin(email, password);
    const verifyDeletedBody = await verifyDeletedResponse.json();
    expect(verifyDeletedBody.responseCode).toBe(404);
  });

  test('creating account with existing email returns error', async ({ apiClient, newUser }) => {
    const { email, password, userData } = newUser;
    const firstResponse = await apiClient.createAccount(userData);
    const firstBody = await firstResponse.json();
    expect(firstBody.responseCode).toBe(201);

    const secondResponse = await apiClient.createAccount(userData);
    const secondBody = await secondResponse.json();
    expect(secondBody.responseCode).toBe(400);
    expect(secondBody.message).toBe('Email already exists!');

    await apiClient.deleteAccount(email, password);
  });
});