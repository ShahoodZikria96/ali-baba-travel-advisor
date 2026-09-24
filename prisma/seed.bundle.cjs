"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// prisma/seed.ts
var import_client = require("@prisma/client");
var import_bcryptjs = __toESM(require("bcryptjs"));

// src/data/countries.ts
var popularDestinations = [
  {
    slug: "uk",
    name: "United Kingdom",
    flag: "\u{1F1EC}\u{1F1E7}",
    flagImage: "/flags/uk.webp",
    visaType: "Visit, Business & Family Visa",
    description: "Standard Visitor visa assistance for tourism, family and business trips."
  },
  {
    slug: "canada",
    name: "Canada",
    flag: "\u{1F1E8}\u{1F1E6}",
    flagImage: "/flags/canada.webp",
    visaType: "Visitor Visa",
    description: "Temporary Resident Visa documentation and case guidance."
  },
  {
    slug: "usa",
    name: "United States",
    flag: "\u{1F1FA}\u{1F1F8}",
    flagImage: "/flags/usa.webp",
    visaType: "B1/B2 Visa",
    description: "Interview preparation and documentation support for the US visitor visa."
  },
  {
    slug: "schengen",
    name: "Schengen Europe",
    flag: "\u{1F1EA}\u{1F1FA}",
    flagImage: "/flags/schengen.webp",
    visaType: "Short-Stay Schengen Visa",
    description: "Guidance across France, Italy, Germany, Spain and other Schengen states."
  },
  {
    slug: "australia",
    name: "Australia",
    flag: "\u{1F1E6}\u{1F1FA}",
    flagImage: "/flags/australia.webp",
    visaType: "Visitor Visa (Subclass 600)",
    description: "Assessment and documentation support for tourism and family visits."
  },
  {
    slug: "turkey",
    name: "Turkey",
    flag: "\u{1F1F9}\u{1F1F7}",
    flagImage: "/flags/turkey.webp",
    visaType: "e-Visa & Sticker Visa",
    description: "Fast-track guidance for tourism and business travel to Turkey."
  },
  {
    slug: "japan",
    name: "Japan",
    flag: "\u{1F1EF}\u{1F1F5}",
    flagImage: "/flags/japan.webp",
    visaType: "Temporary Visitor Visa",
    description: "Documentation support for tourism, business and transit visits."
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    flag: "\u{1F1F3}\u{1F1FF}",
    flagImage: "/flags/new-zealand.webp",
    visaType: "Visitor Visa",
    description: "Case assessment for tourism and family-visit applications."
  }
];
var moreDestinations = [
  {
    slug: "uae",
    name: "UAE",
    flag: "\u{1F1E6}\u{1F1EA}",
    flagImage: "/flags/uae.webp",
    visaType: "Visit Visa",
    description: "Short and long-term visit visa assistance for the UAE."
  },
  {
    slug: "malaysia",
    name: "Malaysia",
    flag: "\u{1F1F2}\u{1F1FE}",
    flagImage: "/flags/malaysia.webp",
    visaType: "eVisa",
    description: "Tourism and business travel documentation support."
  },
  {
    slug: "azerbaijan",
    name: "Azerbaijan",
    flag: "\u{1F1E6}\u{1F1FF}",
    flagImage: "/flags/azerbaijan.webp",
    visaType: "e-Visa",
    description: "Popular group-tour destination with fast visa processing."
  },
  {
    slug: "south-africa",
    name: "South Africa",
    flag: "\u{1F1FF}\u{1F1E6}",
    flagImage: "/flags/south-africa.webp",
    visaType: "Visitor Visa",
    description: "Documentation guidance for tourism and business visits."
  }
];

