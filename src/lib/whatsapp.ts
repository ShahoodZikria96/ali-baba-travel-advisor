// Pure formatting helpers with no server-only dependencies (safe to import
// from Client Components). Do not import Prisma or anything from
// "@/lib/content" here — this file must stay bundleable in the browser.

export function whatsappHref(message: string, whatsappNumber: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`;
}
