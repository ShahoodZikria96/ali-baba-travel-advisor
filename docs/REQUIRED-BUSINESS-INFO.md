# REQUIRED BUSINESS INFORMATION (please confirm / supply)

Nothing below was invented. Each item is a placeholder or an assumption carried over from the previous site and must be verified before launch.

| # | Item | Current value / status | Where to change |
|---|------|------------------------|-----------------|
| 1 | Legal company name | Confirmed by owner: "Ali Baba Travel Advisor" | `src/data/site.ts` |
| 2 | Registration / SECP / NTN / IATA or other licence details | **Missing.** Add to About + footer only if real | About page |
| 3 | Public email | `info@alibabatraveladvisor.com` (you supplied it; the old site used a Gmail address). Confirm the mailbox exists | Admin → Settings, `site.ts` |
| 4 | Phone numbers | 0311-1666076 (primary/WhatsApp) and 0309-6611955 (secondary) are used. The other four you supplied (0321-4419469, 0300-3567312, 0300-4044443, 0323-8814614) are stored in `site.ts` `otherPhones` but not displayed. Tell us which office or person each belongs to | Admin → Settings |
| 5 | Opening hours | Assumed Mon–Sat 10:00–18:00 (from the old site). Confirm per office | Admin → Offices; `site.ts` |
| 6 | Islamabad floor detail | "First Floor" removed to match the address you supplied. Confirm | Admin → Offices |
| 7 | Google Business Profile URL per office | Only the Lahore link exists | `site.ts`, Admin → Offices |
| 8 | Social profiles | Facebook, Instagram, YouTube present. No LinkedIn, TikTok or WhatsApp Channel | Admin → Settings |
| 9 | Public stats | Updated to 7,500+ customers and 58,500+ subscribers (migration updates the live DB on `prisma migrate deploy`; later edits via Admin → Settings) | Admin → Settings |
| 10 | Genuine testimonials | 2 real ones from the old site. Add only real, consented reviews | Admin → Testimonials |
| 11 | Success stories | Currently **illustrative samples** (now labelled as such). Replace with real consented case studies or unpublish | Admin → Success Stories |
| 12 | Tour pricing and departures | Prices from the old site; departure dates were dropped as stale. Add current departures | Admin → Tours |
| 13 | Countries: full owner list (41 destinations) is now on `/visas` (`src/data/otherDestinations.ts`) and in the enquiry form. Only 12 have their own reviewed pages. **UAE has a page but is not in your list — confirm or unpublish.** Send verified requirements for any country you want a dedicated page for | Admin → Visa Countries |
| 14 | Services actually offered | Visit, business, family visit, study assistance; refusal review (UK, Canada, Schengen, Australia, USA). No dedicated pages yet for visa appointment, business travel, invitation letters or JR services. Confirm before we add them | Admin |
| 15 | Refund / cancellation terms | Draft principles in `/refund-policy`. Confirm they match real practice | `refund-policy/page.tsx` |
| 16 | Legal review | Privacy, Terms, Refund, Disclaimers are general drafts. Have a lawyer review | `src/app/(marketing)/*` |
| 17 | Refusal work: legal representation? | Site says "consultancy and document review, not legal representation". Confirm. If a licensed lawyer partner exists, say so | Visa refusal pages |
| 18 | Team names, bios, photos (E-E-A-T) | Pulled from Admin → Team | Admin → Team |
| 19 | Urdu: header "اردو" button (machine translation of the whole site, loads only on click) + hand-written `/urdu` page. Have a native speaker proof-read `/urdu` | `urdu/page.tsx` |
| 20 | Production DB text | The live DB keeps old text (e.g. Karachi "opens 7 Sept", old email, old address wording). Update via Admin or re-seed | Admin |
| 21 | Travel History Group Tour | Added from the poster: 10 days, Thailand/Indonesia/Malaysia/Sri Lanka, PKR 560,000 shown as "package price" (poster does not say per person — confirm), book by **5 October 2026** (year assumed), exact departure date and day-by-day itinerary missing | Admin → Tours |
| 22 | Poster note "SINGAPORE / DONE BASE 60k", "Thailand done base 70k", "UK,USA,CANADA" combo | Looked like internal notes, so **not published**. Tell us if these are real package prices/offers | Admin → Tours |
| 23 | Email change | `info@alibabatraveladvisor.com` is used everywhere in code. If you changed it to another address, tell us or update Admin → Settings | Admin → Settings |