// src/data/countryPages.ts
var countryPages = [
  {
    slug: "uk",
    name: "United Kingdom",
    flagImage: "/flags/uk.webp",
    metaTitle: "UK Visit Visa from Pakistan",
    metaDescription: "UK Standard Visitor visa guidance from Pakistan \u2014 requirements, documents, processing time and common refusal reasons.",
    intro: "The UK Standard Visitor visa covers tourism, visiting family, short business trips and medical treatment. Ali Baba Travel Advisor helps Pakistani applicants prepare their documentation and understand what UK Visas and Immigration expects to see in a genuine visitor application.",
    whoCanApply: [
      "Tourists planning to visit the UK for leisure",
      "Applicants visiting family or friends settled in the UK",
      "Business travelers attending meetings, conferences or training",
      "Applicants attending a short course of up to 6 months"
    ],
    visaTypes: [
      { name: "Standard Visitor Visa", description: "Covers tourism, family visits and short business activity, typically issued for up to 6 months." },
      { name: "Business Visitor Visa", description: "For meetings, conferences, negotiations and site visits with a UK-based company." },
      { name: "Family Visit Visa", description: "For visiting close relatives who are settled or studying/working in the UK." }
    ],
    documents: [
      "Valid passport with at least one blank page",
      "Completed online visa application (VAF9)",
      "Recent passport-size photographs",
      "Bank statements covering the last 6 months",
      "Employment letter or business registration documents",
      "Property or asset documents demonstrating ties to Pakistan",
      "Invitation letter (for family or business visits)",
      "Travel itinerary and hotel booking or accommodation details"
    ],
    financialNote: "There is no fixed minimum bank balance for a UK visitor visa. The Entry Clearance Officer instead looks at whether your funds are consistent with your declared income and travel plan, and whether they have been held for a reasonable period rather than deposited shortly before applying.",
    processingTime: "Standard processing is usually 3 to 4 weeks from the biometric appointment, though priority services can reduce this.",
    steps: [
      "Initial consultation to assess eligibility and travel purpose",
      "Document checklist and financial evidence review",
      "Online application form (VAF9) completion",
      "Biometric appointment booking at the visa application centre",
      "Submission and tracking until a decision is issued"
    ],
    refusalReasons: [
      "Insufficient evidence of ties to Pakistan (home, job, family, business)",
      "Bank statements that don't match declared income or show unexplained deposits",
      "Unclear or inconsistent purpose of visit",
      "Sponsor's documents not meeting the required standard",
      "Previous UK immigration history not properly explained"
    ],
    faqs: [
      { question: "How much bank balance is required for a UK visit visa?", answer: "There's no fixed figure. What matters is that your funds are genuine, consistent with your income, and enough to cover your trip without needing to work in the UK." },
      { question: "Can I apply again after a UK visa refusal?", answer: "Yes. We review the refusal letter, identify the specific concerns raised by the Entry Clearance Officer, and help you address them before reapplying." },
      { question: "Do you guarantee visa approval?", answer: "No consultancy can guarantee a visa outcome \u2014 the decision rests solely with UK Visas and Immigration. We focus on presenting the strongest possible, genuine application." }
    ]
  },
  {
    slug: "canada",
    name: "Canada",
    flagImage: "/flags/canada.webp",
    metaTitle: "Canada Visitor Visa from Pakistan",
    metaDescription: "Canada Temporary Resident Visa (visitor visa) guidance from Pakistan \u2014 documentation, financial evidence and processing information.",
    intro: "Canada's Temporary Resident Visa (TRV) allows Pakistani nationals to visit for tourism, to see family, or for short business purposes. IRCC places significant weight on an applicant's ties to Pakistan and their travel history when assessing genuine intent to return.",
    whoCanApply: [
      "Tourists and leisure travelers",
      "Applicants visiting family members in Canada",
      "Business visitors attending meetings or conferences",
      "Applicants attending a wedding or family event"
    ],
    visaTypes: [
      { name: "Single-Entry Visitor Visa", description: "Valid for one entry into Canada within a specified period." },
      { name: "Multiple-Entry Visitor Visa", description: "Allows several visits over a period, commonly issued up to 10 years or passport expiry." },
      { name: "Super Visa", description: "A long-stay option for parents and grandparents of Canadian citizens or permanent residents." }
    ],
    documents: [
      "Valid passport",
      "Digital photograph meeting IRCC specifications",
      "Proof of funds (bank statements, pay slips)",
      "Letter of invitation, if applicable",
      "Travel history and previous visas",
      "Proof of ties to Pakistan (employment, property, family)",
      "Purpose-of-travel letter"
    ],
    financialNote: "IRCC does not publish a fixed minimum amount for a visitor visa. Officers assess whether your funds are sufficient for the length and nature of your stay and whether the source of funds is well documented.",
    processingTime: "Processing times vary and are published by IRCC; straightforward applications from Pakistan commonly take several weeks.",
    steps: [
      "Case assessment and document checklist",
      "IRCC online account setup and form completion",
      "Financial and supporting document review",
      "Biometrics appointment",
      "Application submission and status tracking"
    ],
    refusalReasons: [
      "Officer not satisfied the applicant will leave Canada by the end of their stay",
      "Insufficient or unclear financial documentation",
      "Weak or no travel history",
      "Purpose of visit not clearly established",
      "Family ties in Canada raising dual-intent concerns without adequate explanation"
    ],
    faqs: [
      { question: "Can a previously refused Canada applicant reapply?", answer: "Yes \u2014 we assess the refusal letter (procedural fairness or refusal reasons) and help strengthen the reapplication, particularly around financial evidence and ties to Pakistan." },
      { question: "What is a Canada reconsideration request?", answer: "It's a request asking IRCC to review a decision without a new application, used in limited circumstances such as an officer error. We can advise whether this route is appropriate for your case." },
      { question: "Is Canada judicial review something Ali Baba Travel Advisor handles directly?", answer: "We provide consultancy and case guidance, and coordinate with qualified legal counsel for judicial review proceedings, since that is a formal legal process." }
    ]
  },
  {
    slug: "usa",
    name: "United States",
    flagImage: "/flags/usa.webp",
    metaTitle: "USA Visit Visa (B1/B2) from Pakistan",
    metaDescription: "USA B1/B2 visitor visa guidance from Pakistan \u2014 documentation, interview preparation and processing information.",
    intro: "The B1/B2 visa is the standard US visitor visa, covering business (B1) and tourism, family visits or medical treatment (B2). Along with documentation, the consular interview plays a central role in a US visa decision, so preparation matters.",
    whoCanApply: [
      "Tourists and leisure travelers",
      "Applicants visiting family in the US",
      "Business travelers (meetings, conferences, negotiations)",
      "Applicants seeking short-term medical treatment"
    ],
    visaTypes: [
      { name: "B1 Business Visitor", description: "For business meetings, conferences and negotiations \u2014 not for employment." },
      { name: "B2 Tourist Visitor", description: "For tourism, visiting family or friends, and medical treatment." },
      { name: "B1/B2 Combined", description: "The most commonly issued category, covering both business and tourism purposes." }
    ],
    documents: [
      "Valid passport",
      "DS-160 confirmation page",
      "Visa appointment confirmation",
      "Photograph meeting US visa specifications",
      "Bank statements and proof of income",
      "Employment or business ownership documents",
      "Evidence of ties to Pakistan"
    ],
    financialNote: "There's no published minimum balance for a B1/B2 visa. The consular officer wants to see stable, verifiable finances that support your trip and your intention to return to Pakistan.",
    processingTime: "Appointment wait times vary by consulate; once interviewed, many B1/B2 decisions are issued the same day, with some cases requiring administrative processing.",
    steps: [
      "DS-160 form preparation",
      "Visa fee payment and interview scheduling",
      "Document and financial evidence review",
      "Mock interview preparation",
      "Attend the consular interview"
    ],
    refusalReasons: [
      "Officer unconvinced of strong ties to Pakistan (Section 214(b) refusals)",
      "Inconsistent or unclear answers during the interview",
      "Insufficient financial documentation",
      "Unclear purpose or itinerary for the trip",
      "Previous US visa history not properly explained"
    ],
    faqs: [
      { question: "How long is the US visa interview?", answer: "The interview itself is typically brief \u2014 a few minutes \u2014 so being clear and consistent about your purpose of travel and ties to Pakistan matters more than length of answers." },
      { question: "Can I reapply after a 214(b) refusal?", answer: "Yes, you can reapply at any time, though a new application should address the specific concerns that led to the refusal rather than repeating the same evidence." }
    ]
  },
  {
    slug: "australia",
    name: "Australia",
    flagImage: "/flags/australia.webp",
    metaTitle: "Australia Visitor Visa (Subclass 600) from Pakistan",
    metaDescription: "Australia Visitor visa (subclass 600) guidance from Pakistan \u2014 requirements, documents and processing information.",
    intro: "The Subclass 600 Visitor visa allows Pakistani nationals to travel to Australia for tourism, to visit family, or for business purposes. The Department of Home Affairs assesses genuine temporary entrant criteria closely for applicants from Pakistan.",
    whoCanApply: [
      "Tourists and leisure travelers",
      "Applicants visiting family in Australia",
      "Business visitors attending meetings or exploring opportunities"
    ],
    visaTypes: [
      { name: "Tourist Stream", description: "For holidays, recreation, or visiting family and friends." },
      { name: "Business Visitor Stream", description: "For short business activities such as meetings or negotiations." },
      { name: "Sponsored Family Stream", description: "For applicants sponsored by an eligible family member in Australia." }
    ],
    documents: [
      "Valid passport",
      "Completed application form and supporting statement",
      "Financial evidence covering the trip duration",
      "Employment or business documentation",
      "Evidence of ties to Pakistan",
      "Invitation letter and sponsor documents, if applicable"
    ],
    financialNote: "Home Affairs looks for evidence that you can support yourself throughout your stay without working, alongside genuine and verifiable financial history.",
    processingTime: "Processing times are published by the Department of Home Affairs and vary based on individual circumstances and document completeness.",
    steps: [
      "Case assessment and eligibility review",
      "Document checklist and genuine temporary entrant statement",
      "Application lodgement via ImmiAccount",
      "Biometrics, if requested",
      "Decision tracking and follow-up"
    ],
    refusalReasons: [
      "Genuine temporary entrant criteria not met",
      "Insufficient financial evidence",
      "Weak or unclear ties to Pakistan",
      "Incomplete or inconsistent supporting documents"
    ],
    faqs: [
      { question: "What is the 'genuine temporary entrant' requirement?", answer: "It's Home Affairs' assessment of whether you intend to visit temporarily and return to Pakistan, based on your personal, economic and family circumstances." }
    ]
  },
  {
    slug: "schengen",
    name: "Schengen Europe",
    flagImage: "/flags/schengen.webp",
    metaTitle: "Schengen Visa from Pakistan",
    metaDescription: "Schengen short-stay visa guidance from Pakistan \u2014 which country to apply through, documents and requirements.",
    intro: "A Schengen visa allows short stays of up to 90 days across the 27 Schengen area countries. Pakistani applicants apply through the embassy or consulate of their main destination, or first point of entry if travel is spread across multiple countries.",
    whoCanApply: [
      "Tourists visiting one or more Schengen countries",
      "Applicants visiting family or friends in Europe",
      "Business travelers attending meetings, fairs or conferences"
    ],
    visaTypes: [
      { name: "Single-Entry Visa", description: "Valid for one trip within the validity period." },
      { name: "Multiple-Entry Visa", description: "Allows multiple trips, often issued to applicants with strong travel history." }
    ],
    documents: [
      "Valid passport (at least 3 months beyond intended stay)",
      "Schengen visa application form",
      "Travel insurance covering at least \u20AC30,000",
      "Confirmed flight itinerary",
      "Hotel bookings or invitation letter",
      "Bank statements and financial evidence",
      "Employment or business documents"
    ],
    financialNote: "Each Schengen country publishes its own minimum daily amount guideline, alongside genuine, well-documented financial evidence covering the full trip.",
    processingTime: "Standard processing is typically 15 calendar days from a complete application, though this can extend during peak travel seasons.",
    steps: [
      "Choosing the correct country to apply through",
      "Document checklist and itinerary planning",
      "Appointment booking at the visa application centre",
      "Application submission and biometrics",
      "Tracking until a decision is issued"
    ],
    refusalReasons: [
      "Incomplete or inconsistent travel itinerary",
      "Insufficient travel insurance coverage",
      "Weak financial documentation",
      "Insufficient evidence of intent to return to Pakistan"
    ],
    faqs: [
      { question: "Which Schengen country should I apply to?", answer: "You apply to the country where you'll spend the most nights, or your first point of entry if your stay is evenly split." }
    ]
  },
  {
    slug: "turkey",
    name: "Turkey",
    flagImage: void 0,
    metaTitle: "Turkey Visa from Pakistan",
    metaDescription: "Turkey e-Visa and sticker visa guidance from Pakistan for tourism and business travel.",
    intro: "Turkey is a popular and relatively fast-processing destination for Pakistani travelers, with both e-Visa and sticker visa (embassy) routes depending on your travel purpose and passport type.",
    whoCanApply: ["Tourists and leisure travelers", "Business travelers", "Applicants transiting through Turkey"],
    visaTypes: [
      { name: "e-Visa", description: "Available to eligible passport holders for short tourist or business visits." },
      { name: "Sticker Visa", description: "Issued via the Turkish consulate for applicants who don't qualify for the e-Visa." }
    ],
    documents: ["Valid passport", "Recent photograph", "Confirmed hotel booking and return ticket", "Bank statements"],
    financialNote: "Financial evidence should be sufficient to cover the length of stay and show a stable income source.",
    processingTime: "e-Visa applications are typically processed within a few days; sticker visas depend on consulate appointment availability.",
    steps: ["Eligibility check (e-Visa vs sticker visa)", "Document preparation", "Application submission", "Tracking until issued"],
    refusalReasons: ["Incomplete documentation", "Unclear travel purpose", "Insufficient financial evidence"],
    faqs: [{ question: "Is Turkey visa processing fast?", answer: "Compared to many Western destinations, Turkey's e-Visa route is generally faster, though sticker visa timelines depend on consulate scheduling." }]
  },
  {
    slug: "japan",
    name: "Japan",
    flagImage: void 0,
    metaTitle: "Japan Visa from Pakistan",
    metaDescription: "Japan Temporary Visitor visa guidance from Pakistan for tourism, business and transit.",
    intro: "Japan's Temporary Visitor visa covers tourism, business meetings and transit for Pakistani applicants. Documentation is reviewed carefully, and a clear itinerary with a local guarantor or sponsor can support the application.",
    whoCanApply: ["Tourists and leisure travelers", "Business visitors", "Applicants transiting through Japan"],
    visaTypes: [
      { name: "Temporary Visitor (Tourism)", description: "For sightseeing and leisure travel, typically up to 90 days." },
      { name: "Temporary Visitor (Business)", description: "For short business meetings and negotiations." }
    ],
    documents: ["Valid passport", "Visa application form and photograph", "Detailed itinerary", "Bank statements", "Employment documents", "Guarantor documents, if applicable"],
    financialNote: "Applicants should show sufficient, verifiable funds to cover the full cost of the trip.",
    processingTime: "Processing is typically around 5 working days from a complete submission, though this can vary.",
    steps: ["Document checklist and itinerary planning", "Guarantor letter, if applicable", "Application submission", "Tracking until issued"],
    refusalReasons: ["Incomplete itinerary", "Insufficient financial evidence", "Unclear purpose of visit"],
    faqs: [{ question: "Do I need a guarantor for a Japan visa?", answer: "A local guarantor in Japan can strengthen an application, particularly for first-time applicants, though it isn't always mandatory." }]
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    flagImage: void 0,
    metaTitle: "New Zealand Visitor Visa from Pakistan",
    metaDescription: "New Zealand Visitor visa guidance from Pakistan for tourism and family visits.",
    intro: "New Zealand's Visitor Visa allows Pakistani applicants to travel for tourism or to visit family, with Immigration New Zealand assessing genuine intent, financial capacity and ties to Pakistan.",
    whoCanApply: ["Tourists and leisure travelers", "Applicants visiting family in New Zealand"],
    visaTypes: [{ name: "Visitor Visa", description: "Covers tourism and family visits, typically for stays of up to 9 months." }],
    documents: ["Valid passport", "Financial evidence", "Employment or business documents", "Evidence of ties to Pakistan", "Invitation letter, if applicable"],
    financialNote: "Immigration New Zealand expects evidence of sufficient funds for the length of stay, or a sponsor able to support the visit.",
    processingTime: "Processing times are published by Immigration New Zealand and vary by application volume and completeness.",
    steps: ["Case assessment", "Document checklist", "Online application submission", "Tracking until a decision is issued"],
    refusalReasons: ["Insufficient financial evidence", "Weak ties to Pakistan", "Unclear purpose of visit"],
    faqs: [{ question: "Can family in New Zealand sponsor my visit?", answer: "Yes, a sponsor can support your application with an invitation letter and evidence of their ability to support your stay." }]
  }
];

