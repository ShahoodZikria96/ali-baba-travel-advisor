import { Users, Globe2, Building2, PlaySquare } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getSiteSettings, getCountries, getOffices } from "@/lib/content";

export async function StatsBar() {
  const [settings, countries, offices] = await Promise.all([
    getSiteSettings(),
    getCountries(),
    getOffices(),
  ]);

  const stats = [
    { icon: Users, value: settings.happyCustomersStat, label: "Happy Customers Served" },
    { icon: Globe2, value: `${countries.length}+`, label: "Visa Destinations Covered" },
    { icon: Building2, value: `${offices.length}`, label: "Offices Across Pakistan" },
    { icon: PlaySquare, value: settings.youtubeSubscribers, label: "YouTube Subscribers" },
  ];

  return (
    <section className="relative overflow-hidden bg-charcoal">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(197,51,65,0.25) 0%, transparent 40%), radial-gradient(circle at 85% 80%, rgba(197,51,65,0.18) 0%, transparent 45%)",
        }}
      />
      <Container className="relative grid grid-cols-2 gap-6 py-10 sm:grid-cols-4 lg:py-12">
        {stats.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-start sm:text-left">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-primary-light">
              <Icon size={20} />
            </span>
            <div>
              <p className="font-heading text-2xl font-extrabold text-white sm:text-[1.6rem]">{value}</p>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-white/60">{label}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
