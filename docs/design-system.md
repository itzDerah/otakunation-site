# Otakunation design system

Foundation from Milestone 1, extended in Milestone 2 with homepage composition patterns.
Implementation lives in `src/styles/global.css` (tokens and primitives) and
`src/components/` (typed Astro wrappers). A live reference is rendered at `/styleguide`
during development (marked `noindex`; see “Production exclusions”).

## Brand constants

| Token | Value | Use |
| --- | --- | --- |
| `ink-950` | `#07060A` | Dark theme background, permanently dark panels |
| `ink-900` / `ink-850` | `#0B0A0F` / `#100D14` | Dark elevation steps |
| `crimson-500` | `#D91F2E` | Primary action, accents |
| `crimson-700` | `#8E0F1B` | Pressed / high-contrast text on light |
| `gold-500` | `#C09A54` | Eyebrows, rules, secondary accent |
| `gold-400` | `#D4B375` | Gold on permanently dark panels in light theme |
| `gold-300` | `#E6CE9C` | Focus ring on dark |
| `paper-100` | `#F7F4EF` | Light theme background |
| `paper-200` / `paper-300` | `#EDE7DC` / `#DCD3C4` | Light elevation and borders |

Typography is **Montserrat Variable**, self-hosted via `@fontsource-variable/montserrat`
(no third-party font requests at runtime).

## Semantic tokens

Components use semantic utilities that resolve through CSS variables, so a single theme
switch recolours the interface. Raw palette values are reserved for brand artwork and
permanently dark/coloured panels.

| Utility | Dark | Light |
| --- | --- | --- |
| `bg-bg` | `#07060A` | `#F7F4EF` |
| `bg-bg-subtle` | `#0B0A0F` | `#EDE7DC` |
| `bg-surface` | `#121016` | `#FFFFFF` |
| `bg-surface-raised` | `#1A1720` | `#FCFAF6` |
| `border-border` | white 9% | `#DCD3C4` |
| `border-border-strong` | white 18% | `#C4B8A4` |
| `text-text` | `#F7F4EF` | `#14100A` |
| `text-text-muted` | `#B4ACBF` | `#55505F` |
| `text-text-subtle` | `#8A8296` | `#68616F` |
| `bg-accent` / `text-on-accent` | `#D91F2E` / white | `#B81522` / white |
| `text-danger` | `#EF4452` | `#B81522` |
| `text-gold` | `#C09A54` | `#7A5D26` |

All small-text semantic pairs pass WCAG AA; the lowest measured ratio is 4.84:1
(`text-text-subtle` on `bg-bg-subtle` in light). Button label contrast is 5.02:1 in dark
and 6.63:1 in light.

**Permanent surfaces.** A panel that stays ink or accent-coloured in both themes sets its
own local brand token, for example `[--otk-gold:#C09A54]` on the hero stage. This keeps
semantic gold utilities legible on dark artwork when the page theme is light. Do not use
`text-gold` on a permanently dark surface without that override.

## Type scale

| Utility | Size | Notes |
| --- | --- | --- |
| `text-hero` | `clamp(2.2rem, 7.2vw, 5.5rem)` | Homepage wordmark, uppercase |
| `text-display-lg` | `clamp(3rem, 8vw, 5.5rem)` | Hero-scale display type |
| `text-display` | `clamp(2rem, 10vw, 4rem)` | Page titles; within a 320px viewport |
| `text-display-sm` | `clamp(1.875rem, 4vw, 2.5rem)` | Sub-page titles |
| `text-heading` | `clamp(2rem, 4.4vw, 3.25rem)` | Homepage section headings |
| `text-title` | `clamp(1.5rem, 3vw, 2.125rem)` | Standard section headings |
| `text-2xs` | `0.6875rem`, `0.16em` tracking | Eyebrows and badges |

Body copy uses the default `text-base` / `text-sm` scale with `otk-lede` for intros.

## Layout

