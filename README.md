# Ali Baba Travel Advisor: website

Static Next.js 16 website (React 19, Tailwind 4) that is exported to plain HTML/CSS/JS, plus a small PHP backend for forms and an admin panel. It runs on **any Namecheap shared/cPanel plan**: no Node.js, no SSH and no build on the server are needed.

## How it works
- `src/`: the website. Content lives in `src/data/*` (tours, guides, countries, offices, phone numbers, reviews, FAQs…) and is compiled to static pages at build time.
- `php/`: backend that runs on cPanel (PHP 7.4+, MySQL): `api/leads.php`, `api/testimonials.php`, `api/reviews.php` and the `admin/` panel (enquiries + reviews).
- `deploy/htaccess`: HTTPS, redirects, security headers and caching for Apache.
- `public/site-config.json`: Google Analytics / Tag Manager IDs and the ads switch. Editable on the server without a rebuild.
- `scripts/package.mjs`: builds the upload package `dist/alibaba-site.zip`.

## Commands
```bash
npm ci                 # install
npm run dev            # local development (forms need the PHP backend, so they only work when deployed)
npm run lint
npm run build:site     # next build (static export to ./out) + package -> dist/alibaba-site.zip
```
GitHub Actions also builds the zip on every push (Actions → run → Artifacts).

## Documentation
- `docs/DEPLOYMENT-CPANEL.md`: step-by-step Namecheap deploy, daily use, Search Console, Analytics, Google Business Profile, troubleshooting
- `docs/SEO-STRATEGY.md`: URL architecture, keyword map, internal linking, schema, checklists, off-page, monetization, roadmap
- `docs/REQUIRED-BUSINESS-INFO.md`: facts the owner still needs to confirm
- `docs/REVIEW-COLLECTION.md`: how to collect genuine reviews

> Previous versions used Node.js + Prisma + MySQL with a Node admin panel. That setup was replaced because Node hosting on shared cPanel was unreliable. It remains available in git history.
