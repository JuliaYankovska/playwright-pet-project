class JobDetailsPage {
  constructor(page) {
    this.page = page;
    // this.applyNowButton = page.locator('button[aria-haspopup="true"]').first();
    this.applyNowButton = page.getByRole("button", { name: "Apply now" }).first();
    this.applyDropdownMenu = page.locator(".dropdown-menu.socialbutton");
    this.applyManualOption = page.locator("#applyOption-top-manual");
    this.applyWithLinkedIn = page.getByRole("menuitem", {name: "Start applying with LinkedIn",});
  }

  async openApplyDropdown() {
    await this.applyNowButton.click();
  }

async clickApplyManualOption() {
  await this.applyManualOption.waitFor({ state: "visible" });
  await this.applyManualOption.click();
}
}


module.exports = JobDetailsPage;
