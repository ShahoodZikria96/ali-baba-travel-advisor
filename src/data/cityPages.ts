/**
 * Service-area pages: "travel agency in <city>" for cities where Ali Baba does not
 * have its own office (Lahore, Islamabad, Wazirabad and Karachi already have
 * /locations pages). Each city page says plainly how a client there is served:
 * online and by phone/WhatsApp, with the nearest office for any in-person step.
 */
export interface Province {
  slug: string;
  name: string;
  /** One factual sentence about the region. */
  about: string;
  /** Offices (slugs under /locations) that serve this region. */
  offices: string[];
}

export interface City {
  slug: string;
  name: string;
  province: string;
  /** What the city is known for (kept factual and short). */
  known: string;
  /** Nearest Ali Baba office (slug under /locations). */
  office: "lahore" | "islamabad" | "wazirabad" | "karachi";
  /** Airport guidance for international departures. */
  airport: string;
  /** Destinations people from here commonly enquire about (slugs of package destinations). */
  popular: string[];
}

export const provinces: Province[] = [
  { slug: "punjab", name: "Punjab", about: "Punjab is Pakistan's most populous province and sends the largest number of international visa applicants.", offices: ["lahore", "wazirabad"] },
  { slug: "sindh", name: "Sindh", about: "Sindh is home to Karachi, Pakistan's largest city and main port, and to Hyderabad, Sukkur and Larkana.", offices: ["karachi"] },
  { slug: "khyber-pakhtunkhwa", name: "Khyber Pakhtunkhwa", about: "Khyber Pakhtunkhwa runs from Peshawar to the northern valleys of Swat, Mansehra and Abbottabad.", offices: ["islamabad"] },
  { slug: "balochistan", name: "Balochistan", about: "Balochistan is Pakistan's largest province by area, with Quetta as its capital and Gwadar as its port city.", offices: ["karachi", "islamabad"] },
  { slug: "islamabad-capital-territory", name: "Islamabad Capital Territory", about: "Islamabad is Pakistan's capital and the home of most foreign embassies, together with its twin city Rawalpindi.", offices: ["islamabad"] },
  { slug: "azad-kashmir", name: "Azad Kashmir", about: "Azad Jammu and Kashmir includes Mirpur and Muzaffarabad, and many families here have relatives abroad, especially in the UK.", offices: ["islamabad", "wazirabad"] },
  { slug: "gilgit-baltistan", name: "Gilgit-Baltistan", about: "Gilgit-Baltistan, with Gilgit and Skardu, is Pakistan's mountain north, home to the Karakoram.", offices: ["islamabad"] },
];

