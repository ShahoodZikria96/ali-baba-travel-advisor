import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { YouTubeIcon } from "@/components/ui/SocialIcons";
import { TiltCard } from "@/components/ui/TiltCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { getVideos, getSiteSettings } from "@/lib/content";

export async function VideoUpdates() {
  const [sampleVideos, settings] = await Promise.all([getVideos(), getSiteSettings()]);

  return (
    <section className="py-16 lg:py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionHeading eyebrow="Video Library" title="Latest Visa Updates &amp; Expert Videos" />
            <p className="mt-2 text-sm font-semibold text-primary">
              {settings.youtubeSubscribers} subscribers on YouTube
            </p>
          </div>
          <Button
            href={settings.youtubeUrl}
            external
            variant="outline"
            size="sm"
            icon={<YouTubeIcon width={16} height={16} />}
          >
            Visit Our YouTube Channel
          </Button>
        </div>

        <RevealGroup className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sampleVideos.map((video) => {
            const content = (
              <>
                <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-charcoal to-charcoal-soft">
                  {video.thumbnail ? (
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div aria-hidden className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.08]" />
                  )}
                  <div aria-hidden className="absolute inset-0 bg-charcoal/25 transition-colors group-hover:bg-charcoal/35" />
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition-transform group-hover:scale-105">
                    <PlayCircle className="text-white" size={30} />
                  </span>
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
              </>
            );

            const className = "tilt-card-inner group overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface block";

            return (
              <RevealItem key={video.id}>
                <TiltCard strength={6} className="rounded-[var(--radius-lg)]">
                  {video.youtubeUrl ? (
                    <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className={className}>
                      {content}
                    </a>
                  ) : (
                    <div className={className}>{content}</div>
                  )}
                </TiltCard>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