// src/data/offices.ts
var offices = [
  {
    slug: "lahore",
    city: "Lahore",
    address: "Office No. 1 & 2, Mezzanine Floor, Siddique Trade Center, Gulberg II, Lahore",
    phone: "+92 311 1666076",
    hours: "Mon \u2013 Sat: 10:00 AM \u2013 6:00 PM",
    mapUrl: "https://www.google.com/maps/place/Ali+Baba+Travel+Advisor/@31.5314837,74.3526375,17z/data=!3m1!4b1!4m6!3m5!1s0x39190545cf1e5eab:0x7b86c4a6068a7238!8m2!3d31.5314837!4d74.3526375!16s%2Fg%2F11vwmyf0pr"
  },
  {
    slug: "islamabad",
    city: "Islamabad",
    address: "Office No. 33 & 34, First Floor, Al-Anayat Mall, G-11 Markaz, Islamabad",
    phone: "+92 311 1666076",
    hours: "Mon \u2013 Sat: 10:00 AM \u2013 6:00 PM",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Al-Anayat+Mall+G-11+Markaz+Islamabad"
  },
  {
    slug: "wazirabad",
    city: "Wazirabad",
    address: "Arif Shaheed Road, near Bank Alfalah, Wazirabad",
    phone: "+92 311 1666076",
    hours: "Mon \u2013 Sat: 10:00 AM \u2013 6:00 PM",
    mapUrl: "https://www.google.com/maps/place/32%C2%B026'21.0%22N+74%C2%B006'59.1%22E/@32.439157,74.116412,17z/data=!3m1!4b1!4m4!3m3!8m2!3d32.439157!4d74.116412"
  },
  {
    slug: "karachi",
    city: "Karachi",
    address: "Office No. 3, Mezzanine Floor, 10C Building, 12 Commercial Street, near Cafe Musa, DHA Phase 2 Extension, Karachi",
    phone: "+92 311 1666076",
    hours: "Mon \u2013 Sat: 10:00 AM \u2013 6:00 PM",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(
      "Office No. 3, Mezzanine Floor, 10C Building, 12 Commercial Street, near Cafe Musa, DHA Phase 2 Extension, Karachi"
    ),
    openingDate: "2026-09-07"
  }
];

