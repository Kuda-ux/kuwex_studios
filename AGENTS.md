# AGENTS.md — KuWeX Studios

Project-specific reference and conventions for the KuWeX Studios Next.js website / dashboard.

## Project Identity

- **Name:** KuWeX Studios
- **Site URL:** `https://kuwexstudios.co.zw`
- **Email:** `info@kuwexstudios.co.zw`
- **Phone:** `+263 719 066 891`
- **Location:** Harare, Zimbabwe
- **Founders:** Kuda (Lead Developer, Owner), Weston (Creative Director & Co-Founder)
- **Deployment:** Vercel only (`vercel.json`, framework `nextjs`)

## Tech Stack

- **Framework:** Next.js 14.2.16 (App Router), React 18, TypeScript 5
- **Styling:** Tailwind CSS 3.4.1 (`tailwind.config.ts`)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Font:** Inter (CSS variable `--font-inter`)
- **Database:** Turso (LibSQL/SQLite), server-side only
- **Auth:** JWT via `jose`, cookie `auth-token`
- **Payments:** Smile & Pay (ZB Bank) and Paynow Zimbabwe

## Design Tokens

Tailwind custom colors (`kuwex.*`):

- `kuwex.cyan` — `#00E5FF`
- `kuwex.blue` — `#0085FF`
- `kuwex.black` — `#000000`
- `kuwex.dark` — `#16181C`
- `kuwex.border` — `#2F3336`
- `kuwex.grey` — `#71767B`
- `kuwex.red` — `#FF2A2A`

Common UI classes from `src/app/globals.css`:

- `glass-panel`, `glass-panel-vibrant`, `glass-button`
- `btn-primary`, `btn-secondary`
- `x-card`, `x-card-vibrant`
- `vibrant-gradient-text`, `neon-text`, `neon-text-strong`

## Environment Variables

### Required

- `TURSO_DATABASE_URL`
- `TURSO_AUTH_TOKEN`
- `JWT_SECRET` (fallback dev secret exists in `auth.ts` / `middleware.ts`)
- `ADMIN_EMAIL` (default `admin@kuwexstudios.co.zw`)
- `ADMIN_PASSWORD`

### Payment Gateways

- `SMILEANDPAY_API_KEY`
- `SMILEANDPAY_API_SECRET`
- `SMILEANDPAY_ENV` (`sandbox` or `production`)
- `PAYNOW_INTEGRATION_ID`
- `PAYNOW_INTEGRATION_KEY`

### Site / Public

- `NEXT_PUBLIC_SITE_URL` — canonical production URL (`https://kuwexstudios.co.zw`)
- `NEXT_PUBLIC_BASE_URL` — optional fallback used in payment routes

### Legacy / Optional (not used in current `src/`)

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `FACEBOOK_PAGE_ID`, `FACEBOOK_PAGE_ACCESS_TOKEN`
- `LINKEDIN_ORGANIZATION_ID`, `LINKEDIN_ACCESS_TOKEN`
- `OPENAI_API_KEY`

## Project Structure

### Public Pages (`src/app/`)

- `page.tsx` — Homepage
- `about/page.tsx` — Mission, vision, values, team
- `services/page.tsx` — Services overview + sub-pages (`branding/`, `google-ads/`, `seo-services/`, `social-media-marketing/`, `web-design/`)
- `contact/page.tsx` — Contact form + WhatsApp CTA
- `blog/page.tsx` — Server component; merges Turso + static posts; passes to `BlogListingClient.tsx`
- `blog/[slug]/page.tsx` — Server component; static `blogPosts` dict + Turso; passes to `BlogPostContent.tsx`
- `portfolio/page.tsx` — Portfolio showcase
- `pay/page.tsx` — Customer payment page (Smile & Pay)
- `pay/return/page.tsx` — Payment return handler
- `locations/{harare,bulawayo,zimbabwe}/` — Local SEO pages
- `privacy/`, `terms/`, `cookies/`, `help/`, `faq/` — Policy/support pages
- `sitemap.ts` — Dynamic sitemap
- `rss.xml/route.ts` — RSS feed
- `news-sitemap.xml/route.ts` — Google News sitemap

### Dashboard (`src/app/dashboard/`)

JWT-protected via `src/middleware.ts`.

- `layout.tsx` — Sidebar nav + top header
- `page.tsx` — KPIs / overview
- `login/page.tsx` — Admin login
- `blog/page.tsx` — Blog CMS
- `projects/`, `crm/`, `invoices/`, `quotations/`, `tenders/`, `marketing/`, `hr/`, `documents/`, `social/`, `settings/`

### API Routes (`src/app/api/`)

