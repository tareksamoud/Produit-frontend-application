# PROJECT SPEC

**Project Overview**
Purpose: Angular single-page app for product catalog management (search, list, add, edit, delete) and a contact/recommendation form, backed by a REST API on `http://localhost:8080`.
Target users: internal users or admins managing product inventory and submitting contact recommendations.
Business domain: basic product inventory/catalog management with a lightweight feedback/contact workflow.
Maturity level: MVP/prototype. Evidence: hardcoded API host, minimal validation, default CLI tests, missing CI and lint config.

**Architecture Overview**
Architectural style: client-side SPA with component + service layering (presentation components call services that call REST API).
Dependency graph (high level):
AppModule -> Components -> Services -> HttpClient -> REST API (HAL-style responses with `_links` and `_embedded`).
Runtime components:
Browser SPA bundle served as static assets.
External API service at `http://localhost:8080` serving products and contacts.
Deployment model: Angular CLI build output at `dist/angular-testing` (static assets). No Docker or infra files detected.
Environment separation: `src/environments/environment.ts` and `environment.prod.ts` only; no staging or per-env API configuration.

**Tech Stack**
Languages: TypeScript, HTML, CSS.
Frameworks: Angular 20 (core, router, forms, http), RxJS.
UI: Bootstrap 5 with jQuery scripts (global).
Build system: Angular CLI and @angular-devkit/build-angular.
Runtime: Browser (SPA). Node.js for tooling.
Testing: Karma + Jasmine for unit tests; Protractor for e2e.
Linting: ESLint + @angular-eslint (configured in `angular.json`, but `.eslintrc.json` missing).
Infrastructure dependencies: REST API on `http://localhost:8080` (not in this repo).
Databases: none in this repo (backend unknown).
Caching systems: none.
Messaging systems: none.

**Module Breakdown**
Module: AppModule (`src/app/app.module.ts`). Responsibility: composition root and DI wiring. Public interfaces: NgModule declarations and imports. Key classes: `AppModule`. Cross-module dependencies: Angular core modules, components, services. Code smells: services also use `providedIn: 'root'` but are listed in `providers`, which is redundant.
Module: AppRoutingModule (`src/app/app-routing.module.ts`). Responsibility: routes and navigation. Public interfaces: `RouterModule` config. Key classes: `AppRoutingModule`. Cross-module dependencies: component routes.
Component: AppComponent (`src/app/app.component.ts`). Responsibility: app shell and router outlet. Public interfaces: template. Cross-module dependencies: HeaderComponent, Router.
Component: HeaderComponent (`src/app/header/*`). Responsibility: navbar with navigation. Public interfaces: template with router links and Bootstrap dropdown. Cross-module dependencies: router directives, Bootstrap JS.
Component: ProduitComponent (`src/app/produit/*`). Responsibility: product search, list, paginate, delete, and navigate to edit. Public interfaces: template form and table. Key functions: `chercherParDesignation`, `onClickSupprimer`, `onClickModifier`. Cross-module dependencies: ProduitService, Router. Code smells: hard dependency on HAL response shape (`_embedded`, `_links`).
Component: NvProduitComponent (`src/app/nv-produit/*`). Responsibility: product creation. Public interfaces: template form. Key functions: `onAjoutProduit`. Cross-module dependencies: ProduitService. Code smells: no input validation for numeric fields; local `state` flag drives UI.
Component: ModifierComponent (`src/app/modifier/*`). Responsibility: edit product. Public interfaces: template form. Key functions: `onModifierProduit`. Cross-module dependencies: ProduitService, Router, ActivatedRoute. Code smells: decodes a full URL from route param and calls it directly (user-controlled URL surface).
Component: ContactComponent (`src/app/contact/*`). Responsibility: submit contact/recommendation. Public interfaces: form template. Key functions: `onSendClick`. Cross-module dependencies: ContactService. Code smells: use of `window.alert` and minimal validation.
Component: HomeComponent (`src/app/home/*`). Responsibility: local demo data and comments list. Public interfaces: template form. Cross-module dependencies: none.
Service: ProduitService (`src/app/services/produit.service.ts`). Responsibility: product CRUD/search over HTTP. Public interfaces: `getProduitsByDesignation`, `deleteProduit`, `saveProduit`, `alterProdut`, `getProduitUrl`. Cross-module dependencies: HttpClient, Produit model. Code smells: hardcoded host, stringly-typed URLs and HAL response parsing in components.
Service: ContactService (`src/app/services/contact.service.ts`). Responsibility: send contact data. Public interfaces: `addRessource`. Cross-module dependencies: HttpClient, Contact model. Code smells: hardcoded host, no error mapping.
Model: Produit (`src/app/models/produit.model.ts`). Responsibility: product DTO. Public interfaces: `id`, `designation`, `prix`, `quantite`. Code smells: no constructor, optionality not defined.
Model: Contact (`src/app/models/contact.model.ts`). Responsibility: contact DTO. Public interfaces: `id`, `firstname`, `lastname`, `email`, `description`.
Cyclic dependencies: none detected.