// src/data/locationContent.ts
var locationContent = [
  {
    slug: "lahore",
    intro: "Our Lahore office, located at Siddique Trade Center in Gulberg II, is Ali Baba Travel Advisor's main branch \u2014 serving families, students and business travelers across the city with visa consultancy, tour packages and flight bookings.",
    localContext: "Gulberg II is one of Lahore's central commercial areas, making our office an easy walk-in stop for clients from Model Town, Garden Town, DHA and the wider Gulberg corridor. Our Lahore consultants handle the highest volume of UK, Canada, USA and Schengen visit visa cases in our network.",
    servicesOffered: ["Visit, business and family visit visa consultancy", "Visa refusal case review", "Group and customized tour bookings", "Air ticketing and hotel booking"]
  },
  {
    slug: "islamabad",
    intro: "Our Islamabad office at Al-Anayat Mall, G-11 Markaz, supports clients across Islamabad and Rawalpindi with visa documentation, tour planning and travel consultancy.",
    localContext: "G-11 Markaz is a well-connected commercial hub in Islamabad, convenient for clients from G, F and E sector residential areas as well as nearby Rawalpindi. Our Islamabad team frequently assists diplomatic-adjacent professionals and families applying for family visit and business visas.",
    servicesOffered: ["Visit, business and family visit visa consultancy", "Visa refusal case review", "Group and customized tour bookings", "Air ticketing and hotel booking"]
  },
  {
    slug: "wazirabad",
    intro: "Our Wazirabad office on Arif Shaheed Road, near Bank Alfalah, brings the same visa consultancy and travel planning services to clients in Wazirabad and the surrounding Gujranwala division.",
    localContext: "Wazirabad's growing trade and expatriate community means many of our local clients are applying for family visit visas to join relatives already settled abroad, alongside business and tourist travel.",
    servicesOffered: ["Visit and family visit visa consultancy", "Visa documentation support", "Tour package bookings", "Air ticketing"]
  },
  {
    slug: "karachi",
    intro: "Our newest office opens on Monday, 7 September 2026 at Office No. 3, Mezzanine Floor, 10C Building, 12 Commercial Street, near Cafe Musa, DHA Phase 2 Extension, Karachi \u2014 bringing Ali Baba Travel Advisor's visa consultancy and travel services to Pakistan's largest city.",
    localContext: "DHA Phase 2 Extension is a fast-growing commercial and residential area of Karachi. Our Karachi office is being set up to serve clients across the city with the same consultancy standards as our Lahore, Islamabad and Wazirabad branches.",
    servicesOffered: ["Visit, business and family visit visa consultancy", "Visa refusal case review", "Group and customized tour bookings", "Air ticketing and hotel booking"]
  }
];

