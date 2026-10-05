import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Lighter copies of every destination photo (the static export has no image resizing):
//   thumbs/   480x300 for cards
//   banners/  1400x490 for full-width page headers
//   portrait/ 800x1000 for the homepage hero card
const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "public", "destinations");
const OUT = path.join(SRC, "thumbs");
const BANNERS = path.join(SRC, "banners");
const PORTRAIT = path.join(SRC, "portrait");
await Promise.all([OUT, BANNERS, PORTRAIT].map((d) => fs.mkdir(d, { recursive: true })));

let n = 0;
for (const f of await fs.readdir(SRC)) {
  if (!f.endsWith(".webp")) continue;
  const info = await sharp(path.join(SRC, f)).resize(480, 300, { fit: "cover" }).webp({ quality: 70 }).toFile(path.join(OUT, f));
  await sharp(path.join(SRC, f)).resize(1400, 490, { fit: "cover" }).webp({ quality: 68 }).toFile(path.join(BANNERS, f));
  if (f === "uk.webp") await sharp(path.join(SRC, f)).resize(800, 1000, { fit: "cover" }).webp({ quality: 74 }).toFile(path.join(PORTRAIT, f));
  n++;
  console.log(f, Math.round(info.size / 1024) + "KB");
}
console.log("thumbs:", n);
