# Otakunation design system

Milestone 1 foundation. Implementation lives in `src/styles/global.css` (tokens and
primitives) and `src/components/` (typed Astro wrappers). A live reference is rendered at
`/styleguide` during development (marked `noindex`).

## Brand constants

| Token | Value | Use |
| --- | --- | --- |
| `ink-950` | `#07060A` | Dark theme background |
| `ink-900` / `ink-850` | `#0B0A0F` / `#100D14` | Dark elevation steps |
| `crimson-500` | `#D91F2E` | Primary action, accents |
| `crimson-700` | `#8E0F1B` | Pressed / high-contrast text on light |
| `gold-500` | `#C09A54` | Eyebrows, rules, secondary accent |
| `gold-300` | `#E6CE9C` | Focus ring on dark |
| `paper-100` | `#F7F4EF` | Light theme background |
| `paper-200` / `paper-300` | `#EDE7DC` / `#DCD3C4` | Light elevation and borders |

Typography is **Montserrat Variable**, self-hosted via `@fontsource-variable/montserrat`
(no third-party font requests at runtime).

## Semantic tokens

Components never reference raw brand colours. They use semantic utilities that resolve
through CSS variables, so a single theme switch recolours the whole interface.

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
| `text-text-subtle` | `#8A8296` | `#6E6878` |
| `bg-accent` / `text-on-accent` | `#D91F2E` / white | `#B81522` / white |
| `text-danger` | `#EF4452` | `#B81522` |
| `text-gold` | `#C09A54` | `#7A5D26` |

All text/background pairs above pass WCAG AA (lowest measured ratio 4.89:1); button label
contrast is 5.02:1 dark and 6.63:1 light, and error text is 5.06:1 dark and 6.63:1 light.

## Type scale

| Utility | Size | Notes |
| --- | --- | --- |
| `text-display-lg` | `clamp(3rem, 8vw, 5.5rem)` | Hero-scale, uppercase wordmark |
| `text-display` | `clamp(2rem, 10vw, 4rem)` | Page titles; stays within a 320px viewport |
| `text-display-sm` | `clamp(1.875rem, 4vw, 2.5rem)` | Sub-page titles |
| `text-title` | `clamp(1.5rem, 3vw, 2.125rem)` | Section headings |
| `text-2xs` | `0.6875rem`, `0.16em` tracking | Eyebrows and badges |

Body copy uses the default `text-base` / `text-sm` scale with `otk-lede` for intros.

## Layout

- `max-w-page` — `76rem` content width, used by `Container`.
- `max-w-narrow` — `44rem` for focused content.
- `max-w-prose` — copy measure for paragraphs.
- `py-section` — `clamp(4rem, 9vw, 7.5rem)` vertical rhythm between sections.
- Gutters: `px-5` mobile, `px-6` tablet, `px-8` desktop.

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
| `src/assets/brand/source/lockup-dark.jpg` / `lockup-light.jpg` | supplied references | Source only, not served |

The full lockups are retained under `src/assets/brand/source/` as the source of truth, but
the site only ships the cropped crests.

The wordmark is typeset in Montserrat rather than cropped from the raster lockup, so it
stays sharp at interface sizes. The header uses a compact horizontal arrangement (crest
beside the wordmark); the supplied stacked lockup remains the reference for proportion
and colour. Because the supplied artwork is raster, an SVG master is still desirable for
large-format and print use.

## Theme

The active theme is `<html data-theme="dark|light">`. An inline script in `BaseLayout`
applies the saved choice before first paint, so there is no flash. First visits get the
dark brand theme; `ThemeToggle` writes `localStorage["otk-theme"]` and remembers the
visitor's choice.

## Components

| Component | Props | Notes |
| --- | --- | --- |
| `Button` | `variant` (`primary`/`secondary`/`ghost`/`gold`), `size`, `href`, `disabled`, `fullWidth` | Renders `<a>` when `href` is set; `aria-disabled` for links |
| `Card` | `variant` (`surface`/`raised`/`outline`), `padding`, `interactive`, `as` | Theme-aware surface; interactive variant adds hover lift |
| `SectionHeading` | `eyebrow`, `title`, `lede`, `as`, `align` | Includes the angular red→gold rule |
| `Container` | `size` (`page`/`narrow`), `as` | Horizontal gutters and max width |
| `Badge` | — | Gold-tinted label |
| `Input` / `Textarea` / `Select` | `id`, `label`, `hint`, `error`, `required` | Label always visible; `aria-describedby` and `aria-invalid` wired |
| `Checkbox` | `id`, `label`, `hint` | Same association rules |
| `SiteHeader` | `links`, `brandHref` | Desktop nav + `<details>` mobile menu (no JS), theme toggle |
| `NavLink` | `href`, `current` | Sets `aria-current="page"` |
| `ThemeToggle` | — | 44×44 target, labelled for screen readers |
| `Crest` | `class`, `loading`, `alt` | Official crest, theme-aware (dark/light PNG pair) |
| `BrandLockup` | `compact`, `crestClass` | Crest + wordmark used in the masthead |
| `BrandText` | `compact` | Wordmark type lockup; tagline hidden when `compact` |

### Usage

```astro
---
import Button from "../components/ui/Button.astro";
import Card from "../components/ui/Card.astro";
import SectionHeading from "../components/ui/SectionHeading.astro";
---

<SectionHeading
  eyebrow="Community"
  title="One nation, infinite stories"
  lede="Editorial subheading copy."
/>

<Card interactive>
  <p class="text-sm text-text-muted">Content block</p>
  <Button href="/join" class="mt-4">Join the nation</Button>
</Card>
```

## Accessibility

- Global `:focus-visible` ring using the theme focus colour.
- Skip link to `#main`.
- Visible labels on every form control; hints/errors linked via `aria-describedby`.
- 44px targets for primary controls (buttons, nav links, theme toggle, inputs); form
  checkboxes are 24px with an associated label.
- `prefers-reduced-motion` disables transitions, smooth scrolling and animation.
- Contrast verified against WCAG AA for all semantic text pairs.
- Automated axe-core WCAG 2.1 AA scan reports zero violations on `/` and `/styleguide/`
  in both themes.
- Layout verified at 320, 390, 768 and 1440 px with no horizontal overflow or nested
  scroll containers.

## Responsive rules

- Mobile-first; breakpoints at Tailwind defaults (`sm` 40rem, `md` 48rem, `lg` 64rem, `xl` 80rem).
- Fluid type and section spacing avoid breakpoint jumps.
- No nested vertical scroll containers; the page scrolls naturally.
- Header collapses to a `<details>` disclosure below `md`.
- Decorative elements stay inside the container so they cannot cause horizontal overflow.

## Pending

1. **Approval of the compact masthead lockup** — crest beside the wordmark, rather than
   the supplied stacked lockup. The crest itself is unmodified.
2. **Approval of sampled hex values** — the palette above is derived from the supplied
   references and should be confirmed against the original brand file.
3. **SVG brand masters** — the supplied artwork is raster; vector originals are preferred
   for large-format and print use.
4. Decision on whether `/styleguide` ships behind a flag or is removed before launch.
