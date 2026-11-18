# Google Business Profile: ready-to-paste optimisation pack

Use this for each office profile (Lahore, Islamabad, Wazirabad, Karachi). Everything below matches the website (`src/data/site.ts`, `src/data/offices.ts`). Nothing here promises a visa outcome.

## 1. Rules that protect the profile
- **Business name:** exactly `Ali Baba Travel Advisor`. No city, no keywords (keyword-stuffed names get profiles suspended).
- **One profile per real, staffed office.** Do not add cities without an office.
- **Name, address, phone must match the website exactly** (see section 7).
- **Hours:** Monday to Saturday, 10:00 to 18:00 (Sunday closed). Add holiday hours when they change.
- **Website link per office:** `https://alibabatraveladvisor.com/locations/<city>/` (lahore, islamabad, wazirabad, karachi). Plain URLs, no extra parameters.
- Never buy, trade or "gate" reviews, and never write reviews yourself. Ask real clients (see `docs/REVIEW-COLLECTION.md`).

## 2. Categories
- **Primary:** Travel agency
- **Additional:** Visa consultant, Tour agency, Ticket agent (airline tickets).
- If "Immigration consultant" is offered, add it only if you also provide that service.

## 3. Business description (max 750 characters)
Same text for every office; change only the city line.

> Ali Baba Travel Advisor is a visa consultancy and travel agency in Pakistan with offices in Lahore, Islamabad, Wazirabad and Karachi. We help individuals, families and businesses with visit, business and family visa files, visa refusal case review, international group tours, tour packages, airline tickets and hotel booking. Visit our [CITY] office for a face-to-face consultation, or call or WhatsApp 0311-1666076. Visa decisions are made only by the embassy or immigration authority, and we never guarantee an outcome.

## 4. Services (add each as a service with this short description)
| Service | Description |
|---|---|
| Visa consultancy | Assessment, document checklist and file review for visit, business and family visas. |
| Visa refusal case review | We read your refusal letter and explain what to fix before you reapply. |
| Schengen and Belgium business visa | File preparation, invitation letter and document check, appointment planning. |
| UK, USA, Australia, Japan visa guidance | Document checklist, form help and interview preparation. |
| International group tours | Japan (Jan to Feb 2027), USA (Mar to Apr 2027), Canada (Mar 2027) and more. Limited seats. |
| Tour packages | Custom packages from Pakistan: Europe, Turkey, Thailand, Malaysia, Dubai and others. |
| Airline tickets | Domestic and international tickets and flight bookings for visa files. |
| Hotel booking | Hotel reservations for travel and visa applications. |

## 5. Products (use for the group tours)
Add one product per tour with the poster as the photo, a link to the tour page and no price unless the price is confirmed.
- Japan Group Tour 2027: 7 days / 6 nights, Osaka and Tokyo. Link `/tour-packages/japan-group-tour/`
- USA Group Tour, March to April 2027. Link `/tour-packages/usa-group-tour/`
- Canada Group Tour, March 2027. Link `/tour-packages/canada-group-tour/`
- Travel History Group Tour (Thailand, Indonesia, Malaysia, Sri Lanka). Link `/tour-packages/travel-history-group-tour/`

## 6. Posts (publish one a week; re-use these)
1. **Japan group tour** (photo: `public/tours/japan-group-tour-2027.webp`): "Japan Group Tour 2027 is open. 7 days, Osaka and Tokyo, bullet train, Kyoto, Nara and Mount Fuji. Flights, 3-star hotels and meals included. Limited seats. Call or WhatsApp 0311-1666076." Button: Learn more, link to the tour page.
2. **Free consultation** : "Planning a visit, business or family visa? Bring your documents and we will check them with you. Visit our office Monday to Saturday, 10 am to 6 pm." Button: Call now.
3. **Refusal review**: "Visa refused? Do not reapply in a hurry. Send us your refusal letter and we will explain the reasons and what to fix. No outcome is guaranteed." Button: Learn more, link `/visa-refusal/`.
4. **Guide**: "Group tour or solo trip? Seven questions to ask before you pay a deposit." Button: Learn more, link `/guides/group-tour-vs-solo-trip-from-pakistan-which-is-better/`.
5. **Canada / USA group tour posters** with the same style as post 1.

## 7. Name, address, phone (copy exactly)
| Office | Address |
|---|---|
| Lahore | Office No. 1 & 2, Mezzanine Floor, Siddiq Trade Center, Gulberg II, Lahore |
| Islamabad | Office No. 33-34, Al-Anayat Mall, G-11 Markaz, Islamabad |
| Wazirabad | Arif Shaheed Road, near Bank Alfalah, Wazirabad |
| Karachi | Office No. 3, Mezzanine Floor, 10C Building, 12 Commercial Street, near Cafe Musa, DHA Phase 2 Extension, Karachi |

Phone: +92 311 1666076 (primary). Additional: +92 309 6611955. Email: info@alibabatraveladvisor.com.
Attributes to switch on if true: "Appointment required: no", "Wheelchair accessible entrance", "Online appointments", "Identifies as women-led" ONLY if accurate.

## 8. Questions and answers (post them yourself from the office account)
- **Do you guarantee a visa?** No. Visas are decided only by the embassy. We prepare your file and review it.
- **How do I book a consultation?** Call or WhatsApp 0311-1666076, or visit the office Monday to Saturday, 10 am to 6 pm.
- **Which countries do you handle?** UK, USA, Schengen, Australia, Japan, Turkey, Malaysia, Thailand and more. See the visas page on our website.
- **Do you run group tours?** Yes: Japan (Jan to Feb 2027), USA (Mar to Apr 2027), Canada (Mar 2027). Seats are limited.
- **Can I come without an appointment?** Yes, during opening hours, but calling first saves you waiting time.

## 9. Photos (this is where most profiles are weak)
Upload real photos only, at least 10 per office: storefront from the street, the entrance and the signboard, reception, consultation desk, the team (with consent), group-tour departures and happy clients (with consent). Add a logo and a cover photo. Do not use stock images or AI images for the office.

## 10. Reviews
- Share the review link with clients after a completed service. Reply to every review within 2 days, positive or negative.
- Reply template, positive: "Thank you [name] for your kind words. We are glad we could help with your [visa/tour]. Safe travels from the Ali Baba Travel Advisor team."
- Reply template, negative: "We are sorry about your experience, [name]. Please call 0311-1666076 or message us so we can look at your case and put it right." Never argue in public and never share a client's file details.

## 11. Monthly checklist
- Weekly post, answer new questions, reply to reviews.
- Add new group tours as products when they launch; archive expired ones.
- Update holiday hours.
- Check Insights: calls, direction requests, website clicks, and the search terms used.
- Keep the review count and rating on the website (`googleReviews` in `src/data/site.ts`) in step with the profile.