- `max-w-page` — `76rem` content width, used by `Container`.
- `max-w-narrow` — `44rem` for focused content.
- `max-w-prose` — copy measure for paragraphs.
- `otk-section` — `clamp(4rem, 9vw, 7.5rem)` vertical rhythm between sections.
- Gutters: `px-5` mobile, `px-6` tablet, `px-8` desktop.
- Anchored sections reserve `6rem` scroll margin for the sticky masthead.

## Brand assets

The supplied logo references contain the official crown-and-shield crest. The crest was
cropped from each lockup, had its background removed, and exported as transparent PNG —
it has not been redrawn, recoloured or stretched.

| File | Source | Use |
| --- | --- | --- |
| `public/brand/crest-dark.png` | supplied dark lockup | Dark theme |
| `public/brand/crest-light.png` | supplied light lockup | Light theme |
| `public/favicon.ico` | dark crest on ink | Browser tab |
| `public/icon-192.png` / `public/apple-touch-icon.png` | dark crest on ink | Home-screen icons |
| `public/og/og-default.jpg` | composed from the crest | 1200×630 social preview |
| `src/assets/brand/source/lockup-dark.jpg` / `lockup-light.jpg` | supplied references | Source only, not served |

The full lockups are retained under `src/assets/brand/source/` as the source of truth, but
the site only ships the cropped crests. The wordmark is typeset in Montserrat so it stays
sharp at interface sizes. The supplied artwork is raster; an SVG master is still desirable
for large-format and print use.

## Theme

The active theme is `<html data-theme="dark|light">`. An inline script in `BaseLayout`
applies the saved choice before first paint, so there is no flash. First visits get the
dark brand theme; `ThemeToggle` writes `localStorage["otk-theme"]`, updates the toggle
label, and updates `meta[name="theme-color"]`.

## Components

| Component | Props | Notes |
| --- | --- | --- |
| `Button` | `variant` (`primary`/`secondary`/`ghost`/`gold`/`inverse`/`onaccent`), `size`, `href`, `disabled`, `fullWidth` | Renders `<a>` when `href` is set; `aria-disabled` for links |
| `Card` | `variant` (`surface`/`raised`/`outline`), `padding`, `interactive`, `as` | Theme-aware surface; interactive variant adds hover lift |
| `SectionHeading` | `eyebrow`, `title`, `lede`, `as`, `align`, `size` (`default`/`lg`) | Includes the angular red→gold rule; `lg` uses `text-heading` |
| `Container` | `size` (`page`/`narrow`), `as` | Horizontal gutters and max width |
| `Badge` | `tone` (`gold`/`neutral`/`accent`) | Status and category labels |
| `Input` / `Textarea` / `Select` | `id`, `label`, `hint`, `error`, `required` | Label always visible; `aria-describedby` and `aria-invalid` wired |
| `Checkbox` | `id`, `label`, `hint` | Same association rules |
| `SiteHeader` | `links`, `brandHref`, `cta` | Sticky masthead; full nav at `lg`, `<details>` menu below |
| `SiteFooter` | — | Config-driven contact, social, legal and ecosystem links |
| `NavLink` | `href`, `current` | Sets `aria-current="page"` |
| `ThemeToggle` | — | 44×44 target, labelled for screen readers |
| `Crest` | `class`, `loading`, `alt`, `tone` (`auto`/`dark`/`light`) | Official crest; `tone` pins it inside dark panels |
| `BrandLockup` | `compact`, `crestClass` | Crest + wordmark used in the masthead |
| `BrandText` | `compact` | Wordmark type lockup; tagline hidden when `compact` |
| `Hero` … `CommunityCta` | data-driven where noted | Homepage sections in `src/components/home/` |

### Usage

```astro
---
import Button from "../components/ui/Button.astro";
import SectionHeading from "../components/ui/SectionHeading.astro";
---

<SectionHeading
  eyebrow="Community"
  title="One nation, infinite stories"
  lede="Editorial subheading copy."
  size="lg"
/>

<Button href="#ecosystem" size="lg">
  Explore the ecosystem
</Button>
```

