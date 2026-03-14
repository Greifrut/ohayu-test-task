# Ohayu Test App

Demo project for a **United States eSIM country page** built with Next.js App Router.
The page reproduces a production-like marketing page and demonstrates:

- A dedicated home page for reviewers and route discovery
- Feature-slice UI architecture
- Different server-cache update patterns with `next/cache`
- Mocked API routes for data and cache-testing
- Unit, integration, and Playwright E2E tests
- CI checks for lint, tests, and revalidation flows

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Vitest + React Testing Library
- Playwright
- @next/bundle-analyzer
- pnpm

## Local development

### 1) Install dependencies

```bash
pnpm install
```

### 2) Start app

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Routes:

- `/`
- `/esim/united-states-us`

### 3) Lint

```bash
pnpm lint
```

### 4) Typecheck

```bash
pnpm typecheck
```

### 5) Unit + integration tests

```bash
pnpm test
```

### 6) E2E tests

```bash
pnpm test:e2e
```

This starts Next.js automatically via Playwright web server.

To validate the production server path locally:

```bash
pnpm build
PW_START_WEBSERVER=1 PW_USE_PROD_SERVER=1 pnpm test:e2e
```

### 7) Bundle analysis

```bash
pnpm analyze
```

Generated reports are saved in:

- `.next/analyze/client.html`
- `.next/analyze/edge.html`
- `.next/analyze/nodejs.html`

## Project structure

```text
src/
  app/
    page.tsx
    esim/united-states-us/page.tsx
    api/revalidate/route.ts
    robots.ts
    sitemap.ts
  features/home/
    ui/home-page.tsx
  features/esim-united-states/
    api/
      get-faqs.ts
      get-store.ts
      plan-details.ts
      __tests__/...
    model/
      provider-content.ts
      static-content.ts
      seo-content.ts
    ui/
      ... section components + slots + fallbacks
      __tests__/...
    util/
      ... mapping + formatting helpers
      __tests__/...
  shared/ui/
```

## Caching strategy and update frequencies

The page demonstrates mixed update frequencies with explicit cache tags and tags-based revalidation.

Constants for tags:

- [`src/features/esim-united-states/constant/cache-tags.ts`](/Users/arturbunko/Documents/ohayu/ohayu-test-app/src/features/esim-united-states/constant/cache-tags.ts)

Current strategy:

1. **Prices**
   - Source: mocked store data
   - Tag(s): `providerCatalog`, `prices`
   - Source file: [`src/features/esim-united-states/api/get-store.ts`](/Users/arturbunko/Documents/ohayu/ohayu-test-app/src/features/esim-united-states/api/get-store.ts)
   - Cache lifetime intent: refreshed on demand with `cacheTag` invalidation (`us-prices`)

2. **US plan details**
   - Source: mocked provider content + store mapping
   - Tag(s): `planDetails`, `providerCatalog`
   - Source file: [`src/features/esim-united-states/api/plan-details.ts`](/Users/arturbunko/Documents/ohayu/ohayu-test-app/src/features/esim-united-states/api/plan-details.ts)
   - Cache lifetime intent: same provider-driven cadence as prices (`us-plan-details`)

3. **US traveler FAQs**
   - Source: mock SEO content
   - Tag: `faqs`
   - Source file: [`src/features/esim-united-states/api/get-faqs.ts`](/Users/arturbunko/Documents/ohayu/ohayu-test-app/src/features/esim-united-states/api/get-faqs.ts)
   - Cache lifetime intent: request-driven (`us-faqs`), updated on revalidate calls

4. **Static page sections**
   - Rendered as mostly static section components and layout
   - Not cache-rotated dynamically beyond code changes/deployment

## Revalidate API

A dedicated endpoint is provided for cache refresh:

- Route: `/api/revalidate`
- File: [`src/app/api/revalidate/route.ts`](/Users/arturbunko/Documents/ohayu/ohayu-test-app/src/app/api/revalidate/route.ts)
- Method: `POST`
- Body:

```json
{
  "secret": "your-revalidate-secret",
  "tag": "us-prices"
}
```

`tag` must be one of the allowed values listed below.

Allowed tags:

- `us-provider-catalog`
- `us-prices`
- `us-plan-details`
- `us-faqs`

Revalidation requires `OHAYU_REVALIDATE_SECRET`. Copy [`.env.example`](/Users/arturbunko/Documents/ohayu/ohayu-test-app/.env.example)
to your local env setup and provide a non-default secret.

## Test strategy

### Unit tests

- Location: `src/features/esim-united-states/**/__tests__/*`
- Command: `pnpm test`

### E2E tests

- Location: `e2e/*.spec.ts`
- Files:
  - [`e2e/us-esim-page.spec.ts`](/Users/arturbunko/Documents/ohayu/ohayu-test-app/e2e/us-esim-page.spec.ts)
  - [`e2e/revalidate-cache.spec.ts`](/Users/arturbunko/Documents/ohayu/ohayu-test-app/e2e/revalidate-cache.spec.ts)
  - [`e2e/revalidate-api.spec.ts`](/Users/arturbunko/Documents/ohayu/ohayu-test-app/e2e/revalidate-api.spec.ts)

E2E coverage includes:

- page rendering
- plan selection + footer summary updates
- FAQ interaction
- tag-based cache update and reload verification

### Playwright report

HTML report output is generated under `playwright-report/` by Playwright config.

## CI

GitHub Actions workflow:

- [`.github/workflows/pr-checks.yml`](/Users/arturbunko/Documents/ohayu/ohayu-test-app/.github/workflows/pr-checks.yml)

It runs on:

- `pull_request` into `main`
- `push` to `main`

Jobs:

1. `lint`
2. `typecheck`
3. `build`
4. `unit-and-integration`
5. `e2e`

The E2E job runs against a production build via `next start`, not only `next dev`.

## Notes

- The project uses mocked responses in API modules with realistic value variation generated in
  `simulate-latency` + `fake-live-updates`.
- Revalidation behavior is still testable by comparing rendered section payloads before and after
  cache tag refresh:
  - `us-prices` updates the plans section.
  - `us-plan-details` updates the plan details section.
  - `us-faqs` updates the FAQ section.

## License

This repository is for technical demonstration/testing purposes.
