# REQUIRED BUSINESS INFORMATION (please confirm / supply)

Nothing below was invented. Each item is a placeholder or an assumption carried over from the previous site and must be verified before launch.

| # | Item | Current value / status | Where to change |
|---|------|------------------------|-----------------|
| 1 | Legal company name | Confirmed by owner: "Ali Baba Travel Advisor" | `src/data/site.ts` |
| 2 | Registration / SECP / NTN / IATA / licence details | Not available yet (owner). Nothing is claimed on the site. Add to About + footer when available | About page |
| 3 | Public email | `info@alibabatraveladvisor.com` (you supplied it; the old site used a Gmail address). Confirm the mailbox exists | Admin → Settings, `site.ts` |
| 4 | Phone numbers | All 6 numbers from your poster are now shown on Contact and Urdu pages as booking lines (0311-1666076 is primary/WhatsApp). Optional: tell us which office each belongs to | Admin → Settings, `site.ts` |
| 5 | Opening hours | Confirmed by owner: Mon–Sat 10:00 AM – 6:00 PM at all offices | Done |
| 6 | Islamabad floor detail | "First Floor" removed to match the address you supplied. Confirm | Admin → Offices |
| 7 | Google Business Profile URL per office | Only the Lahore link exists | `site.ts`, Admin → Offices |
| 8 | Social profiles | Facebook, Instagram, YouTube present. No LinkedIn, TikTok or WhatsApp Channel | Admin → Settings |
| 9 | Public stats | Updated to 7,500+ customers and 58,500+ subscribers (migration updates the live DB on `prisma migrate deploy`; later edits via Admin → Settings) | Admin → Settings |
| 10 | Genuine testimonials | 2 earlier reviews + 3 real Google reviews supplied by the owner (Ahmad Nasir, Mubashar Iqbal, Umair Ahmad; the first two are 5-star text reviews, the third is short). Keep adding real ones | Admin → Testimonials |
| 11 | Success stories | Currently **illustrative samples** (now labelled as such). Replace with real consented case studies or unpublish | Admin → Success Stories |
| 12 | Tour pricing and departures | Travel History tour: November 2026, PKR 560,000 per person, booking closes 5 Oct 2026. Other tours: add current departures | Admin → Tours |
| 13 | Countries | Full 41-destination list is on `/visas`. **UAE removed** (unpublished, `/visas/uae` redirects to `/visas`). Only 10 destinations have their own pages | Done |
| 14 | Services actually offered | Visit, business, family visit, study assistance; refusal review (UK, Canada, Schengen, Australia, USA). No dedicated pages yet for visa appointment, business travel, invitation letters or JR services. Confirm before we add them | Admin |
| 15 | Refund / cancellation terms | Owner's document published as `/refund-policy` | Done |
| 16 | Legal review | Privacy + Refund now use the owner's own documents. Terms, Disclaimer, Visa Disclaimer, Cookie Policy are still general drafts | `src/app/(marketing)/*` |
| 17 | Judicial review / legal work | Owner: handled by the in-house legal team. Site now says so. **Still needed:** whether that team is regulated/licensed (e.g. lawyers/solicitors) — needed before claiming anything more | Visa refusal pages |
| 18 | Team names, bios, photos (E-E-A-T) | Pulled from Admin → Team | Admin → Team |
| 19 | Urdu | Header "اردو" button (machine translation) + hand-written `/urdu`, proofread by Claude (owner asked); a native-speaker read is still ideal | `urdu/page.tsx` |
| 20 | Production DB text | The live DB keeps old text (e.g. Karachi "opens 7 Sept", old email, old address wording). Update via Admin or re-seed | Admin |
| 21 | Travel History Group Tour | Departure Nov 2026, PKR 560,000 per person (confirmed). Still missing: exact date, itinerary | Admin → Tours |
| 22 | Poster note "SINGAPORE / DONE BASE 60k", "Thailand done base 70k", "UK,USA,CANADA" combo | Looked like internal notes, so **not published**. Tell us if these are real package prices/offers | Admin → Tours |
| 23 | Email change | `info@alibabatraveladvisor.com` is used everywhere in code. If you changed it to another address, tell us or update Admin → Settings | Admin → Settings |