## Homepage patterns

- **Editorial grid.** Angular rules, corner brackets (`otk-corners`), fine grid fields
  (`otk-grid-lines`) and vertical labels establish the national/archival tone without
  gradients or glossy cards.
- **Masthead.** Wordmark left, six nav links centre, utility group right. Between `lg` and
  `xl`, nav padding and type tighten to fit six links plus the CTA. Below `lg`, the menu is
  a `<details>` disclosure that closes on link click, outside click and Escape.
- **Hero.** The headline is a two-tone wordmark; the stage uses the official crest,
  constellation geometry and fixed ink colours rather than third-party artwork.
- **Africa band.** A fixed gold-500 band with a hand-drawn outline of the continent marks
  the brand's African foundation. It is intentionally not theme-reactive.
- **Community CTA.** A semantic accent panel with white copy; inverse and on-accent button
  variants keep actions legible on the saturated surface.
- **Honest states.** Planned features use `Badge` and plain status copy. No dates, metrics,
  launches or registration states are implied.

## Accessibility

- Global `:focus-visible` ring using the theme focus colour; skip link to `#main`.
- Visible labels on every form control; hints/errors linked via `aria-describedby`.
- 44px targets for primary controls (buttons, nav links, theme toggle, inputs). Remaining
  text links are at least 24px tall except inline links inside prose, which are exempt.
- `prefers-reduced-motion` disables transitions, smooth scrolling and the slow orbital
  animation.
- Contrast verified against WCAG 2.1/2.2 A and AA with axe-core (zero violations on `/`
  and `/styleguide/` in both themes). Contrast over textured, gradient or overlapping
  backgrounds is reported as “incomplete” by axe and was checked manually; the fixed ink
  and accent panels use high-contrast token pairs.
- Layout verified at 320, 360, 390, 768, 1024 and 1440 px in both themes with no horizontal
  overflow and no nested scroll containers.

## Responsive rules

- Mobile-first; breakpoints at Tailwind defaults (`sm` 40rem, `md` 48rem, `lg` 64rem,
  `xl` 80rem).
- Fluid type and section spacing avoid breakpoint jumps.
- Full masthead navigation appears at `lg`; `1024–1279px` uses the compact nav tier.
- The mobile menu panel is capped at `min(20rem, 100vw - 2.5rem)` and never exceeds the
  viewport.
- No nested vertical scroll containers; the page scrolls naturally.
- Decorative elements are clipped by their sections so they cannot create horizontal
  overflow.

## Deployment and production exclusions

The public preview is deployed to <https://itzderah.github.io/otakunation-site/> by
`.github/workflows/deploy-pages.yml`. The workflow builds with `DEPLOY_TARGET=github-pages`,
so `astro.config.mjs` applies the `/otakunation-site/` base path. Components must use
`asset()` / `withBase()` from `src/utils/paths.ts` for public files and internal routes.

`/styleguide` is an internal review page. It carries `noindex, nofollow`, is disallowed in
the generated `robots.txt` (with the deployment base path applied), and is not linked from
the homepage. Remove or gate the route before a
production launch; the current robots rule is defence in depth, not a substitute for
removing the page.

## Pending

1. **Approval of the compact masthead lockup** — crest beside the wordmark, rather than
   the supplied stacked lockup. The crest itself is unmodified.
2. **Approval of sampled hex values** — the palette above is derived from the supplied
   references and should be confirmed against the original brand file.
3. **SVG brand masters** — the supplied artwork is raster; vector originals are preferred
   for large-format and print use.
4. **Production domain** — the GitHub Pages preview sets `site` and `base` only when
   `DEPLOY_TARGET=github-pages`. A confirmed production domain should replace the Pages
   URL in `astro.config.mjs`; sitemap generation is still pending.
5. **Live content** — contact email, social channels, registration URL, legal pages, news
   and opportunity applications are intentionally unset or marked pending.