**Data Model**
Core entities: `Produit` (id, designation, prix, quantite), `Contact` (id, firstname, lastname, email, description).
Relationships: none declared client-side.
ORM usage: none (frontend only).
Migration tooling: none.
Schema risks: frontend assumes HAL-style responses with `_embedded` and `_links`, which tightly couples UI to backend representation.

**API Surface**
REST endpoints (inferred from service usage):
GET `/produits/search/chercherByDescriptionPage?motCle={mc}&page={page}&size={size}`.
POST `/produits`.
GET/PUT/DELETE product resources via HAL `_links.self.href` values.
POST `/contacts`.
Authentication/authorization: none implemented client-side.
Middleware/interceptors: none.
Validation: template required fields only on contact form; no numeric or bounds validation for products.
Error handling consistency: only `console.log` on errors; no user-facing error states.

**Configuration Management**
Environment variables: none.
Secrets handling: none.
Hardcoded configs: API host `http://localhost:8080` in both services.
Risk areas: environment-specific API endpoints cannot be configured at build/runtime.

**Security Analysis**
Auth model: none.
Input validation: minimal; no sanitization or constraints for numeric fields.
Injection risks: direct use of user-controlled URL decoded from route param in ModifierComponent allows arbitrary URL fetch/put if CORS permits.
Dependency vulnerabilities: legacy e2e tooling (Protractor) and deprecated Karma add exposure risk if security issues emerge in unmaintained packages.
Secrets exposure: none in repo.
Logging risks: only console logging, no redaction or structured logs.

**Testing Strategy**
Unit coverage: default CLI-generated `AppComponent` spec only. No tests for services or feature components.
Integration/e2e coverage: default Protractor spec only, asserts a default welcome message not present in current templates.
Mocking patterns: none (no HttpClientTestingModule usage).
Test gaps: CRUD flows, error states, pagination, and contact submission are untested.
Flaky test indicators: Protractor e2e depends on text that no longer exists in templates.

**Observability**
Logging: console logs in components only.
Metrics: none.
Tracing: none.
Error monitoring: none.
Health checks: none.

**CI/CD**
Pipeline structure: no CI config detected.
Quality gates: none.
Deployment automation: none.
Rollback strategy: not defined.

**Technical Debt & Structural Risks**
Hardcoded API base URL and lack of env configuration will block multi-env deployments.
Direct coupling to HAL response shape leaks backend representation into UI and reduces API flexibility.
Bootstrap 3-era markup and glyphicons are used with Bootstrap 5 dependency, breaking UI semantics.
jQuery and global scripts conflict with Angular patterns and complicate future upgrades.
Route param contains a full base64 URL, enabling user-controlled HTTP targets.
Deprecated/legacy test tooling (Protractor, Karma deprecation) increases maintenance risk.
Architecture decisions to reconsider entirely:
Use of URL-in-route to drive data access (replace with ID-based routing and a typed API client).
Reliance on jQuery/Bootstrap JS in an Angular app (replace with Angular-native UI or Bootstrap 5 without jQuery).
Hardcoded service hosts (replace with environment-based or runtime-configured API base).

