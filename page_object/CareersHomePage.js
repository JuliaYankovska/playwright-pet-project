class CareersHomePage {
    constructor(page) {
        this.page = page;
        this.exploreJobsButton = page.getByRole('link', { name: 'Explore jobs'});
    }

    async clickExploreJobsButton() {
        await this.exploreJobsButton.click();
    }
}
module.exports = CareersHomePage;