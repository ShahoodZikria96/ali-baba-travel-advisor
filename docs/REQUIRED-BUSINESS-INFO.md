# REQUIRED BUSINESS INFORMATION (please confirm / supply)

Nothing below was invented. Each item is a placeholder or an assumption carried over from the previous site and must be verified before launch.

| # | Item | Current value / status | Where to change |
|---|------|------------------------|-----------------|
| 1 | Registered legal company name | "Ali Baba Travel Advisor" (assumed) | `src/data/site.ts` → `legalName` |
| 2 | Registration / SECP / NTN / IATA or other licence details | **Missing.** Add to About + footer only if real | About page |
| 3 | Public email | `info@alibabatraveladvisor.com` (you supplied it; the old site used a Gmail address). Confirm the mailbox exists | Admin → Settings, `site.ts` |
| 4 | Phone numbers | 0311-1666076 (primary/WhatsApp) and 0309-6611955 (secondary) are used. The other four you supplied (0321-4419469, 0300-3567312, 0300-4044443, 0323-8814614) are stored in `site.ts` `otherPhones` but not displayed. Tell us which office or person each belongs to | Admin → Settings |
| 5 | Opening hours | Assumed Mon–Sat 10:00–18:00 (from the old site). Confirm per office | Admin → Offices; `site.ts` |
| 6 | Islamabad floor detail | "First Floor" removed to match the address you supplied. Confirm | Admin → Offices |
| 7 | Google Business Profile URL per office | Only the Lahore link exists | `site.ts`, Admin → Offices |
| 8 | Social profiles | Facebook, Instagram, YouTube present. No LinkedIn, TikTok or WhatsApp Channel | Admin → Settings |
| 9 | "7,000+ happy customers" and "58,000+ YouTube subscribers" | Carried over from the old site. **Verify or remove.** Shown on the home page | Admin → Settings |
| 10 | Genuine testimonials | 2 real ones from the old site. Add only real, consented reviews | Admin → Testimonials |
| 11 | Success stories | Currently **illustrative samples** (now labelled as such). Replace with real consented case studies or unpublish | Admin → Success Stories |
| 12 | Tour pricing and departures | Prices from the old site; departure dates were dropped as stale. Add current departures | Admin → Tours |
| 13 | Countries actually serviced | 12 exist: UK, Canada, USA, Schengen, Australia, Turkey, Japan, New Zealand, UAE, Malaysia, Azerbaijan, South Africa. Saudi Arabia, Qatar, Kuwait, Oman, Bahrain, China etc. were **not** added. Tell us which you really handle | Admin → Visa Countries |
| 14 | Services actually offered | Visit, business, family visit, study assistance; refusal review (UK, Canada, Schengen, Australia, USA). No dedicated pages yet for visa appointment, business travel, invitation letters or JR services. Confirm before we add them | Admin |
| 15 | Refund / cancellation terms | Draft principles in `/refund-policy`. Confirm they match real practice | `refund-policy/page.tsx` |
| 16 | Legal review | Privacy, Terms, Refund, Disclaimers are general drafts. Have a lawyer review | `src/app/(marketing)/*` |
| 17 | Refusal work: legal representation? | Site says "consultancy and document review, not legal representation". Confirm. If a licensed lawyer partner exists, say so | Visa refusal pages |
| 18 | Team names, bios, photos (E-E-A-T) | Pulled from Admin → Team | Admin → Team |
| 19 | Urdu content | Not added (needs your approval or a translator) | n/a |
| 20 | Production DB text | The live DB keeps old text (e.g. Karachi "opens 7 Sept", old email, old address wording). Update via Admin or re-seed | Admin |
