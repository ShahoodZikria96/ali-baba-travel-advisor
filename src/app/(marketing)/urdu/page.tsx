import type { Metadata } from "next";
import Link from "next/link";
import { Noto_Naskh_Arabic } from "next/font/google";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { getOffices, getSiteSettings } from "@/lib/content";
import { telHref, whatsappHref } from "@/lib/whatsapp";
import { siteConfig } from "@/data/site";

const urduFont = Noto_Naskh_Arabic({ subsets: ["arabic"], weight: ["400", "600", "700"], display: "swap" });

export const metadata: Metadata = pageMetadata({
  title: "اردو میں ویزا اور ٹریول معلومات",
  description:
    "علی بابا ٹریول ایڈوائزر: لاہور، اسلام آباد، وزیرآباد اور کراچی میں ویزا کنسلٹنسی، ٹورز، ایئر ٹکٹ اور ہوٹل بکنگ۔ ویزا کی منظوری کی کوئی ضمانت نہیں دی جاتی۔",
  path: "/urdu",
});

const services = [
  "ویزا کنسلٹنسی: وزٹ ویزا، بزنس ویزا، فیملی وزٹ ویزا اور اسٹڈی ویزا معاونت",
  "ویزا ریفیوزل کیس کا جائزہ اور دوبارہ درخواست کے لیے رہنمائی",
  "بین الاقوامی گروپ ٹورز اور کسٹمائزڈ ٹور پیکجز",
  "ایئر ٹکٹنگ",
  "ہوٹل بکنگ",
];

const countries = [
  "برطانیہ", "کینیڈا", "امریکا", "آسٹریلیا", "نیوزی لینڈ", "شینگن یورپ (فرانس، جرمنی، اٹلی، اسپین، نیدرلینڈز، سوئٹزرلینڈ اور دیگر)",
  "آئرلینڈ", "ترکی", "آذربائیجان", "جاپان", "جنوبی کوریا", "ہانگ کانگ", "سنگاپور", "تھائی لینڈ", "ملائیشیا", "انڈونیشیا",
  "کمبوڈیا", "مصر", "مراکش", "جنوبی افریقہ", "برازیل", "کولمبیا", "البانیہ", "سربیا",
];

const steps = [
  "پروفائل کا مفت جائزہ: آپ اپنی منزل، سفر کا مقصد، پیشہ اور سفری تاریخ بتاتے ہیں۔",
  "ڈاکومنٹس کی فہرست: آپ کے کیس کے مطابق مطلوبہ کاغذات کی فہرست دی جاتی ہے۔",
  "ڈاکومنٹس کا جائزہ: ہم کاغذات کی مکمل اور آپس میں مطابقت چیک کرتے ہیں۔ ہم کوئی دستاویز نہیں بناتے اور نہ بدلتے ہیں۔",
  "درخواست اور اپوائنٹمنٹ: جہاں ضرورت ہو، آن لائن فارم، فیس اور اپوائنٹمنٹ کے مراحل میں رہنمائی۔",
  "جمع کرانے کے بعد: پراسیسنگ کا وقت متعلقہ ادارہ طے کرتا ہے۔ ہم اضافی دستاویزات یا ریفیوزل کی صورت میں آگے کی رہنمائی کرتے ہیں۔",
];

const documents = [
  "پاسپورٹ اور شناختی کارڈ",
  "پاسپورٹ سائز تصاویر",
  "ملازمت یا کاروبار کا ثبوت (جاب لیٹر، کاروباری رجسٹریشن وغیرہ)",
  "بینک اسٹیٹمنٹ اور آمدنی کے دیگر ثبوت",
  "سفر کا پلان اور ہوٹل/ٹکٹ کی تفصیل",
  "پچھلے ویزے یا ریفیوزل لیٹرز (اگر ہوں)",
];

