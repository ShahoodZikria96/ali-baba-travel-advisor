# SEO, Local SEO, Monetization and Roadmap

No ranking is promised. This is a technically sound, white-hat foundation plus a plan for earning visibility.

## 1. Architecture (existing URLs kept; alternates 301-redirect)
| Section | URL | Notes |
|---|---|---|
| Home | `/` | H1 "Visa Consultant & Travel Agency in Lahore, Serving All of Pakistan" |
| Visa services | `/visa-consultancy`, `/visa-consultancy/{visit-visa,business-visa,family-visit-visa,study-visa}` | Service schema + FAQ |
| Countries | `/visas`, `/visas/{slug}` (12) | Service + FAQ + Breadcrumb schema, official-source links, related help, "last reviewed" |
| Refusal help | `/visa-refusal`, `/visa-refusal/{uk,canada,schengen,australia,usa}` | Wording is consultancy/document review, not legal representation |
| Tours | `/tour-packages`, `/tour-packages/{slug}`, `/group-tours`, `/customized`, `/upcoming` | |
| Flights and hotels | `/flights`, `/hotel-booking` | |
| Trust | `/about`, `/team`, `/contact`, `/visa-process`, `/locations`, `/success-stories`, `/faqs` | |
| Legal | `/privacy-policy`, `/terms`, `/refund-policy`, `/disclaimer`, `/visa-disclaimer`, `/cookie-policy` | |
| Guides | `/guides`, `/guides/{slug}` | BlogPosting schema, monetization slot, disclaimer |
| Locations | `/locations/{lahore,islamabad,wazirabad,karachi}` | Only real offices get pages |

301 map (in `next.config.ts`): `/visa`, `/countries[/x]`, `/services[/x]`, `/blog[/x]`, `/about-us`, `/contact-us`, `/privacy`, `/terms-and-conditions`, `/tours`, `/hotels`, `/offices`.

**Why no /countries/uk or /services/... rewrite:** the live URLs (`/visas/*`, `/visa-consultancy/*`) already exist and may be indexed; renaming them costs rankings for no gain. The alternate names redirect instead.

**Faisalabad, Multan, Sialkot, Peshawar, Quetta, Gujranwala, Rawalpindi:** no thin city pages and no false office claims. `/locations` has a "Clients from other cities" section that links to the nearest real office. Create a city page only when there is a real office or unique local content.

## 2. Keyword and topic architecture
| Pillar | Primary intent | Target page | Supporting content |
|---|---|---|---|
| Lahore travel agency / visa consultant Lahore | Local, transactional | `/`, `/locations/lahore` | GBP, reviews, Lahore FAQs |
| Pakistan visa consultant | Nationwide, commercial | `/visa-consultancy` | visit, business, family, study pages |
| {Country} visa from Pakistan | Informational to commercial | `/visas/{slug}` | Guides such as "UK visit visa from Pakistan" |
| Visa refused / reapply | Problem-aware | `/visa-refusal/{slug}` | Refusal-reason guides (add per country) |
| Tour packages from Pakistan | Commercial | `/tour-packages/*` | Budget/itinerary guides |
| Airline tickets and hotels | Transactional | `/flights`, `/hotel-booking` | Air Blue and airline guides |

Secondary and long-tail examples: "visit visa requirements for Pakistani citizens", "Schengen visa from Lahore", "Canada visitor visa refusal reapply", "family visit visa UK Pakistan", "Europe group tour from Lahore".

## 3. Internal linking
- Global nav and footer link every hub, the legal pages and every office.
- Country page → matching service pages, refusal page (if one exists), related guides (matched by slug or name), other destinations.
- Guide → matching country page, `/visa-consultancy`, `/contact`, other guides.
- Location page → popular country pages, all services, other offices.
- Every page has breadcrumbs, and every new page appears in `sitemap.ts`, so there are no orphan pages.
- Anchor text is natural (destination or service names), not repeated exact-match phrases.

