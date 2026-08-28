# Playwright E2E & API Test Automation Framework

An End-to-End (UI) and REST API test automation framework built with Playwright and JavaScript for [automationexercise.com](https://automationexercise.com).

This project demonstrates production-ready test automation practices: Page Object Model (POM) design pattern, a custom API client wrapper, reusable Playwright fixtures, dynamic test data generation (Faker.js), ad-blocking route interceptors, and CI/CD integration via GitHub Actions.

##  Key Engineering Highlights

-  **Centralized API Client Wrapper:** Custom HTTP request wrapper (`api/apiClient.js`) encapsulating GET, POST, and DELETE methods, removing duplicated request-handling logic across API test specs.
-  **Custom Playwright Fixtures:** `apiClient` and `newUser` fixtures (`api/fixtures.js`) that provide a ready-to-use API client and auto-generate unique Faker.js test data per test run.
-  **UI Stability via Ad-Blocking:** Custom route interceptor (`fixtures/blockAds.js`) that aborts third-party ad network requests (`doubleclick`, `googlesyndication`, `google_vignette`, `adsbygoogle`) before they can interfere with UI element clickability.
-  **Decoupled Suite Execution:** Independent `tests/UI` and `tests/api` directories, allowing targeted execution of UI-only, API-only, or the full regression suite.
-  **Self-Cleaning Account Lifecycle Spec:** Automated flow (Create Account → Verify Login → Delete Account → Confirm Deletion) with mandatory post-test cleanup to keep test runs independent.
-  **API Data Integrity Validation:** Assertions beyond status codes — unique product IDs, price format validation, required-field completeness, and cross-endpoint checks between search results and the full product catalog.
-  **Automated CI/CD:** GitHub Actions workflow running the full suite on every push to `main`/`petProject` and every pull request to `main`, with HTML report artifacts retained for 30 days.

##  Tech Stack & Architecture

| Component | Technology | Description |
|---|---|---|
| Core Framework | Playwright | Web-first assertions, auto-waiting, parallel execution |
| Language | JavaScript (Node.js) | CommonJS module architecture |
| Design Pattern | Page Object Model (POM) | Separation of UI locators, page actions, and test assertions |
| Test Data | @faker-js/faker | Dynamic, collision-free test data generation per run |
| Environment Mgmt | dotenv | Environment variable handling for test credentials |
| CI/CD Pipeline | GitHub Actions | Automated test execution and report artifact upload |

##  Directory Structure

playwright-pet-project/
├── .github/workflows/
│ └── playwright.yml # CI pipeline configuration
├── api/
│ ├── apiClient.js # API client wrapper (GET/POST/DELETE)
│ ├── fixtures.js # Custom fixtures (apiClient, newUser)
│ └── validators.js # Reusable validation helpers
├── page-objects/ # Page Object classes for UI tests
├── fixtures/
│ └── blockAds.js # Route interceptor blocking ad networks
├── data/
│ └── testData.js # Shared static test data
├── tests/
│ ├── UI/
│ │ ├── login.spec.js
│ │ ├── registration.spec.js
│ │ ├── cart.spec.js
│ │ ├── search.spec.js
│ │ └── productDetail.spec.js
│ └── api/
│ ├── product.spec.js
│ ├── search.spec.js
│ ├── login.spec.js
│ └── account.spec.js
├── .env.example
├── package.json
└── playwright.config.js


## Test Coverage Overview

### UI Test Suite (`tests/UI`)
- **Authentication:** Valid/invalid login credentials, error message validation.
- **User Registration:** Dynamic registration flow using Faker-generated user profiles.
- **Shopping Cart:** Adding products, cart contents verification.
- **Product Catalog & Search:** Category navigation, brand filtering, keyword search.
- **Product Detail Verification:** Data accuracy validation (price, category, brand).

###  REST API Test Suite (`tests/api`)
- **Products & Brands Catalog:** Status codes, unique product IDs, price format validation, required fields populated.
- **Search API:** Result relevance, edge cases (empty strings, special characters), cross-endpoint validation against the full product catalog.
- **Auth API:** Valid login, invalid email (404), invalid password (404), empty field handling (404).
- **Account Lifecycle API:** Create → Verify Login → Delete → Confirm Deletion, duplicate email collision handling.

##  Getting Started

### Prerequisites
- Node.js: v18.0.0 or higher
- npm: v9.0.0 or higher

### Installation & Setup

```bash
git clone https://github.com/JuliaYankovska/playwright-pet-project.git
cd playwright-pet-project
npm install
npx playwright install --with-deps
cp .env.example .env
```

##  Test Execution Commands

| Command | Action |
|---|---|
| `npx playwright test` | Run all UI and API tests headlessly |
| `npx playwright test tests/UI` | Run UI tests only |
| `npx playwright test tests/api` | Run API tests only |
| `npx playwright test --headed` | Run tests in headed browser mode |
| `npx playwright test --debug` | Open Playwright Inspector for step-by-step debugging |
| `npx playwright show-report` | Open the interactive HTML test report |

##  CI/CD & Reporting

This project uses GitHub Actions to run the full test suite automatically on every push to `main`/`petProject` and on pull requests to `main`.

- **CI Workflow:** `.github/workflows/playwright.yml`
- **Reporting:** HTML test report artifacts are uploaded and retained for 30 days, even on failed runs.

##  Technical Notes & Architecture Decisions

- **Stateless API vs. Cookie-Based UI Sessions:** The automationexercise.com public API is stateless — each request is self-contained, with no auth tokens or sessions. UI authentication, in contrast, sets a server-side session cookie managed through Playwright's browser context.
- **Ad-Blocking Route Interception:** To prevent third-party ad requests from breaking UI element clickability, a custom route interceptor (`fixtures/blockAds.js`) aborts requests matching `doubleclick`, `googlesyndication`, `google_vignette`, and `adsbygoogle` before they load.
- **Collision-Free Dynamic Data:** Account-related specs use `@faker-js/faker` to generate unique emails and credentials per run, avoiding data collisions during test execution.