const faqs = [
  { question: "کیا آپ ویزا کی منظوری کی گارنٹی دیتے ہیں؟", answer: "نہیں۔ ویزا کا فیصلہ صرف متعلقہ سفارت خانہ یا امیگریشن اتھارٹی کرتی ہے۔ ہم درخواست کو مکمل، درست اور منظم انداز میں تیار کرنے میں مدد دیتے ہیں، لیکن کسی نتیجے کی ضمانت نہیں دیتے۔" },
  { question: "ویزا ریفیوز ہو جائے تو کیا دوبارہ اپلائی کیا جا سکتا ہے؟", answer: "عموماً ہاں۔ زیادہ تر ریفیوزل کسی مخصوص وجہ (مثلاً مالی ثبوت یا پاکستان سے تعلق) کی بنیاد پر ہوتے ہیں۔ ہم ریفیوزل لیٹر کا جائزہ لے کر بتاتے ہیں کہ کیا بہتر کیا جا سکتا ہے اور دوبارہ درخواست دینا مناسب ہے یا نہیں۔" },
  { question: "وزٹ ویزا کے لیے بینک بیلنس کتنا ہونا چاہیے؟", answer: "تمام ممالک کے لیے کوئی ایک مقررہ رقم نہیں ہوتی۔ اہم بات یہ ہے کہ آپ کی رقم اصلی ہو، اس کا ثبوت موجود ہو اور آپ کی آمدنی سے مطابقت رکھتی ہو۔ اپنے کیس کے لیے ہم سے مشورہ کریں۔" },
  { question: "آپ کے دفاتر کہاں ہیں؟", answer: "ہمارے دفاتر لاہور (گلبرگ 2)، اسلام آباد (جی-11 مرکز)، وزیرآباد اور کراچی (ڈی ایچ اے فیز 2 ایکسٹینشن) میں ہیں۔ دیگر شہروں کے لوگ فون یا واٹس ایپ پر رابطہ کر سکتے ہیں۔" },
];

