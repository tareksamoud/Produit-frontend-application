# MIGRATION PLAN

**Phase 0 — Baseline Hardening**
Add `.eslintrc.json` and ensure `ng lint` runs in CI.
Add `HttpClientTestingModule` tests for ProduitService and ContactService.
Add smoke tests for core routes (`/produits`, `/ajouterProduit`, `/modifier/:id`, `/contact`).
Add a simple CI pipeline that runs `npm ci`, `ng test`, `ng build`.
Introduce a runtime API base config (environment file or JSON config loaded at startup).

**Phase 1 — Low-Risk Upgrades**
Upgrade Angular packages from 20.1.0 to 20.2.x as a single aligned set.
Upgrade Bootstrap 5.3.7 to 5.3.8 and verify styles.
Align @angular-eslint minor versions to match Angular 20.
Upgrade typescript-eslint to 8.42.0 and ensure lint still passes.

**Phase 2 — Structural Refactor**
Replace base64 URL routing with ID-based routes and fetch by ID only.
Create typed DTOs for product search results (avoid direct `_embedded` usage in components).
Add HttpClient interceptor for base URL, error mapping, and future auth headers.
Remove jQuery usage and update templates to Bootstrap 5 semantics or Angular-native UI components.

**Phase 3 — Major Version Upgrades**
Angular major upgrade (to v21+ when desired):
Preparation steps: ensure all Angular packages, CLI, and @angular-eslint are version-aligned; run `ng update` for Angular.
Code changes required: update any deprecated Angular APIs and adjust router/config if needed.
Test plan: run full unit suite, smoke tests, and build artifacts comparison.
Rollout strategy: canary build in staging, then production static deployment.
Rollback strategy: keep previous build artifacts and static host version tags.

E2E framework migration (replace Protractor):
Preparation steps: choose Playwright or Cypress; define a minimal set of critical user flows.
Code changes required: implement new e2e suite; remove Protractor config and dependencies.
Test plan: run e2e suite against dev/staging builds.
Rollout strategy: run both old and new e2e once, then remove Protractor.
Rollback strategy: keep Protractor config in a separate branch for short-term fallback.

**Phase 4 — Post-Migration Stabilization**
Monitor error logs and API failures in the browser console (until proper monitoring is added).
Add performance checks on large product lists (pagination and search behavior).
Run security scans (npm audit) and check dependency policies.

