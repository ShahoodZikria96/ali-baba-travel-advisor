import localFont from "next/font/local";

// Self-hosted variable fonts (see src/fonts/README.md). No build-time download from Google Fonts.
export const fontHeading = localFont({
  src: "../fonts/plus-jakarta-sans-latin-wght-normal.woff2",
  weight: "200 800",
  variable: "--font-heading",
  display: "swap",
});

export const fontBody = localFont({
  src: "../fonts/inter-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-body",
  display: "swap",
});
