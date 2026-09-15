# Mobile Network Booster Mumbai — Website & Admin Portal

A production-ready Next.js (App Router) website and admin portal for a mobile
network / signal booster installation business serving Mumbai, Navi Mumbai
and Thane. Includes the public marketing site, SEO architecture, a lead
capture backend, and a secured admin portal for managing enquiries.

## Stack

- **Framework:** Next.js 15 (App Router, TypeScript, Server Components)
- **Styling:** Tailwind CSS + a small shadcn/ui-style component set
- **Database:** PostgreSQL via Prisma ORM
- **Auth:** Custom email/password auth — bcrypt password hashing, signed
  JWT session tokens in HTTP-only cookies, server-side session table
- **Email:** Nodemailer (SMTP)
- **Validation:** Zod (shared between client forms and API routes)
- **Icons:** Lucide React

## Project Structure

```
app/
  (site)/            Public marketing site (has Header/Footer/mobile CTA bar)
    page.tsx          Homepage
    about/ contact/ services/ products/ industries/ locations/
    resources/ privacy-policy/ terms/ disclaimer/
  admin/
    (auth)/login/      Admin login (no dashboard chrome)
    (dashboard)/       Sidebar + topbar shell, protected
      page.tsx          Dashboard overview
      leads/            Lead list + lead detail
      contacts/         Contact message inbox
      settings/         Profile + change password
    unauthorized/
  api/
    leads/               POST — public lead submission
    contact/             POST — public contact form
    admin/
      login/ logout/ me/
      leads/ leads/[id]/ leads/[id]/notes/
      contacts/ contacts/[id]/
      stats/ team/ change-password/
  sitemap.ts / robots.ts
components/
  layout/   Header, Footer, mobile sticky CTA bar, WhatsApp float button
  hero/     Homepage hero
  sections/ Reusable marketing sections (services grid, FAQ, contact, etc.)
  forms/    LeadForm, ContactForm (Zod + react-hook-form)
  admin/    Admin portal UI (sidebar, tables, lead detail, login form)
  seo/      JSON-LD, Breadcrumbs, analytics script loader
  ui/       Base UI primitives (button, card, input, select, accordion...)
config/
  site.ts       Central business config (name, phone, address, SEO defaults)
  content.ts    Services, industries, FAQs, "why choose us", etc.
  locations.ts  Per-area content for /locations/[slug]
  resources.ts  Blog/guide articles for /resources/[slug]
lib/
  db.ts auth.ts email.ts validation.ts seo.ts rate-limit.ts
  require-admin.ts   Auth guard used by every /api/admin/* route
  data/               Server-side data-access helpers (products, leads, stats)
prisma/
  schema.prisma   Full data model (see below)
  seed.ts         Creates the first SUPER_ADMIN and placeholder products
tests/            Vitest unit tests (validation schemas, admin auth guard)
```

## Rebranding

Almost everything business-specific (name, phone, WhatsApp, email, address,
service area, business hours, SEO defaults) lives in **`config/site.ts`** and
is driven by environment variables where practical. Update that file (and the
content files in `config/`) to rebrand the site without touching page code.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in real values:

```bash
cp .env.example .env
```

At minimum for local development you need:

- `DATABASE_URL` — a PostgreSQL connection string (see below)
- `AUTH_SECRET` — a long random string (32+ chars) used to sign admin
  session tokens
- `ADMIN_EMAIL` / `ADMIN_SEED_PASSWORD` — used by the seed script to create
  the first admin login

### 3. Set up PostgreSQL

