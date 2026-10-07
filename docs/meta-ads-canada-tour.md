# Meta (Facebook / Instagram) Ads: Canada Group Tour, First Test

Budget for the test: **Rs 500 to 600 per day for 7 days** (about Rs 3,500 to 4,200 in total).
That is enough to learn which poster and message work. It is not enough to promise a number of leads.
A test with a total of Rs 500 for the whole week would not teach you anything.

## Before you start (once)

1. **Facebook Page** for Ali Baba Travel Advisor (you already have it). The ad runs from the Page.
2. **Meta Ads Manager account** with a payment method added.
3. Optional but strongly recommended: a **Meta Pixel**.
   - Events Manager > Connect data sources > Web > create a Pixel and copy its **Pixel ID** (digits only).
   - Open `site-config.json` on the server (cPanel File Manager, `public_html/site-config.json`) and add the ID:
     ```json
     {
       "gaId": "",
       "gtmId": "",
       "metaPixelId": "123456789012345",
       "adsEnabled": false,
       "adsenseClient": ""
     }
     ```
   - No rebuild is needed. The site then reports `PageView`, `Lead` (form submit) and `Contact` (WhatsApp or call click) to Meta.
4. Landing page for the ad link: `https://alibabatraveladvisor.com/lp/canada-group-tour/`

## Which campaign type? Two options

**Option A: Click-to-WhatsApp (best for Rs 500 to 600 a day).**
Objective: **Engagement, then Messaging (WhatsApp)**. The ad opens a WhatsApp chat with you. No Pixel needed. Cheapest way to get real conversations in Pakistan.

**Option B: Website leads.**
Objective: **Leads** or **Traffic** to the landing page above, with the Pixel installed. Needs more budget to learn.

**Recommendation:** run Option A for the first 7 days. Add Option B later with the learnings.

## Audience (one ad set)

- **Location:** Pakistan, or pick cities: Lahore, Islamabad, Rawalpindi, Karachi, Faisalabad, Gujranwala, Sialkot (include +25 km around each).
- **Age:** 25 to 55.
- **Interests:** International travel, Travel, Canada, Frequent international travellers. Keep it broad; do not narrow too much with a small budget.
- **Language:** leave as All, or English plus Urdu.
- **Placements:** Advantage+ (automatic).
- **Do not** add many ad sets. One campaign, one ad set, 3 ads.

## The 3 ads to test

Use the poster `public/tours/canada-group-tour.webp` (1080 x 1080) for all three, and change only the text. This tells you which message works.

**Ad 1: The offer**
- Primary text: `Canada Group Tour, March 2027. Niagara Falls, Toronto, Banff and Ottawa with visa support, 4-star hotels, return flights and breakfast. Travel with our CEO Syed Ali Jawad. Seats are limited: message us for the price.`
- Headline: `Canada Group Tour, March 2027`
- Button: `Send WhatsApp message`

**Ad 2: The experience**
- Primary text: `Standing at Niagara Falls, then the Rocky Mountains at Banff. One guided trip, flights and hotels included, visa support from our team. March 2027 departure from Pakistan. Message us for details.`
- Headline: `See Niagara, Toronto and Banff`
- Button: `Send WhatsApp message`

**Ad 3: Trust**
- Primary text: `200+ Google reviews, offices in Lahore, Islamabad, Wazirabad and Karachi. Our Canada group tour leaves in March 2027 with our CEO. Ask us what is included.`
- Headline: `Trusted by thousands of travellers`
- Button: `Send WhatsApp message`

**Prefilled WhatsApp message** (set in the ad's WhatsApp settings):
`Hi, I would like details and the price for the Canada group tour (March 2027).`

## Rules for ad text (Meta policy and honesty)

- Never write "visa guaranteed" or "100 percent visa". Only the embassy decides.
- Do not use the Canadian flag or logos in a way that suggests you are the Canadian government.
- Keep the price in WhatsApp until you have confirmed it. Do not show a price that is not final.

## Daily routine for the 7 days

- **Day 1 to 3:** do not touch anything. Meta needs time to learn.
- **Day 4:** check results. Look at: cost per message (or per lead), number of conversations, and which ad has the lowest cost.
- **Day 5 to 7:** pause the worst ad, keep the best two, and raise the budget by at most 20 percent.
- Answer every message within an hour. Fast replies decide whether a message turns into a booking.

## What to record

| Date | Spend (Rs) | Messages or leads | Cost per message (Rs) | Real enquiries | Bookings | Best ad |
|---|---|---|---|---|---|---|

After 7 days, decide:
- If the cost per message is acceptable and the enquiries are serious, keep going and add Option B.
- If messages are cheap but nobody is serious, tighten the text (put the "Seats are limited, March 2027" wording first) and show the price range in the ad.
- If almost nobody messages, try the Urdu version of the same text, or another poster.

## Where leads appear

- Website form leads: `/leads-portal/` (and `/admin/` enquiries). The page address includes the ad tag, for example `?utm_source=facebook&utm_campaign=canada-march`.
- WhatsApp messages: your WhatsApp Business inbox.

## Ad link with tracking tags (use this exact link for website-click ads)

```
https://alibabatraveladvisor.com/lp/canada-group-tour/?utm_source=facebook&utm_medium=paid&utm_campaign=canada-march-2027&utm_content=ad1
```
Change `utm_content` to `ad2`, `ad3` for the other ads. Each lead then shows which ad it came from.
