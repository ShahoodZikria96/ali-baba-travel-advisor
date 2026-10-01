import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import sharp from "sharp";

const UA = "AliBabaTravelAdvisor/1.0 (https://alibabatraveladvisor.com; contact: shahoodzikria96@gmail.com)";
const ROOT = path.resolve(import.meta.dirname, "..");
const DEST_DIR = path.join(ROOT, "public", "destinations");
const FLAG_DIR = path.join(ROOT, "public", "flags");

// slug -> representative landmark Wikipedia article title (used for the hero/landmark photo)
const countryLandmarks = {
  albania: "Berat",
  austria: "Schönbrunn Palace",
  belgium: "Grand-Place",
  brazil: "Christ the Redeemer (statue)",
  bulgaria: "Rila Monastery",
  cambodia: "Angkor Wat",
  colombia: "Cartagena, Colombia",
  "czech-republic": "Charles Bridge",
  denmark: "Nyhavn",
  switzerland: "Matterhorn",
  thailand: "Grand Palace",
  finland: "Helsinki Cathedral",
  egypt: "Giza pyramid complex",
  france: "Eiffel Tower",
  greece: "Acropolis of Athens",
  germany: "Neuschwanstein Castle",
  "hong-kong": "Victoria Harbour",
  hungary: "Hungarian Parliament Building",
  indonesia: "Borobudur",
  ireland: "Cliffs of Moher",
  italy: "Colosseum",
  luxembourg: "Luxembourg City",
  morocco: "Hassan II Mosque",
  netherlands: "Kinderdijk",
  norway: "Geirangerfjord",
  romania: "Bran Castle",
  singapore: "Marina Bay Sands",
  "south-korea": "Gyeongbokgung",
  serbia: "Belgrade Fortress",
  spain: "Sagrada Família",
  sweden: "Stockholm City Hall",
};

// slug -> ISO 3166-1 alpha-2 code (for flagcdn.com)
const countryIso2 = {
  albania: "al",
  austria: "at",
  belgium: "be",
  brazil: "br",
  bulgaria: "bg",
  cambodia: "kh",
  colombia: "co",
  "czech-republic": "cz",
  denmark: "dk",
  switzerland: "ch",
  thailand: "th",
  finland: "fi",
  egypt: "eg",
  france: "fr",
  greece: "gr",
  germany: "de",
  "hong-kong": "hk",
  hungary: "hu",
  indonesia: "id",
  ireland: "ie",
  italy: "it",
  luxembourg: "lu",
  morocco: "ma",
  netherlands: "nl",
  norway: "no",
  romania: "ro",
  singapore: "sg",
  "south-korea": "kr",
  serbia: "rs",
  spain: "es",
  sweden: "se",
};

// tour slug -> representative landmark Wikipedia article title
const tourLandmarks = {
  "travel-history-group-tour": "Railay Beach",
  "turkey-south-africa-morocco-group-tour": "Cappadocia",
  "japan-south-korea-group-tour": "N Seoul Tower",
  "japan-hong-kong-south-korea-group-tour": "Tokyo Tower",
};

async function fetchWithRetry(url, options = {}, tries = 8) {
  let lastErr;
  for (let i = 0; i < tries; i++) {
    try {
      const headers = { Connection: "close", ...(options.headers || {}) };
      return await fetch(url, { ...options, headers, keepalive: false });
    } catch (err) {
      lastErr = err;
      await new Promise((r) => setTimeout(r, 1200 * (i + 1)));
    }
  }
  throw lastErr;
}

// commons.wikimedia.org is unreachable from this network (TLS connect fails),
// so the original image URL is constructed directly via Wikimedia's deterministic
// MD5-hash upload path instead of calling the Commons API.
function commonsFileUrl(filename) {
  const normalized = filename.replace(/ /g, "_");
  const hash = crypto.createHash("md5").update(normalized).digest("hex");
  return `https://upload.wikimedia.org/wikipedia/commons/${hash[0]}/${hash.slice(0, 2)}/${encodeURIComponent(normalized)}`;
}

