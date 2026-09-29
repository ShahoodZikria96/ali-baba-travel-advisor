/**
 * Official government sources per destination. Country pages link here so
 * visitors can verify current requirements at the source — we never present
 * visa rules as permanent facts.
 *
 * REVIEW: re-check these URLs at each quarterly content review; governments
 * restructure their sites often.
 */
export interface OfficialSource {
  label: string;
  href: string;
}

export const officialSources: Record<string, OfficialSource[]> = {
  uk: [{ label: "GOV.UK — Standard Visitor visa", href: "https://www.gov.uk/standard-visitor" }],
  canada: [{ label: "IRCC — Visit Canada", href: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html" }],
  usa: [{ label: "U.S. Department of State — Visas", href: "https://travel.state.gov/content/travel/en/us-visas.html" }],
  australia: [{ label: "Australian Department of Home Affairs", href: "https://immi.homeaffairs.gov.au/" }],
  schengen: [{ label: "European Commission — Schengen visa policy", href: "https://home-affairs.ec.europa.eu/" }],
  turkey: [{ label: "Republic of Türkiye — official e-Visa portal", href: "https://www.evisa.gov.tr/en/" }],
  japan: [{ label: "Ministry of Foreign Affairs of Japan — Visas", href: "https://www.mofa.go.jp/j_info/visit/visa/index.html" }],
  "new-zealand": [{ label: "Immigration New Zealand", href: "https://www.immigration.govt.nz/" }],
  uae: [{ label: "UAE Federal Authority for Identity, Citizenship, Customs & Port Security", href: "https://icp.gov.ae/" }],
  malaysia: [{ label: "Immigration Department of Malaysia", href: "https://www.imi.gov.my/" }],
  azerbaijan: [{ label: "Azerbaijan official e-Visa portal (ASAN Visa)", href: "https://evisa.gov.az/en/" }],
  "south-africa": [{ label: "South African Department of Home Affairs", href: "https://www.dha.gov.za/" }],
};
