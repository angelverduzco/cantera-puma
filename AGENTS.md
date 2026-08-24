# AGENTS.md

## Project overview

React 19 SPA for Pumas UNAM fan portal. Accessibility-first (WCAG 2.1/2.2). Spanish-language site (`lang="es"`).

- **Stack:** React 19, React Router v7, Vite, vanilla CSS
- **Package manager:** pnpm
- **Deploy:** Vercel (serverless API functions in `/api/`)
- **No TypeScript, no test framework**

## Commands

| Task | Command |
|------|---------|
| Install | `pnpm install` |
| Dev server | `pnpm dev` |
| Build | `pnpm build` |
| Lint | `pnpm lint` |
| Lint fix | `pnpm lint-fix` |
| Preview build | `pnpm preview` |

There is **no test or typecheck command** configured. `pnpm lint` is the only verification step.

## Code style

- ESLint flat config with Prettier enforcement (`prettier/prettier: error`)
- `.prettierrc`: double quotes, semicolons, 2-space tabs
- `.jsx` extension for all React components
- `prop-types` is off; no TypeScript types

## Architecture

### Frontend (`src/`)

- `main.jsx` — entrypoint, wraps app in `BrowserRouter` + `ModalProvider`
- `App.jsx` — route definitions: `/`, `/trofeos`, `/plantilla`, `/posiciones`, `/calendario`, `/noticias`
- `ModalContext.jsx` — global context for accessible modal management
- Components in `src/components/<Name>/index.jsx` (one folder per component)
- Pages in `src/pages/<Name>/index.jsx` (except `HomePage.jsx`)
- Custom hooks in `src/hooks/` — one per API endpoint (`usePosiciones`, `useCalendario`, `useFutbol`, `useNews`)

### Serverless API (`api/`)

Node.js functions deployed as Vercel serverless. They **scrape live data from ligamx.net** using `fetch` + HTML parsing (no Puppeteer in prod — `puppeteer-core`/`@sparticuz/chromium` are dependencies but API handlers use plain `fetch`).

- `posiciones.js` — Liga MX standings (scrapes dynamic hash URL)
- `futbol.js` — general football data
- `ligamx.js` — supplementary Liga MX data
- `news.js` — Pumas news scraping

Each API file includes a local test harness at the bottom: run directly with `node api/<name>.js`.

### Vercel routing (`vercel.json`)

- `/api/*` routes to serverless functions
- All other routes rewrite to `index.html` (SPA fallback)

## Important conventions

- **Accessibility is mandatory.** All interactive components must use proper ARIA attributes, focus management, keyboard navigation, and semantic HTML. See README for the full A11y spec (focus traps in modals, `aria-expanded` on nav, `scope="col"` on tables, etc.)
- Components follow a folder-per-component pattern with `index.jsx` entrypoint
- CSS is vanilla (no preprocessor, no CSS modules, no Tailwind) — uses CSS custom properties defined in `src/index.css`
- Fonts: Montserrat loaded via Google Fonts with `media="print" onload` pattern for non-blocking load
- API responses use `Cache-Control: s-maxage=86400, stale-while-revalidate=43200`
