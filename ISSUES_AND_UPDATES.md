# ISSUES AND UPDATES

**A. Critical Issues**
No authentication or authorization for product CRUD; all operations are open in the UI.
API base URL is hardcoded to `http://localhost:8080`, preventing secure or multi-env deployments.
Modifier route accepts a base64-encoded full URL and directly performs GET/PUT, enabling user-controlled request targets (client-side SSRF-like behavior if CORS allows).
Input validation is minimal; product numeric fields accept free text and are not validated before POST/PUT.
Error handling is limited to `console.log`, with no user-facing error states or retries.

**B. Structural Problems**
UI markup uses Bootstrap 3-era classes and glyphicons while dependency is Bootstrap 5, leading to broken styles and JS behavior.
README references Angular CLI 8 while dependencies are Angular 20, indicating upgrade drift and outdated guidance.
ESLint builder is configured but `.eslintrc.json` is missing, so linting cannot run.
Services expose string URLs and components parse HAL `_embedded` and `_links` directly instead of using typed DTOs.
Template-driven forms lack centralized validation and reuse.

**C. Dependency Risks**
Latest versions are from npmjs.com or npm.io package pages as of 2026-02-19.

| Dependency | Current | Latest | Breaking Changes Summary | Risk | Upgrade Complexity |
| --- | --- | --- | --- | --- | --- |
| @angular/animations | 20.1.0 | 20.2.4 citeturn3search0 | Minor update within v20 | Low | Low |
| @angular/common | 20.1.0 | 20.2.4 citeturn4search0 | Minor update within v20 | Low | Low |
| @angular/compiler | 20.1.0 | 20.2.4 citeturn4search1 | Minor update within v20 | Low | Low |
| @angular/core | 20.1.0 | 20.2.4 citeturn5search0 | Minor update within v20 | Low | Low |
| @angular/forms | 20.1.0 | 20.2.4 citeturn4search2 | Minor update within v20 | Low | Low |
| @angular/platform-browser | 20.1.0 | 20.2.4 citeturn3search2 | Minor update within v20 | Low | Low |
| @angular/platform-browser-dynamic | 20.1.0 | 20.2.4 citeturn3search3 | Minor update within v20 | Low | Low |
| @angular/router | 20.1.0 | 20.2.4 citeturn3search1 | Minor update within v20 | Low | Low |
| bootstrap | 5.3.7 | 5.3.8 citeturn7search0 | Patch update | Low | Low |
| jquery | 3.7.1 | 3.7.1 citeturn7search3 | None | Low | Low |
| rxjs | 7.8.2 | 7.8.2 citeturn7search1 | None | Low | Low |
| tslib | 2.8.1 | 2.8.1 citeturn7search2 | None | Low | Low |
| zone.js | 0.15.1 | 0.15.0 citeturn17search1 | Source shows 0.15.0; repo uses 0.15.1 (mirror may lag) | Low | Low |
| @angular-devkit/build-angular | 20.1.0 | 20.2.2 citeturn6search0 | Minor update within v20 | Low | Low |
| @angular/cli | 20.1.0 | 20.2.2 citeturn5search3 | Minor update within v20 | Low | Low |
| @angular/compiler-cli | 20.1.0 | 20.2.4 citeturn5search1 | Minor update within v20 | Low | Low |
| @angular/language-service | 20.1.0 | 20.2.4 citeturn5search2 | Minor update within v20 | Low | Low |
| @angular-eslint/builder | ^20.1.1 | 20.2.0 citeturn6search1 | Minor update within v20 | Low | Low |
| @angular-eslint/eslint-plugin | ^20.1.1 | 20.0.0 citeturn8search0 | Source shows 20.0.0; repo uses 20.1.1 range | Medium | Medium |
| @angular-eslint/eslint-plugin-template | ^20.1.1 | 20.2.0 citeturn6search2 | Minor update within v20 | Low | Low |
| @angular-eslint/template-parser | ^20.1.1 | 20.2.0 citeturn6search3 | Minor update within v20 | Low | Low |
| angular-eslint | 20.1.1 | 21.2.0 citeturn0search5 | Major update, likely breaking alignment with Angular v20 | Medium | Medium |
| eslint | ^9.31.0 | 9.22.0 citeturn17search0 | Source shows 9.22.0; repo range is higher | Medium | Low |
| jasmine-core | 5.8.0 | 5.10.0 citeturn14search1 | Minor update | Low | Low |
| jasmine-spec-reporter | 7.0.0 | 7.0.0 citeturn14search2 | None | Low | Low |
| karma | 6.4.4 | 6.4.4 (deprecated) citeturn14search3 | Deprecated tooling | Medium | Medium |
| karma-chrome-launcher | 3.2.0 | 3.2.0 citeturn13search0 | None | Low | Low |
| karma-coverage-istanbul-reporter | 3.0.3 | 3.0.3 citeturn13search1 | None | Low | Low |
| karma-jasmine | 5.1.0 | 5.1.0 citeturn13search2 | None | Low | Low |
| karma-jasmine-html-reporter | 2.1.0 | 2.1.0 citeturn13search3 | None | Low | Low |
| protractor | 7.0.0 | 7.0.0 (unmaintained, last release 5 years ago) citeturn16search0 | Deprecated/unmaintained | High | High |
| ts-node | 10.9.2 | 10.9.2 citeturn20open0 | None | Low | Low |
| typescript | 5.8.3 | 5.8.3 citeturn15search0 | None | Low | Low |
| typescript-eslint | 8.34.1 | 8.42.0 citeturn15search1 | Minor update | Low | Low |
| @types/jasmine | 5.1.8 | 5.1.9 citeturn15search2 | Patch update | Low | Low |
| @types/jasminewd2 | 2.0.13 | 2.0.13 citeturn15search3 | None | Low | Low |
| @types/node | 24.0.14 | 24.3.1 citeturn14search0 | Patch/minor update | Low | Low |

