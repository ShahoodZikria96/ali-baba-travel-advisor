import type { PageFaq } from "@/data/pageFaqs";

/**
 * "X tour packages from Pakistan" landing pages (/tour-packages/from-pakistan/<slug>).
 * These target searches such as "europe tour packages from pakistan". Prices are
 * deliberately not published: they depend on season, hotel class, flights and group size,
 * so every page asks for a free quote instead of showing a made-up number.
 */
export interface PackageDestination {
  slug: string;
  name: string;
  /** Short phrase used in titles, e.g. "Europe". */
  region: "Europe" | "Asia" | "Middle East & Africa" | "Americas & Oceania";
  /** Existing /destinations photo (banner + card). */
  image: string;
  intro: string;
  bestTime: string;
  places: string[];
  ideas: string[];
  visaNote: string;
  /** /visas/<slug> page that holds the document checklist, if the site has one. */
  visaSlug?: string;
  /** Group tour on the site that covers this destination. */
  tourSlug?: string;
  related: string[];
  faqs: PageFaq[];
}

export const packageDestinations: PackageDestination[] = [
  {
    slug: "europe",
    name: "Europe",
    region: "Europe",
    image: "/destinations/schengen.webp",
    intro:
      "Europe is the most requested holiday from Pakistan: one Schengen visa lets you cross borders between 25+ countries, so a single trip can combine Paris, Switzerland, Italy and the Netherlands. We build Europe packages around your dates, budget and the countries you want to see, with the visa file prepared in parallel.",
    bestTime: "April to June and September to October are mild and less crowded; July and August are warm but busy; December suits Christmas markets and snow.",
    places: ["Paris, France", "Rome and Venice, Italy", "Amsterdam, Netherlands", "Barcelona, Spain", "Prague, Czech Republic", "Interlaken and Lucerne, Switzerland"],
    ideas: ["7 to 10 day multi-country Schengen circuit", "Paris and Switzerland for families", "Italy and Spain city break", "Honeymoon in Paris, Santorini and Rome"],
    visaNote: "Pakistani passport holders need a Schengen visa for most of Europe. One visa covers all Schengen countries, and you apply to the embassy of the country where you spend the most nights.",
    visaSlug: "schengen",
    related: ["switzerland", "france", "italy", "spain", "germany", "greece"],
    faqs: [
      { question: "Do I need a separate visa for each European country?", answer: "No. A Schengen visa covers all Schengen member countries, so one approved visa can be used for a multi-country trip. UK and Ireland have their own visas." },
      { question: "How far in advance should I book a Europe package?", answer: "Start the visa file at least 6 to 8 weeks before travel and book hotels and flights that match your itinerary. Peak summer departures fill up earlier." },
    ],
  },
  {
    slug: "canada",
    name: "Canada",
    region: "Americas & Oceania",
    image: "/destinations/canada.webp",
    intro:
      "Canada rewards first-time visitors with Niagara Falls, the Rocky Mountains and big, friendly cities. We run Canada group tours and also plan private trips, and our team prepares the visitor visa file with your itinerary, funds and ties to Pakistan documented properly.",
    bestTime: "June to September for warm weather and the Rockies; late September to October for autumn colours; December to February for skiing and winter scenes.",
    places: ["Niagara Falls", "Toronto and the CN Tower", "Banff and Lake Louise", "Ottawa", "Vancouver", "Montreal and Quebec City"],
    ideas: ["Toronto, Niagara Falls and Ottawa", "Rocky Mountains: Banff, Jasper and Lake Louise", "East-to-west Canada group tour"],
    visaNote: "Pakistani passport holders need a Canadian visitor visa (TRV) and biometrics. Approval is decided by the Canadian immigration authority.",
    visaSlug: "canada",
    tourSlug: "canada-group-tour",
    related: ["usa", "uk", "new-zealand", "australia"],
    faqs: [
      { question: "Is there a Canada group tour from Pakistan?", answer: "Yes. Our Canada group tour departs in March 2027 and covers Niagara Falls, Toronto, Banff and Ottawa, with visa support, 4-star hotels, daily activities, return flights and breakfast included. Contact us for dates and the current price." },
      { question: "Can I travel to Canada with family?", answer: "Yes. Each family member needs their own visitor visa application, and we prepare the files together so the documents are consistent." },
    ],
  },
  {
    slug: "switzerland",
    name: "Switzerland",
    region: "Europe",
    image: "/destinations/switzerland.webp",
    intro:
      "Switzerland packages from Pakistan usually combine Zurich, Lucerne, Interlaken and the Jungfrau region, with scenic train rides and mountain excursions. We handle flights, hotels, transfers and the Swiss Schengen visa application.",
    bestTime: "June to September for hiking and lakes; December to March for snow and skiing; May and October are quieter and cheaper.",
    places: ["Zurich", "Lucerne and Mount Pilatus", "Interlaken", "Jungfraujoch", "Zermatt and the Matterhorn", "Geneva"],
    ideas: ["6 to 8 day Switzerland highlights", "Swiss Alps with scenic trains", "Switzerland and Paris combination"],
    visaNote: "Switzerland is in the Schengen area, so Pakistani passport holders need a Schengen visa applied for through the Swiss representation.",
    visaSlug: "switzerland",
    related: ["europe", "france", "italy", "germany"],
    faqs: [
      { question: "How many days do I need for Switzerland?", answer: "Six to eight days is enough for Zurich, Lucerne, Interlaken and a mountain excursion. Add more days for Zermatt, Geneva or a second country." },
      { question: "Is Switzerland expensive?", answer: "It is one of Europe's higher-cost destinations. We help control cost with hotel location, rail passes and the season you travel in." },
    ],
  },
  {
    slug: "south-korea",
    name: "South Korea",
    region: "Asia",
    image: "/destinations/south-korea.webp",
    intro:
      "South Korea mixes palaces, street food, K-culture and mountain scenery, and it is a popular first choice for Pakistani travellers who want an Asian city break. Our packages cover Seoul, Busan and Jeju, and we also run a Japan and South Korea group tour.",
    bestTime: "April to May for spring blossoms and September to November for autumn colours; winter suits skiing; summer is hot and rainy.",
    places: ["Seoul and Gyeongbokgung Palace", "Nami Island", "Busan beaches and Gamcheon village", "Jeju Island", "Gyeongju", "Everland and Lotte World"],
    ideas: ["6 to 8 day Seoul, Nami Island and Everland", "Seoul and Busan", "Japan and South Korea group tour"],
    visaNote: "Pakistani passport holders need a Korean visitor visa, applied for with a documented itinerary, bank statement and ties to Pakistan.",
    visaSlug: "south-korea",
    tourSlug: "japan-south-korea-group-tour",
    related: ["japan", "hong-kong", "singapore", "thailand"],
    faqs: [
      { question: "Is there a group tour covering South Korea?", answer: "Yes, we have Japan and South Korea group tours. Check the tour pages for the current departure and ask us for the price." },
      { question: "Is South Korea good for families?", answer: "Yes. Theme parks, Nami Island, Jeju and Seoul's palaces suit families, and the public transport is simple to use." },
    ],
  },
  {
    slug: "morocco",
    name: "Morocco",
    region: "Middle East & Africa",
    image: "/destinations/morocco.webp",
    intro:
      "Morocco packages from Pakistan focus on Marrakech, Fez, Chefchaouen and a night in the Sahara. It pairs well with Turkey and South Africa in our group tour, or can be planned privately.",
    bestTime: "March to May and September to November are the most comfortable; summer is very hot inland; winter is cool and good for the Atlas mountains.",
    places: ["Marrakech and the medina", "Fez", "Chefchaouen, the blue city", "Casablanca and the Hassan II Mosque", "Merzouga Sahara desert", "Essaouira"],
    ideas: ["7 day Marrakech, Fez and Sahara circuit", "Casablanca, Chefchaouen and Fez", "Turkey, South Africa and Morocco group tour"],
    visaNote: "Entry rules for Pakistani passport holders change from time to time, so we confirm the current visa requirement and prepare the documents before you book.",
    visaSlug: "morocco",
    tourSlug: "turkey-south-africa-morocco-group-tour",
    related: ["turkey", "south-africa", "egypt", "europe"],
    faqs: [
      { question: "Can Morocco be combined with other countries?", answer: "Yes. Our group tour combines Turkey, South Africa and Morocco, and private trips often pair Morocco with Spain or Turkey." },
      { question: "Is Morocco suitable for a honeymoon?", answer: "Yes. Riad stays in Marrakech, a desert camp and the coast at Essaouira make a romantic and good-value trip." },
    ],
  },
  {
    slug: "australia",
    name: "Australia",
    region: "Americas & Oceania",
    image: "/destinations/australia.webp",
    intro:
      "Australia packages cover Sydney, Melbourne, the Gold Coast and the Great Barrier Reef. Long flights and a detailed visa file make good planning important, and our team lines up both together.",
    bestTime: "September to November and March to May for mild weather; December to February is summer and beach season; June to August is winter and good for the tropical north.",
    places: ["Sydney Opera House and Harbour Bridge", "Melbourne and the Great Ocean Road", "Gold Coast theme parks", "Cairns and the Great Barrier Reef", "Uluru", "Blue Mountains"],
    ideas: ["Sydney and Melbourne city break", "Gold Coast family holiday", "East coast: Sydney, Gold Coast and Cairns"],
    visaNote: "Pakistani passport holders need an Australian Visitor visa (subclass 600). It is assessed on your finances, ties to Pakistan and travel plan.",
    visaSlug: "australia",
    related: ["new-zealand", "singapore", "malaysia", "canada"],
    faqs: [
      { question: "How long does an Australian visitor visa take?", answer: "Processing times vary and are published by the Australian Department of Home Affairs. Apply well ahead of your planned departure and avoid booking non-refundable tickets before the decision." },
      { question: "Can I combine Australia and New Zealand?", answer: "Yes. They need separate visas, which we can prepare side by side." },
    ],
  },
  {
    slug: "france",
    name: "France",
    region: "Europe",
    image: "/destinations/france.webp",
    intro:
      "France packages from Pakistan start with Paris and often extend to Nice, Lyon, the Loire castles and Disneyland Paris. It is the classic honeymoon and family destination, and the Schengen visa lets you add neighbouring countries.",
    bestTime: "April to June and September to October for pleasant weather; July and August are warm but busy; December for Christmas lights.",
    places: ["Paris: Eiffel Tower, Louvre and Montmartre", "Disneyland Paris", "Versailles", "Nice and the French Riviera", "Lyon", "Mont Saint-Michel"],
    ideas: ["5 to 7 day Paris with Disneyland", "Paris, Loire Valley, Lyon and Nice", "Paris and Switzerland"],
    visaNote: "France is in the Schengen area. Pakistani passport holders need a Schengen visa, and for a France-focused trip the application goes to the French representation.",
    visaSlug: "france",
    related: ["europe", "switzerland", "italy", "spain"],
    faqs: [
      { question: "Is France good for a honeymoon from Pakistan?", answer: "Yes. Paris, the Riviera and the Loire are popular honeymoon choices, and we can add a Switzerland or Italy leg." },
      { question: "What documents do I need for France?", answer: "The visa checklist is on our France visa page: passport, bank statements, employment or business proof, itinerary, hotel and travel insurance." },
    ],
  },
  {
    slug: "albania",
    name: "Albania",
    region: "Europe",
    image: "/destinations/albania.webp",
    intro:
      "Albania has become a favourite budget-friendly European trip, with Adriatic and Ionian beaches, castles and old Ottoman towns at lower prices than Western Europe. We plan Tirana, Berat and the Albanian Riviera for families and groups.",
    bestTime: "May to September for beaches and warm sea; April and October are quieter for sightseeing.",
    places: ["Tirana", "Berat, the city of a thousand windows", "Sarande and Ksamil beaches", "Gjirokaster", "Albanian Riviera", "Lake Ohrid and Shkoder"],
    ideas: ["5 to 7 day Tirana, Berat and Riviera", "Albania with a Balkan neighbour", "Albania beach holiday"],
    visaNote: "Entry requirements for Pakistani passport holders depend on the traveller's situation and can change, so we confirm the current rule before you book anything.",
    visaSlug: "albania",
    related: ["europe", "greece", "italy", "turkey"],
    faqs: [
      { question: "Why is Albania popular with Pakistani travellers?", answer: "It combines European scenery and beaches with lower hotel and food costs, and it is easy to combine with Greece or Italy." },
      { question: "How many days do I need in Albania?", answer: "Five to seven days covers Tirana, Berat and the coast." },
    ],
  },
  {
    slug: "turkey",
    name: "Turkey",
    region: "Middle East & Africa",
    image: "/destinations/turkey.webp",
    intro:
      "Turkey is popular with Pakistani families for its mix of Istanbul's old city, Cappadocia's balloon valleys and Mediterranean beaches. Our packages and our Turkey, South Africa and Morocco group tour include flights, hotels and visa help.",
    bestTime: "April to June and September to November for sightseeing; July and August for Antalya beaches; winter for Istanbul and snow in the east.",
    places: ["Istanbul: Hagia Sophia and the Blue Mosque", "Cappadocia", "Pamukkale", "Antalya", "Bursa", "Trabzon and Uzungol"],
    ideas: ["7 day Istanbul and Cappadocia", "Istanbul, Bursa and Trabzon", "Turkey, South Africa and Morocco group tour"],
    visaNote: "Turkey requires a visa from Pakistani passport holders, and the type available can depend on other visas held. We confirm the correct route for you.",
    visaSlug: "turkey",
    tourSlug: "turkey-south-africa-morocco-group-tour",
    related: ["azerbaijan", "morocco", "egypt"],
    faqs: [
      { question: "How many days do I need for Turkey?", answer: "Seven days covers Istanbul and Cappadocia; ten days adds the coast or Pamukkale." },
      { question: "Is Turkey a good first international trip?", answer: "Yes. It is varied, good value, and easy to travel as a family or group." },
    ],
  },
  {
    slug: "uk",
    name: "United Kingdom",
    region: "Europe",
    image: "/destinations/uk.webp",
    intro:
      "UK packages from Pakistan combine London, Oxford, Manchester and Edinburgh, often for family visits as well as tourism. The UK Standard Visitor visa is detailed, so we prepare the full file alongside the trip plan.",
    bestTime: "May to September for the best weather; December for Christmas in London; spring for gardens and countryside.",
    places: ["London: Big Ben, Tower Bridge and the London Eye", "Oxford and Cambridge", "Edinburgh", "Manchester and Liverpool", "Lake District", "Bath and Stonehenge"],
    ideas: ["6 day London, Oxford, Manchester and Edinburgh", "London family holiday", "UK and Ireland"],
    visaNote: "Pakistani passport holders need a UK Standard Visitor visa. The UK is not part of the Schengen area, so it needs a separate application.",
    visaSlug: "uk",
    related: ["europe", "canada", "usa", "france"],
    faqs: [
      { question: "Does a UK trip need a Schengen visa too?", answer: "No. The UK has its own visa. If you also want to visit continental Europe you need a Schengen visa as well." },
      { question: "Can I visit family in the UK on a tourist package?", answer: "Yes, but the application should reflect the real purpose of the trip. We advise on the right visa category." },
    ],
  },
  {
    slug: "usa",
    name: "USA",
    region: "Americas & Oceania",
    image: "/destinations/usa.webp",
    intro:
      "USA packages cover New York, Washington DC, Orlando and Los Angeles. A US visitor visa needs an interview, so preparation matters, and we prepare you for the interview and the trip together.",
    bestTime: "April to June and September to October for most cities; summer for national parks; winter for New York holiday season and Florida.",
    places: ["New York: Times Square and Statue of Liberty", "Washington DC", "Orlando theme parks", "Los Angeles and Hollywood", "Las Vegas", "Niagara Falls, New York side"],
    ideas: ["East coast: New York and Washington DC", "Orlando family holiday", "USA and Canada combination"],
    visaNote: "Pakistani passport holders need a US B1/B2 visitor visa with an interview at the US embassy or consulate.",
    visaSlug: "usa",
    related: ["canada", "uk", "australia", "new-zealand"],
    faqs: [
      { question: "Is a USA package possible without a visa decision?", answer: "We recommend waiting for the visa decision before paying for non-refundable flights and hotels." },
      { question: "Can you help with the visa interview?", answer: "We guide you on the application, documents and what the interview covers. The decision is always the consular officer's." },
    ],
  },
  {
    slug: "japan",
    name: "Japan",
    region: "Asia",
    image: "/destinations/japan.webp",
    intro:
      "Japan packages cover Tokyo, Kyoto, Osaka and Mount Fuji, with bullet-train travel between cities. Many of our travellers combine Japan with South Korea or Hong Kong on a group tour.",
    bestTime: "Late March to April for cherry blossoms and October to November for autumn colours; summer is hot and humid; winter suits snow and onsen.",
    places: ["Tokyo", "Kyoto temples and Fushimi Inari", "Osaka and Universal Studios Japan", "Mount Fuji and Hakone", "Hiroshima", "Nara"],
    ideas: ["7 to 9 day Tokyo, Kyoto and Osaka", "Japan with Mount Fuji", "Japan, South Korea and Hong Kong group tour"],
    visaNote: "Pakistani passport holders need a Japanese visa. It requires a clear itinerary, financial documents and proof of ties to Pakistan.",
    visaSlug: "japan",
    tourSlug: "japan-south-korea-group-tour",
    related: ["south-korea", "hong-kong", "singapore", "thailand"],
    faqs: [
      { question: "Is there a Japan group tour?", answer: "Yes, our Japan and South Korea group tours include Japan. Contact us for the current departure." },
      { question: "How long should I spend in Japan?", answer: "A week covers Tokyo, Kyoto and Osaka. Ten days adds Hiroshima or Hokkaido." },
    ],
  },
  {
    slug: "thailand",
    name: "Thailand",
    region: "Asia",
    image: "/destinations/thailand.webp",
    intro:
      "Thailand is a top short-haul holiday for Pakistani travellers: Bangkok and Pattaya for city and shopping, Phuket and Krabi for beaches. Our travel history group tour also includes Thailand.",
    bestTime: "November to February is cool and dry; March to May is hot; June to October brings rain, with lower prices.",
    places: ["Bangkok", "Pattaya and Coral Island", "Phuket and Phi Phi Islands", "Krabi", "Chiang Mai", "Koh Samui"],
    ideas: ["5 night Bangkok and Pattaya", "Phuket and Krabi beach holiday", "Thailand, Indonesia, Malaysia and Sri Lanka group tour"],
    visaNote: "Thailand requires a visa for Pakistani passport holders; we confirm the current process and prepare the supporting documents.",
    visaSlug: "thailand",
    tourSlug: "travel-history-group-tour",
    related: ["malaysia", "indonesia", "singapore", "cambodia"],
    faqs: [
      { question: "How many days do I need for Thailand?", answer: "Five to seven days covers Bangkok and Pattaya or Phuket." },
      { question: "Can I get Thailand with other Asian countries?", answer: "Yes. Our travel history group tour combines Thailand, Indonesia, Malaysia and Sri Lanka in 10 days." },
    ],
  },
  {
    slug: "malaysia",
    name: "Malaysia",
    region: "Asia",
    image: "/destinations/malaysia.webp",
    intro:
      "Malaysia packages combine Kuala Lumpur, Genting Highlands, Langkawi and Penang, with halal food everywhere and direct flights from Pakistan, which makes it a good family choice.",
    bestTime: "December to March for Langkawi and the west coast; Kuala Lumpur is warm year-round with afternoon showers.",
    places: ["Kuala Lumpur and Petronas Towers", "Genting Highlands", "Langkawi", "Penang", "Malacca", "Cameron Highlands"],
    ideas: ["5 night Kuala Lumpur and Genting", "Kuala Lumpur and Langkawi", "Four-country group tour including Malaysia"],
    visaNote: "Malaysia requires a visa for Pakistani passport holders, which we prepare with your itinerary and funds.",
    visaSlug: "malaysia",
    tourSlug: "travel-history-group-tour",
    related: ["thailand", "singapore", "indonesia", "cambodia"],
    faqs: [
      { question: "Is Malaysia family friendly?", answer: "Yes. Halal food is easy to find, attractions are close together and the cities are straightforward to navigate." },
      { question: "Can Malaysia and Singapore be combined?", answer: "Yes, they are linked by road and rail, and make a popular two-country trip." },
    ],
  },
  {
    slug: "azerbaijan",
    name: "Azerbaijan",
    region: "Middle East & Africa",
    image: "/destinations/azerbaijan.webp",
    intro:
      "Azerbaijan, with its modern capital Baku and Caucasus mountains, is a popular short holiday for Pakistani families and groups. We offer Baku city, Gabala and Shahdag packages with flights and hotels.",
    bestTime: "May to June and September to October for mild weather; December to March for snow at Shahdag; summer is hot in Baku.",
    places: ["Baku Old City and Flame Towers", "Gobustan", "Gabala", "Sheki", "Shahdag ski resort", "Heydar Aliyev Center"],
    ideas: ["4 to 5 day Baku city tour", "Baku, Gabala and Sheki", "Winter trip to Shahdag"],
    visaNote: "A visa is required for Pakistani passport holders; we confirm the current process and help prepare the application.",
    visaSlug: "azerbaijan",
    related: ["turkey", "egypt", "europe"],
    faqs: [
      { question: "How many days do I need for Azerbaijan?", answer: "Four to five days covers Baku and a day trip; add two days for Gabala or Sheki." },
      { question: "Is Azerbaijan good for a group trip?", answer: "Yes, it is well suited to groups and families because sights are close together." },
    ],
  },
  {
    slug: "italy",
    name: "Italy",
    region: "Europe",
    image: "/destinations/italy.webp",
    intro:
      "Italy packages usually combine Rome, Florence, Venice and Milan, with the Amalfi Coast as an optional extra. It is a classic first Europe trip and works well with a France or Switzerland leg.",
    bestTime: "April to June and September to October; July and August are hot and busy; winter is quiet and cheaper.",
    places: ["Rome: Colosseum and Vatican", "Florence", "Venice", "Milan", "Amalfi Coast", "Pisa"],
    ideas: ["6 to 8 day Rome, Florence and Venice", "Italy and Switzerland", "Italy and France"],
    visaNote: "Italy is in the Schengen area, so Pakistani passport holders need a Schengen visa applied for through Italy when it is the main destination.",
    visaSlug: "italy",
    related: ["europe", "france", "switzerland", "spain"],
    faqs: [
      { question: "How many days do I need for Italy?", answer: "Seven days covers Rome, Florence and Venice. Add days for the Amalfi Coast or Milan." },
      { question: "Is Italy good for a honeymoon?", answer: "Yes. Venice, Florence and the Amalfi Coast are popular honeymoon stops." },
    ],
  },
  {
    slug: "spain",
    name: "Spain",
    region: "Europe",
    image: "/destinations/spain.webp",
    intro:
      "Spain packages focus on Barcelona, Madrid, Seville and Granada, with beaches and Moorish history in one country. It combines well with Portugal, France or Morocco.",
    bestTime: "April to June and September to October; July and August are very hot inland; winter is mild on the coast.",
    places: ["Barcelona: Sagrada Familia and Park Guell", "Madrid", "Seville", "Granada and the Alhambra", "Valencia", "Costa del Sol"],
    ideas: ["7 day Barcelona and Madrid", "Andalusia: Seville, Granada and Malaga", "Spain and Morocco"],
    visaNote: "Spain is in the Schengen area, so Pakistani passport holders need a Schengen visa.",
    visaSlug: "spain",
    related: ["europe", "france", "italy", "morocco"],
    faqs: [
      { question: "Which Spanish cities should I visit first?", answer: "Barcelona and Madrid for a first trip; add Seville and Granada for Moorish history." },
      { question: "Can I combine Spain with another country?", answer: "Yes. France, Italy and Morocco are the easiest to add." },
    ],
  },
  {
    slug: "germany",
    name: "Germany",
    region: "Europe",
    image: "/destinations/germany.webp",
    intro:
      "Germany packages cover Berlin, Munich, Frankfurt and the Rhine valley, plus Neuschwanstein Castle in Bavaria. It is easy to connect with Austria, Switzerland and the Netherlands by train.",
    bestTime: "May to September for the best weather; December for Christmas markets; Munich's Oktoberfest period is busy and expensive.",
    places: ["Berlin", "Munich and the Bavarian Alps", "Neuschwanstein Castle", "Cologne Cathedral", "Frankfurt", "Heidelberg"],
    ideas: ["6 day Berlin, Munich and Frankfurt", "Germany, Austria and Switzerland", "Christmas markets trip"],
    visaNote: "Germany is in the Schengen area, so Pakistani passport holders need a Schengen visa.",
    visaSlug: "germany",
    related: ["europe", "switzerland", "france", "italy"],
    faqs: [
      { question: "Is Germany good for sightseeing?", answer: "Yes. Cities are well connected, and castles and old towns are easy to visit by train." },
      { question: "Can I visit Germany and Austria together?", answer: "Yes, with one Schengen visa." },
    ],
  },
  {
    slug: "greece",
    name: "Greece",
    region: "Europe",
    image: "/destinations/greece.webp",
    intro:
      "Greece packages combine Athens with Santorini and Mykonos, with whitewashed villages, ancient ruins and beaches. It is popular for honeymoons and summer holidays.",
    bestTime: "May to June and September for warm weather and fewer crowds; July and August are hot and crowded; winter is quiet in the islands.",
    places: ["Athens and the Acropolis", "Santorini", "Mykonos", "Crete", "Meteora", "Rhodes"],
    ideas: ["7 day Athens and Santorini", "Athens, Mykonos and Santorini", "Greece and Albania"],
    visaNote: "Greece is in the Schengen area, so Pakistani passport holders need a Schengen visa.",
    visaSlug: "greece",
    related: ["europe", "albania", "italy", "turkey"],
    faqs: [
      { question: "When is the best time to visit Santorini?", answer: "Late May, June and September for warm weather without the peak-season crowds." },
      { question: "Can Greece be combined with Italy?", answer: "Yes, both are Schengen countries, so one visa covers both." },
    ],
  },
  {
    slug: "hong-kong",
    name: "Hong Kong",
    region: "Asia",
    image: "/destinations/hong-kong.webp",
    intro:
      "Hong Kong packages combine Victoria Peak, Disneyland, Ocean Park and shopping, with a day trip to Macau. Our Japan, Hong Kong and South Korea group tour includes it.",
    bestTime: "October to December for cool, dry weather; spring is humid; summer is hot with typhoon risk.",
    places: ["Victoria Peak", "Hong Kong Disneyland", "Tsim Sha Tsui and the Avenue of Stars", "Big Buddha, Lantau Island", "Ocean Park", "Macau day trip"],
    ideas: ["4 to 5 day Hong Kong city break", "Hong Kong and Macau", "Japan, Hong Kong and South Korea group tour"],
    visaNote: "Pakistani passport holders need entry permission for Hong Kong; we confirm the current requirement and prepare the application.",
    visaSlug: "hong-kong",
    tourSlug: "japan-hong-kong-south-korea-group-tour",
    related: ["japan", "south-korea", "singapore", "thailand"],
    faqs: [
      { question: "How many days do I need for Hong Kong?", answer: "Four to five days covers the main sights, Disneyland and a Macau day trip." },
      { question: "Is there a group tour with Hong Kong?", answer: "Yes. Our Japan, Hong Kong and South Korea group tour includes it." },
    ],
  },
  {
    slug: "indonesia",
    name: "Indonesia & Bali",
    region: "Asia",
    image: "/destinations/indonesia.webp",
    intro:
      "Indonesia packages centre on Bali, with Ubud's rice terraces, Uluwatu's cliffs and beaches, and can add Jakarta or Yogyakarta. Bali is a popular honeymoon and family beach destination.",
    bestTime: "April to October is the dry season and best for Bali; November to March is wetter but cheaper.",
    places: ["Ubud and the rice terraces", "Uluwatu Temple", "Seminyak and Kuta beaches", "Nusa Penida", "Jakarta", "Borobudur, Yogyakarta"],
    ideas: ["5 to 7 day Bali honeymoon", "Bali family holiday", "Four-country group tour including Indonesia"],
    visaNote: "Indonesia requires a visa for Pakistani passport holders; we confirm the current process and prepare the documents.",
    visaSlug: "indonesia",
    tourSlug: "travel-history-group-tour",
    related: ["malaysia", "thailand", "singapore", "maldives"],
    faqs: [
      { question: "How many days do I need for Bali?", answer: "Five to seven days covers Ubud, the south coast and an island trip." },
      { question: "Is Bali good for honeymoons?", answer: "Yes. Villas with private pools, beaches and cultural sites make it popular." },
    ],
  },
  {
    slug: "singapore",
    name: "Singapore",
    region: "Asia",
    image: "/destinations/singapore.webp",
    intro:
      "Singapore is a clean, easy city trip with Gardens by the Bay, Sentosa and Universal Studios, and it pairs naturally with Malaysia. We combine flights, hotels, attractions and the visa file.",
    bestTime: "February to April is the driest; it is warm and humid year-round with showers.",
    places: ["Marina Bay Sands and Gardens by the Bay", "Sentosa Island", "Universal Studios Singapore", "Singapore Zoo and Night Safari", "Orchard Road", "Little India"],
    ideas: ["4 night Singapore city break", "Singapore and Malaysia", "Singapore with Bali"],
    visaNote: "Singapore requires a visa for Pakistani passport holders, which we prepare with your itinerary and funds.",
    visaSlug: "singapore",
    related: ["malaysia", "thailand", "indonesia", "hong-kong"],
    faqs: [
      { question: "How many days do I need for Singapore?", answer: "Four days covers the main sights and Sentosa." },
      { question: "Can I add Malaysia?", answer: "Yes, Kuala Lumpur is a short flight or a day-long road trip away." },
    ],
  },
  {
    slug: "egypt",
    name: "Egypt",
    region: "Middle East & Africa",
    image: "/destinations/egypt.webp",
    intro:
      "Egypt packages combine Cairo and the Giza Pyramids with a Nile cruise to Luxor and Aswan, or beach time in Sharm el-Sheikh and Hurghada. It is a short flight from Pakistan.",
    bestTime: "October to April is cooler and best for sightseeing; summer is very hot except on the Red Sea coast.",
    places: ["Giza Pyramids and the Sphinx", "Egyptian Museum, Cairo", "Luxor and the Valley of the Kings", "Aswan and Abu Simbel", "Sharm el-Sheikh", "Hurghada"],
    ideas: ["6 day Cairo and Luxor", "Nile cruise", "Cairo and Red Sea beach"],
    visaNote: "Egypt requires a visa or e-visa for Pakistani passport holders, depending on current rules; we help you with the right route.",
    visaSlug: "egypt",
    related: ["turkey", "morocco", "azerbaijan"],
    faqs: [
      { question: "When is the best time to go to Egypt?", answer: "October to April, when sightseeing is comfortable." },
      { question: "Is a Nile cruise worth it?", answer: "Yes, if you have 7 days or more. It covers Luxor and Aswan comfortably." },
    ],
  },
  {
    slug: "maldives",
    name: "Maldives",
    region: "Asia",
    image: "/destinations/airliner.webp",
    intro:
      "Maldives packages include resort or guesthouse stays, speedboat transfers and water activities. It is the leading honeymoon destination from Pakistan, and choosing the right island category controls the budget.",
    bestTime: "November to April is dry and sunny; May to October is wetter but cheaper.",
    places: ["Malé", "Maafushi local island", "Resort island overwater villas", "Snorkelling and diving", "Sandbank picnics", "Sunset cruises"],
    ideas: ["4 to 5 night guesthouse stay", "Resort honeymoon", "Maldives and Sri Lanka"],
    visaNote: "The Maldives normally issues a visitor visa on arrival, subject to entry conditions such as confirmed accommodation and funds. We confirm current rules before you travel.",
    related: ["indonesia", "thailand", "singapore"],
    faqs: [
      { question: "Is the Maldives expensive?", answer: "Resorts are costly, but guesthouses on local islands are far cheaper. We quote both so you can compare." },
      { question: "How many nights should I plan?", answer: "Four to five nights are enough for a honeymoon or a family break." },
    ],
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    region: "Americas & Oceania",
    image: "/destinations/new-zealand.webp",
    intro:
      "New Zealand packages cover Auckland, Rotorua and Queenstown, plus Milford Sound. It is a nature-focused trip for families and honeymooners, usually combined with Australia.",
    bestTime: "December to March for summer; June to August for skiing; spring and autumn for scenery without crowds.",
    places: ["Auckland", "Rotorua", "Queenstown", "Milford Sound", "Wellington", "Hobbiton, Matamata"],
    ideas: ["10 day North and South Island", "Queenstown and Milford Sound", "New Zealand and Australia"],
    visaNote: "Pakistani passport holders need a New Zealand visitor visa, assessed on funds, plans and ties to Pakistan.",
    visaSlug: "new-zealand",
    related: ["australia", "canada", "singapore", "malaysia"],
    faqs: [
      { question: "How many days do I need for New Zealand?", answer: "Ten days covers highlights of both islands." },
      { question: "Can I combine New Zealand and Australia?", answer: "Yes, with two separate visas." },
    ],
  },
  {
    slug: "south-africa",
    name: "South Africa",
    region: "Middle East & Africa",
    image: "/destinations/south-africa.webp",
    intro:
      "South Africa packages combine Cape Town, the Garden Route and a Kruger safari. It features in our Turkey, South Africa and Morocco group tour and can be planned privately.",
    bestTime: "May to September for safari; November to March for Cape Town beaches and wine regions.",
    places: ["Cape Town and Table Mountain", "Cape Peninsula and Cape of Good Hope", "Kruger National Park safari", "Garden Route", "Johannesburg", "Stellenbosch winelands"],
    ideas: ["8 day Cape Town and Garden Route", "Kruger safari and Johannesburg", "Turkey, South Africa and Morocco group tour"],
    visaNote: "South Africa requires a visitor visa for Pakistani passport holders, which we prepare with your itinerary and funds.",
    visaSlug: "south-africa",
    tourSlug: "turkey-south-africa-morocco-group-tour",
    related: ["morocco", "egypt", "turkey"],
    faqs: [
      { question: "Can I do a safari on a package?", answer: "Yes. Kruger safaris can be added to a Cape Town or Johannesburg itinerary." },
      { question: "Is there a group tour with South Africa?", answer: "Yes, our Turkey, South Africa and Morocco group tour includes it." },
    ],
  },
];

export function getPackageDestination(slug: string) {
  return packageDestinations.find((d) => d.slug === slug);
}
