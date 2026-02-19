# UPGRADE.md — Angular 21.1.x Security Upgrade Impact

Date: 2026-02-19
Source: current `package.json`

## Current State (Repo)
All Angular runtime packages are now at **21.1.5**, with CLI/build tooling at **21.1.4**.

| Dependency | Version |
| --- | --- |
| @angular/animations | 21.1.5 |
| @angular/common | 21.1.5 |
| @angular/compiler | 21.1.5 |
| @angular/core | 21.1.5 |
| @angular/forms | 21.1.5 |
| @angular/platform-browser | 21.1.5 |
| @angular/platform-browser-dynamic | 21.1.5 |
| @angular/router | 21.1.5 |
| @angular/compiler-cli | 21.1.5 |
| @angular/language-service | 21.1.5 |
| @angular/cli | 21.1.4 |
| @angular-devkit/build-angular | 21.1.4 |

## Does This Force Code Changes?
**No.** Based on the current codebase usage (components, template-driven forms, RouterModule, HttpClient), upgrading within Angular 21.1.x **does not require implementation changes**. The app uses baseline APIs that are stable across patch/minor versions.

## Alignment Requirement
Angular packages must remain version‑aligned. Current alignment is acceptable:
- Runtime packages: 21.1.5
- Tooling packages: 21.1.4

If you want strict alignment, you can update `@angular/cli` and `@angular-devkit/build-angular` to 21.1.5, but it is not mandatory if 21.1.4 is the latest tooling patch available.

## Risk Areas to Validate
- Routing and navigation rendering.
- Template‑driven forms in `nv-produit`, `modifier`, `contact`.
- HttpClient flows in `ProduitService` and `ContactService`.

## Tests to Run
- `ng build`
- `ng test`
- Manual smoke: `/produits`, `/ajouterProduit`, `/modifier/:id`, `/contact`

## Conclusion
With Angular 21.1.x in `package.json`, **no code changes are forced** by the upgrade. Validate with build/tests and smoke checks to confirm.

