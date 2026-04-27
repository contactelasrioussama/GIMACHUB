# gimachub.com

Official website for **GIMAC 2026** — the 17th Global Islamic Marketing Conference.
Alanya, Türkiye · 27–28 October 2026.

Built with [Astro 5](https://astro.build/) + Tailwind CSS v4. Fully bilingual (English / Arabic with RTL). Static-first; no backend.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:4321/` (English) and `http://localhost:4321/ar/` (Arabic).

## Build

```bash
npm run build      # outputs to ./dist
npm run preview    # preview the production build locally
```

## Project structure

```
src/
├── components/         # Reusable UI (Hero, Countdown, Themes, etc.)
├── data/               # Source-of-truth JSON (committee, themes, publications, dates, fees)
│   ├── committee.json
│   ├── config.json     # ← deadlines, fees, contact info
│   ├── past-conferences.json
│   ├── publications.json
│   └── themes.json
├── i18n/
│   ├── en.json         # English copy
│   ├── ar.json         # Arabic copy (used when locale === 'ar')
│   └── utils.ts        # useTranslations(locale) helper
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro     # EN homepage at /
│   └── ar/index.astro  # AR homepage at /ar/
└── styles/
    └── global.css      # Tailwind v4 @theme tokens + base styles
```

## How copy and content updates work

- **Strings** (headlines, button labels, microcopy): edit `src/i18n/en.json` and `src/i18n/ar.json`. Keep the keys identical between locales.
- **Conference dates, fees, deadlines, contact info**: edit `src/data/config.json`. The countdown, fees cards, and deadline list all read from this file.
- **Tracks / Themes**: edit `src/data/themes.json`. Each topic has an `{ en, ar }` pair.
- **Committee**: edit `src/data/committee.json`. Chairs render on the homepage; the rest are counted in the "+N more" line and will populate the future `/committee` page.
- **Past conferences**: edit `src/data/past-conferences.json`.

## What still needs to be added

- [ ] **Logos** for partners (Springer, Emerald, Scopus, WOS, IIMA, partner universities) — drop SVG/PNG files into `public/logos/` and swap text labels in `src/components/TrustStrip.astro` for `<img>` tags.
- [ ] **Hero photo / OG image** — drop a JPG into `public/og-default.jpg` (1200×630). Optionally add a hero image to the `<Hero>` component.
- [ ] **PayPal link** — replace the placeholder URL in `src/data/config.json` (`paypalUrl`) with the actual PayPal hosted-button URL.
- [ ] **Inner pages** — `/about`, `/submit`, `/publications`, `/committee` (full list), `/venue`, `/past`, `/contact`. Currently the homepage anchors handle `#about`, `#themes`, `#committee`, `#publications`, `#past`, `#contact`, `#submit`, `#fees`.
- [ ] **Analytics** — add Plausible / GA4 snippet in `BaseLayout.astro` `<head>` if needed.

## Design tokens

All colors and fonts are defined as Tailwind v4 `@theme` tokens in `src/styles/global.css`:

- **Primary (Midnight)**: `#0A1F44` — `bg-midnight-800`, `text-midnight-800`
- **Accent (Saffron)**: `#C9A94D` — `bg-saffron-400`, `text-saffron-400`
- **Surface**: `#F8F5EE` (warm off-white)
- **Latin type**: Spectral (serif headings) + Inter (sans body)
- **Arabic type**: Amiri (serif headings) + Cairo (sans body) — auto-applied when `<html lang="ar">`

Swap a single CSS variable in `src/styles/global.css` to retheme the entire site.

## Deployment

Static output (`./dist`) — deploy anywhere:

- **Netlify / Vercel / Cloudflare Pages**: connect the repo, no config needed.
- **Self-hosted**: `npm run build` then serve `dist/` from any static host.

Set the production URL in `astro.config.mjs` (`site:` field) before deploying — used for canonical URLs and `hreflang` tags.

## Conference contact

- **Chair**: Prof. Baker Ahmad Alserhan, Princess Sumaya University, Jordan
- **Email**: alserhan@psut.edu.jo
- **WhatsApp**: +962 770 548 917

Submissions go via email — there is no online form.