// src/data/refusalPages.ts
var refusalPages = [
  {
    slug: "uk",
    country: "United Kingdom",
    metaTitle: "UK Visa Refusal Assistance from Pakistan",
    metaDescription: "Guidance for applicants refused a UK visit visa \u2014 common refusal reasons, reapplication strategy and the Pre-Action Protocol.",
    intro: "A UK visa refusal is not the end of the road. Many applicants are successful on a well-prepared reapplication once the specific concerns raised by the Entry Clearance Officer are properly addressed.",
    commonReasons: [
      "Insufficient evidence of financial standing",
      "Weak or unclear ties to Pakistan",
      "Inconsistent information across the application and supporting documents",
      "Sponsor documents not meeting the required evidentiary standard",
      "Unclear or implausible purpose of visit"
    ],
    whatWeReview: [
      "The full refusal letter and each reason cited by the Entry Clearance Officer",
      "Financial documentation and how it was presented",
      "Evidence of ties to Pakistan (employment, property, family)",
      "Consistency between the application form and supporting documents"
    ],
    specialNote: "For eligible cases, a UK Pre-Action Protocol (PAP) letter can be sent to the Home Office ahead of a judicial review claim, where there are grounds to argue the original decision was unlawful. This is a formal legal process \u2014 where PAP or judicial review is appropriate, we coordinate with qualified legal counsel; our own role is case assessment, documentation and consultancy.",
    faqs: [
      { question: "How soon can I reapply after a UK visa refusal?", answer: "There's no mandatory waiting period, but we recommend addressing the refusal reasons thoroughly before reapplying rather than resubmitting the same evidence." },
      { question: "What is the Pre-Action Protocol?", answer: "It's a formal letter sent before a judicial review claim, used in cases where there are arguable grounds that the refusal decision was legally flawed. It requires legal assessment on a case-by-case basis." }
    ]
  },
  {
    slug: "canada",
    country: "Canada",
    metaTitle: "Canada Visa Refusal Assistance from Pakistan",
    metaDescription: "Guidance for applicants refused a Canada visitor visa \u2014 reconsideration requests, reapplication and judicial review coordination.",
    intro: "Canada visitor visa refusals are common and often relate to how an officer assessed your ties to Pakistan or your financial documentation. A stronger, better-evidenced reapplication frequently succeeds where the first attempt did not.",
    commonReasons: [
      "Officer not satisfied you would leave Canada by the end of your stay",
      "Insufficient or unclear proof of funds",
      "Limited or no international travel history",
      "Purpose of visit not clearly established",
      "Family ties in Canada raising unaddressed dual-intent concerns"
    ],
    whatWeReview: [
      "The refusal letter and GCMS notes, where available",
      "Financial evidence and its presentation",
      "Ties to Pakistan and travel history",
      "Whether a reconsideration request or fresh application is more appropriate"
    ],
    specialNote: "Canada reconsideration requests and judicial review are formal processes with strict timelines. We assess whether your case is suited to reconsideration, a fresh application, or judicial review, and coordinate with qualified legal counsel where formal legal representation is required.",
    faqs: [
      { question: "What is a Canada reconsideration request?", answer: "It asks IRCC to review a decision without submitting a brand new application \u2014 generally used where there's a clear officer error, and it isn't appropriate for every refusal." },
      { question: "Do you handle Canada judicial review directly?", answer: "We provide consultancy and case documentation support, and coordinate with qualified legal counsel for the judicial review process itself, since that requires formal legal representation." }
    ]
  },
  {
    slug: "schengen",
    country: "Schengen Europe",
    metaTitle: "Schengen Visa Refusal & Appeal Guidance from Pakistan",
    metaDescription: "Guidance for applicants refused a Schengen visa \u2014 common reasons, appeal routes and reapplication support.",
    intro: "Schengen visa refusals must state specific reasons under EU regulation, which gives applicants a clear basis to either appeal to the issuing country's authority or strengthen a fresh application.",
    commonReasons: [
      "Incomplete or inconsistent travel itinerary",
      "Insufficient travel insurance coverage",
      "Unclear purpose or justification for the visit",
      "Insufficient evidence of funds for the trip",
      "Doubts about intention to leave Schengen territory before visa expiry"
    ],
    whatWeReview: [
      "The refusal notice and specific grounds cited",
      "Travel insurance and itinerary documentation",
      "Financial evidence",
      "Whether an appeal to the consulate or a fresh application is the better route"
    ],
    faqs: [
      { question: "Can I appeal a Schengen visa refusal?", answer: "Yes, each Schengen country has its own appeal process and deadline, which is stated on the refusal notice. We can help review whether an appeal or a fresh, stronger application makes more sense for your case." }
    ]
  },
  {
    slug: "australia",
    country: "Australia",
    metaTitle: "Australia Visa Refusal Guidance from Pakistan",
    metaDescription: "Guidance for applicants refused an Australia visitor visa \u2014 common reasons and reapplication support.",
    intro: "Australian visitor visa refusals typically relate to the genuine temporary entrant assessment. Understanding exactly why your case fell short is the first step toward a stronger reapplication.",
    commonReasons: [
      "Genuine temporary entrant criteria not met",
      "Insufficient financial evidence",
      "Weak or unclear ties to Pakistan",
      "Incomplete or inconsistent supporting documents"
    ],
    whatWeReview: [
      "The refusal notice and decision record",
      "Genuine temporary entrant statement and supporting evidence",
      "Financial documentation and ties to Pakistan"
    ],
    faqs: [
      { question: "Can I request a review of an Australian visa refusal?", answer: "Visitor visa refusals generally don't carry review rights at the Administrative Review Tribunal, so in most cases a stronger fresh application is the practical path forward \u2014 we can assess your specific case." }
    ]
  },
  {
    slug: "usa",
    country: "United States",
    metaTitle: "USA Visa Refusal (214(b)) Guidance from Pakistan",
    metaDescription: "Guidance for applicants refused a US B1/B2 visa under Section 214(b) \u2014 what it means and how to strengthen a reapplication.",
    intro: "Most US visitor visa refusals are issued under Section 214(b), meaning the consular officer wasn't convinced of strong ties to Pakistan at the time of interview. This is not a permanent bar \u2014 many applicants succeed on a later, better-prepared application.",
    commonReasons: [
      "Consular officer not convinced of strong ties to Pakistan",
      "Inconsistent or unclear interview answers",
      "Insufficient financial documentation",
      "Unclear or implausible purpose of visit"
    ],
    whatWeReview: [
      "The circumstances and answers given at interview",
      "Financial and employment documentation",
      "Ties to Pakistan and overall application strategy for a future interview"
    ],
    faqs: [
      { question: "Can I appeal a 214(b) refusal?", answer: "There's no formal appeal for a 214(b) refusal \u2014 the standard path is to reapply once your circumstances or documentation more clearly demonstrate ties to Pakistan." }
    ]
  }
];

// src/data/servicePages.ts
var servicePages = [
  {
    slug: "visit-visa",
    title: "Visit Visa Consultancy",
    metaDescription: "Professional visit visa consultancy for Pakistani travelers \u2014 documentation, requirements and application support.",
    intro: "Whether you're planning a holiday, visiting family, or exploring a new destination, our visit visa consultancy helps you understand requirements, prepare documentation and submit a well-organized application.",
    highlights: [
      "Country-specific document checklists",
      "Financial evidence review and guidance",
      "Application form completion support",
      "Appointment booking and submission assistance"
    ],
    process: [
      "Consultation to understand your travel goal and eligibility",
      "Document checklist tailored to your destination country",
      "Application form preparation and review",
      "Submission and status tracking"
    ],
    faqs: [
      { question: "Which countries do you assist with visit visas for?", answer: "We regularly assist with UK, Canada, USA, Australia, Schengen Europe, Turkey, Japan and New Zealand, among others." },
      { question: "Do you guarantee visa approval?", answer: "No consultancy can guarantee an outcome, as the decision rests solely with the relevant embassy or consulate. We focus on presenting a strong, genuine and well-documented application." }
    ]
  },
  {
    slug: "business-visa",
    title: "Business Visa Consultancy",
    metaDescription: "Business visa consultancy for meetings, conferences and corporate travel from Pakistan.",
    intro: "For business owners, executives and employees traveling for meetings, conferences, negotiations or site visits, we prepare documentation that clearly reflects the corporate purpose of your trip.",
    highlights: [
      "Company registration and business documentation review",
      "Invitation letter guidance for host-company visits",
      "Corporate financial evidence preparation",
      "Support for multiple traveler / group business applications"
    ],
    process: [
      "Understanding your business travel purpose and itinerary",
      "Reviewing company and personal financial documentation",
      "Preparing invitation letters and supporting business evidence",
      "Application submission and tracking"
    ],
    faqs: [
      { question: "Can employees apply on behalf of a company?", answer: "Yes \u2014 we help prepare company sponsorship letters and supporting documents for employees traveling on business." }
    ]
  },
  {
    slug: "family-visit-visa",
    title: "Family Visit Visa Consultancy",
    metaDescription: "Family visit visa consultancy for Pakistani applicants visiting relatives abroad.",
    intro: "Visiting family abroad involves its own documentation \u2014 from sponsor letters to relationship evidence. We help both the applicant in Pakistan and the sponsor abroad prepare a consistent, well-supported application.",
    highlights: [
      "Sponsor invitation letter guidance",
      "Relationship evidence preparation (marriage, birth certificates, photos)",
      "Sponsor's financial and immigration status documentation",
      "Coordination between applicant and overseas sponsor"
    ],
    process: [
      "Understanding the relationship and purpose of the visit",
      "Coordinating documentation with the overseas sponsor",
      "Preparing the applicant's financial and personal documents",
      "Application submission and tracking"
    ],
    faqs: [
      { question: "What documents does my sponsor abroad need to provide?", answer: "Typically an invitation letter, proof of their immigration status, and evidence they can support your visit \u2014 the exact list depends on the destination country." }
    ]
  },
  {
    slug: "study-visa",
    title: "Study Visa Assistance",
    metaDescription: "Study visa assistance for Pakistani students planning to study abroad.",
    intro: "For students planning to study abroad, we help prepare the visa documentation that accompanies your university offer \u2014 from financial evidence to statement of purpose guidance.",
    highlights: [
      "Document checklist aligned with your offer letter",
      "Financial sponsorship and evidence guidance",
      "Statement of purpose review",
      "Application submission and tracking"
    ],
    process: [
      "Reviewing your university offer and study plan",
      "Preparing financial and sponsorship documentation",
      "Reviewing your statement of purpose and supporting documents",
      "Application submission and tracking"
    ],
    faqs: [
      { question: "Do you help with university applications too?", answer: "Our focus is visa documentation and consultancy once you have an offer or are close to one; we can guide you on what admissions offices typically expect alongside your visa file." }
    ]
  }
];

