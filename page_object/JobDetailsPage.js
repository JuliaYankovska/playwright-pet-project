class JobDetailsPage {
  constructor(page) {
    this.page = page;

    this.applyNowButton = page.getByRole("button", { name: "Apply now" }).first();
    this.applyDropdownMenu = page.locator(".social-apply.open ul.dropdown-menu");
    this.applyManualOption = page.locator("#applyOption-top-manual");
    this.applyWithLinkedIn = page.getByRole("menuitem", {name: "Start applying with LinkedIn",});
    this.createAlertButton = page.getByRole("button", { name: "Create Alert" });
  }

  async clickCreateAlertButton() {
    await this.createAlertButton.scrollIntoViewIfNeeded();
    await this.createAlertButton.click();
  }

  async openApplyDropdown() {
  await this.applyNowButton.waitFor({ state: 'visible' });
  await this.applyNowButton.click();
  await this.applyManualOption.waitFor({ state: 'visible' }); 
}

  async clickApplyManualOption() {
    await this.applyManualOption.click({ force: true });
  }

  async openApplyNowButton() {
    await this.applyNowButton.click();
  }
}
module.exports = JobDetailsPage;