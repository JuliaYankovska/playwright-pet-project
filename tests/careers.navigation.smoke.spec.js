const { test, expect } = require("@playwright/test");
const { generateUserData } = require("../test_data/UserData");

const CareersHomePage = require("../page_object/CareersHomePage");
const JobsSearchPage = require("../page_object/JobsSearchPage");
const JobDetailsPage = require("../page_object/JobDetailsPage");
const CookieBanner = require("../page_object/CookieBanner");
const ApplicationFormPage = require("../page_object/ApplicationFormPage");

let cookieBanner;
let careersHomePage;
let jobsSearchPage;
let jobDetailsPage;
let applicationFormPage;

test.describe("Careers job search smoke tests", () => {
  test.beforeEach(async ({ page }) => {
    cookieBanner = new CookieBanner(page);
    careersHomePage = new CareersHomePage(page);
    jobsSearchPage = new JobsSearchPage(page);
    jobDetailsPage = new JobDetailsPage(page);
    applicationFormPage = new ApplicationFormPage(page);

    await page.goto("/careers/");
    await cookieBanner.acceptIfVisible();
    await careersHomePage.clickExploreJobsButton();
    await jobsSearchPage.waitForLoaded();
  });

  test("User can open job search from careers page", async () => {
    await expect(jobsSearchPage.searchResultTitle).toBeVisible();
  });

  test("User can start job application from careers flow", async () => {
    await jobsSearchPage.openFirstJob();
    await jobDetailsPage.openApplyDropdown();

    await expect(jobDetailsPage.applyManualOption).toBeVisible();
    await expect(jobDetailsPage.applyWithLinkedIn).toBeVisible();
  });

  test("User can fill job application form", async ({ page }) => {
    const user = generateUserData();

    await jobsSearchPage.openFirstJob();
    await jobDetailsPage.openApplyDropdown();

    await expect(jobDetailsPage.applyManualOption).toBeVisible();

    await jobDetailsPage.clickApplyManualOption();

    await expect(applicationFormPage.email).toBeVisible();
  });
});
