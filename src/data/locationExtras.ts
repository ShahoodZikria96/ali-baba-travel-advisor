/**
 * Extra, genuinely local content per office (FAQs + areas served). Kept in
 * code (not the DB) so it ships with the site; admin-edited office fields
 * (intro, local context, services) remain in the CMS.
 *
 * Only cities where the business actually has an office get a page. Other
 * cities are served remotely (phone / WhatsApp) — see `remoteCities`.
 */
export interface LocationExtra {
  areasServed: string[];
  faqs: { question: string; answer: string }[];
}

export const locationExtras: Record<string, LocationExtra> = {
  lahore: {
    areasServed: ["Gulberg", "Model Town", "Garden Town", "DHA Lahore", "Johar Town", "Bahria Town Lahore", "Faisal Town", "Wapda Town"],
    faqs: [
      {
        question: "Where is the Ali Baba Travel Advisor office in Lahore?",
        answer: "Our Lahore office is at Office No. 1 & 2, Mezzanine Floor, Siddiq Trade Center, Gulberg 2, Lahore. Use the Get Directions link on this page to open it in Google Maps.",
      },
      {
        question: "Can I start my visa enquiry before visiting the Lahore office?",
        answer: "Yes. Send your destination, travel purpose and city on WhatsApp or through the assessment form and a consultant will tell you which documents to bring, so your visit is productive.",
      },
      {
        question: "Do you handle visa appointment support for applicants in Lahore?",
        answer: "We can guide you through the online application and appointment-booking steps where the destination uses them. Appointment availability and the final visa decision are controlled by the embassy or its visa application centre, not by us.",
      },
    ],
  },
  islamabad: {
    areasServed: ["G-11", "G-10", "F-10", "F-11", "I-8", "E-11", "Rawalpindi", "Bahria Town Rawalpindi"],
    faqs: [
      {
        question: "Do you serve clients from Rawalpindi at the Islamabad office?",
        answer: "Yes. Our G-11 Markaz office is reachable from Rawalpindi and the surrounding twin-city area, and we also handle Rawalpindi enquiries by phone and WhatsApp.",
      },
      {
        question: "Why does an Islamabad office matter for visa applicants?",
        answer: "Most foreign embassies and high commissions in Pakistan are based in Islamabad, so applicants there often need to time document preparation around embassy processes. Our team can help you plan submission and follow-up, but we do not control embassy decisions or timelines.",
      },
      {
        question: "Where exactly is the Islamabad office?",
        answer: "Office No. 33–34, Al-Anayat Mall, G-11 Markaz, Islamabad. Directions are available through the Get Directions link on this page.",
      },
    ],
  },
  wazirabad: {
    areasServed: ["Wazirabad", "Gujranwala", "Gujrat", "Sialkot", "Hafizabad", "Kamoke"],
    faqs: [
      {
        question: "Which nearby cities can use the Wazirabad office?",
        answer: "Clients from Wazirabad and neighbouring cities such as Gujranwala, Gujrat and Sialkot can visit us. If travelling to the office is inconvenient, we can begin the assessment on phone or WhatsApp.",
      },
      {
        question: "Do you assist with family visit visa cases from this area?",
        answer: "Yes. Family visit visas are among the most common cases we see here — we help you organise invitation-related and financial documents, but the visa decision rests with the embassy or immigration authority.",
      },
      {
        question: "Where is the Wazirabad office?",
        answer: "Arif Shaheed Road, near Bank Alfalah, Wazirabad. Use the Get Directions link for the map location.",
      },
    ],
  },
  karachi: {
    areasServed: ["DHA Phase 2 Extension", "DHA Karachi", "Clifton", "Bahria Town Karachi", "Gulshan-e-Iqbal", "Saddar"],
    faqs: [
      {
        question: "Where is the Karachi office?",
        answer: "Office No. 3, Mezzanine Floor, 10C Building, 12 Commercial Street, near Cafe Musa, DHA Phase 2 Extension, Karachi.",
      },
      {
        question: "Can I get a full visa assessment at the Karachi office?",
        answer: "Yes. Bring your CNIC, passport and any previous visa or refusal documents. A consultant will review your profile, explain the document checklist and outline realistic next steps — without promising any outcome.",
      },
      {
        question: "Do you serve other cities in Sindh from Karachi?",
        answer: "We can start an enquiry from anywhere in Pakistan by phone or WhatsApp, and you can visit the Karachi office when in-person document review is needed.",
      },
    ],
  },
};

/**
 * Cities where we do NOT have an office, but where people regularly search for
 * visa/travel help. We serve them by phone/WhatsApp and point to the nearest office.
 */
export const remoteCities: { city: string; nearestOffice: string; nearestSlug: string }[] = [
  { city: "Faisalabad", nearestOffice: "Lahore", nearestSlug: "lahore" },
  { city: "Multan", nearestOffice: "Lahore", nearestSlug: "lahore" },
  { city: "Sialkot", nearestOffice: "Wazirabad", nearestSlug: "wazirabad" },
  { city: "Gujranwala", nearestOffice: "Wazirabad", nearestSlug: "wazirabad" },
  { city: "Rawalpindi", nearestOffice: "Islamabad", nearestSlug: "islamabad" },
  { city: "Peshawar", nearestOffice: "Islamabad", nearestSlug: "islamabad" },
  { city: "Quetta", nearestOffice: "Karachi", nearestSlug: "karachi" },
];