// src/data/tours.ts
var tours = [
  {
    slug: "uk-group-tour",
    destination: "United Kingdom",
    image: "/destinations/uk.jpg",
    duration: "6 Days / 5 Nights",
    departure: "Ask for next departure",
    price: "PKR 620,000",
    visaAssistance: true,
    summary: "Experience the charm of the UK in a guided group tour covering London, Oxford, Manchester and Edinburgh \u2014 iconic landmarks, rich history and vibrant culture, all-inclusive.",
    highlights: ["Guided sightseeing in London, Oxford, Manchester and Edinburgh", "4-star group hotel accommodation", "Private coach transport throughout", "Visa documentation assistance included"],
    included: ["Return international airfare", "Hotel accommodation (5 nights)", "Daily breakfast", "Airport and intercity transfers", "Guided city tours", "Visa documentation assistance"],
    excluded: ["Lunch and dinner (unless specified)", "Personal expenses and shopping", "Travel insurance", "Optional excursions not listed in the itinerary"],
    itinerary: [
      { day: "Day 1", description: "Arrival in London, hotel check-in, welcome briefing." },
      { day: "Day 2", description: "London city tour \u2014 Big Ben, London Eye, Buckingham Palace." },
      { day: "Day 3", description: "Day trip to Oxford \u2014 university city tour." },
      { day: "Day 4", description: "Travel to Manchester, city sightseeing." },
      { day: "Day 5", description: "Travel to Edinburgh, castle and old town tour." },
      { day: "Day 6", description: "Departure from Edinburgh or return to London for onward flight." }
    ],
    notes: [
      "Group departure dates are updated periodically \u2014 contact us for the next confirmed date.",
      "Visa approval is at the discretion of UK Visas and Immigration; the price above does not guarantee visa issuance."
    ]
  },
  {
    slug: "azerbaijan-group-tour",
    destination: "Azerbaijan",
    image: "/destinations/azerbaijan.jpg",
    duration: "6 Days / 5 Nights",
    departure: "Ask for next departure",
    price: "PKR 270,000",
    visaAssistance: true,
    summary: "A luxurious Azerbaijan group tour featuring a 5-star stay, scenic city and nature excursions, and all major attraction tickets included \u2014 travel in comfort with a private coach.",
    highlights: ["5-star hotel accommodation", "Scenic city and nature excursions", "All major attraction tickets included", "Private Mercedes coach travel"],
    included: ["Return international airfare", "5-star hotel accommodation (5 nights)", "Daily breakfast", "Airport and intercity transfers", "Guided excursions and attraction tickets", "Visa documentation assistance"],
    excluded: ["Lunch and dinner (unless specified)", "Personal expenses and shopping", "Travel insurance"],
    itinerary: [
      { day: "Day 1", description: "Arrival in Baku, hotel check-in, welcome dinner." },
      { day: "Day 2", description: "Baku city tour \u2014 Old City, Flame Towers, Heydar Aliyev Center." },
      { day: "Day 3", description: "Gabala excursion \u2014 nature and cable car ride." },
      { day: "Day 4", description: "Sheki day trip \u2014 historic old town." },
      { day: "Day 5", description: "Free day for shopping or optional excursions." },
      { day: "Day 6", description: "Departure from Baku." }
    ],
    notes: [
      "Group departure dates are updated periodically \u2014 contact us for the next confirmed date.",
      "e-Visa processing for Azerbaijan is typically fast, but timelines can vary."
    ]
  },
  {
    slug: "france-group-tour",
    destination: "France",
    image: "/destinations/schengen.jpg",
    duration: "6 Days / 5 Nights",
    departure: "Ask for next departure",
    price: "PKR 550,000",
    visaAssistance: true,
    summary: "Experience the charm of France with guided visits to Paris, the Loire castles, Lyon and Nice \u2014 iconic landmarks, scenic beauty and cultural highlights, all-inclusive.",
    highlights: ["Guided tour of Paris, Loire Valley, Lyon and Nice", "4-star group hotel accommodation", "Private coach transport throughout", "Schengen visa documentation assistance included"],
    included: ["Return international airfare", "Hotel accommodation (5 nights)", "Daily breakfast", "Airport and intercity transfers", "Guided city tours", "Visa documentation assistance"],
    excluded: ["Lunch and dinner (unless specified)", "Personal expenses and shopping", "Travel insurance"],
    itinerary: [
      { day: "Day 1", description: "Arrival in Paris, hotel check-in, welcome briefing." },
      { day: "Day 2", description: "Paris city tour \u2014 Eiffel Tower, Louvre, Notre-Dame." },
      { day: "Day 3", description: "Loire Valley castles day trip." },
      { day: "Day 4", description: "Travel to Lyon, city sightseeing." },
      { day: "Day 5", description: "Travel to Nice, French Riviera tour." },
      { day: "Day 6", description: "Departure from Nice or return to Paris for onward flight." }
    ],
    notes: [
      "Group departure dates are updated periodically \u2014 contact us for the next confirmed date.",
      "This tour requires a Schengen visa; approval is at the discretion of the issuing consulate."
    ]
  }
];

