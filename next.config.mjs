const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'; base-uri 'self'; object-src 'none'; form-action 'self'" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Admin + API responses must never be cached or indexed.
      { source: "/admin/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }, { key: "Cache-Control", value: "no-store" }] },
      { source: "/api/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex" }, { key: "Cache-Control", value: "no-store" }] },
      // Long-lived caching for static brand/destination images.
      { source: "/(destinations|flags|brand|testimonials)/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }] },
    ];
  },
  // 301 strategy: common alternative/legacy URL patterns map to the canonical structure.
  async redirects() {
    return [
      { source: "/visa", destination: "/visas", permanent: true },
      // UAE is no longer offered.
      { source: "/visas/uae", destination: "/visas", permanent: true },
      { source: "/countries", destination: "/visas", permanent: true },
      { source: "/countries/:slug", destination: "/visas/:slug", permanent: true },
      { source: "/services", destination: "/visa-consultancy", permanent: true },
      { source: "/services/:slug", destination: "/visa-consultancy/:slug", permanent: true },
      { source: "/blog", destination: "/guides", permanent: true },
      { source: "/blog/:slug", destination: "/guides/:slug", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/terms-and-conditions", destination: "/terms", permanent: true },
      { source: "/tours", destination: "/tour-packages", permanent: true },
      { source: "/hotels", destination: "/hotel-booking", permanent: true },
      { source: "/offices", destination: "/locations", permanent: true },
    ];
  },
};

export default nextConfig;