## 4. Schema (JSON-LD, all rendered server-side)
`TravelAgency` (organization, with @id, contact points, offers catalog, address per open office, hours, geo), `WebSite`, per-office `TravelAgency` branches (with `parentOrganization`), `Service` (country, service and refusal pages), `FAQPage` (where the visible FAQ exists), `BreadcrumbList` (all pages), `BlogPosting` (guides, with dateModified). **Not used:** `Review` / `AggregateRating` (add only from real, on-page reviews that meet Google's policies), `Person` (add when team bios are real).

## 5. Technical SEO checklist
- [x] Canonical URL, OG and Twitter tags on every page (`pageMetadata`).
- [x] `robots.txt` (blocks `/admin`, `/api`, tracking parameters) and a dynamic `sitemap.xml` with real `lastModified`.
- [x] One H1 per page, breadcrumbs, custom 404.
- [x] 301 map, HSTS, `nosniff`, frame-ancestors, Referrer-Policy, Permissions-Policy, `X-Powered-By` removed.
- [x] next/image with AVIF/WebP, lazy loading, 30-day static image cache.
- [x] Analytics scripts load after hydration; the click tracker is one delegated listener.
- [x] Skip link, semantic landmarks, mobile sticky call/WhatsApp/consultation bar.
- [ ] Compress the destination JPEGs at the source (`public/destinations/*.jpg`) to below 150 KB each.
- [ ] Run PageSpeed Insights / Lighthouse on the live URL and fix anything that appears.
- [ ] Add a real OG image per country page (currently the hero photo).
- [ ] Test on real Android Chrome, iPhone Safari and tablet.

## 6. Local SEO checklist
- [x] NAP centralised (`src/data/site.ts` + DB settings) and mirrored in schema.
- [x] Real offices only: Lahore, Islamabad, Wazirabad, Karachi. Each has a unique page with local context, areas served, FAQs and a map link.
- [ ] Claim and verify a GBP per office (see DEPLOYMENT-CPANEL.md), then add each GBP URL to `sameAs`.
- [ ] Bing Places, Apple Business Connect.
- [ ] Citations (identical NAP): Pakistani business directories and travel-industry listings.
- [ ] Collect genuine Google reviews.

## 7. Off-page strategy (white-hat only)
Do: Google Business Profile, Bing Places, verified Pakistani directories, genuine reviews, a monthly Facebook/YouTube/Instagram content loop that reuses guides (the YouTube channel already has an audience: embed or link videos on matching guides), digital PR (data-based local stories such as "common refusal reasons we see" using anonymised, real data), guest posts on Pakistani travel/finance blogs, partnerships with airlines, hotels and tourism boards, and helpful answers on Quora, Reddit, Facebook groups and travel forums.
Do not: buy links, use link farms, PBNs, automated tools, fake profiles or fake reviews, or spam comments and forums.
Forum rule: answer the question fully first, disclose affiliation, and link only when it genuinely helps and the rules allow it.
Outreach targets to research: Pakistan travel bloggers, university international offices, chambers of commerce (Lahore, Islamabad, Karachi, Sialkot), airline and hotel partners, expat community groups, local news travel sections, Tourism Dept Punjab events.

## 8. Monetization readiness
- `AdSlot` (guide pages only) is off by default, has a reserved height so there is no layout shift, and renders a visible "Advertisement" label. Enable with `NEXT_PUBLIC_ADS_ENABLED=true` after AdSense approval.
- `AffiliateNotice` renders only entries added to `src/data/partners.ts`, always `rel="sponsored"` with a disclosure line.
- Service, country, contact and consultation pages never render ads. Lead generation stays separate.
- Apply for AdSense once there are ~20 quality guides and steady traffic. Candidate affiliates: hotel booking platforms, flight search, travel insurance (must be compliant for Pakistani users).

## 9. Analytics
GA4 or GTM loads only when the env var is set. Events: see DEPLOYMENT-CPANEL.md. Naming is snake_case and consistent.

## 10. Security summary
- Lead API: Zod schema, payload cap (10 KB), same-origin check, honeypot, IP rate limit (8 per 10 min).
- Admin login: rate-limited (8 per 15 min), same-origin check, bcrypt, httpOnly SameSite cookie, JWT secret from env.
- The seed script refuses weak or missing admin credentials (no default password).
- `.env*` is git-ignored. The rate limiter is in-memory, which suits a single cPanel Node process.
- Recommended next: a CAPTCHA (Cloudflare Turnstile) if spam appears; an audit log for admin changes.

## 11. Post-launch roadmap
**Months 0–3 (foundation):** Fix every item in REQUIRED-BUSINESS-INFO.md; verify GSC/GA4/GBP; compress images and pass Core Web Vitals; publish 8–10 guides from real questions (UK visit visa from Pakistan, Schengen from Pakistan, Canada visitor visa, Japan tourist visa, France tourist visa, Dubai visit visa, business visa guide, refusal-reason guides); collect first 15–25 genuine reviews; GBP for every office; register in 10–15 reputable directories.
**Months 3–6 (authority):** Extend each country page with verified processing and fee sections, updated quarterly; publish 2–4 guides a month; add real case studies (with consent); YouTube-to-guide embedding; 3–5 quality earned links (partners, PR, guests); review GSC queries and rewrite titles for pages with impressions but low CTR; consider Urdu summaries (one page per pillar, hreflang) if data supports it.
**Months 6–12 (scale):** Add pages only for services and countries you really handle (e.g. Gulf, appointment assistance, business travel); city pages only where there is a real office or unique content; apply for AdSense and add affiliates on guides; quarterly content audit (prune or merge thin pages); consider Review schema when there are on-site genuine reviews; track leads by source in GA4 and improve conversion (form length, WhatsApp prompts).
