# Deploying to Namecheap cPanel

The site is a Next.js 16 app with a MySQL database and an admin CMS. It needs a plan with **cPanel → "Setup Node.js App"**. Static-only hosting will not work (database, forms, admin).

## One-time setup
1. **Database:** cPanel → *MySQL® Databases*: create DB and user, grant all privileges.
2. **Node app:** *Setup Node.js App* → Create. Node 20+, Production, startup file `server.js`, domain `alibabatraveladvisor.com`.
3. **Environment variables** (same screen): copy from `.env.example`. At minimum `DATABASE_URL`, `JWT_SECRET`, `NEXT_PUBLIC_SITE_URL`. Never commit real values.
4. **Upload** the project (exclude `node_modules`, `.next`, `.env*`). On low-RAM plans build locally (`npm ci && npm run build`) and upload `.next` (the existing `reassemble-build` / `extract-build` npm scripts support split uploads).
5. In the app terminal: `npm ci && npx prisma generate && npx prisma migrate deploy`. Then, first time only, `ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='a-long-password' npm run db:seed:direct`. Then `npm run build` and **Restart**.
6. **HTTPS:** *SSL/TLS Status* → run AutoSSL for the apex and `www`.
7. **Redirects:** paste `deploy/htaccess-snippet.txt` above the Passenger block in the app's `.htaccess` (forces HTTPS and non-www).
8. Log in at `/admin/login` and set Settings, Offices, Countries, Tours, Testimonials.

## Updating later
Upload changed files, `npm ci` if package files changed, `npm run build`, Restart. Content pages are prerendered at build time, so after editing content in the admin, rebuild and restart to refresh public pages.

## Pre-launch checks
- `/robots.txt` and `/sitemap.xml` load.
- `curl -I https://alibabatraveladvisor.com` shows `Strict-Transport-Security`.
- A wrong URL shows the 404 page.
- `/admin` returns `X-Robots-Tag: noindex`.
- Submitting a form creates a row in the `Lead` table.

## Google Search Console
1. search.google.com/search-console → Add property → **Domain** (DNS TXT record in Namecheap Advanced DNS), or **URL prefix** `https://alibabatraveladvisor.com` and put the meta token in `GOOGLE_SITE_VERIFICATION`, then rebuild.
2. Sitemaps → submit `https://alibabatraveladvisor.com/sitemap.xml`.
3. URL Inspection → request indexing for the home page, `/visa-consultancy`, `/visas`, `/locations/lahore`.
4. Check *Pages* (indexing) and *Core Web Vitals* weekly for the first month.

## Google Analytics 4 / Tag Manager
1. Create a GA4 property and web stream → copy the `G-XXXXXXXXXX` id.
2. Simplest: set `NEXT_PUBLIC_GA_ID`. With GTM: create a container, set `NEXT_PUBLIC_GTM_ID`, and add a GA4 Configuration tag plus GA4 Event tags triggered by Custom Events.
3. Events pushed by the site: `whatsapp_click`, `phone_click`, `email_click`, `cta_click` (any link with `data-cta="name"`), `consultation_request`, `generate_lead` (param `lead_type`), `visa_inquiry`, `tour_inquiry`, `flight_inquiry`, `contact_inquiry`.
4. In GA4 → Admin → Events, mark `generate_lead`, `whatsapp_click`, `phone_click` as key events.
5. Link GA4 with Search Console (Admin → Product links).

## Google Business Profile
- One profile per real, staffed office (Lahore first, then Islamabad, Wazirabad, Karachi). Do not create profiles for cities without offices.
- The name, address and phone must match the website exactly (`src/data/site.ts` and Admin → Offices). Use the same "Ali Baba Travel Advisor" name with no keywords added.
- Primary category "Travel agency"; add "Visa consultant" and similar secondary categories. Add services, real hours, real photos of the office and team, and the website link to the matching `/locations/<city>` page.
- Ask genuine clients for reviews (share the review link; never buy or write reviews). Reply to every review. Post updates monthly.
- Bing Places: import from GBP.
