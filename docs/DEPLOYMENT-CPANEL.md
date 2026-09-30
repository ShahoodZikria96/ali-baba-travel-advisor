# Deploying to Namecheap cPanel (no Node.js needed)

The website is now a **static site** (plain HTML/CSS/JS files) plus a tiny **PHP backend** for the enquiry forms, review submissions and the admin panel. Every Namecheap shared plan supports PHP and MySQL, so nothing special has to be enabled: no "Setup Node.js App", no SSH, no build on the server.

```
your PC / GitHub  --npm run build:site-->  alibaba-site.zip  --upload-->  public_html
                                                                    ├─ HTML, CSS, JS, images   (the website)
                                                                    ├─ api/*.php               (forms, reviews)
                                                                    ├─ admin/index.php         (enquiries + reviews admin)
                                                                    └─ .htaccess               (HTTPS, redirects, security, caching)
```

## 1. Get the package (`alibaba-site.zip`)
**Option A: GitHub (no software needed).** Repo → *Actions* → latest "Build site package" run → *Artifacts* → download `alibaba-site`, unzip it to get `alibaba-site.zip` and `alibaba-config.sample.php`.

**Option B: on a PC with Node 20+.** `npm ci` then `npm run build:site`. The files appear in `dist/`.

## 2. One-time setup in cPanel
1. **Database:** cPanel → *MySQL® Databases* → create a database and a user, add the user to the database with **ALL PRIVILEGES**. Note the three names and the password. (Tables are created automatically the first time the site or admin is used. There is nothing to import.)
2. **Config file:** open `alibaba-config.sample.php`, fill in the database details, choose an admin username and a long admin password, and save it as **`alibaba-config.php`** in your **home folder, one level above `public_html`** (File Manager → `/home/YOURUSER/`). Placing it there means it can never be downloaded from the web. (If you cannot, save it as `public_html/config.php`; the `.htaccess` blocks web access to it.)
3. **Upload the site:** File Manager → `public_html` → *Upload* `alibaba-site.zip` → right-click → *Extract*. Make sure hidden files are shown (Settings → *Show Hidden Files*) and that `.htaccess` is present in `public_html`. Delete the zip afterwards.
4. **HTTPS:** cPanel → *SSL/TLS Status* → *Run AutoSSL* for `alibabatraveladvisor.com` and `www`. The `.htaccess` then forces HTTPS and the non-www address.
5. **PHP version:** cPanel → *Select PHP Version* → 7.4 or newer (8.x recommended). Ensure the extensions `pdo_mysql`, `mbstring` and `json` are ticked (they are by default).

## 3. Check it works
- `https://alibabatraveladvisor.com/` loads; `/visas/uk/`, `/urdu/`, `/refund-policy/` open; a wrong address shows the custom 404 page.
- `/robots.txt` and `/sitemap.xml` load.
- Submit the form on `/consultation/`, then open `/admin/`, log in, and see the enquiry under *Enquiries*. You also get an email at `notify_email` (if your host's mail is enabled).
- `/api/_lib.php` and `/config.php` must show **403 Forbidden**.

## 4. Everyday use
| I want to… | How |
|---|---|
| See / manage enquiries, download them as CSV | `/admin/` → Enquiries |
| Add or approve a real review | `/admin/` → Reviews (appears on the site within ~5 minutes, no rebuild) |
| Turn on Google Analytics / Tag Manager / ads | File Manager → edit `public_html/site-config.json` (`gaId` like `G-XXXX`, or `gtmId` like `GTM-XXXX`, `adsEnabled`). No rebuild |
| Change any page text, a tour, a guide, a country, an office, phone numbers, the announcement bar, the stats | Edit the files in `src/data/` (ask Claude Code: "change X"), run the build, upload the new zip (step 1 → upload → Extract, overwrite). Files are in `src/data/site.ts` (phone, email, stats, announcement), `tours.ts`, `guides.ts`, `countries.ts` / `countryPages.ts`, `offices.ts`, `placeholders.ts` (reviews) |
| Re-deploy after a change | Upload the new `alibaba-site.zip` and Extract over `public_html` (overwrite). Your `alibaba-config.php` (above `public_html`) and the database are untouched |

## 5. Moving your old data (optional)
Your previous Node version stored enquiries in tables `Lead` and `Testimonial`. To keep them, in phpMyAdmin run once (after the new tables exist, i.e. after you have opened `/admin/` once):
```sql
INSERT INTO ab_leads (type, data, source, status, created_at)
  SELECT type, data, source, status, createdAt FROM Lead;
INSERT INTO ab_reviews (name, location, rating, text, published, created_at)
  SELECT name, location, rating, text, published, createdAt FROM Testimonial WHERE published = 0;
```
(Published testimonials are already in the site's own files.) If the old tables were in a different database, adjust the names. You can then drop the old tables.

## Google Search Console
Already set up by the owner. After going live, re-submit `https://alibabatraveladvisor.com/sitemap.xml` and use *URL Inspection → Request indexing* for the home page. URLs now end with a trailing slash (`/visas/uk/`), which is the canonical form used in the sitemap and canonical tags.

## Google Analytics 4 / Tag Manager
1. Create a GA4 property and web stream, and copy the `G-XXXXXXXXXX` id. Put it in `site-config.json` as `gaId` (or use `gtmId` with Tag Manager).
2. Events pushed by the site: `whatsapp_click`, `phone_click`, `email_click`, `cta_click` (any link with `data-cta="name"`), `consultation_request`, `generate_lead` (param `lead_type`), `visa_inquiry`, `tour_inquiry`, `flight_inquiry`, `contact_inquiry`, `language_toggle`.
3. In GA4 → Admin → Events, mark `generate_lead`, `whatsapp_click`, `phone_click` as key events.

## Google Business Profile
- One profile per real, staffed office (Lahore first, then Islamabad, Wazirabad, Karachi). Do not create profiles for cities without offices.
- Name, address and phone must match the website exactly (`src/data/site.ts`, `offices.ts`). Use "Ali Baba Travel Advisor" without extra keywords.
- Primary category "Travel agency", plus "Visa consultant". Add services, hours (Mon–Sat 10:00–18:00), real photos, and link each profile to its `/locations/<city>/` page.
- Ask genuine clients for reviews (see `docs/REVIEW-COLLECTION.md`); reply to every review. Bing Places can import from GBP.

## Troubleshooting
| Symptom | Fix |
|---|---|
| Pages show but forms say nothing / no rows in Enquiries | Open `https://yourdomain/api/reviews.php`. `[]` = OK. `{"error":"Server is not configured yet."}` = config file missing/misplaced. `Service temporarily unavailable` = wrong DB name/user/password in the config |
| 500 error on every page | A line in `.htaccess` your host does not accept. Rename it to `.htaccess.off`, reload; if the site opens, tell us the host's error log line |
| `/visas/uk` (no slash) does not redirect | Make sure `.htaccess` was extracted (hidden file) and `mod_rewrite` is on (default on Namecheap) |
| Old page still shows after upload | Hard refresh (Ctrl+F5). HTML is revalidated on each visit, so it should update right away |
| No emails on new enquiries | Check the spam folder; make sure `from_email` is a real mailbox on your domain. Enquiries are always saved in the admin regardless |
