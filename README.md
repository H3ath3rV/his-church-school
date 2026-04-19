# His Church School Website

React + Vite marketing site for His Church School, prepared for designer handoff with a single generated static export in `docs/`.

## Start here

- Run `pnpm install` once on a new machine to restore local dependencies.
- Edit the website in `client/src/` and `client/public/`.
- Use `pnpm dev` while editing photos or content so a browser refresh picks up the latest source assets immediately.
- Rebuild the handoff site with `pnpm build`.
- Review the final static export with `pnpm preview`.

## Project structure

- `client/src/`: React app source, routes, shared content, and layout code.
- `client/src/content/`: Shared navigation, contact details, and reusable site content.
- `client/public/photos/`: Page photography and staff imagery.
- `client/public/maps/`: Contact page map base image and overlay pin.
- `client/public/branding/`: Brand-specific export assets such as badges.
- `client/public/downloads/`: Downloadable policies and calendar files.
- `scripts/finalize-static-export.mjs`: Adds route entry files to the generated static build.
- `docs/`: Generated handoff output for static hosting. Recreated by `pnpm build`.

## Scripts

- `pnpm dev`: Start the Vite development server.
- `pnpm check`: Run TypeScript checks for the app and Vite config.
- `pnpm build`: Build the static site directly into `docs/`.
- `pnpm preview`: Preview the generated `docs/` build locally.

## Handover notes

- Treat `client/src/` and `client/public/` as the editable source of truth.
- `pnpm dev` is the best option for iterative content/photo editing because it serves directly from the source files.
- Treat `docs/` as generated output that should be refreshed with `pnpm build` after content changes.
- Route paths and static-export behavior are centralized in `client/src/lib/sitePaths.ts`.
- Public assets are grouped by purpose so designers can find files quickly without sorting through build leftovers.
