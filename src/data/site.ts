export const siteConfig = {
  name: "Ali Baba Travel Advisor",
  whatsappNumber: "923111666076",
  phone: "+92 311 1666076",
  phoneSecondary: "+92 337 6027555",
  email: "alibabaadvisor@gmail.com",
  socials: {
    facebook: "https://www.facebook.com/share/19K6oKut5R/",
    instagram: "https://www.instagram.com/alibabatraveladvisor/",
    youtube: "https://www.youtube.com/@AliBabaTravelAdvisor",
  },
};

export function whatsappHref(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function telHref(phone: string = siteConfig.phone) {
  return `tel:${phone.replace(/\s/g, "")}`;
}
