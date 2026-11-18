# otakunation-site

Corporate website for Otakunation. This repository currently contains the brand and
design foundation (Milestone 1) — no page sections or marketing content yet.

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

## Design system

Tokens, themes and component APIs are documented in
[`docs/design-system.md`](docs/design-system.md). A live internal reference is available at
`/styleguide` (marked `noindex`, intended for development review only).

- Dark is the default theme; light is fully supported. The choice persists in
  `localStorage` and is applied before first paint.
- Components live in `src/components/ui`, `src/components/nav` and `src/components/brand`.
- Semantic utilities (`bg-surface`, `text-text-muted`, `border-border`, …) map to CSS
  variables and must be used instead of raw palette values inside components.

## Status

- **Brand artwork in place.** The official crest was cropped from the supplied dark and
  light lockups and now renders in the masthead, foundation page and favicons. The compact
  header arrangement (crest beside the typed wordmark) awaits brand approval; the supplied
  stacked lockup has not been altered.
- **Palette pending confirmation.** Hex values were sampled from the supplied references.
- **Vector masters pending.** The supplied artwork is raster (JPEG), so an SVG version is
  still needed for large-format use.
- **Deployment not configured.** Cloudflare Pages is the intended host; wiring is deferred.
