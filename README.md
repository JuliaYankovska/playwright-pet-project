# Playwright Pet Project — automationexercise.com

End-to-end test automation framework built with Playwright, covering both UI and API testing for [automationexercise.com](https://automationexercise.com).

## Tech Stack

- **Framework:** Playwright (JavaScript, CommonJS)
- **Design pattern:** Page Object Model
- **Test data:** Faker.js (dynamic data generation)
- **Environment config:** dotenv
- **CI/CD:** GitHub Actions

## Project Structure

├── api/
│ ├── apiClient.js # API client wrapper (GET/POST/DELETE methods)
│ ├── fixtures.js # Custom Playwright fixtures (apiClient, newUser)
│ └── validators.js # Reusable validation helpers
├── page-objects/ # Page Object classes for UI tests
├── fixtures/
│ └── blockAds.js # Ad-blocking fixture for stable UI runs
├── data/
│ └── testData.js # Shared static test data
├── tests/
│ ├── login.spec.js
│ ├── registration.spec.js
│ ├── cart.spec.js
│ ├── search.spec.js
│ ├── productDetail.spec.js
│ └── api/
│ ├── product.spec.js
│ ├── search.spec.js
│ ├── login.spec.js
│ └── account.spec.js
├── .github/workflows/
│ └── playwright.yml # CI pipeline
├── .env.example
└── playwright.config.js


## What's Covered

**UI tests:**
- Login (valid/invalid credentials)
- Registration (dynamic Faker-generated data)
- Cart (add/view products)
- Product search and category/brand navigation
- Product detail view

**API tests:**
- Products & brands list — status codes, data integrity (unique IDs, valid price format, required fields populated)
- Search — result relevance, edge cases (empty/special characters), cross-endpoint validation against full catalog
- Login — valid/invalid credentials, empty field handling
- Account — full lifecycle (create → verify → delete), duplicate email handling

## Setup

1. Install dependencies:
```bash
   npm install
```

2. Copy the environment file and add your test account credentials:
```bash
   cp .env.example .env
```

3. Run all tests:
```bash
   npx playwright test
```

4. Run UI or API tests separately:
```bash
   npx playwright test tests --testIgnore=tests/api/**
   npx playwright test tests/api
```

5. View the HTML report:
```bash
   npx playwright show-report
```

## Notes

- The automationexercise.com public API is stateless — no auth tokens or sessions; each request is self-contained.
- Faker.js generates unique test data on every run to avoid collisions (e.g. duplicate emails on account creation).