export default async function UrduPage() {
  const [settings, offices] = await Promise.all([getSiteSettings(), getOffices()]);
  const phones = [settings.phone, settings.phoneSecondary, ...siteConfig.otherPhones].filter(Boolean) as string[];
  const uniquePhones = phones.filter((p, i, a) => a.findIndex((x) => x.replace(/\D/g, "") === p.replace(/\D/g, "")) === i);

  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "اردو" }]} />
      <div lang="ur" dir="rtl" className={urduFont.className}>
        <section className="border-b border-border bg-surface-muted/50 py-12">
          <Container>
            <h1 className="max-w-3xl text-3xl font-bold leading-snug text-charcoal sm:text-4xl">
              علی بابا ٹریول ایڈوائزر: ویزا کنسلٹنسی اور ٹریول سروسز
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-loose text-text-muted">
              ہم لاہور میں قائم ٹریول اور ویزا کنسلٹنسی ہیں۔ ہمارے دفاتر لاہور، اسلام آباد، وزیرآباد اور کراچی میں ہیں، اور پورے پاکستان کے لوگوں کی رہنمائی فون اور واٹس ایپ پر بھی کرتے ہیں۔
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={whatsappHref("السلام علیکم، مجھے ویزا کے بارے میں معلومات چاہییں۔", settings.whatsappNumber)} external variant="whatsapp">
                واٹس ایپ پر رابطہ کریں
              </Button>
              <Button href="/consultation" variant="outline">ویزا کنسلٹیشن حاصل کریں</Button>
            </div>
          </Container>
        </section>

        <Container className="py-12">
          <div className="mx-auto max-w-[760px] space-y-10 text-lg leading-loose text-text-muted">
            <section>
              <h2 className="text-2xl font-bold text-charcoal">ہماری خدمات</h2>
              <ul className="mt-3 list-disc space-y-2 pr-6">
                {services.map((s) => <li key={s}>{s}</li>)}
              </ul>
              <p className="mt-3 text-base">
                تفصیل کے لیے دیکھیں:{" "}
                <Link href="/visa-consultancy" className="font-semibold text-primary">Visa Consultancy</Link>،{" "}
                <Link href="/tour-packages" className="font-semibold text-primary">Tour Packages</Link>،{" "}
                <Link href="/flights" className="font-semibold text-primary">Flights</Link>۔
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-charcoal">جن ممالک کے لیے ہم رہنمائی کرتے ہیں</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {countries.map((c) => (
                  <li key={c} className="rounded-full border border-border bg-surface px-4 py-1.5 text-base text-charcoal">{c}</li>
                ))}
              </ul>
              <p className="mt-3 text-base">
                کسی ملک کی مکمل تفصیل کے لیے{" "}
                <Link href="/visas" className="font-semibold text-primary">Visa Countries</Link> کا صفحہ دیکھیں۔
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-charcoal">ہمارا طریقۂ کار</h2>
              <ol className="mt-3 list-decimal space-y-2 pr-6">
                {steps.map((s) => <li key={s}>{s}</li>)}
              </ol>
              <p className="mt-3 text-base"><Link href="/visa-process" className="font-semibold text-primary">Our Visa Process</Link></p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-charcoal">عام طور پر درکار کاغذات</h2>
              <ul className="mt-3 list-disc space-y-2 pr-6">
                {documents.map((d) => <li key={d}>{d}</li>)}
              </ul>
              <p className="mt-3 text-base">ہر ملک اور ویزا کی قسم کی شرائط الگ ہو سکتی ہیں اور وقت کے ساتھ بدلتی رہتی ہیں۔ حتمی فہرست آپ کے کیس کے مطابق دی جاتی ہے۔</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-charcoal">گروپ ٹورز</h2>
              <p className="mt-3">
                ہمارا 10 دن کا «ٹریول ہسٹری گروپ ٹور» تھائی لینڈ، انڈونیشیا، ملائیشیا اور سری لنکا کا احاطہ کرتا ہے۔ قیمت، شامل سہولیات اور بکنگ کی آخری تاریخ کے لیے{" "}
                <Link href="/tour-packages/travel-history-group-tour" className="font-semibold text-primary">ٹور کا صفحہ</Link> دیکھیں۔
              </p>
            </section>

            <section className="rounded-[var(--radius-md)] border border-border bg-surface p-5 text-base">
              <h2 className="text-xl font-bold text-charcoal">اہم وضاحت</h2>
              <p className="mt-2">
                ویزا کا فیصلہ صرف متعلقہ سفارت خانہ، قونصل خانہ یا امیگریشن اتھارٹی کرتی ہے۔ ہم ایک نجی کنسلٹنسی ہیں، کسی حکومت یا سفارت خانے سے وابستہ نہیں، اور ویزا کی منظوری یا اپوائنٹمنٹ کی کوئی ضمانت نہیں دیتے۔ شرائط، فیس اور پراسیسنگ کا وقت بدل سکتا ہے۔{" "}
                <Link href="/visa-disclaimer" className="font-semibold text-primary">Visa Disclaimer</Link>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-charcoal">اکثر پوچھے جانے والے سوالات</h2>
              <div className="mt-4"><FAQAccordion items={faqs} /></div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-charcoal">رابطہ کریں</h2>
              <ul className="mt-3 flex flex-wrap gap-2.5" dir="ltr">
                {uniquePhones.map((p) => (
                  <li key={p}>
                    <a href={telHref(p)} translate="no" className="rounded-full border border-border bg-surface px-4 py-2 text-base font-semibold text-charcoal hover:border-primary hover:text-primary">{p}</a>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-base" dir="ltr" translate="no">
                <a href={`mailto:${settings.email}`} className="font-semibold text-primary">{settings.email}</a>
              </p>
              <ul className="mt-4 space-y-2 text-base" dir="ltr">
                {offices.map((o) => (
                  <li key={o.slug}><span className="font-semibold text-charcoal">{o.city}:</span> {o.address}</li>
                ))}
              </ul>
            </section>
          </div>
        </Container>
      </div>
    </>
  );
}
