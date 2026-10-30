// Generates the offer graphics (posters, hero banners, share images) used on the
// USA group tour page and the Belgium business visa page.
//
// They are designed graphics (a real destination photo from /public/destinations,
// a dark brand overlay, the logo and text), not AI photos. Re-run after editing:
//   node scripts/make-offer-images.mjs
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const pub = (...p) => path.join(root, "public", ...p);
const FONT = "DejaVu Sans, Arial, sans-serif";
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const logo = await sharp(pub("brand", "logo.webp")).resize(150, 150, { fit: "contain", background: "#ffffff" }).png().toBuffer();
const logoTile = await sharp({ create: { width: 190, height: 190, channels: 4, background: "#ffffff" } })
  .composite([{ input: logo, left: 20, top: 20 }])
  .png()
  .toBuffer();

/** Rounded white tile with the logo, so it reads on any photo. */
async function logoBadge(size) {
  const tile = await sharp(logoTile).resize(size, size).png().toBuffer();
  const mask = Buffer.from(`<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${Math.round(size * 0.18)}"/></svg>`);
  return sharp(tile).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
}

const lines = (arr, x, y, size, gap, extra = "") =>
  arr.map((t, i) => `<text x="${x}" y="${y + i * (size + gap)}" font-size="${size}" ${extra}>${esc(t)}</text>`).join("");

async function render({ photo, w, h, out, svg, badge }) {
  const base = await sharp(pub("destinations", photo)).resize(w, h, { fit: "cover", position: "centre" }).toBuffer();
  const layers = [{ input: Buffer.from(svg), top: 0, left: 0 }];
  if (badge) layers.push({ input: await logoBadge(badge.size), left: badge.x, top: badge.y });
  await sharp(base).composite(layers).webp({ quality: 80 }).toFile(pub(...out));
  console.log(out.join("/"), (fs.statSync(pub(...out)).size / 1024).toFixed(0) + " KB");
}

const shade = (w, h, from = 0.25, to = 0.92, stops = ["#1d1a19", "#2a0d12"]) => `
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${stops[0]}" stop-opacity="${from}"/>
      <stop offset="0.45" stop-color="${stops[0]}" stop-opacity="${from + 0.2}"/>
      <stop offset="1" stop-color="${stops[1]}" stop-opacity="${to}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>`;

const flagBar = (x, y, w, h) =>
  `<rect x="${x}" y="${y}" width="${w / 3}" height="${h}" fill="#111"/><rect x="${x + w / 3}" y="${y}" width="${w / 3}" height="${h}" fill="#fdda24"/><rect x="${x + (2 * w) / 3}" y="${y}" width="${w / 3}" height="${h}" fill="#ef3340"/>`;

const pill = (x, y, w, h, fill, text, size, color = "#1d1a19") =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}"/><text x="${x + w / 2}" y="${y + h / 2 + size * 0.35}" font-size="${size}" font-weight="700" fill="${color}" text-anchor="middle">${esc(text)}</text>`;

const PHONE = "03111666076";

// ---------- USA group tour: square poster (1080 x 1080) ----------
{
  const w = 1080, h = 1080;
  const svg = `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" font-family="${FONT}">
    ${shade(w, h, 0.2, 0.94)}
    <g fill="#fff" font-weight="800">
      ${lines(["USA", "GROUP TOUR"], 70, 440, 118, 8)}
    </g>
    ${pill(70, 600, 600, 74, "#f2c14e", "MARCH – APRIL 2027", 40)}
    <g fill="#fff" font-size="34" font-weight="600">
      <text x="70" y="725">✓  Limited seats, ask for availability</text>
      <text x="70" y="775">✓  US visa guidance from our team</text>
      <text x="70" y="825">✓  Route, price and terms shared on enquiry</text>
    </g>
    <rect x="0" y="880" width="${w}" height="200" fill="#9e1b26"/>
    <text x="70" y="955" font-size="36" fill="#fff" font-weight="600">Call or WhatsApp</text>
    <text x="70" y="1022" font-size="76" fill="#fff" font-weight="800">${PHONE}</text>
    <text x="1010" y="960" font-size="24" fill="#ffe3e6" text-anchor="end">Lahore · Islamabad</text>
    <text x="1010" y="995" font-size="24" fill="#ffe3e6" text-anchor="end">Wazirabad · Karachi</text>
    <text x="70" y="1066" font-size="20" fill="#ffe3e6">Visas are decided only by the US authorities. No outcome is guaranteed.</text>
  </svg>`;
  await render({ photo: "usa.webp", w, h, out: ["tours", "usa-group-tour-march-april-2027.webp"], svg, badge: { size: 150, x: 70, y: 60 } });
  // Text under the badge:
}