- `auth/{login,logout}/` — Dashboard auth
- `blog/` — Public GET (cached) + admin POST/PUT/DELETE
- `db/[table]/` — Generic CRUD for all Turso tables
- `smileandpay/{initiate,result,status}/` — Smile & Pay flow
- `paynow/{initiate,result,status}/` — Paynow flow
- `indexnow/` — SEO IndexNow ping

### Libraries (`src/lib/`)

- `turso.ts` — LibSQL client, schema, `serializeRow` / `deserializeRow`, `generateId`, `nowIso`
- `types.ts` — TypeScript interfaces, `JSON_COLUMNS`, `VALID_TABLES`
- `auth.ts` — `signToken`, `verifyToken`, `verifyApiAuth`
- `smileandpay.ts` — Smile & Pay helper
- `paynow.ts` — Paynow helper
- `database.ts` — Client-side CRUD wrappers calling `/api/db/*`
- `blog-meta.ts` — Blog metadata / image overrides
- `utils.ts` — `cn()` (clsx + tailwind-merge)

### Components (`src/components/`)

- `Navbar.tsx`, `Footer.tsx`, `ThemeToggle.tsx`
- `ContactWidget.tsx`, `CookieConsent.tsx`, `WhatsAppButton.tsx`

## Database

Turso is used server-side only. The schema lives in `src/lib/turso.ts`.

### Tables

`projects`, `leads`, `clients`, `quotations`, `invoices`, `tenders`, `team_members`, `tasks`, `documents`, `social_posts`, `company_settings`, `blog_posts`

### JSON Columns (serialized on write, parsed on read)

- `projects.team`
- `quotations.items`
- `invoices.items`
- `social_posts.platforms`
- `blog_posts.content`, `blog_posts.related_slugs`, `blog_posts.keywords`

### Rules

- Do **not** import `src/lib/turso.ts` from client components.
- Dashboard pages should use `src/lib/database.ts` or `/api/*` routes.

## Auth

- Cookie name: `auth-token` (httpOnly, secure in production, `SameSite=strict`, 24h)
- Middleware guards `/dashboard/*` except `/dashboard/login`.
- `src/lib/auth.ts` provides `signToken`, `verifyToken`, `verifyApiAuth`.
- Login: `src/app/api/auth/login/route.ts` validates `ADMIN_EMAIL` / `ADMIN_PASSWORD` with brute-force lockout (5 attempts / 15 min).
- Logout: `src/app/api/auth/logout/route.ts` clears the cookie.

## Payment Gateways

### Smile & Pay (ZB Bank)

- Server helper: `src/lib/smileandpay.ts`
- Routes: `src/app/api/smileandpay/{initiate,result,status}/`
- Default currency USD (`840`); ZWG is `924`
- See `.devin/skills/smile-and-pay-integration.md` for full API details.

### Paynow Zimbabwe

- Server helper: `src/lib/paynow.ts`
- Routes: `src/app/api/paynow/{initiate,result,status}/`
- SHA-512 hash verification in `paynowVerifyHash`.
- Initiate returns `browserUrl` + `pollUrl`.

Both gateways store draft payments in the `invoices` table using `invoice_number` as the order/reference number.

## Blog / ISR

- Blog listing (`src/app/blog/page.tsx`): `export const revalidate = 300`.
- Blog post (`src/app/blog/[slug]/page.tsx`): `export const revalidate = 3600`.
- Static post arrays exist in `blog/page.tsx` (listing) and `blog/[slug]/page.tsx` (detail) as fallbacks/SEO content.
- Admin CMS: `src/app/dashboard/blog/page.tsx` via `/api/blog`.
- Feeds: `sitemap.ts`, `rss.xml/route.ts`, `news-sitemap.xml/route.ts`.

## Middleware / Security

`src/middleware.ts` sets:

- Dashboard auth guard
- Bot blocking (known spam bots blocked; AI crawlers allowed)
- Rate limiting on `/api/*` and `/contact` (100 req/min)
- Security headers: `X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`, `Referrer-Policy`, `Permissions-Policy`, HSTS, CSP
- Long cache headers for static assets

## Coding Conventions

- Use TypeScript with explicit types from `src/lib/types.ts`.
- Use `cn()` from `src/lib/utils.ts` for conditional `className` merging.
- Keep DB code server-side; use `src/lib/database.ts` on the dashboard client.
- Prefer `lucide-react` icons and `kuwex-*` Tailwind tokens.
- Maintain the dark-first aesthetic (black background, cyan/blue accents, `glass-panel` cards).
- Use Framer Motion for entrance/scroll animations; keep them subtle.
- Use Next.js App Router server components by default; add `"use client"` only for interactivity.
- Keep `next.config.mjs` stable: compress, `poweredByHeader: false`, `reactStrictMode: true`, `trailingSlash: false`, `generateEtags: true`, `optimizePackageImports` for `lucide-react` and `framer-motion`.
