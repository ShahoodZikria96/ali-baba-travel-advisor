export interface RefusalPageContent {
  slug: string;
  country: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  commonReasons: string[];
  whatWeReview: string[];
  specialNote?: string;
  faqs: { question: string; answer: string }[];
}

export const refusalPages: RefusalPageContent[] = [
  {
    slug: "uk",
    country: "United Kingdom",
    metaTitle: "UK Visa Refusal Assistance from Pakistan",
    metaDescription: "Guidance for applicants refused a UK visit visa — common refusal reasons, reapplication strategy and the Pre-Action Protocol.",
    intro:
      "A UK visa refusal is not the end of the road. Many applicants are successful on a well-prepared reapplication once the specific concerns raised by the Entry Clearance Officer are properly addressed.",
    commonReasons: [
      "Insufficient evidence of financial standing",
      "Weak or unclear ties to Pakistan",
      "Inconsistent information across the application and supporting documents",
      "Sponsor documents not meeting the required evidentiary standard",
      "Unclear or implausible purpose of visit",
    ],
    whatWeReview: [
      "The full refusal letter and each reason cited by the Entry Clearance Officer",
      "Financial documentation and how it was presented",
      "Evidence of ties to Pakistan (employment, property, family)",
      "Consistency between the application form and supporting documents",
    ],
    specialNote:
      "For eligible cases, a UK Pre-Action Protocol (PAP) letter can be sent to the Home Office ahead of a judicial review claim, where there are grounds to argue the original decision was unlawful. This is a formal legal process — where PAP or judicial review is appropriate, we coordinate with qualified legal counsel; our own role is case assessment, documentation and consultancy.",
    faqs: [
      { question: "How soon can I reapply after a UK visa refusal?", answer: "There's no mandatory waiting period, but we recommend addressing the refusal reasons thoroughly before reapplying rather than resubmitting the same evidence." },
      { question: "What is the Pre-Action Protocol?", answer: "It's a formal letter sent before a judicial review claim, used in cases where there are arguable grounds that the refusal decision was legally flawed. It requires legal assessment on a case-by-case basis." },
    ],
  },
  {
    slug: "canada",
    country: "Canada",
    metaTitle: "Canada Visa Refusal Assistance from Pakistan",
    metaDescription: "Guidance for applicants refused a Canada visitor visa — reconsideration requests, reapplication and judicial review coordination.",
    intro:
      "Canada visitor visa refusals are common and often relate to how an officer assessed your ties to Pakistan or your financial documentation. A stronger, better-evidenced reapplication frequently succeeds where the first attempt did not.",
    commonReasons: [
      "Officer not satisfied you would leave Canada by the end of your stay",
      "Insufficient or unclear proof of funds",
      "Limited or no international travel history",
      "Purpose of visit not clearly established",
      "Family ties in Canada raising unaddressed dual-intent concerns",
    ],
    whatWeReview: [
      "The refusal letter and GCMS notes, where available",
      "Financial evidence and its presentation",
      "Ties to Pakistan and travel history",
      "Whether a reconsideration request or fresh application is more appropriate",
    ],
    specialNote:
      "Canada reconsideration requests and judicial review are formal processes with strict timelines. We assess whether your case is suited to reconsideration, a fresh application, or judicial review, and coordinate with qualified legal counsel where formal legal representation is required.",
    faqs: [
      { question: "What is a Canada reconsideration request?", answer: "It asks IRCC to review a decision without submitting a brand new application — generally used where there's a clear officer error, and it isn't appropriate for every refusal." },
      { question: "Do you handle Canada judicial review directly?", answer: "We provide consultancy and case documentation support, and coordinate with qualified legal counsel for the judicial review process itself, since that requires formal legal representation." },
    ],
  },
  {
    slug: "schengen",
    country: "Schengen Europe",
    metaTitle: "Schengen Visa Refusal & Appeal Guidance from Pakistan",
    metaDescription: "Guidance for applicants refused a Schengen visa — common reasons, appeal routes and reapplication support.",
    intro:
      "Schengen visa refusals must state specific reasons under EU regulation, which gives applicants a clear basis to either appeal to the issuing country's authority or strengthen a fresh application.",
    commonReasons: [
      "Incomplete or inconsistent travel itinerary",
      "Insufficient travel insurance coverage",
      "Unclear purpose or justification for the visit",
      "Insufficient evidence of funds for the trip",
      "Doubts about intention to leave Schengen territory before visa expiry",
    ],
    whatWeReview: [
      "The refusal notice and specific grounds cited",
      "Travel insurance and itinerary documentation",
      "Financial evidence",
      "Whether an appeal to the consulate or a fresh application is the better route",
    ],
    faqs: [
      { question: "Can I appeal a Schengen visa refusal?", answer: "Yes, each Schengen country has its own appeal process and deadline, which is stated on the refusal notice. We can help review whether an appeal or a fresh, stronger application makes more sense for your case." },
    ],
  },
  {
    slug: "australia",
    country: "Australia",
    metaTitle: "Australia Visa Refusal Guidance from Pakistan",
    metaDescription: "Guidance for applicants refused an Australia visitor visa — common reasons and reapplication support.",
    intro:
      "Australian visitor visa refusals typically relate to the genuine temporary entrant assessment. Understanding exactly why your case fell short is the first step toward a stronger reapplication.",
    commonReasons: [
      "Genuine temporary entrant criteria not met",
      "Insufficient financial evidence",
      "Weak or unclear ties to Pakistan",
      "Incomplete or inconsistent supporting documents",
    ],
    whatWeReview: [
      "The refusal notice and decision record",
      "Genuine temporary entrant statement and supporting evidence",
      "Financial documentation and ties to Pakistan",
    ],
    faqs: [
      { question: "Can I request a review of an Australian visa refusal?", answer: "Visitor visa refusals generally don't carry review rights at the Administrative Review Tribunal, so in most cases a stronger fresh application is the practical path forward — we can assess your specific case." },
    ],
  },
  {
    slug: "usa",
    country: "United States",
    metaTitle: "USA Visa Refusal (214(b)) Guidance from Pakistan",
    metaDescription: "Guidance for applicants refused a US B1/B2 visa under Section 214(b) — what it means and how to strengthen a reapplication.",
    intro:
      "Most US visitor visa refusals are issued under Section 214(b), meaning the consular officer wasn't convinced of strong ties to Pakistan at the time of interview. This is not a permanent bar — many applicants succeed on a later, better-prepared application.",
    commonReasons: [
      "Consular officer not convinced of strong ties to Pakistan",
      "Inconsistent or unclear interview answers",
      "Insufficient financial documentation",
      "Unclear or implausible purpose of visit",
    ],
    whatWeReview: [
      "The circumstances and answers given at interview",
      "Financial and employment documentation",
      "Ties to Pakistan and overall application strategy for a future interview",
    ],
    faqs: [
      { question: "Can I appeal a 214(b) refusal?", answer: "There's no formal appeal for a 214(b) refusal — the standard path is to reapply once your circumstances or documentation more clearly demonstrate ties to Pakistan." },
    ],
  },
];

export function getRefusalPage(slug: string) {
  return refusalPages.find((r) => r.slug === slug);
}
