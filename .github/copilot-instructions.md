# Copilot Instructions for withastro-astro-new

## Project Overview
This is an Astro-based blog starter kit, generated via `npm create astro@latest -- --template blog`. The project is structured for high performance, SEO, and extensibility, with support for Markdown/MDX content, RSS, and sitemaps.

## Key Architecture & Patterns
- **Pages:** All routes are defined in `src/pages/` using `.astro`, `.md`, or `.mdx` files. Dynamic routes use `[...slug].astro`.
- **Components:** Reusable UI elements are in `src/components/` (Astro components, but can include React/Vue/Svelte/Preact if configured).
- **Content Collections:** Blog posts and other content live in `src/content/blog/` as Markdown/MDX. Use Astro's `getCollection()` to query content. Frontmatter schemas are defined in `src/content.config.ts`.
- **Layouts:** Shared page layouts are in `src/layouts/` (e.g., `BlogPost.astro`).
- **Assets:** Images and static files are in `public/` and `src/assets/`.
- **Global Styles:** CSS is in `src/styles/global.css`.

## Developer Workflows
- **Install dependencies:** `npm install`
- **Start dev server:** `npm run dev` (default: http://localhost:4321)
- **Build for production:** `npm run build` (output: `dist/`)
- **Preview build:** `npm run preview`
- **Astro CLI:** `npm run astro ...` (e.g., `npm run astro -- add`, `npm run astro -- check`)

## Project-Specific Conventions
- **Minimal styling:** The starter is intentionally unstyled for customization.
- **SEO:** Canonical URLs and OpenGraph data are handled in `BaseHead.astro`.
- **Date formatting:** Use `FormattedDate.astro` for consistent date display.
- **Content schemas:** Validate frontmatter in `src/content.config.ts`.
- **RSS & Sitemap:** Implemented via `src/pages/rss.xml.js` and Astro config.

## Integration Points
- **Markdown/MDX:** All blog content supports both formats.
- **External fonts:** Served from `public/fonts/`.
- **Images:** Referenced from `public/` or `src/assets/`.

## Examples
- To add a new blog post: create a `.md` or `.mdx` file in `src/content/blog/` with valid frontmatter.
- To customize the header/footer: edit `src/components/Header.astro` and `src/components/Footer.astro`.
- To change layout: modify `src/layouts/BlogPost.astro`.

## References
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Astro Documentation](https://docs.astro.build)

---

**Feedback:** If any section is unclear or missing, please specify what needs improvement or additional detail.