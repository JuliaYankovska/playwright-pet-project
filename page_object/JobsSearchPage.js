class JobsSearchPage {
  constructor(page) {
    this.page = page;
    this.searchJobsButton = page.getByRole("button", { name: "Search Jobs" });
    this.searchResultTitle = page.locator("h1.keyword-title");
    this.jobLinks = page.locator('td[headers="hdrTitle"] a.jobTitle-link');
  }

  async waitForLoaded() {
    await this.searchResultTitle.waitFor({ state: "visible" });
  }

  async clickSearchJobsButton() {
    await this.searchJobsButton.click();
  }

  async openFirstJob() {
    await this.jobLinks.first().click();
  }
}
module.exports = JobsSearchPage;
