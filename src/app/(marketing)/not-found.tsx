import { Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-24 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-tint text-primary">
        <Compass size={28} />
      </span>
      <h1 className="mt-6 font-heading text-2xl font-extrabold text-charcoal sm:text-3xl">
        We couldn&rsquo;t find that destination.
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-text-muted">
        The page you&rsquo;re looking for may have moved or no longer exists. Try one of the links below, or use
        search from the menu.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">Return Home</Button>
        <Button href="/visas" variant="outline">Explore Visas</Button>
        <Button href="/tour-packages" variant="outline">View Tours</Button>
        <Button href="/contact" variant="outline">Contact Us</Button>
      </div>
    </Container>
  );
}
