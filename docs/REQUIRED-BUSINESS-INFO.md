# REQUIRED BUSINESS INFORMATION (please confirm / supply)

Nothing below was invented. Each item is a placeholder or an assumption carried over from the previous site and must be verified before launch.

| # | Item | Current value / status | Where to change |
|---|------|------------------------|-----------------|
| 1 | Legal company name | Confirmed by owner: "Ali Baba Travel Advisor" | `src/data/site.ts` |
| 2 | Registration / SECP / NTN / IATA / licence details | Not available yet (owner). Nothing is claimed on the site. Add to About + footer when available | About page |
| 3 | Public email | `info@alibabatraveladvisor.com` (you supplied it; the old site used a Gmail address). Confirm the mailbox exists | `src/data/site.ts`, `site.ts` |
| 4 | Phone numbers | All 6 numbers from your poster are now shown on Contact and Urdu pages as booking lines (0311-1666076 is primary/WhatsApp). Optional: tell us which office each belongs to | `src/data/site.ts`, `site.ts` |
| 5 | Opening hours | Confirmed by owner: Mon–Sat 10:00 AM – 6:00 PM at all offices | Done |
| 6 | Islamabad floor detail | "First Floor" removed to match the address you supplied. Confirm | `src/data/offices.ts` |
| 7 | Google Business Profile URL per office | Only the Lahore link exists | `site.ts`, `src/data/offices.ts` |
| 8 | Social profiles | Facebook, Instagram, YouTube present. No LinkedIn, TikTok or WhatsApp Channel | `src/data/site.ts` |
| 9 | Public stats | Updated to 7,500+ customers and 58,500+ subscribers (edit `publicSettings` in `src/data/site.ts`) | `src/data/site.ts` |
| 10 | Genuine testimonials | 2 earlier reviews + 3 real Google reviews supplied by the owner (Ahmad Nasir, Mubashar Iqbal, Umair Ahmad; the first two are 5-star text reviews, the third is short). Keep adding real ones | `/admin/` → Reviews |
| 11 | Success stories | Currently **illustrative samples** (now labelled as such). Replace with real consented case studies or unpublish | `src/data/placeholders.ts` |
| 12 | Tour pricing and departures | Travel History tour: November 2026, PKR 560,000 per person, booking closes 5 Oct 2026. Other tours: add current departures | `src/data/tours.ts` |
| 13 | Countries | Full 41-destination list is on `/visas`. **UAE removed** (unpublished, `/visas/uae` redirects to `/visas`). Only 10 destinations have their own pages | Done |
| 14 | Services actually offered | Visit, business, family visit, study assistance; refusal review (UK, Canada, Schengen, Australia, USA). No dedicated pages yet for visa appointment, business travel, invitation letters or JR services. Confirm before we add them | Admin |
| 15 | Refund / cancellation terms | Owner's document published as `/refund-policy` | Done |
| 16 | Legal review | Privacy + Refund now use the owner's own documents. Terms, Disclaimer, Visa Disclaimer, Cookie Policy are still general drafts | `src/app/(marketing)/*` |
| 17 | Judicial review / legal work | Owner: handled by the in-house legal team. Site now says so. **Still needed:** whether that team is regulated/licensed (e.g. lawyers/solicitors) — needed before claiming anything more | Visa refusal pages |
| 18 | Team names, bios, photos (E-E-A-T) | Pulled from `src/data/team.ts` | `src/data/team.ts` |
| 19 | Urdu | Header "اردو" button (machine translation) + hand-written `/urdu`, proofread by Claude (owner asked); a native-speaker read is still ideal | `urdu/page.tsx` |
| 20 | Old Node/database version | Replaced by the static site. Content now comes from `src/data/*`, which already contains all the updates. Old enquiries can be imported once (see `docs/DEPLOYMENT-CPANEL.md` step 5). Any text edited only in the OLD admin panel is not carried over. Tell us if you edited anything there | Done |
| 21 | Travel History Group Tour | Departure Nov 2026, PKR 560,000 per person (confirmed). Still missing: exact date, itinerary | `src/data/tours.ts` |
| 22 | Poster note "SINGAPORE / DONE BASE 60k", "Thailand done base 70k", "UK,USA,CANADA" combo | Looked like internal notes, so **not published**. Tell us if these are real package prices/offers | `src/data/tours.ts` |
| 23 | Email change | `info@alibabatraveladvisor.com` is used everywhere in code. If you changed it to another address, tell us or update `src/data/site.ts` | `src/data/site.ts` |
