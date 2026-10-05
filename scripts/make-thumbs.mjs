import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Small card-sized copies of every destination photo (static export has no image resizing).
const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "public", "destinations");
const OUT = path.join(SRC, "thumbs");
await fs.mkdir(OUT, { recursive: true });

let n = 0;
for (const f of await fs.readdir(SRC)) {
  if (!f.endsWith(".webp")) continue;
  const info = await sharp(path.join(SRC, f)).resize(640, 400, { fit: "cover" }).webp({ quality: 74 }).toFile(path.join(OUT, f));
  n++;
  console.log(f, Math.round(info.size / 1024) + "KB");
}
console.log("thumbs:", n);
