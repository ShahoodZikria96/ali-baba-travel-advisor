import { PlayCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { YouTubeIcon } from "@/components/ui/SocialIcons";
import { sampleVideos } from "@/data/placeholders";
import { siteConfig } from "@/data/site";

export function VideoUpdates() {
  return (
    <section className="py-16 lg:py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionHeading eyebrow="Video Library" title="Latest Visa Updates &amp; Expert Videos" />
            <p className="mt-2 text-sm font-semibold text-primary">
              58,000+ subscribers on YouTube
            </p>
          </div>
          <Button
            href={siteConfig.socials.youtube}
            external
            variant="outline"
            size="sm"
            icon={<YouTubeIcon width={16} height={16} />}
          >
            Visit Our YouTube Channel
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sampleVideos.map((video, i) => (
            <div key={i} className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface">
              <div className="relative flex h-40 items-center justify-center bg-charcoal">
                <PlayCircle className="text-white/85" size={40} />
                <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs font-semibold text-white">
                  {video.duration}
                </span>
              </div>
              <div className="p-4">
                <span className="text-xs font-bold uppercase tracking-[0.06em] text-primary">
                  {video.category}
                </span>
                <p className="mt-1.5 font-heading text-sm font-bold leading-snug text-charcoal">
                  {video.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
