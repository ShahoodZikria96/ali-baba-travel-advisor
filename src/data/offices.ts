export interface Office {
  slug: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  mapUrl: string;
  openingDate?: string;
}

export const offices: Office[] = [
  {
    slug: "lahore",
    city: "Lahore",
    address: "Office No. 1 & 2, Mezzanine Floor, Siddique Trade Center, Gulberg II, Lahore",
    phone: "+92 311 1666076",
    hours: "Mon – Sat: 10:00 AM – 6:00 PM",
    mapUrl:
      "https://www.google.com/maps/place/Ali+Baba+Travel+Advisor/@31.5314837,74.3526375,17z/data=!3m1!4b1!4m6!3m5!1s0x39190545cf1e5eab:0x7b86c4a6068a7238!8m2!3d31.5314837!4d74.3526375!16s%2Fg%2F11vwmyf0pr",
  },
  {
    slug: "islamabad",
    city: "Islamabad",
    address: "Office No. 33 & 34, First Floor, Al-Anayat Mall, G-11 Markaz, Islamabad",
    phone: "+92 311 1666076",
    hours: "Mon – Sat: 10:00 AM – 6:00 PM",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Al-Anayat+Mall+G-11+Markaz+Islamabad",
  },
  {
    slug: "wazirabad",
    city: "Wazirabad",
    address: "Arif Shaheed Road, near Bank Alfalah, Wazirabad",
    phone: "+92 311 1666076",
    hours: "Mon – Sat: 10:00 AM – 6:00 PM",
    mapUrl:
      "https://www.google.com/maps/place/32%C2%B026'21.0%22N+74%C2%B006'59.1%22E/@32.439157,74.116412,17z/data=!3m1!4b1!4m4!3m3!8m2!3d32.439157!4d74.116412",
  },
  {
    slug: "karachi",
    city: "Karachi",
    address:
      "Office No. 3, Mezzanine Floor, 10C Building, 12 Commercial Street, near Cafe Musa, DHA Phase 2 Extension, Karachi",
    phone: "+92 311 1666076",
    hours: "Mon – Sat: 10:00 AM – 6:00 PM",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(
        "Office No. 3, Mezzanine Floor, 10C Building, 12 Commercial Street, near Cafe Musa, DHA Phase 2 Extension, Karachi"
      ),
    openingDate: "2026-09-07",
  },
];