// src/data/guides.ts
var guides = [
  {
    slug: "uk-visit-visa-from-pakistan-easy-guide",
    title: "UK Visit Visa from Pakistan: Easy Guide",
    image: "/destinations/uk.jpg",
    category: "Visa Guides",
    publishedDate: "2026-06-23",
    readingTime: "6 min read",
    excerpt: "A clear walkthrough of the UK Standard Visitor visa process for Pakistani applicants \u2014 documents, financial evidence and timelines.",
    content: [
      "Planning a trip to the UK \u2014 whether to see family, attend a wedding, or explore London and beyond \u2014 starts with understanding the Standard Visitor visa. This category covers tourism, family visits and short business trips, and is the route most Pakistani applicants use.",
      "The core of a strong application is consistency: your bank statements, employment documents and travel itinerary should all tell the same clear story about who you are, why you're traveling, and why you'll return to Pakistan afterward.",
      "There's no fixed minimum bank balance for a UK visit visa. What UK Visas and Immigration looks for is genuine, well-documented funds that match your declared income \u2014 not a large deposit made just before applying.",
      "Processing typically takes 3 to 4 weeks from your biometric appointment, though this can vary by season. Booking your appointment early and preparing a complete document set from the start avoids most of the delays we see.",
      "If you've been refused before, don't assume the same result will follow. Most refusals cite specific, addressable concerns \u2014 usually around financial evidence or ties to Pakistan \u2014 and a properly prepared reapplication often succeeds."
    ]
  },
  {
    slug: "how-to-travel-europe-on-a-budget-from-lahore",
    title: "How to Travel Europe on Budget from Travel Agency in Lahore",
    image: "/destinations/schengen.jpg",
    category: "Travel Guides",
    publishedDate: "2026-06-16",
    readingTime: "5 min read",
    excerpt: "Practical tips for planning an affordable Europe trip from Pakistan \u2014 from choosing your Schengen entry point to timing your booking.",
    content: [
      "Traveling to Europe from Pakistan can feel like a luxury reserved for a special occasion, but with the right planning it's more accessible than most people expect.",
      "Start with your Schengen visa application: apply through the consulate of the country where you'll spend the most nights, and build your itinerary around cities with good rail or low-cost flight connections \u2014 this alone can cut your in-trip transport costs significantly.",
      "Group tours are one of the most cost-effective ways to see multiple countries in one trip, since flights, accommodation and guided sightseeing are bundled together at group rates.",
      "Booking your flights and hotels several months ahead, and traveling in shoulder-season months rather than peak summer, typically brings the biggest savings on a Europe itinerary.",
      "Whichever route you choose, make sure your Schengen visa documentation \u2014 travel insurance, confirmed itinerary and financial evidence \u2014 is complete before you finalize non-refundable bookings."
    ]
  },
  {
    slug: "why-book-air-blue-ticket-in-lahore-with-ali-baba",
    title: "Why Book Your Air Blue Ticket in Lahore with Ali Baba?",
    image: "/destinations/airliner.jpg",
    category: "Latest Updates",
    publishedDate: "2026-06-27",
    readingTime: "4 min read",
    excerpt: "What to look for when choosing where to book domestic and international airline tickets in Lahore.",
    content: [
      "Selecting a travel agency for your airline ticket isn't just about finding the lowest fare \u2014 it's about getting accurate, current information and support if your travel plans change.",
      "As a Lahore-based travel agency, we book both domestic routes and international connections, keeping an eye on fare changes and schedule updates so you're not caught off guard.",
      "Booking through a local office also means you have somewhere to walk in if you need help with rebooking, refunds, or coordinating your ticket with a visa application timeline.",
      "If your trip also involves a visa application, timing your ticket purchase around your visa decision \u2014 rather than before it \u2014 helps avoid unnecessary cancellation costs."
    ]
  }
];

// src/data/placeholders.ts
var sampleSuccessStories = [
  { country: "UK", category: "Family Visit Visa", period: "2026", summary: "Assisted with documentation for a family visit application to attend a wedding." },
  { country: "Canada", category: "Visitor Visa", period: "2026", summary: "Guided a reapplication following a previous refusal, focusing on stronger financial evidence." },
  { country: "Schengen", category: "Tourist Visa", period: "2025", summary: "Supported a first-time applicant through the Schengen documentation process." },
  { country: "Australia", category: "Visitor Visa", period: "2025", summary: "Helped a business owner prepare a visit visa case for a trade conference." }
];
var sampleReviews = [
  {
    name: "Sara Malik",
    location: "Islamabad",
    rating: 5,
    text: "Alibaba Travel made my dream trip to Canada a reality, and I'm so grateful for their amazing service! Their team was patient, understanding, and went above and beyond to ensure everything was perfect.",
    photo: "/testimonials/sara-malik.webp"
  },
  {
    name: "Zeeshan Shah",
    location: "Lahore",
    rating: 5,
    text: "I recently booked a trip to the UK through Alibaba Travel, and I can't praise their service enough! From start to finish, the team was incredibly professional and attentive.",
    photo: "/testimonials/zeeshan-shah.webp"
  }
];
var sampleVideos = [
  {
    title: "How to Apply for a Spain Visa from Pakistan? | Complete Application Process 2026",
    category: "Visa Guides",
    duration: "10:55",
    youtubeUrl: "https://www.youtube.com/watch?v=AedYZXUmxKc",
    thumbnail: "https://i.ytimg.com/vi/AedYZXUmxKc/hqdefault.jpg"
  },
  {
    title: "Canada Visa Approved After Multiple Refusals! | Refusal se Approval Tak Complete Guide",
    category: "Refusal Guidance",
    duration: "9:54",
    youtubeUrl: "https://www.youtube.com/watch?v=0OzxNNQuFQI",
    thumbnail: "https://i.ytimg.com/vi/0OzxNNQuFQI/hqdefault.jpg"
  },
  {
    title: "Travel History Banani Hai? 2 Best International Tour Packages Explained",
    category: "Group Tours",
    duration: "7:08",
    youtubeUrl: "https://www.youtube.com/watch?v=k9u0OBwYDMk",
    thumbnail: "https://i.ytimg.com/vi/k9u0OBwYDMk/hqdefault.jpg"
  }
];

// src/data/faqs.ts
var generalFaqs = [
  { question: "How much bank balance is required for a visit visa?", answer: "There's no single fixed figure across countries. What matters most is that your funds are genuine, well-documented, and consistent with your declared income \u2014 we review this for your specific destination during consultation." },
  { question: "How long does visa processing take?", answer: "Processing times vary by country and season \u2014 typically a few days for e-Visas up to several weeks for UK, Canada, USA, Australia and Schengen visit visas. We share the current expected timeline for your destination during consultation." },
  { question: "Can a previously refused applicant apply again?", answer: "Yes. Most refusals cite specific, addressable concerns. We review the refusal letter, identify what needs to be strengthened, and help you prepare a stronger reapplication." },
  { question: "Do you guarantee visa approval?", answer: "No \u2014 visa decisions are made solely by the relevant embassy, consulate or immigration authority. We provide professional documentation and case assessment, not guaranteed outcomes." },
  { question: "Can you prepare my visa documents?", answer: "Yes, document preparation and checklist guidance is a core part of our visa consultancy service, for both first-time and previously refused applicants." },
  { question: "Where are your offices?", answer: "We have offices in Lahore, Islamabad and Wazirabad, with a new Karachi office opening 7 September 2026. See our Locations pages for full addresses and directions." },
  { question: "Can I book tickets through Ali Baba Travel Advisor?", answer: "Yes, we offer international and domestic air ticketing alongside our visa consultancy and tour packages." },
  { question: "How do I start a consultation?", answer: "You can book a consultation online, call or WhatsApp us directly, or visit any of our offices for a face-to-face discussion." }
];

