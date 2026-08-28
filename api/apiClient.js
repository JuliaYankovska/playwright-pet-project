class ApiClient {
  constructor(request) {
    this.request = request;
  }

  async getProductsList() {
    return this.request.get('/api/productsList');
  }

  async getBrandsList() {
    return this.request.get('/api/brandsList');
  }

  async searchProduct(searchTerm) {
    return this.request.post('/api/searchProduct', {
      form: { search_product: searchTerm },
    });
  }

  async verifyLogin(email, password) {
    return this.request.post('/api/verifyLogin', {
      form: { email, password },
    });
  }

  async createAccount(userData) {
    return this.request.post('/api/createAccount', { form: userData });
  }

  async deleteAccount(email, password) {
    return this.request.delete('/api/deleteAccount', {
      form: { email, password },
    });
  }
}

module.exports = { ApiClient };