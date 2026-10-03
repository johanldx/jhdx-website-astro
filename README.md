# jhdx.dev

> Personal portfolio and technical notebook of **Johan Ledoux** — Fullstack Product Engineer.

Live website: [https://jhdx.dev](https://jhdx.dev)

---

## ⚡ Tech Stack

- **Framework:** [Astro](https://astro.build/) (Static mode)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite`
- **Typography:** Space Grotesk & Inter via `@fontsource-variable`
- **Content:** [MDX](https://mdxjs.com/) via `@astrojs/mdx` with Shiki syntax highlighting
- **Structured Data:** Connected Schema.org JSON-LD graph powered by [`@unschema-graph/astro`](https://unschema-graph.jhdx.dev/)
- **Linting & Formatting:** [Biome](https://biomejs.dev/)
- **SEO & Feeds:** Dynamic Sitemap (`@astrojs/sitemap`), RSS feed (`@astrojs/rss`), Open Graph & Twitter cards

---

## ✨ Features

- **Multilingual (EN / FR):** Full bilingual support with dedicated localized routes (`/` and `/fr/`, `/notes/` and `/fr/notes/`), hreflang alternations, and translation links.
- **Deep Schema.org Graph:** Rich, validated JSON-LD graphs connecting `Person`, `WebSite`, `ProfilePage`, `BlogPosting`, `CollectionPage`, `BreadcrumbList`, and `ItemList` without duplicated snippets.
- **Discreet Breadcrumb Navigation:** Accessible, minimalist breadcrumb trails on all notes and index listings, reflected in both UI and Schema graph.
- **Performance First:** Zero runtime JavaScript overhead, eager above-the-fold image loading (`loading="eager"` and `fetchpriority="high"`), responsive modern image formats (`.webp`).
- **Dark & Light Modes:** Smooth theme transitions respecting system preferences with persistent local state.
- **Automated Open Graph Generator:** Dedicated script generating high-resolution, branded OG cards (`public/og.png` and `public/og.svg`) directly from profile data and avatar.

---

## 📁 Project Structure

```text
.
├── public/
│   ├── brands/             # Company and school brand marks
│   ├── favicon.ico         # Multi-resolution ICO (16, 32, 48, 64px)
│   ├── johanledoux.png     # Avatar and PNG favicon
│   ├── og.png              # Generated Open Graph card
│   ├── og.svg              # Vector Open Graph source
│   └── robots.txt          # Crawler directives & sitemap location
├── scripts/
│   └── generate-og.mjs     # Script to generate OG assets from profile data
├── src/
│   ├── assets/             # Internal assets & raw portrait
│   ├── components/
│   │   ├── home/           # Hero, experiences, projects, feature components
│   │   ├── layout/         # Header, footer, global elements
│   │   ├── notes/          # Note listing and article items
│   │   └── ui/             # Breadcrumbs, theme toggle, language switch
│   ├── content/
│   │   └── notes/          # Technical notes & devlogs in MDX (EN & FR)
│   ├── data/               # Structured data: profile, experiences, projects, site
│   ├── layouts/            # BaseLayout and NoteLayout
│   ├── lib/                # i18n, schema graph definitions, feed helpers
│   ├── pages/              # Static routing (EN, FR, 404, RSS)
│   └── styles/             # Global Tailwind v4 styles and tokens
├── astro.config.mjs        # Astro configuration & integrations
├── biome.json              # Biome linting and formatting rules
└── package.json
```

---

## 🛠️ Commands

All commands are run from the repository root:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start local Astro development server |
| `npm run build` | Build static production assets to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run fast linting checks with Biome |
| `npm run lint:fix` | Automatically fix safe lint issues |
| `npm run format` | Format files according to Biome configuration |
| `npm run check` | Run combined format and lint checks |
| `npm run generate:og` | Regenerate `public/og.svg` and `public/og.png` from profile data |

---

## 📜 License

[MIT](LICENSE) © Johan Ledoux