// src/data/site.ts
var siteConfig = {
  name: "Ali Baba Travel Advisor",
  whatsappNumber: "923111666076",
  phone: "+92 311 1666076",
  phoneSecondary: "+92 337 6027555",
  email: "alibabaadvisor@gmail.com",
  socials: {
    facebook: "https://www.facebook.com/share/19K6oKut5R/",
    instagram: "https://www.instagram.com/alibabatraveladvisor/",
    youtube: "https://www.youtube.com/@AliBabaTravelAdvisor"
  }
};

// prisma/seed.ts
var prisma = new import_client.PrismaClient();
async function main() {
  console.log("Seeding admin user...");
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const passwordHash = await import_bcryptjs.default.hash(adminPassword, 10);
  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: { email: adminEmail, passwordHash, name: "Admin" }
  });
  console.log("Seeding site settings...");
  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      phone: siteConfig.phone,
      phoneSecondary: siteConfig.phoneSecondary,
      whatsappNumber: siteConfig.whatsappNumber,
      email: siteConfig.email,
      facebookUrl: siteConfig.socials.facebook,
      instagramUrl: siteConfig.socials.instagram,
      youtubeUrl: siteConfig.socials.youtube,
      announcementText: "Our new Karachi office opens Monday, 7 September 2026.",
      announcementHref: "/locations/karachi",
      announcementActive: true
    }
  });
  console.log("Seeding offices...");
  for (const [i, office] of offices.entries()) {
    const content = locationContent.find((l) => l.slug === office.slug);
    await prisma.office.upsert({
      where: { slug: office.slug },
      update: {},
      create: {
        slug: office.slug,
        city: office.city,
        address: office.address,
        phone: office.phone,
        hours: office.hours,
        mapUrl: office.mapUrl,
        openingDate: office.openingDate ? new Date(office.openingDate) : null,
        intro: content?.intro ?? "",
        localContext: content?.localContext ?? "",
        servicesOffered: content?.servicesOffered ?? [],
        sortOrder: i
      }
    });
  }
  console.log("Seeding countries...");
  const allCountries = [...popularDestinations, ...moreDestinations];
  for (const [i, country] of allCountries.entries()) {
    const rich = countryPages.find((c) => c.slug === country.slug);
    await prisma.country.upsert({
      where: { slug: country.slug },
      update: {},
      create: {
        slug: country.slug,
        name: country.name,
        flagEmoji: country.flag ?? null,
        flagImage: country.flagImage ?? null,
        heroImage: `/destinations/${country.slug}.jpg`,
        visaType: country.visaType,
        description: country.description,
        featured: popularDestinations.some((p) => p.slug === country.slug),
        metaTitle: rich?.metaTitle,
        metaDescription: rich?.metaDescription,
        intro: rich?.intro,
        whoCanApply: rich?.whoCanApply ?? void 0,
        visaTypes: rich?.visaTypes ?? void 0,
        documents: rich?.documents ?? void 0,
        financialNote: rich?.financialNote,
        processingTime: rich?.processingTime,
        steps: rich?.steps ?? void 0,
        refusalReasons: rich?.refusalReasons ?? void 0,
        faqs: rich?.faqs ?? void 0,
        sortOrder: i
      }
    });
  }
  console.log("Seeding refusal pages...");
  for (const [i, r] of refusalPages.entries()) {
    await prisma.refusalPage.upsert({
      where: { slug: r.slug },
      update: {},
      create: {
        slug: r.slug,
        country: r.country,
        metaTitle: r.metaTitle,
        metaDescription: r.metaDescription,
        intro: r.intro,
        commonReasons: r.commonReasons,
        whatWeReview: r.whatWeReview,
        specialNote: r.specialNote,
        faqs: r.faqs,
        sortOrder: i
      }
    });
  }
  console.log("Seeding service pages...");
  for (const [i, s] of servicePages.entries()) {
    await prisma.servicePage.upsert({
      where: { slug: s.slug },
      update: {},
      create: {
        slug: s.slug,
        title: s.title,
        metaDescription: s.metaDescription,
        intro: s.intro,
        highlights: s.highlights,
        process: s.process,
        faqs: s.faqs,
        sortOrder: i
      }
    });
  }
  console.log("Seeding tours...");
  for (const [i, t] of tours.entries()) {
    await prisma.tour.upsert({
      where: { slug: t.slug },
      update: {},
      create: {
        slug: t.slug,
        destination: t.destination,
        image: t.image,
        duration: t.duration,
        departure: t.departure,
        price: t.price,
        visaAssistance: t.visaAssistance,
        summary: t.summary,
        highlights: t.highlights,
        included: t.included,
        excluded: t.excluded,
        itinerary: t.itinerary,
        notes: t.notes,
        sortOrder: i
      }
    });
  }
  console.log("Seeding guides...");
  for (const g of guides) {
    await prisma.guide.upsert({
      where: { slug: g.slug },
      update: {},
      create: {
        slug: g.slug,
        title: g.title,
        image: g.image,
        category: g.category,
        publishedDate: new Date(g.publishedDate),
        readingTime: g.readingTime,
        excerpt: g.excerpt,
        content: g.content
      }
    });
  }
  console.log("Seeding testimonials...");
  for (const [i, t] of sampleReviews.entries()) {
    const existing = await prisma.testimonial.findFirst({ where: { name: t.name, text: t.text } });
    if (!existing) {
      await prisma.testimonial.create({
        data: { name: t.name, location: t.location, rating: t.rating, text: t.text, photo: t.photo, sortOrder: i }
      });
    }
  }
  console.log("Seeding success stories...");
  for (const [i, s] of sampleSuccessStories.entries()) {
    const existing = await prisma.successStory.findFirst({ where: { country: s.country, summary: s.summary } });
    if (!existing) {
      await prisma.successStory.create({
        data: { country: s.country, category: s.category, period: s.period, summary: s.summary, sortOrder: i }
      });
    }
  }
  console.log("Seeding videos...");
  for (const [i, v] of sampleVideos.entries()) {
    const existing = await prisma.video.findFirst({ where: { title: v.title } });
    if (!existing) {
      await prisma.video.create({
        data: {
          title: v.title,
          category: v.category,
          duration: v.duration,
          youtubeUrl: v.youtubeUrl,
          thumbnail: v.thumbnail,
          sortOrder: i
        }
      });
    }
  }
  console.log("Seeding FAQs...");
  for (const [i, f] of generalFaqs.entries()) {
    const existing = await prisma.faq.findFirst({ where: { question: f.question } });
    if (!existing) {
      await prisma.faq.create({ data: { question: f.question, answer: f.answer, sortOrder: i } });
    }
  }
  console.log("Seeding team...");
  const ceoBio = "Leads Ali Baba Travel Advisor's visa consultancy and travel advisory operations across Lahore, Islamabad, Wazirabad and the newly opened Karachi office.";
  const existingCeo = await prisma.teamMember.findFirst({ where: { name: "Syed Ali Jawad" } });
  if (existingCeo) {
    await prisma.teamMember.update({ where: { id: existingCeo.id }, data: { bio: ceoBio } });
  } else {
    await prisma.teamMember.create({
      data: { name: "Syed Ali Jawad", role: "Chief Executive Officer", bio: ceoBio, sortOrder: 0 }
    });
  }
  console.log("Seed complete.");
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
