export interface CountryPageContent {
  slug: string;
  name: string;
  flagImage?: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  whoCanApply: string[];
  visaTypes: { name: string; description: string }[];
  documents: string[];
  financialNote: string;
  processingTime: string;
  steps: string[];
  refusalReasons: string[];
  faqs: { question: string; answer: string }[];
}

export const countryPages: CountryPageContent[] = [
  {
    slug: "uk",
    name: "United Kingdom",
    flagImage: "/flags/uk.webp",
    metaTitle: "UK Visit Visa from Pakistan",
    metaDescription:
      "UK Standard Visitor visa guidance from Pakistan — requirements, documents, processing time and common refusal reasons.",
    intro:
      "The UK Standard Visitor visa covers tourism, visiting family, short business trips and medical treatment. Ali Baba Travel Advisor helps Pakistani applicants prepare their documentation and understand what UK Visas and Immigration expects to see in a genuine visitor application.",
    whoCanApply: [
      "Tourists planning to visit the UK for leisure",
      "Applicants visiting family or friends settled in the UK",
      "Business travelers attending meetings, conferences or training",
      "Applicants attending a short course of up to 6 months",
    ],
    visaTypes: [
      { name: "Standard Visitor Visa", description: "Covers tourism, family visits and short business activity, typically issued for up to 6 months." },
      { name: "Business Visitor Visa", description: "For meetings, conferences, negotiations and site visits with a UK-based company." },
      { name: "Family Visit Visa", description: "For visiting close relatives who are settled or studying/working in the UK." },
    ],
    documents: [
      "Valid passport with at least one blank page",
      "Completed online visa application (VAF9)",
      "Recent passport-size photographs",
      "Bank statements covering the last 6 months",
      "Employment letter or business registration documents",
      "Property or asset documents demonstrating ties to Pakistan",
      "Invitation letter (for family or business visits)",
      "Travel itinerary and hotel booking or accommodation details",
    ],
    financialNote:
      "There is no fixed minimum bank balance for a UK visitor visa. The Entry Clearance Officer instead looks at whether your funds are consistent with your declared income and travel plan, and whether they have been held for a reasonable period rather than deposited shortly before applying.",
    processingTime: "Standard processing is usually 3 to 4 weeks from the biometric appointment, though priority services can reduce this.",
    steps: [
      "Initial consultation to assess eligibility and travel purpose",
      "Document checklist and financial evidence review",
      "Online application form (VAF9) completion",
      "Biometric appointment booking at the visa application centre",
      "Submission and tracking until a decision is issued",
    ],
    refusalReasons: [
      "Insufficient evidence of ties to Pakistan (home, job, family, business)",
      "Bank statements that don't match declared income or show unexplained deposits",
      "Unclear or inconsistent purpose of visit",
      "Sponsor's documents not meeting the required standard",
      "Previous UK immigration history not properly explained",
    ],
    faqs: [
      { question: "How much bank balance is required for a UK visit visa?", answer: "There's no fixed figure. What matters is that your funds are genuine, consistent with your income, and enough to cover your trip without needing to work in the UK." },
      { question: "Can I apply again after a UK visa refusal?", answer: "Yes. We review the refusal letter, identify the specific concerns raised by the Entry Clearance Officer, and help you address them before reapplying." },
      { question: "Do you guarantee visa approval?", answer: "No consultancy can guarantee a visa outcome — the decision rests solely with UK Visas and Immigration. We focus on presenting the strongest possible, genuine application." },
    ],
  },
  {
    slug: "canada",
    name: "Canada",
    flagImage: "/flags/canada.webp",
    metaTitle: "Canada Visitor Visa from Pakistan",
    metaDescription:
      "Canada Temporary Resident Visa (visitor visa) guidance from Pakistan — documentation, financial evidence and processing information.",
    intro:
      "Canada's Temporary Resident Visa (TRV) allows Pakistani nationals to visit for tourism, to see family, or for short business purposes. IRCC places significant weight on an applicant's ties to Pakistan and their travel history when assessing genuine intent to return.",
    whoCanApply: [
      "Tourists and leisure travelers",
      "Applicants visiting family members in Canada",
      "Business visitors attending meetings or conferences",
      "Applicants attending a wedding or family event",
    ],
    visaTypes: [
      { name: "Single-Entry Visitor Visa", description: "Valid for one entry into Canada within a specified period." },
      { name: "Multiple-Entry Visitor Visa", description: "Allows several visits over a period, commonly issued up to 10 years or passport expiry." },
      { name: "Super Visa", description: "A long-stay option for parents and grandparents of Canadian citizens or permanent residents." },
    ],
    documents: [
      "Valid passport",
      "Digital photograph meeting IRCC specifications",
      "Proof of funds (bank statements, pay slips)",
      "Letter of invitation, if applicable",
      "Travel history and previous visas",
      "Proof of ties to Pakistan (employment, property, family)",
      "Purpose-of-travel letter",
    ],
    financialNote:
      "IRCC does not publish a fixed minimum amount for a visitor visa. Officers assess whether your funds are sufficient for the length and nature of your stay and whether the source of funds is well documented.",
    processingTime: "Processing times vary and are published by IRCC; straightforward applications from Pakistan commonly take several weeks.",
    steps: [
      "Case assessment and document checklist",
      "IRCC online account setup and form completion",
      "Financial and supporting document review",
      "Biometrics appointment",
      "Application submission and status tracking",
    ],
    refusalReasons: [
      "Officer not satisfied the applicant will leave Canada by the end of their stay",
      "Insufficient or unclear financial documentation",
      "Weak or no travel history",
      "Purpose of visit not clearly established",
      "Family ties in Canada raising dual-intent concerns without adequate explanation",
    ],
    faqs: [
      { question: "Can a previously refused Canada applicant reapply?", answer: "Yes — we assess the refusal letter (procedural fairness or refusal reasons) and help strengthen the reapplication, particularly around financial evidence and ties to Pakistan." },
      { question: "What is a Canada reconsideration request?", answer: "It's a request asking IRCC to review a decision without a new application, used in limited circumstances such as an officer error. We can advise whether this route is appropriate for your case." },
      { question: "Is Canada judicial review something Ali Baba Travel Advisor handles directly?", answer: "We provide consultancy and case guidance, and coordinate with qualified legal counsel for judicial review proceedings, since that is a formal legal process." },
    ],
  },
  {
    slug: "usa",
    name: "United States",
    flagImage: "/flags/usa.webp",
    metaTitle: "USA Visit Visa (B1/B2) from Pakistan",
    metaDescription: "USA B1/B2 visitor visa guidance from Pakistan — documentation, interview preparation and processing information.",
    intro:
      "The B1/B2 visa is the standard US visitor visa, covering business (B1) and tourism, family visits or medical treatment (B2). Along with documentation, the consular interview plays a central role in a US visa decision, so preparation matters.",
    whoCanApply: [
      "Tourists and leisure travelers",
      "Applicants visiting family in the US",
      "Business travelers (meetings, conferences, negotiations)",
      "Applicants seeking short-term medical treatment",
    ],
    visaTypes: [
      { name: "B1 Business Visitor", description: "For business meetings, conferences and negotiations — not for employment." },
      { name: "B2 Tourist Visitor", description: "For tourism, visiting family or friends, and medical treatment." },
      { name: "B1/B2 Combined", description: "The most commonly issued category, covering both business and tourism purposes." },
    ],
    documents: [
      "Valid passport",
      "DS-160 confirmation page",
      "Visa appointment confirmation",
      "Photograph meeting US visa specifications",
      "Bank statements and proof of income",
      "Employment or business ownership documents",
      "Evidence of ties to Pakistan",
    ],
    financialNote:
      "There's no published minimum balance for a B1/B2 visa. The consular officer wants to see stable, verifiable finances that support your trip and your intention to return to Pakistan.",
    processingTime: "Appointment wait times vary by consulate; once interviewed, many B1/B2 decisions are issued the same day, with some cases requiring administrative processing.",
    steps: [
      "DS-160 form preparation",
      "Visa fee payment and interview scheduling",
      "Document and financial evidence review",
      "Mock interview preparation",
      "Attend the consular interview",
    ],
    refusalReasons: [
      "Officer unconvinced of strong ties to Pakistan (Section 214(b) refusals)",
      "Inconsistent or unclear answers during the interview",
      "Insufficient financial documentation",
      "Unclear purpose or itinerary for the trip",
      "Previous US visa history not properly explained",
    ],
    faqs: [
      { question: "How long is the US visa interview?", answer: "The interview itself is typically brief — a few minutes — so being clear and consistent about your purpose of travel and ties to Pakistan matters more than length of answers." },
      { question: "Can I reapply after a 214(b) refusal?", answer: "Yes, you can reapply at any time, though a new application should address the specific concerns that led to the refusal rather than repeating the same evidence." },
    ],
  },
  {
    slug: "australia",
    name: "Australia",
    flagImage: "/flags/australia.webp",
    metaTitle: "Australia Visitor Visa (Subclass 600) from Pakistan",
    metaDescription: "Australia Visitor visa (subclass 600) guidance from Pakistan — requirements, documents and processing information.",
    intro:
      "The Subclass 600 Visitor visa allows Pakistani nationals to travel to Australia for tourism, to visit family, or for business purposes. The Department of Home Affairs assesses genuine temporary entrant criteria closely for applicants from Pakistan.",
    whoCanApply: [
      "Tourists and leisure travelers",
      "Applicants visiting family in Australia",
      "Business visitors attending meetings or exploring opportunities",
    ],
    visaTypes: [
      { name: "Tourist Stream", description: "For holidays, recreation, or visiting family and friends." },
      { name: "Business Visitor Stream", description: "For short business activities such as meetings or negotiations." },
      { name: "Sponsored Family Stream", description: "For applicants sponsored by an eligible family member in Australia." },
    ],
    documents: [
      "Valid passport",
      "Completed application form and supporting statement",
      "Financial evidence covering the trip duration",
      "Employment or business documentation",
      "Evidence of ties to Pakistan",
      "Invitation letter and sponsor documents, if applicable",
    ],
    financialNote:
      "Home Affairs looks for evidence that you can support yourself throughout your stay without working, alongside genuine and verifiable financial history.",
    processingTime: "Processing times are published by the Department of Home Affairs and vary based on individual circumstances and document completeness.",
    steps: [
      "Case assessment and eligibility review",
      "Document checklist and genuine temporary entrant statement",
      "Application lodgement via ImmiAccount",
      "Biometrics, if requested",
      "Decision tracking and follow-up",
    ],
    refusalReasons: [
      "Genuine temporary entrant criteria not met",
      "Insufficient financial evidence",
      "Weak or unclear ties to Pakistan",
      "Incomplete or inconsistent supporting documents",
    ],
    faqs: [
      { question: "What is the 'genuine temporary entrant' requirement?", answer: "It's Home Affairs' assessment of whether you intend to visit temporarily and return to Pakistan, based on your personal, economic and family circumstances." },
    ],
  },
  {
    slug: "schengen",
    name: "Schengen Europe",
    flagImage: "/flags/schengen.webp",
    metaTitle: "Schengen Visa from Pakistan",
    metaDescription: "Schengen short-stay visa guidance from Pakistan — which country to apply through, documents and requirements.",
    intro:
      "A Schengen visa allows short stays of up to 90 days across the 27 Schengen area countries. Pakistani applicants apply through the embassy or consulate of their main destination, or first point of entry if travel is spread across multiple countries.",
    whoCanApply: [
      "Tourists visiting one or more Schengen countries",
      "Applicants visiting family or friends in Europe",
      "Business travelers attending meetings, fairs or conferences",
    ],
    visaTypes: [
      { name: "Single-Entry Visa", description: "Valid for one trip within the validity period." },
      { name: "Multiple-Entry Visa", description: "Allows multiple trips, often issued to applicants with strong travel history." },
    ],
    documents: [
      "Valid passport (at least 3 months beyond intended stay)",
      "Schengen visa application form",
      "Travel insurance covering at least €30,000",
      "Confirmed flight itinerary",
      "Hotel bookings or invitation letter",
      "Bank statements and financial evidence",
      "Employment or business documents",
    ],
    financialNote:
      "Each Schengen country publishes its own minimum daily amount guideline, alongside genuine, well-documented financial evidence covering the full trip.",
    processingTime: "Standard processing is typically 15 calendar days from a complete application, though this can extend during peak travel seasons.",
    steps: [
      "Choosing the correct country to apply through",
      "Document checklist and itinerary planning",
      "Appointment booking at the visa application centre",
      "Application submission and biometrics",
      "Tracking until a decision is issued",
    ],
    refusalReasons: [
      "Incomplete or inconsistent travel itinerary",
      "Insufficient travel insurance coverage",
      "Weak financial documentation",
      "Insufficient evidence of intent to return to Pakistan",
    ],
    faqs: [
      { question: "Which Schengen country should I apply to?", answer: "You apply to the country where you'll spend the most nights, or your first point of entry if your stay is evenly split." },
    ],
  },
  {
    slug: "turkey",
    name: "Turkey",
    flagImage: undefined,
    metaTitle: "Turkey Visa from Pakistan",
    metaDescription: "Turkey e-Visa and sticker visa guidance from Pakistan for tourism and business travel.",
    intro:
      "Turkey is a popular and relatively fast-processing destination for Pakistani travelers, with both e-Visa and sticker visa (embassy) routes depending on your travel purpose and passport type.",
    whoCanApply: ["Tourists and leisure travelers", "Business travelers", "Applicants transiting through Turkey"],
    visaTypes: [
      { name: "e-Visa", description: "Available to eligible passport holders for short tourist or business visits." },
      { name: "Sticker Visa", description: "Issued via the Turkish consulate for applicants who don't qualify for the e-Visa." },
    ],
    documents: ["Valid passport", "Recent photograph", "Confirmed hotel booking and return ticket", "Bank statements"],
    financialNote: "Financial evidence should be sufficient to cover the length of stay and show a stable income source.",
    processingTime: "e-Visa applications are typically processed within a few days; sticker visas depend on consulate appointment availability.",
    steps: ["Eligibility check (e-Visa vs sticker visa)", "Document preparation", "Application submission", "Tracking until issued"],
    refusalReasons: ["Incomplete documentation", "Unclear travel purpose", "Insufficient financial evidence"],
    faqs: [{ question: "Is Turkey visa processing fast?", answer: "Compared to many Western destinations, Turkey's e-Visa route is generally faster, though sticker visa timelines depend on consulate scheduling." }],
  },
  {
    slug: "japan",
    name: "Japan",
    flagImage: undefined,
    metaTitle: "Japan Visa from Pakistan",
    metaDescription: "Japan Temporary Visitor visa guidance from Pakistan for tourism, business and transit.",
    intro:
      "Japan's Temporary Visitor visa covers tourism, business meetings and transit for Pakistani applicants. Documentation is reviewed carefully, and a clear itinerary with a local guarantor or sponsor can support the application.",
    whoCanApply: ["Tourists and leisure travelers", "Business visitors", "Applicants transiting through Japan"],
    visaTypes: [
      { name: "Temporary Visitor (Tourism)", description: "For sightseeing and leisure travel, typically up to 90 days." },
      { name: "Temporary Visitor (Business)", description: "For short business meetings and negotiations." },
    ],
    documents: ["Valid passport", "Visa application form and photograph", "Detailed itinerary", "Bank statements", "Employment documents", "Guarantor documents, if applicable"],
    financialNote: "Applicants should show sufficient, verifiable funds to cover the full cost of the trip.",
    processingTime: "Processing is typically around 5 working days from a complete submission, though this can vary.",
    steps: ["Document checklist and itinerary planning", "Guarantor letter, if applicable", "Application submission", "Tracking until issued"],
    refusalReasons: ["Incomplete itinerary", "Insufficient financial evidence", "Unclear purpose of visit"],
    faqs: [{ question: "Do I need a guarantor for a Japan visa?", answer: "A local guarantor in Japan can strengthen an application, particularly for first-time applicants, though it isn't always mandatory." }],
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    flagImage: undefined,
    metaTitle: "New Zealand Visitor Visa from Pakistan",
    metaDescription: "New Zealand Visitor visa guidance from Pakistan for tourism and family visits.",
    intro:
      "New Zealand's Visitor Visa allows Pakistani applicants to travel for tourism or to visit family, with Immigration New Zealand assessing genuine intent, financial capacity and ties to Pakistan.",
    whoCanApply: ["Tourists and leisure travelers", "Applicants visiting family in New Zealand"],
    visaTypes: [{ name: "Visitor Visa", description: "Covers tourism and family visits, typically for stays of up to 9 months." }],
    documents: ["Valid passport", "Financial evidence", "Employment or business documents", "Evidence of ties to Pakistan", "Invitation letter, if applicable"],
    financialNote: "Immigration New Zealand expects evidence of sufficient funds for the length of stay, or a sponsor able to support the visit.",
    processingTime: "Processing times are published by Immigration New Zealand and vary by application volume and completeness.",
    steps: ["Case assessment", "Document checklist", "Online application submission", "Tracking until a decision is issued"],
    refusalReasons: ["Insufficient financial evidence", "Weak ties to Pakistan", "Unclear purpose of visit"],
    faqs: [{ question: "Can family in New Zealand sponsor my visit?", answer: "Yes, a sponsor can support your application with an invitation letter and evidence of their ability to support your stay." }],
  },
];

export function getCountryPage(slug: string) {
  return countryPages.find((c) => c.slug === slug);
}
