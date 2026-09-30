import type { NextConfig } from "next";

/**
 * Static export: `npm run build` writes plain HTML/CSS/JS to ./out, which is
 * uploaded to Namecheap public_html. No Node.js is needed on the server.
 * Headers, redirects and caching live in deploy/htaccess (Apache), and the
 * form/admin backend is PHP (see php/).
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true, // /visas/ -> visas/index.html (works on any Apache host)
  images: { unoptimized: true }, // no image server on shared hosting; images are pre-compressed WebP
};

export default nextConfig;
