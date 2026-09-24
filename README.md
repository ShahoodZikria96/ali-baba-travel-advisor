# Ali Baba Travel Advisor

Full-stack website for a Pakistan-based visa consultancy and travel advisory business, built with Next.js (App Router), MySQL and a custom admin CMS. Everything on the public site — offices, visa countries, tours, guides, testimonials, FAQs, site settings — is editable from the admin panel and stored in the database.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack), React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: MySQL, accessed through Prisma ORM
- **Auth**: JWT sessions (`jose`) with bcrypt-hashed passwords, httpOnly cookies
- **Forms**: react-hook-form + zod
- **Animation**: Framer Motion

## Project Structure

Next.js keeps the frontend and backend in one project by design — that's what makes a single `next build` / single deploy work. Within `src/`, they're still clearly separated by folder:

```
src/
├── app/
│   ├── (marketing)/        → FRONTEND — all public pages (home, visas, tours, guides, locations, etc.)
│   ├── admin/               → BACKEND (UI) — admin panel pages, protected by src/proxy.ts
│   ├── api/                 → BACKEND (API) — REST endpoints the admin panel and public forms call
│   ├── layout.tsx           → root HTML shell, fonts, global metadata
│   ├── sitemap.ts           → dynamic sitemap.xml
│   └── opengraph-image.tsx  → generated social-share image
│
├── components/
│   ├── home/                → FRONTEND — homepage sections
│   ├── guides/, tours/      → FRONTEND — content card components
│   ├── forms/                → FRONTEND — public lead-capture forms (visa assessment, tour enquiry, etc.)
│   ├── layout/                → FRONTEND — header, footer, mobile menu
│   ├── ui/                    → FRONTEND — shared design-system primitives (Button, Container, ...)
│   └── admin/                → BACKEND (UI) — admin table/form/sidebar components
│
├── lib/
│   ├── prisma.ts              → DATABASE — Prisma client singleton
│   ├── content.ts             → DATABASE — typed data-access functions used by every page
│   ├── admin-resources.ts     → BACKEND — the generic admin CRUD config (drives all 12 content types)
│   ├── auth.ts                 → BACKEND — session creation/verification
│   └── whatsapp.ts             → FRONTEND — WhatsApp/tel link helpers (client-safe, no Prisma import)
│
├── data/                      → static, non-admin-editable content (nav menu, service list) — not DB-backed
└── proxy.ts                   → BACKEND — route protection for /admin and /api/admin (Next 16's middleware)

prisma/
├── schema.prisma              → DATABASE — all 14 models
├── migrations/                 → DATABASE — versioned schema history
└── seed.ts                     → DATABASE — one-time seed script for initial content

public/                        → static assets (destination photos, flags, brand logo)
docker-compose.yml             → DATABASE — local MySQL container for development
```

## Local Setup

**1. Install dependencies**

```bash
npm install
```

**2. Start a local MySQL database** (or point `DATABASE_URL` at any MySQL-compatible database you already have — see [Production Database](#production-database) below)

```bash
docker compose up -d
```

**3. Configure environment variables**

Copy `.env.example` to `.env` and fill in real values:

```bash
cp .env.example .env
```

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | MySQL connection string |
| `JWT_SECRET` | Random secret for signing admin session tokens — generate one with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Credentials for the first admin account, used only by the seed script |

**4. Run migrations and seed the database**

```bash
npm run db:migrate
npm run db:seed
```

**5. Start the dev server**

```bash
npm run dev
```

Visit `http://localhost:3000` for the public site and `http://localhost:3000/admin/login` for the admin panel.

## Other Commands

```bash
npm run build        # production build
npm run start         # run a production build locally
npm run lint           # eslint
npm run db:studio      # Prisma Studio — browse/edit the database visually
npm run db:generate    # regenerate the Prisma client after a schema change
```

## Deployment

This project deploys as a single unit — there's nothing to split into separate frontend/backend deployments:

1. **Database**: provision a MySQL-compatible database reachable from the internet (e.g. [TiDB Cloud Serverless](https://tidbcloud.com) has a free tier and needs no credit card; Railway, PlanetScale and Aiven are alternatives). Run `npm run db:migrate` and `npm run db:seed` against it once, using its connection string as `DATABASE_URL`.
2. **App**: push this repo to GitHub, import it into [Vercel](https://vercel.com), and set the `DATABASE_URL` and `JWT_SECRET` environment variables in the Vercel project settings. Every push to the main branch redeploys automatically.

No separate backend hosting, no Docker in production, no CORS configuration — the API routes under `src/app/api` are part of the same deployment as the pages.

### Alternative: cPanel / shared hosting (e.g. Namecheap)

Only possible if the hosting plan's cPanel has a **"Setup Node.js App"** feature (CloudLinux Node.js Selector) — most basic shared-hosting plans don't include this.

1. Create a MySQL database via cPanel's **MySQL Databases**, and use its connection details as `DATABASE_URL`.
2. cPanel → **Setup Node.js App** → create an application, Node 20+, mode **Production**, application root set to where you'll upload the code, **application startup file: `server.js`** (included in this repo — it's a thin custom server needed because cPanel's Node runner doesn't use `next start` directly).
3. Upload the code (excluding `node_modules`, `.next`, `.env*`) and set `DATABASE_URL` / `JWT_SECRET` as environment variables in the Node.js App's settings.
4. From the app's built-in terminal: `npm install && npx prisma generate && npx prisma migrate deploy && npx prisma db seed && npm run build`, then restart the app.
5. Enable AutoSSL under **SSL/TLS Status**.

This path has none of Vercel's automatic redeploys, ISR/CDN caching, or preview deployments — every future update has to be uploaded and rebuilt manually.

## Admin Panel

The admin panel manages 12 content types (Offices, Visa Countries, Visa Refusal Pages, Visa Consultancy Services, Tour Packages, Blog/Guides, Testimonials, Success Stories, Video Library, FAQs, Team Members, Leads) plus site-wide Settings (phone, WhatsApp, social links, announcement bar). Public testimonial submissions land as unpublished until an admin approves them.

**Important**: change the default admin password (set via `ADMIN_PASSWORD` at seed time) before sharing a production link publicly.
