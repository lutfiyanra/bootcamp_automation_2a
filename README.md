# QA Automation — Playwright + TypeScript

End-to-end test suite for web applications built with [Playwright](https://playwright.dev/) and TypeScript, following the **Page Object Model (POM)** design pattern.

---

## Playwright Architecture

```
QA-PW-TS/
├── pages/                  # Page Object Model classes
│   └── LoginPage.ts        # Locators + actions for the login page
├── tests/                  # Test spec files
│   ├── login.spec.ts       # Login scenarios (valid & invalid)
│   └── test-1.spec.ts      # Standalone login smoke test
├── playwright.config.ts    # Global Playwright configuration
└── package.json
```

### Design Principles

| Layer | Responsibility |
|---|---|
| **Page Objects** (`pages/`) | Encapsulate locators and user-facing actions. No assertions live here. |
| **Test Specs** (`tests/`) | Import page objects, orchestrate flows, and assert outcomes. |
| **Config** (`playwright.config.ts`) | Browser projects, base URL, reporters, retries, and trace settings. |

### Browser Coverage

Tests run in parallel across three browser engines out of the box:

- **Chromium** (Desktop Chrome)
- **Firefox**
- **WebKit** (Desktop Safari)

### Reporting

HTML reports are generated after every run:

```bash
npx playwright test
npx playwright show-report
```

---

## Current Development

### Login Page — `https://emra.chat/login`

| Test | Scenario | Status |
|---|---|---|
| Scenario 1 | Valid login with correct credentials | Passing |
| Scenario 2 | Invalid login with incorrect credentials | Passing |

#### `pages/LoginPage.ts`

Exposes the following interface:

```ts
loginPage.goto()                    // navigate to the login page
loginPage.login(email, password)    // fill credentials and submit
loginPage.successMessage            // locator for success toast
loginPage.errorMessage              // locator for error message
```

#### `tests/login.spec.ts`

```
Login Page
  ✓ Scenario 1: Valid login with correct credentials
  ✓ Scenario 2: Invalid login with incorrect credentials
```

Run login tests only:

```bash
npx playwright test tests/login.spec.ts
```

---

## Future Development

- **Additional page objects** — Dashboard, Profile, Settings pages
- **Authentication state reuse** — Save logged-in state with `storageState` to skip login in downstream tests
- **Data-driven testing** — Drive test cases from external JSON/CSV fixtures
- **API testing layer** — Add Playwright API request context for backend assertions alongside UI tests
- **Visual regression** — Integrate screenshot comparison using `expect(page).toHaveScreenshot()`
- **CI/CD integration** — GitHub Actions workflow to run tests on every pull request with automatic HTML report upload
- **Environment config** — `.env` support with `dotenv` for staging vs. production base URLs
- **Allure reporting** — Richer test reports with history, trends, and step-level details
- **Mobile viewports** — Enable Pixel 5 and iPhone 12 device profiles in `playwright.config.ts`

---

## Getting Started

```bash
# Install dependencies
npm install

# Install browsers
npx playwright install

# Run all tests
npx playwright test

# Run a specific file
npx playwright test tests/login.spec.ts

# Run headed (visible browser)
npx playwright test --headed

# Open last HTML report
npx playwright show-report
```