**D. Required Refactors Before Upgrade**
Replace URL-in-route editing flow with ID-based routing and typed API calls.
Extract API base URL into environment config (or runtime config) and remove hardcoded host from services.
Remove jQuery usage and update templates to Bootstrap 5 semantics (or replace with Angular-native UI).
Add HttpClient interceptors for base URL, auth, and error handling before significant Angular upgrades.
Replace Protractor with a supported e2e framework (Playwright or Cypress) to remove deprecated tooling.

**E. Suggested Improvements**
Architectural: introduce a typed API client layer and HAL response mapping to avoid `_embedded` usage in components.
Code quality: enable strict TypeScript options, add lint config, and enforce formatting.
Testing: add service unit tests with `HttpClientTestingModule`, component tests for CRUD flows, and real smoke tests for routing.
DevEx: add CI pipeline for `npm ci`, `ng test`, `ng build`, and lint; add pre-commit checks.

**Dependency Upgrade Impact Analysis**
Dependency: Angular core stack (`@angular/core`, router, forms, compiler, platform-browser). Current usage surface: NgModule, Components, template-driven forms, RouterModule, HttpClient. APIs used: `@Component`, `@NgModule`, `RouterModule.forRoot`, `HttpClient`, template-driven `ngModel`. Deprecated APIs: none detected in code. Breaking change likelihood: low for 20.1 -> 20.2 minor. Migration effort: low. Regression risk areas: routing, forms, HttpClient error handling. Testing required: routing smoke tests, CRUD flows, form submissions.
Dependency: RxJS. Current usage surface: Observables from HttpClient and `subscribe` only. Deprecated APIs: none used. Breaking change likelihood: low. Migration effort: low. Regression risk areas: none significant. Testing required: API flow smoke tests.
Dependency: zone.js. Current usage surface: Angular change detection. Deprecated APIs: none in app code. Breaking change likelihood: low. Migration effort: low. Regression risk areas: async UI updates. Testing required: UI interaction smoke tests.
Dependency: Bootstrap + jQuery. Current usage surface: navbar dropdown, global scripts, Bootstrap 3-era classes. Deprecated APIs: Bootstrap 3 classes are not supported in Bootstrap 5. Breaking change likelihood: medium (UI/behavior). Migration effort: medium (template updates). Regression risk areas: navigation and dropdown behavior. Testing required: visual checks and navigation smoke tests.
Dependency: Angular CLI + build-angular. Current usage surface: `ng build`, `ng serve`, `ng test`. Deprecated APIs: none directly. Breaking change likelihood: low for minor. Migration effort: low. Regression risk areas: build options and budgets. Testing required: full build and test runs.
Dependency: ESLint + angular-eslint. Current usage surface: linting pipeline (configured in `angular.json` but missing config file). Deprecated APIs: not applicable. Breaking change likelihood: medium because angular-eslint major updates align with Angular major versions. Migration effort: medium. Regression risk areas: lint rule changes and CI gating. Testing required: lint runs.
Dependency: Karma + Jasmine. Current usage surface: unit test runner. Deprecated APIs: Karma is deprecated. citeturn14search3 Breaking change likelihood: medium if replaced. Migration effort: medium to high if switching to new runner. Regression risk areas: test stability and coverage. Testing required: full unit test suite.
Dependency: Protractor. Current usage surface: e2e tests (default). Deprecated APIs: Protractor is unmaintained. citeturn16search0 Breaking change likelihood: high if kept; ecosystem moving away. Migration effort: high. Regression risk areas: end-to-end coverage. Testing required: new e2e suite in Playwright/Cypress.
Dependency: TypeScript + typescript-eslint. Current usage surface: compilation and linting. Deprecated APIs: none detected. Breaking change likelihood: low. Migration effort: low. Regression risk areas: build and lint rules. Testing required: build and lint.

Risk matrix:

| Dependency | Risk Level | Breaking Scope | Estimated Effort | Notes |
| --- | --- | --- | --- | --- |
| Angular core stack | Low | Minor | Low | Align to 20.2.x |
| RxJS | Low | Patch/minor | Low | No operators used |
| zone.js | Low | Patch | Low | Verify async UI |
| Bootstrap + jQuery | Medium | UI/behavior | Medium | Bootstrap 3 markup on Bootstrap 5 |
| Angular CLI/build-angular | Low | Build config | Low | Minor updates |
| ESLint/angular-eslint | Medium | Lint rules | Medium | Missing config now |
| Karma/Jasmine | Medium | Test runner | Medium | Karma deprecated citeturn14search3 |
| Protractor | High | E2E stack | High | Unmaintained citeturn16search0 |
| TypeScript/typescript-eslint | Low | Build/lint | Low | Minor updates |

