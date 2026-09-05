import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.4c0-.9.3-1.6 1.6-1.6h1.7V2.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.5H7.3v3.2h2.8V21h3.4Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5C4.98 4.6 4.1 5.5 3 5.5S1 4.6 1 3.5 1.9 1.5 3 1.5s1.98.9 1.98 2Zm.02 4.5H1v15h4V8Zm7.5 0H8V23h4v-7.6c0-2 .4-3.9 2.8-3.9s2.7 2.2 2.7 4v7.5h4v-8.3c0-4-.9-7-5.4-7-2.2 0-3.6 1.2-4.2 2.3H12V8Z" />
    </svg>
  );
}

export function YouTubeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.6 7.2s-.2-1.5-.8-2.1c-.8-.8-1.6-.8-2-.9C15.9 4 12 4 12 4h0s-3.9 0-6.8.2c-.4.1-1.2.1-2 .9-.6.6-.8 2.1-.8 2.1S2.2 9 2.2 10.8v1.4c0 1.8.2 3.6.2 3.6s.2 1.5.8 2.1c.8.8 1.8.8 2.3.9C7 19 12 19 12 19s3.9 0 6.8-.3c.4-.1 1.2-.1 2-.9.6-.6.8-2.1.8-2.1s.2-1.8.2-3.6v-1.4c0-1.8-.2-3.6-.2-3.6ZM9.9 14.6V8.9l5.4 2.9-5.4 2.8Z" />
    </svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.6 2h-3.2v13.4a2.6 2.6 0 1 1-1.9-2.5V9.5a5.9 5.9 0 1 0 5.1 5.9V8.8a7.8 7.8 0 0 0 4.4 1.4V6.9a4.6 4.6 0 0 1-4.4-4.9Z" />
    </svg>
  );
}
