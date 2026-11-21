# otakunation-site

Corporate website for Otakunation. This repository contains the brand and design
foundation (Milestone 1) and the corporate homepage (Milestone 2). The homepage is a
pre-launch presentation of the vision and the six planned ecosystem areas; no feature,
registration flow, article or recruitment process is live.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Astro 7 (static output) |
| Language | TypeScript, strict config |
| Styling | Tailwind CSS 4 via `@tailwindcss/vite`, CSS-first tokens |
| Icons | `@lucide/astro` |
| Type | Montserrat Variable, self-hosted (`@fontsource-variable/montserrat`) |

## Requirements

- Node.js `>=22.23.4` (enforced in `package.json` → `engines`)

## Commands

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run preview   # serve the production build locally
```

## Deployment

GitHub Pages is built and deployed by
[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) on every push to
`main` or `feature/homepage`, and can also be started manually with `workflow_dispatch`.

- **Live preview:** <https://itzderah.github.io/otakunation-site/>
- **Project base path:** GitHub serves project sites from `/otakunation-site/`. The
  workflow sets `DEPLOY_TARGET=github-pages`, which makes `astro.config.mjs` set the
  matching `site` and `base` values.
- **Local development:** without `DEPLOY_TARGET`, no `site` or `base` is configured, so
  `npm run dev` and `npm run preview` continue to serve the root URL.
- **Base-aware URLs:** `src/utils/paths.ts` provides `asset()` for files in `public/` and
  `withBase()` for routes. Use them in any new component instead of hard-coding `/…`.

Reproduce the deployed build locally:

```bash
DEPLOY_TARGET=github-pages \
GITHUB_REPOSITORY=itzDerah/otakunation-site \
GITHUB_REPOSITORY_OWNER=itzDerah \
npm run build
```

## Homepage

`src/pages/index.astro` composes the masthead, hero, vision, ecosystem, about, news,
opportunities, community CTA and footer. Anchors: `#top`, `#vision`, `#ecosystem`,
`#about`, `#news`, `#opportunities`, `#community`, `#contact`.

- All six ecosystem areas are marked **Planned**; the news and opportunities sections are
  honest empty states rather than invented content.
- Contact, registration, social and legal destinations are configured in
  `src/data/site.ts` and intentionally unset until official values exist.
- Layout and content decisions are documented in [`docs/homepage.md`](docs/homepage.md).

## Design system

Tokens, themes and component APIs are documented in
[`docs/design-system.md`](docs/design-system.md). A live internal reference is available at
`/styleguide` (marked `noindex`, intended for development review only).

- Dark is the default theme; light is fully supported. The choice persists in
  `localStorage` and is applied before first paint.
- Components live in `src/components/ui`, `src/components/nav`, `src/components/brand` and
  `src/components/home`.
- Semantic utilities (`bg-surface`, `text-text-muted`, `border-border`, …) map to CSS
  variables and must be used instead of raw palette values inside components.
- The homepage has been verified at 320, 360, 390, 768, 1024 and 1440px in both themes,
  with zero axe-core WCAG 2.1/2.2 A/AA violations.

## Status

- **Homepage implemented on `feature/homepage`.** Pending review; `main` still contains
  only the Milestone 1 foundation.
- **Brand artwork in place.** The official crest was cropped from the supplied dark and
  light lockups and renders in the masthead, homepage and favicons. The compact masthead
  arrangement awaits brand approval; the supplied stacked lockup has not been altered.
- **Palette pending confirmation.** Hex values were sampled from the supplied references.
- **Vector masters pending.** The supplied artwork is raster (JPEG), so an SVG version is
  still needed for large-format use.
- **Pre-launch content.** No production domain, contact address, social account,
  registration URL, legal page, news item or recruitment process is configured.
- **Deployed to GitHub Pages.** The public preview runs at
  `https://itzderah.github.io/otakunation-site/`. The repository is public so Pages can
  build it; `main` still contains only the Milestone 1 foundation.
- **Production exclusion.** `/styleguide` is `noindex`, disallowed in `robots.txt` and
  unlinked; remove or gate it before launch.
