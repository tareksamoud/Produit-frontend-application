# Sprint Plan (Stability-First)

Purpose: sequence changes from ISSUES_AND_UPDATES.md into low-risk, test-gated sprints that reduce breakage risk and provide rollback points.
Assumptions: 2-week sprints, one environment (dev) with a backend available at `http://localhost:8080`, and no existing CI. Adjust as needed.

## Sprint 0: Baseline Safety Net
Goal: add minimum safety checks before touching behavior.
Scope:
- Add lint configuration to enable `ng lint`.
- Add unit tests for `ProduitService` and `ContactService` using `HttpClientTestingModule`.
- Add smoke tests for navigation routes (`/produits`, `/ajouterProduit`, `/modifier/:id`, `/contact`).
- Add a CI job to run `npm ci`, `ng lint`, `ng test`, `ng build`.
Tasks:
- Create `.eslintrc.json` aligned with `@angular-eslint`.
- Add `*.spec.ts` for services.
- Add basic component specs for navigation smoke.
- Add CI config (GitHub Actions or existing pipeline format).
Definition of Done:
- `ng lint`, `ng test`, and `ng build` pass locally and in CI.
- New tests fail when endpoints are broken or components fail to render.
Risks:
- CI setup may require Node version alignment.
Testing:
- Unit tests for services.
- Smoke tests for routing.

## Sprint 1: Configuration and Error Handling
Goal: remove hardcoded host and normalize API error behavior.
Scope:
- Externalize API base URL into environment config.
- Add HttpClient interceptor for base URL and error mapping.
- Replace direct `console.log` with user-facing error states.
Tasks:
- Add `apiBaseUrl` to `environment.ts` and `environment.prod.ts`.
- Update services to use base URL from config.
- Add `HttpInterceptor` for error handling and a shared error model.
- Update components to show simple error banners.
Definition of Done:
- No hardcoded `http://localhost:8080` in services.
- API errors show consistent UI feedback.
- Tests updated for interceptor behavior.
Risks:
- Environment replacement in build must remain correct for production.
Testing:
- Unit tests for interceptor.
- Component tests for error display.

## Sprint 2: Routing and Data Contract Hardening
Goal: remove URL-in-route anti-pattern and reduce HAL coupling.
Scope:
- Replace base64 URL routing with ID-based routing.
- Create typed DTOs for search results and map HAL responses in service layer.
Tasks:
- Change `/modifier/:id` to use numeric ID.
- Add service method `getProduitById(id)` and update edit flow.
- Create `ProduitSearchResult` interface and map `_embedded.produits` in service.
- Update components to consume typed data instead of raw HAL.
Definition of Done:
- No route parameter contains a URL.
- Components do not access `_embedded` or `_links` directly.
Risks:
- Backend must support ID-based endpoints.
Testing:
- Service tests for mapping logic.
- E2E smoke for edit flow.

## Sprint 3: UI Consistency and Dependency Hygiene
Goal: align UI stack and remove jQuery dependency.
Scope:
- Remove jQuery scripts from `angular.json`.
- Update templates to Bootstrap 5 semantics or replace with Angular-native UI.
- Fix glyphicons usage.
Tasks:
- Replace navbar dropdown behavior with Bootstrap 5 or Angular solution.
- Update templates using `panel` and `glyphicon` to Bootstrap 5 equivalents.
- Validate layout on key screens.
Definition of Done:
- No jQuery scripts in build config.
- No Bootstrap 3-only classes in templates.
Risks:
- Visual regressions.
Testing:
- Manual UI checks on main routes.
- Screenshot comparisons if tooling is available.

## Sprint 4: Upgrade Low-Risk Dependencies
Goal: stay current within Angular v20 without behavior change.
Scope:
- Align Angular core packages to 20.2.x.
- Upgrade Bootstrap patch version.
- Update `@angular-eslint` minors.
Tasks:
- Run `ng update` for minor Angular upgrades.
- Update package.json and lockfile.
- Fix any lint rule changes.
Definition of Done:
- Build and tests pass.
- No runtime errors in main flows.
Risks:
- Minor API or compiler changes.
Testing:
- Full CI pipeline.
- Manual smoke on CRUD and contact flows.

## Sprint 5: Replace Deprecated E2E Tooling
Goal: remove Protractor and replace with supported e2e tests.
Scope:
- Introduce Playwright or Cypress.
- Port critical flows: list, search, add, edit, delete, contact.
Tasks:
- Add new e2e tooling and configs.
- Write minimal smoke e2e suite.
- Remove Protractor dependencies and configs.
Definition of Done:
- New e2e suite passes in CI.
- Protractor removed from `package.json` and `angular.json`.
Risks:
- Flaky tests if backend is unstable.
Testing:
- E2E suite with stable test data.

## Sprint 6: Optional Hardening
Goal: improve maintainability and future upgrades.
Scope:
- Add stricter TypeScript compiler options.
- Introduce API client layer and models.
- Document environment configuration.
Tasks:
- Enable `strict` options gradually.
- Add `ApiClient` service and DTOs.
- Update README to reflect current Angular CLI and workflows.
Definition of Done:
- Strict flags enabled without build failures.
- New API client used by services.
Risks:
- Type errors in legacy code.
Testing:
- Full CI pipeline.

## Release Guardrails
- Every sprint ends with a tagged build or release branch.
- No dependency upgrades without green tests and smoke validation.
- Rollback strategy: revert to previous build artifacts and tag.

