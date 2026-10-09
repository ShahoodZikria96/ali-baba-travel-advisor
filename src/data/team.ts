export const team = [
  {
    name: "Syed Ali Jawad",
    role: "Founder and CEO",
    photo: null as string | null,
    bio: "Founded Ali Baba Travel Advisor in 2024 and leads its visa consultancy and travel advisory operations across Lahore, Islamabad, Wazirabad and Karachi. Has worked in this field since 2016.",
  },
];

/**
 * Extra team members defined in code. getTeamMembers (lib/content.ts) adds them to the list from the
 * admin panel unless a member with the same name already exists there, and applies `teamRoleOverrides`
 * so the public role title matches the structured data. Add a photo path to `photo` when one is available.
 */
export const extraTeam = [
  { name: "Nayab Asghar (Musa)", role: "Operational Manager", photo: null as string | null, bio: "Oversees day-to-day operations across the company's offices." },
  { name: "Mohsin Abbas", role: "Business Consultant", photo: null as string | null, bio: "Advises clients on business-related visa and travel plans." },
  { name: "Nimra Mubashir", role: "Visa Refusal Consultant", photo: null as string | null, bio: "Reviews previous visa refusals and guides applicants on the next step." },
  { name: "Fahad Khokhar", role: "Sales Team Lead", photo: null as string | null, bio: "Leads the sales team that handles new enquiries and tour bookings." },
  { name: "Umair Ahmad Malik", role: "Office Coordinator", photo: null as string | null, bio: "Coordinates client appointments and office operations." },
  { name: "Shahood Zikria", role: "Digital Marketing Manager", photo: null as string | null, bio: "Manages the company's website, online presence and digital marketing." },
];

/** Public role title (and bio) that replaces what the admin panel holds for the same name. */
export const teamRoleOverrides: Record<string, { role: string; bio?: string }> = {
  "syed ali jawad": { role: team[0].role, bio: team[0].bio },
};
