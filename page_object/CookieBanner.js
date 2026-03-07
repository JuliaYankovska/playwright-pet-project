class CookieBanner {
  constructor(page) {
    this.page = page;
    this.acceptButton = page.getByRole('button', { name: 'Accept' });
    
  }

  async acceptIfVisible() {
    if (await this.acceptButton.isVisible()) {
      await this.acceptButton.click();
    }
  }
}

module.exports = CookieBanner;