Any managed Postgres works — [Neon](https://neon.tech) and
[Supabase](https://supabase.com) both have generous free tiers and work well
with Vercel deployments. Paste the connection string into `DATABASE_URL`.

Then run the migration and seed:

```bash
npx prisma migrate dev --name init
npm run seed
```

The seed script creates:

- A `SUPER_ADMIN` account using `ADMIN_EMAIL` / `ADMIN_SEED_PASSWORD`
  (defaults to `admin@example.com` / `ChangeMe123!` if unset — **change this
  password after first login**)
- Three placeholder product categories (clearly generic — replace with real
  product data before going live)

### 4. Run the dev server

```bash
npm run dev
```

- Public site: http://localhost:3000
- Admin login: http://localhost:3000/admin/login

### 5. Type-check, lint, test

```bash
npm run typecheck
npm run lint
npm test
```

## Admin Portal

- `/admin/login` — email + password, rate-limited per IP and per email,
  failed attempts logged to `LoginAttempt`
- `/admin` — dashboard overview (lead counts by status, recent leads)
- `/admin/leads` — searchable, filterable, paginated lead table
- `/admin/leads/[id]` — full lead detail: edit contact info, change status,
  assign to an admin, add internal notes, see a timeline, call/WhatsApp/email
  shortcuts, delete
- `/admin/contacts` — general contact form messages
- `/admin/settings` — profile info + change password

Sessions are HTTP-only, signed JWTs backed by a server-side `AdminSession`
row (so a session can be revoked/expired server-side, not just by deleting a
cookie). `middleware.ts` does a fast, edge-compatible signature/expiry check
on every `/admin/*` request; each protected page and API route additionally
calls `getCurrentAdmin()` (which checks the DB session and `isActive` flag)
before doing anything — so an inactive or revoked admin is blocked even with
a structurally valid token.

## Database Schema

See `prisma/schema.prisma` for the full model. Highlights:

- `AdminUser` / `AdminSession` / `LoginAttempt` — auth
- `Lead` — the core enquiry record, with `LeadNote` (internal notes) and
  `LeadEvent` (status/assignment timeline) as related tables
- `ContactMessage` — general contact-form submissions (separate from
  structured leads)
- `Product` / `Testimonial` — schema in place for future CMS-style admin
  management; `Product` already powers `/products`

Indexes are defined on the fields the admin table and API filters actually
query by (`createdAt`, `status`, `phone`, `email`, `city`, `requirementType`).

## Content Architecture (SEO)

Most marketing content is **static, typed config**, not hardcoded in JSX —
so pages stay server-rendered/statically generated without a database
dependency:

- `config/content.ts` — services, industries, network providers, FAQs, "how
  it works", "why choose us"
- `config/locations.ts` — one entry per `/locations/[slug]` page, each with
  genuinely distinct copy (local building types, common challenges, nearby
  areas) rather than a single template with the city name swapped
- `config/resources.ts` — long-form guide articles for `/resources/[slug]`

`/products` and `/products/[slug]` are the one part of the public site backed
by the database (`Product` model), rendered dynamically (`export const
dynamic = "force-dynamic"`) so they don't need database access at build
time and always reflect current admin-managed data.

`app/sitemap.ts` generates all static + dynamic routes and explicitly
excludes `/admin/*` and `/api/*`; `app/robots.ts` disallows the same. Every
`/admin/*` page additionally sets `robots: { index: false, follow: false }`
in its metadata, and `next.config.ts` sends `X-Robots-Tag: noindex, nofollow`
on all `/admin/*` responses as a second layer.

## Spam Protection

- Zod validation on every form, enforced server-side (never trust the client)
- Honeypot field (`website`) on both public forms — bots that fill every
  field trip it; the request is silently accepted without creating a record
- In-memory sliding-window rate limiting (`lib/rate-limit.ts`) on
  `/api/leads`, `/api/contact`, and `/api/admin/login` (per-IP and, for
  login, per-email)
- The rate limiter is single-instance/in-memory by design — for a
  multi-instance serverless deployment, swap its store for Redis (e.g.
  Upstash) behind the same `checkRateLimit` interface
- Cloudflare Turnstile env vars are present in `.env.example` as a hook point
  if you want to add a CAPTCHA challenge later; it isn't wired into the UI
  yet

## Known Placeholders — Replace Before Launch

- **Images:** `public/images/hero-installation.svg`,
  `system-diagram.svg` and `og-default.svg` are clean technical diagrams
  standing in for real photography. Swap in real installation/product photos
  per section 52 of the brief before launch.
- **Products:** the three seeded products are generic categories, not real
  specifications — replace with actual product data.
- **Business address / Google Maps embed:** `config/site.ts` has placeholder
  address and map values — update with the real office address or
  service-area business info.
- **Legal pages:** `/privacy-policy`, `/terms`, `/disclaimer` are reasonable
  starting templates, not legal advice — have them reviewed before launch.

## Deployment (Vercel)

1. Push to a Git repository and import it into Vercel.
2. Add all variables from `.env.example` in the Vercel project's
   Environment Variables settings (use a real `DATABASE_URL` from your
   Postgres provider and a freshly generated `AUTH_SECRET`).
3. Vercel will run `npm run build`, which runs `prisma generate` then
   `next build`.
4. Run migrations against the production database once
   (`npx prisma migrate deploy`, from CI or locally against the prod
   `DATABASE_URL`), then `npm run seed` to create the first admin login.
5. Set up Google Search Console with the deployed `sitemap.xml` URL, and
   fill in `NEXT_PUBLIC_GSC_VERIFICATION` / `NEXT_PUBLIC_GA_ID` /
   `NEXT_PUBLIC_GTM_ID` as needed.

## Pre-Launch SEO Checklist

- [ ] `/sitemap.xml` includes all public routes, excludes `/admin` and `/api`
- [ ] `/robots.txt` disallows `/admin` and `/api`
- [ ] Every page has a unique `<title>` and meta description
      (`lib/seo.ts` → `buildMetadata`)
- [ ] Canonical URLs resolve correctly (also handled by `buildMetadata`)
- [ ] Open Graph image renders (replace `og-default.svg` with a real image)
- [ ] JSON-LD validates: Organization, LocalBusiness, Service, Product,
      BreadcrumbList, FAQPage (test with Google's Rich Results Test)
- [ ] No accidental `noindex` on public pages; all `/admin/*` pages **are**
      noindexed
- [ ] All images have descriptive `alt` text
- [ ] Mobile layout has no horizontal scroll, sticky CTA bar works
- [ ] Contact and lead forms submit successfully end-to-end against a real
      database
- [ ] Admin login works and non-admin visitors are redirected away from
      `/admin/*`
