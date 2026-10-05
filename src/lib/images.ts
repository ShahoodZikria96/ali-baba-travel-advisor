/** Card-sized copy of a /destinations photo (see scripts/make-thumbs.mjs); other paths are returned unchanged. */
export function thumbSrc(src: string): string {
  const m = src.match(/^\/destinations\/([^/]+\.webp)$/);
  return m ? `/destinations/thumbs/${m[1]}` : src;
}
