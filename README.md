# His Church School Website

Static marketing website for His Church School, built with React, Vite, and Tailwind CSS.

The editable source lives in `client/`, and the production-ready static export is generated into `docs/` for GitHub Pages or any other static host.

## Requirements

- Node.js 20+
- `pnpm` 10+

## Installation

```bash
pnpm install
```

## Local development

```bash
pnpm dev
```

This starts the Vite development server. Use it when updating copy, layouts, or imagery.

## Quality checks

```bash
pnpm check
```

Runs the TypeScript checks plus the image budget validation.

## Production build

```bash
pnpm build
```

This validates the image budgets, creates the static site in `docs/`, finalises the route entry files and metadata, and then validates the generated static HTML metadata.

## Preview the built site

```bash
pnpm preview
```

Use this after `pnpm build` to review the generated static output locally.

## Project structure

- `client/src/`: React routes, layout components, shared utilities, and page content.
- `client/src/content/`: Shared navigation, contact details, and reusable site content.
- `client/public/photos/`: Photography for pages, staff, and footer gallery strips.
- `client/public/maps/`: Contact page map imagery.
- `client/public/downloads/`: Policy documents and calendar download files.
- `client/src/content/routeMetadata.json`: shared source of truth for page metadata used by both the app runtime and the static export scripts.
- `scripts/check-image-budgets.mjs`: validates image file sizes and blocks oversized or legacy public photo assets.
- `scripts/finalize-static-export.mjs`: Post-build step for route HTML files, metadata, sitemap, and robots output.
- `scripts/validate-static-export.mjs`: validates the generated route HTML metadata after build.
- `docs/`: Generated deployment output. Do not edit by hand.

## Editable content

The most common content touchpoints are:

- page copy and section structure in `client/src/pages/`
- shared contact details and footer gallery content in `client/src/content/site.ts`
- navigation labels and section links in `client/src/content/navigation.ts`
- photos, downloads, and other public assets in `client/public/`

## Environment variables

Copy `.env.example` to `.env` if you need to override defaults.

- `VITE_SITE_URL`: canonical production URL used for SEO metadata. Defaults to `https://hcschool.co.za`
- `VITE_GA_MEASUREMENT_ID`: optional Google Analytics 4 measurement ID
- `VITE_ENQUIRY_FORM_ENDPOINT`: hosted form endpoint for all website enquiries and sponsorship submissions, for example `https://formspree.io/f/your-form-id`
- `VITE_ASSET_VERSION`: optional cache-busting version for public assets in local builds. In CI, set this to the deployment commit SHA so published assets get a stable version token.

## Deployment

This project is currently set up to deploy as a static site.

- `docs/` is the final output for GitHub Pages
- preview URL: `https://h3ath3rv.github.io/his-church-school/`
- canonical production domain: `https://hcschool.co.za/`
- any other static host can deploy the contents of `docs/`
- after content changes, always run `pnpm build` before publishing
- the static export keeps SEO metadata pointed at the production domain while using relative local links so the GitHub Pages project preview can load assets and pages correctly

## Handover notes

- Treat `client/src/` and `client/public/` as the source of truth.
- Treat `docs/` as generated output only.
- Website submissions use Formspree through `VITE_ENQUIRY_FORM_ENDPOINT`.
- For client handover, ask the school to create or approve the Formspree account, then replace the temporary endpoint with the school-owned endpoint in the hosting environment.
- After changing the endpoint, send one test contact enquiry and one test sponsorship enquiry from the deployed site and confirm the school office receives both.
- The contact and sponsorship flows both use the same live submission pattern and intentionally do not fall back to `mailto:`.
- Keep the public policy PDFs in `client/public/downloads/policies/` so families can open them easily on any device.
- Route paths and static-export behavior are centralised in `client/src/lib/sitePaths.ts`.
