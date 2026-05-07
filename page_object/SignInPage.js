class SignInPage {
  constructor(page) {
    this.page = page;

    this.createAccountLink = page.getByRole('link', { name: /create an account/i });
    this.signInHeader = page.getByRole('heading', { name: /career opportunities: sign in/i });
  }

  async waitForLoaded() {
    await this.createAccountLink.waitFor({ state: 'visible' });
  }

  async clickCreateAccount() {
    await this.createAccountLink.click();
  }
}

module.exports = SignInPage;