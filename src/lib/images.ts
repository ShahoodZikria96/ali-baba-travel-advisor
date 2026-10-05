/** Card-sized copy of a /destinations photo (see scripts/make-thumbs.mjs); other paths are returned unchanged. */
export function thumbSrc(src: string): string {
  const m = src.match(/^\/destinations\/([^/]+\.webp)$/);
  return m ? `/destinations/thumbs/${m[1]}` : src;
}

/** Full-width page-header version (1400x490) of a /destinations photo. */
export function bannerSrc(src: string): string {
  const m = src.match(/^\/destinations\/([^/]+\.webp)$/);
  return m ? `/destinations/banners/${m[1]}` : src;
}