// Manual overrides for articles whose current Wikipedia lead image is not a
// real photo (e.g. a logo/map) - verified Commons filenames used directly.
const manualCommonsFile = {
  france: "Tour Eiffel Wikimedia Commons.jpg",
  "hong-kong": "Hong Kong from Victoria Peak1.jpg",
};

async function wikipediaLeadImage(title) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/ /g, "_"))}`;
  const res = await fetchWithRetry(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
  if (!res.ok) return null;
  const json = await res.json();
  const src = json.originalimage?.source || json.thumbnail?.source;
  if (!src) return null;
  // thumb urls look like https://thumb.wikimedia.org/.../thumb/a/ab/File.jpg/640px-File.jpg(?query)
  // or https://upload.wikimedia.org/.../ab/File.jpg?query - strip query params, both work directly.
  return src.split("?")[0];
}

async function downloadBuffer(url) {
  const res = await fetchWithRetry(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function saveHero(slug, title, force = false) {
  const outPath = path.join(DEST_DIR, `${slug}.webp`);
  if (!force) {
    try {
      await fs.access(outPath);
      console.log(`[hero] ${slug}: SKIP (already exists)`);
      return true;
    } catch {}
  }
  try {
    let imgUrl;
    if (manualCommonsFile[slug]) {
      imgUrl = commonsFileUrl(manualCommonsFile[slug]);
    } else {
      imgUrl = await wikipediaLeadImage(title);
    }
    if (!imgUrl) {
      console.log(`[hero] ${slug}: NO IMAGE for "${title}"`);
      return false;
    }
    const buf = await downloadBuffer(imgUrl);
    await sharp(buf).resize(1600, 1000, { fit: "cover" }).webp({ quality: 82 }).toFile(outPath);
    console.log(`[hero] ${slug}: OK (${imgUrl.split("/").pop()})`);
    return true;
  } catch (err) {
    console.log(`[hero] ${slug}: ERROR ${err.message} ${err.cause ? JSON.stringify(err.cause) : ""}`);
    return false;
  }
}

async function saveFlag(slug, iso2) {
  try {
    const url = `https://flagcdn.com/w320/${iso2}.png`;
    const buf = await downloadBuffer(url);
    const outPath = path.join(FLAG_DIR, `${slug}.webp`);
    await sharp(buf).resize(160, 100, { fit: "cover" }).webp({ quality: 90 }).toFile(outPath);
    console.log(`[flag] ${slug}: OK`);
    return true;
  } catch (err) {
    console.log(`[flag] ${slug}: ERROR ${err.message}`);
    return false;
  }
}

async function main() {
  await fs.mkdir(DEST_DIR, { recursive: true });
  await fs.mkdir(FLAG_DIR, { recursive: true });

  const only = process.argv[2]; // optional: "heroes", "flags", "tours", or a single slug
  const results = { heroes: [], flags: [], tours: [] };

  if (!only || only === "heroes" || countryLandmarks[only]) {
    const entries = countryLandmarks[only] ? [[only, countryLandmarks[only]]] : Object.entries(countryLandmarks);
    for (const [slug, title] of entries) {
      const ok = await saveHero(slug, title);
      results.heroes.push({ slug, ok });
      await new Promise((r) => setTimeout(r, 300));
    }
  }

  if (!only || only === "flags") {
    for (const [slug, iso2] of Object.entries(countryIso2)) {
      const ok = await saveFlag(slug, iso2);
      results.flags.push({ slug, ok });
      await new Promise((r) => setTimeout(r, 150));
    }
  }

  if (!only || only === "tours") {
    for (const [slug, title] of Object.entries(tourLandmarks)) {
      const ok = await saveHero(slug, title);
      results.tours.push({ slug, ok });
      await new Promise((r) => setTimeout(r, 300));
    }
  }

  console.log(JSON.stringify(results, null, 2));
}

main();