export const cities: City[] = [
  { slug: "rawalpindi", name: "Rawalpindi", province: "punjab", known: "the twin city of Islamabad and a major commercial and military centre", office: "islamabad", airport: "Islamabad International Airport is the nearest international airport and serves Rawalpindi travellers.", popular: ["uk", "europe", "dubai", "turkey"] },
  { slug: "faisalabad", name: "Faisalabad", province: "punjab", known: "Pakistan's textile and industrial hub", office: "lahore", airport: "Faisalabad has its own international airport; many clients also fly from Lahore for wider route options.", popular: ["europe", "uk", "dubai", "thailand"] },
  { slug: "multan", name: "Multan", province: "punjab", known: "the historic City of Saints and a major centre in southern Punjab", office: "lahore", airport: "Multan International Airport handles some international departures; Lahore offers more route options.", popular: ["uk", "dubai", "turkey", "europe"] },
  { slug: "gujranwala", name: "Gujranwala", province: "punjab", known: "an industrial city on the Grand Trunk Road with a large business community", office: "wazirabad", airport: "Sialkot International Airport and Lahore's airport are the closest options for international flights.", popular: ["uk", "europe", "canada", "dubai"] },
  { slug: "sialkot", name: "Sialkot", province: "punjab", known: "a leading exporter of sports goods and surgical instruments", office: "wazirabad", airport: "Sialkot International Airport is in the city, privately developed for exporters and business travellers.", popular: ["europe", "uk", "usa", "dubai"] },
  { slug: "gujrat", name: "Gujrat", province: "punjab", known: "a Grand Trunk Road city known for furniture, fans and a large overseas community", office: "wazirabad", airport: "Sialkot, Lahore and Islamabad are the usual international gateways for Gujrat.", popular: ["uk", "europe", "canada", "usa"] },
  { slug: "sargodha", name: "Sargodha", province: "punjab", known: "Pakistan's citrus capital, famous for kinnow", office: "lahore", airport: "Sargodha travellers usually fly from Lahore or Islamabad.", popular: ["uk", "dubai", "europe", "turkey"] },
  { slug: "bahawalpur", name: "Bahawalpur", province: "punjab", known: "a former princely state with the Noor Mahal and Cholistan desert nearby", office: "lahore", airport: "Bahawalpur has a domestic airport; international departures are usually from Multan or Lahore.", popular: ["dubai", "uk", "turkey", "thailand"] },
  { slug: "sheikhupura", name: "Sheikhupura", province: "punjab", known: "an industrial city close to Lahore", office: "lahore", airport: "Lahore's Allama Iqbal International Airport is the gateway for Sheikhupura.", popular: ["europe", "uk", "dubai", "turkey"] },
  { slug: "jhelum", name: "Jhelum", province: "punjab", known: "a city on the Jhelum River with strong ties to overseas communities", office: "islamabad", airport: "Islamabad International Airport is the usual gateway for Jhelum.", popular: ["uk", "europe", "canada", "dubai"] },
  { slug: "kasur", name: "Kasur", province: "punjab", known: "a city near Lahore known for its shrines and crafts", office: "lahore", airport: "Lahore's Allama Iqbal International Airport is the gateway for Kasur.", popular: ["dubai", "uk", "turkey", "europe"] },
  { slug: "sahiwal", name: "Sahiwal", province: "punjab", known: "an agricultural city on the Lahore-Multan corridor", office: "lahore", airport: "Lahore and Multan are the usual international gateways for Sahiwal.", popular: ["uk", "dubai", "europe", "turkey"] },
  { slug: "okara", name: "Okara", province: "punjab", known: "an agricultural and dairy centre in Punjab", office: "lahore", airport: "Lahore's airport is the usual international gateway for Okara.", popular: ["dubai", "uk", "europe", "turkey"] },
  { slug: "rahim-yar-khan", name: "Rahim Yar Khan", province: "punjab", known: "a major city in south Punjab", office: "lahore", airport: "Rahim Yar Khan has an airport; international travellers usually connect via Lahore, Karachi or Multan.", popular: ["dubai", "uk", "turkey", "thailand"] },
  { slug: "dera-ghazi-khan", name: "Dera Ghazi Khan", province: "punjab", known: "a city in south-west Punjab on the road to Balochistan", office: "lahore", airport: "Multan or Lahore are the usual international gateways.", popular: ["dubai", "uk", "turkey", "europe"] },
  { slug: "hyderabad", name: "Hyderabad", province: "sindh", known: "Sindh's second-largest city, famous for sweets and Sindhi culture", office: "karachi", airport: "Karachi's Jinnah International Airport is the gateway for Hyderabad.", popular: ["dubai", "uk", "turkey", "malaysia"] },
  { slug: "sukkur", name: "Sukkur", province: "sindh", known: "a city on the Indus known for the Sukkur Barrage", office: "karachi", airport: "Sukkur has an airport for domestic flights; international travellers usually connect via Karachi or Lahore.", popular: ["dubai", "uk", "turkey", "thailand"] },
  { slug: "larkana", name: "Larkana", province: "sindh", known: "a Sindh city close to the ancient site of Mohenjo-daro", office: "karachi", airport: "Karachi is the usual international gateway for Larkana.", popular: ["dubai", "uk", "turkey", "malaysia"] },
  { slug: "peshawar", name: "Peshawar", province: "khyber-pakhtunkhwa", known: "the capital of Khyber Pakhtunkhwa and one of South Asia's oldest living cities", office: "islamabad", airport: "Bacha Khan International Airport serves Peshawar; Islamabad offers more routes.", popular: ["uk", "europe", "dubai", "turkey"] },
  { slug: "mardan", name: "Mardan", province: "khyber-pakhtunkhwa", known: "a major city in Khyber Pakhtunkhwa", office: "islamabad", airport: "Peshawar and Islamabad are the usual international gateways for Mardan.", popular: ["uk", "dubai", "europe", "turkey"] },
  { slug: "abbottabad", name: "Abbottabad", province: "khyber-pakhtunkhwa", known: "a hill-station city and gateway to the Galiyat and Hazara region", office: "islamabad", airport: "Islamabad International Airport is the closest international gateway.", popular: ["uk", "europe", "dubai", "canada"] },
  { slug: "mansehra", name: "Mansehra", province: "khyber-pakhtunkhwa", known: "the gateway to the Kaghan Valley and the Karakoram Highway", office: "islamabad", airport: "Islamabad International Airport is the closest international gateway.", popular: ["uk", "dubai", "europe", "turkey"] },
  { slug: "swat", name: "Swat (Mingora)", province: "khyber-pakhtunkhwa", known: "a scenic valley often called the Switzerland of the East", office: "islamabad", airport: "Islamabad and Peshawar are the usual international gateways for Swat.", popular: ["uk", "europe", "switzerland", "dubai"] },
  { slug: "quetta", name: "Quetta", province: "balochistan", known: "the capital of Balochistan, famous for fruit and surrounding mountains", office: "islamabad", airport: "Quetta International Airport serves the city; most international trips connect via Karachi, Lahore or Islamabad.", popular: ["dubai", "uk", "turkey", "europe"] },
  { slug: "gwadar", name: "Gwadar", province: "balochistan", known: "a deep-sea port city on the Arabian Sea", office: "karachi", airport: "Karachi is the main gateway for international connections.", popular: ["dubai", "turkey", "uk", "thailand"] },
  { slug: "mirpur", name: "Mirpur (Azad Kashmir)", province: "azad-kashmir", known: "a city with one of Pakistan's strongest family links to the United Kingdom", office: "islamabad", airport: "Islamabad International Airport is the gateway for Mirpur travellers.", popular: ["uk", "europe", "canada", "dubai"] },
  { slug: "muzaffarabad", name: "Muzaffarabad", province: "azad-kashmir", known: "the capital of Azad Jammu and Kashmir, on the Jhelum and Neelum rivers", office: "islamabad", airport: "Islamabad International Airport is the gateway for Muzaffarabad.", popular: ["uk", "dubai", "europe", "turkey"] },
  { slug: "gilgit", name: "Gilgit", province: "gilgit-baltistan", known: "the capital of Gilgit-Baltistan and a gateway to the Karakoram", office: "islamabad", airport: "Gilgit has a domestic airport; international departures are from Islamabad.", popular: ["dubai", "uk", "turkey", "europe"] },
  { slug: "skardu", name: "Skardu", province: "gilgit-baltistan", known: "the base for treks to K2 and the Baltoro region", office: "islamabad", airport: "Skardu has a domestic airport; international departures are from Islamabad.", popular: ["dubai", "turkey", "switzerland", "uk"] },
];

export function getCity(slug: string) {
  return cities.find((c) => c.slug === slug);
}
export function getProvince(slug: string) {
  return provinces.find((p) => p.slug === slug);
}
