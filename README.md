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

Runs the TypeScript checks for the app and Vite config.

## Production build

```bash
pnpm build
```

This creates the static site in `docs/` and then finalises the route entry files, metadata, `robots.txt`, and `sitemap.xml`.

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
- `scripts/finalize-static-export.mjs`: Post-build step for route HTML files, metadata, sitemap, and robots output.
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

## Deployment

This project is currently set up to deploy as a static site.

- `docs/` is the final output for GitHub Pages
- any other static host can deploy the contents of `docs/`
- after content changes, always run `pnpm build` before publishing

## Handover notes

- Treat `client/src/` and `client/public/` as the source of truth.
- Treat `docs/` as generated output only.
- The contact form uses a `mailto:` workflow and opens the visitor's email app with a pre-filled draft.
- Route paths and static-export behavior are centralised in `client/src/lib/sitePaths.ts`.
