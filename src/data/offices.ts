export interface Office {
  slug: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  mapQuery: string;
}

export const offices: Office[] = [
  {
    slug: "lahore",
    city: "Lahore",
    address: "Lahore, Punjab, Pakistan",
    phone: "+92 300 0000000",
    hours: "Mon – Sat: 10:00 AM – 7:00 PM",
    mapQuery: "Ali Baba Travel Advisor Lahore",
  },
  {
    slug: "islamabad",
    city: "Islamabad",
    address: "Islamabad, Pakistan",
    phone: "+92 300 0000000",
    hours: "Mon – Sat: 10:00 AM – 7:00 PM",
    mapQuery: "Ali Baba Travel Advisor Islamabad",
  },
  {
    slug: "karachi",
    city: "Karachi",
    address: "Karachi, Sindh, Pakistan",
    phone: "+92 300 0000000",
    hours: "Mon – Sat: 10:00 AM – 7:00 PM",
    mapQuery: "Ali Baba Travel Advisor Karachi",
  },
  {
    slug: "wazirabad",
    city: "Wazirabad",
    address: "Wazirabad, Punjab, Pakistan",
    phone: "+92 300 0000000",
    hours: "Mon – Sat: 10:00 AM – 7:00 PM",
    mapQuery: "Ali Baba Travel Advisor Wazirabad",
  },
];
