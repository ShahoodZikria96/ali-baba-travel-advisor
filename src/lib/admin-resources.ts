export type FieldType = "text" | "textarea" | "json" | "boolean" | "date" | "number" | "select";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  placeholder?: string;
  helpText?: string;
}

export interface ResourceConfig {
  key: string;
  label: string;
  singularLabel: string;
  model: string;
  listColumns: string[];
  titleField: string;
  fields: FieldConfig[];
}

const jsonHelp = {
  stringArray: 'JSON array of strings, e.g. ["First item", "Second item"]',
  qaArray: 'JSON array of {"question","answer"}, e.g. [{"question":"Q?","answer":"A."}]',
  itineraryArray: 'JSON array of {"day","description"}, e.g. [{"day":"Day 1","description":"Arrival."}]',
  nameDescArray: 'JSON array of {"name","description"}, e.g. [{"name":"Standard Visa","description":"..."}]',
  paragraphArray: 'JSON array of paragraph strings, e.g. ["First paragraph.", "Second paragraph."]',
};

export const resources: Record<string, ResourceConfig> = {
  offices: {
    key: "offices",
    label: "Offices / Locations",
    singularLabel: "Office",
    model: "office",
    titleField: "city",
    listColumns: ["city", "slug", "published"],
    fields: [
      { name: "slug", label: "Slug", type: "text", required: true, helpText: "URL path, e.g. lahore" },
      { name: "city", label: "City", type: "text", required: true },
      { name: "address", label: "Address", type: "textarea", required: true },
      { name: "phone", label: "Phone", type: "text", required: true },
      { name: "hours", label: "Business Hours", type: "text", required: true },
      { name: "mapUrl", label: "Google Maps URL", type: "text", required: true },
      { name: "openingDate", label: "Opening Date (leave blank if already open)", type: "date" },
      { name: "intro", label: "Intro Paragraph", type: "textarea", required: true },
      { name: "localContext", label: "Local Context Paragraph", type: "textarea", required: true },
      { name: "servicesOffered", label: "Services Offered", type: "json", required: true, helpText: jsonHelp.stringArray },
      { name: "sortOrder", label: "Sort Order", type: "number" },
      { name: "published", label: "Published", type: "boolean" },
    ],
  },
  countries: {
    key: "countries",
    label: "Visa Countries",
    singularLabel: "Country",
    model: "country",
    titleField: "name",
    listColumns: ["name", "slug", "featured", "published"],
    fields: [
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "name", label: "Country Name", type: "text", required: true },
      { name: "flagEmoji", label: "Flag Emoji (fallback if no flag image)", type: "text", placeholder: "🇬🇧" },
      { name: "flagImage", label: "Flag Image Path", type: "text", placeholder: "/flags/uk.webp" },
      { name: "heroImage", label: "Hero Image Path", type: "text", placeholder: "/destinations/uk.jpg" },
      { name: "visaType", label: "Visa Type Label", type: "text", required: true },
      { name: "description", label: "Short Description", type: "textarea", required: true },
      { name: "featured", label: "Featured on Homepage", type: "boolean" },
      { name: "metaTitle", label: "SEO Meta Title", type: "text" },
      { name: "metaDescription", label: "SEO Meta Description", type: "textarea" },
      { name: "intro", label: "Intro Paragraph", type: "textarea" },
      { name: "whoCanApply", label: "Who Can Apply", type: "json", helpText: jsonHelp.stringArray },
      { name: "visaTypes", label: "Visa Types", type: "json", helpText: jsonHelp.nameDescArray },
      { name: "documents", label: "Required Documents", type: "json", helpText: jsonHelp.stringArray },
      { name: "financialNote", label: "Financial Note", type: "textarea" },
      { name: "processingTime", label: "Processing Time", type: "textarea" },
      { name: "steps", label: "Application Steps", type: "json", helpText: jsonHelp.stringArray },
      { name: "refusalReasons", label: "Common Refusal Reasons", type: "json", helpText: jsonHelp.stringArray },
      { name: "faqs", label: "FAQs", type: "json", helpText: jsonHelp.qaArray },
      { name: "sortOrder", label: "Sort Order", type: "number" },
      { name: "published", label: "Published", type: "boolean" },
    ],
  },
  refusalPages: {
    key: "refusalPages",
    label: "Visa Refusal Pages",
    singularLabel: "Refusal Page",
    model: "refusalPage",
    titleField: "country",
    listColumns: ["country", "slug", "published"],
    fields: [
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "country", label: "Country Name", type: "text", required: true },
      { name: "metaTitle", label: "SEO Meta Title", type: "text" },
      { name: "metaDescription", label: "SEO Meta Description", type: "textarea" },
      { name: "intro", label: "Intro Paragraph", type: "textarea", required: true },
      { name: "commonReasons", label: "Common Reasons", type: "json", required: true, helpText: jsonHelp.stringArray },
      { name: "whatWeReview", label: "What We Review", type: "json", required: true, helpText: jsonHelp.stringArray },
      { name: "specialNote", label: "Special Note (optional)", type: "textarea" },
      { name: "faqs", label: "FAQs", type: "json", required: true, helpText: jsonHelp.qaArray },
      { name: "sortOrder", label: "Sort Order", type: "number" },
      { name: "published", label: "Published", type: "boolean" },
    ],
  },
  servicePages: {
    key: "servicePages",
    label: "Visa Consultancy Services",
    singularLabel: "Service",
    model: "servicePage",
    titleField: "title",
    listColumns: ["title", "slug", "published"],
    fields: [
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "metaDescription", label: "SEO Meta Description", type: "textarea" },
      { name: "intro", label: "Intro Paragraph", type: "textarea", required: true },
      { name: "highlights", label: "Highlights", type: "json", required: true, helpText: jsonHelp.stringArray },
      { name: "process", label: "Process Steps", type: "json", required: true, helpText: jsonHelp.stringArray },
      { name: "faqs", label: "FAQs", type: "json", required: true, helpText: jsonHelp.qaArray },
      { name: "sortOrder", label: "Sort Order", type: "number" },
      { name: "published", label: "Published", type: "boolean" },
    ],
  },
  tours: {
    key: "tours",
    label: "Tour Packages",
    singularLabel: "Tour",
    model: "tour",
    titleField: "destination",
    listColumns: ["destination", "slug", "price", "published"],
    fields: [
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "destination", label: "Destination", type: "text", required: true },
      { name: "image", label: "Image Path", type: "text", required: true, placeholder: "/destinations/uk.jpg" },
      { name: "duration", label: "Duration", type: "text", required: true, placeholder: "6 Days / 5 Nights" },
      { name: "departure", label: "Departure Label", type: "text", required: true, placeholder: "Ask for next departure" },
      { name: "price", label: "Price", type: "text", required: true, placeholder: "PKR 620,000" },
      { name: "visaAssistance", label: "Visa Assistance Included", type: "boolean" },
      { name: "summary", label: "Summary", type: "textarea", required: true },
      { name: "highlights", label: "Highlights", type: "json", required: true, helpText: jsonHelp.stringArray },
      { name: "included", label: "What's Included", type: "json", required: true, helpText: jsonHelp.stringArray },
      { name: "excluded", label: "What's Not Included", type: "json", required: true, helpText: jsonHelp.stringArray },
      { name: "itinerary", label: "Day-by-Day Itinerary", type: "json", required: true, helpText: jsonHelp.itineraryArray },
      { name: "notes", label: "Important Notes", type: "json", required: true, helpText: jsonHelp.stringArray },
      { name: "category", label: "Category", type: "select", options: ["group", "customized"] },
      { name: "sortOrder", label: "Sort Order", type: "number" },
      { name: "published", label: "Published", type: "boolean" },
    ],
  },
  guides: {
    key: "guides",
    label: "Blog / Guides",
    singularLabel: "Guide",
    model: "guide",
    titleField: "title",
    listColumns: ["title", "category", "publishedDate", "published"],
    fields: [
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "image", label: "Featured Image Path", type: "text", required: true },
      { name: "category", label: "Category", type: "select", options: ["Visa Guides", "Travel Guides", "Latest Updates"], required: true },
      { name: "publishedDate", label: "Published Date", type: "date", required: true },
      { name: "readingTime", label: "Reading Time", type: "text", placeholder: "6 min read" },
      { name: "excerpt", label: "Excerpt", type: "textarea", required: true },
      { name: "content", label: "Content Paragraphs", type: "json", required: true, helpText: jsonHelp.paragraphArray },
      { name: "published", label: "Published", type: "boolean" },
    ],
  },
  testimonials: {
    key: "testimonials",
    label: "Testimonials",
    singularLabel: "Testimonial",
    model: "testimonial",
    titleField: "name",
    listColumns: ["name", "location", "rating", "published"],
    fields: [
      { name: "name", label: "Client Name", type: "text", required: true },
      { name: "location", label: "Location", type: "text", required: true },
      { name: "rating", label: "Rating (1-5)", type: "number", required: true },
      { name: "text", label: "Testimonial Text", type: "textarea", required: true },
      { name: "photo", label: "Photo Path", type: "text" },
      { name: "sortOrder", label: "Sort Order", type: "number" },
      { name: "published", label: "Published", type: "boolean" },
    ],
  },
  successStories: {
    key: "successStories",
    label: "Success Stories",
    singularLabel: "Success Story",
    model: "successStory",
    titleField: "country",
    listColumns: ["country", "category", "period", "published"],
    fields: [
      { name: "country", label: "Country", type: "text", required: true },
      { name: "category", label: "Category", type: "text", required: true },
      { name: "period", label: "Period", type: "text", required: true, placeholder: "2026" },
      { name: "summary", label: "Summary", type: "textarea", required: true },
      { name: "sortOrder", label: "Sort Order", type: "number" },
      { name: "published", label: "Published", type: "boolean" },
    ],
  },
  videos: {
    key: "videos",
    label: "Video Library",
    singularLabel: "Video",
    model: "video",
    titleField: "title",
    listColumns: ["title", "category", "published"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "category", label: "Category", type: "text", required: true },
      { name: "duration", label: "Duration", type: "text", placeholder: "8:42" },
      { name: "youtubeUrl", label: "YouTube URL", type: "text" },
      { name: "thumbnail", label: "Thumbnail Path", type: "text" },
      { name: "sortOrder", label: "Sort Order", type: "number" },
      { name: "published", label: "Published", type: "boolean" },
    ],
  },
  faqs: {
    key: "faqs",
    label: "General FAQs",
    singularLabel: "FAQ",
    model: "faq",
    titleField: "question",
    listColumns: ["question", "published"],
    fields: [
      { name: "question", label: "Question", type: "text", required: true },
      { name: "answer", label: "Answer", type: "textarea", required: true },
      { name: "sortOrder", label: "Sort Order", type: "number" },
      { name: "published", label: "Published", type: "boolean" },
    ],
  },
  teamMembers: {
    key: "teamMembers",
    label: "Team Members",
    singularLabel: "Team Member",
    model: "teamMember",
    titleField: "name",
    listColumns: ["name", "role", "published"],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "role", label: "Role", type: "text", required: true },
      { name: "photo", label: "Photo Path", type: "text" },
      { name: "bio", label: "Bio", type: "textarea" },
      { name: "sortOrder", label: "Sort Order", type: "number" },
      { name: "published", label: "Published", type: "boolean" },
    ],
  },
  leads: {
    key: "leads",
    label: "Leads / Enquiries",
    singularLabel: "Lead",
    model: "lead",
    titleField: "type",
    listColumns: ["type", "status", "source", "createdAt"],
    fields: [
      { name: "type", label: "Type", type: "text" },
      { name: "status", label: "Status", type: "select", options: ["new", "contacted", "closed"] },
      { name: "source", label: "Source Page", type: "text" },
      { name: "data", label: "Submitted Data", type: "json" },
    ],
  },
};

export function getResource(key: string) {
  return resources[key];
}