// ---------- Belgium business visa: square poster (1080 x 1080) ----------
{
  const w = 1080, h = 1080;
  const svg = `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" font-family="${FONT}">
    ${shade(w, h, 0.25, 0.95, ["#14110f", "#2a0d12"])}
    ${flagBar(70, 250, 150, 14)}
    <g fill="#fff" font-weight="800">
      ${lines(["BELGIUM", "BUSINESS VISA"], 70, 430, 104, 6)}
    </g>
    ${pill(70, 590, 800, 70, "#fdda24", "SCHENGEN REFUSAL CASES REVIEWED", 30)}
    <g fill="#fff" font-size="34" font-weight="600">
      <text x="70" y="725">✓  Invitation letter and document check</text>
      <text x="70" y="775">✓  Appointment and submission planning</text>
      <text x="70" y="825">✓  Free assessment of your file</text>
    </g>
    <rect x="0" y="880" width="${w}" height="200" fill="#9e1b26"/>
    <text x="70" y="955" font-size="36" fill="#fff" font-weight="600">Contact now</text>
    <text x="70" y="1022" font-size="76" fill="#fff" font-weight="800">${PHONE}</text>
    <text x="1010" y="960" font-size="24" fill="#ffe3e6" text-anchor="end">Lahore · Islamabad</text>
    <text x="1010" y="995" font-size="24" fill="#ffe3e6" text-anchor="end">Wazirabad · Karachi</text>
    <text x="70" y="1066" font-size="20" fill="#ffe3e6">Visas are decided only by the embassy. No outcome is guaranteed.</text>
  </svg>`;
  await render({ photo: "belgium.webp", w, h, out: ["offers", "belgium-business-visa-poster.webp"], svg, badge: { size: 150, x: 70, y: 60 } });
}

// ---------- Belgium business visa: wide hero (1600 x 700) and share image (1200 x 630) ----------
for (const [w, h, name, s] of [
  [1600, 700, "belgium-business-visa-hero.webp", 1],
  [1200, 630, "belgium-business-visa-share.webp", 0.78],
]) {
  const svg = `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" font-family="${FONT}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#14110f" stop-opacity="0.92"/>
        <stop offset="0.6" stop-color="#14110f" stop-opacity="0.55"/>
        <stop offset="1" stop-color="#14110f" stop-opacity="0.15"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
    ${flagBar(Math.round(90 * s), Math.round(h * 0.2), Math.round(170 * s), 14)}
    <g fill="#fff" font-weight="800">
      ${lines(["Belgium Business Visa", "from Pakistan"], Math.round(90 * s), Math.round(h * 0.2 + 120 * s), Math.round(88 * s), 8)}
    </g>
    <text x="${Math.round(90 * s)}" y="${Math.round(h * 0.2 + 120 * s + 2 * 96 * s + 24 * s)}" font-size="${Math.round(34 * s)}" fill="#f2e9dc" font-weight="600">Schengen business visa files · Refusal case review</text>
    <text x="${Math.round(90 * s)}" y="${h - Math.round(60 * s)}" font-size="${Math.round(30 * s)}" fill="#fff" font-weight="700">Ali Baba Travel Advisor · ${PHONE}</text>
  </svg>`;
  await render({ photo: "belgium.webp", w, h, out: ["offers", name], svg, badge: { size: Math.round(130 * s), x: w - Math.round(130 * s) - Math.round(70 * s), y: Math.round(50 * s) } });
}
