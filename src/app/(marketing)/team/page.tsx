import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Avatar } from "@/components/ui/Avatar";
import { getTeamMembers } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the leadership behind Ali Baba Travel Advisor's visa consultancy and travel advisory services.",
};

export default async function TeamPage() {
  const team = await getTeamMembers();

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Team" }]} />
      <PageHero
        eyebrow="Leadership"
        title="Meet Our Team"
        description="The people behind Ali Baba Travel Advisor's visa consultancy and travel planning."
      />

      <Container className="py-14">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <div key={member.id} className="card-hover rounded-[var(--radius-lg)] border border-border bg-surface p-6">
              <Avatar src={member.photo} name={member.name} size={80} className="text-2xl" />
              <p className="mt-4 font-heading text-lg font-bold text-charcoal">{member.name}</p>
              <p className="text-sm font-semibold text-primary">{member.role}</p>
              {member.bio && (
                <p className="mt-3 text-sm leading-relaxed text-text-muted">{member.bio}</p>
              )}
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-xl text-sm text-text-muted">
          Extended team profiles are added regularly as our branch network grows.
        </p>
      </Container>
    </>
  );
}
