// Assembles the upload package after `next build`:
//   dist/public_html/       everything that goes into cPanel's public_html
//   dist/alibaba-site.zip   the same, zipped (upload + Extract in File Manager)
//   dist/alibaba-config.sample.php   copy to /home/USER/alibaba-config.php and edit
import fs from "node:fs";
import path from "node:path";
import AdmZip from "adm-zip";

const root = process.cwd();
const out = path.join(root, "out");
const dist = path.join(root, "dist");
const site = path.join(dist, "public_html");

if (!fs.existsSync(path.join(out, "index.html"))) {
  console.error("out/index.html not found. Run `npm run build` first.");
  process.exit(1);
}

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(site, { recursive: true });
fs.cpSync(out, site, { recursive: true });
fs.cpSync(path.join(root, "php", "api"), path.join(site, "api"), { recursive: true });
fs.cpSync(path.join(root, "php", "admin"), path.join(site, "admin"), { recursive: true });
fs.copyFileSync(path.join(root, "deploy", "htaccess"), path.join(site, ".htaccess"));
// Hashed build files never change: cache them for a year (own .htaccess avoids <If>, which some hosts lack).
fs.writeFileSync(
  path.join(site, "_next", "static", ".htaccess"),
  '<IfModule mod_headers.c>\n  Header set Cache-Control "public, max-age=31536000, immutable"\n</IfModule>\n'
);
fs.copyFileSync(path.join(root, "php", "config.sample.php"), path.join(dist, "alibaba-config.sample.php"));

const zip = new AdmZip();
zip.addLocalFolder(site);
zip.writeZip(path.join(dist, "alibaba-site.zip"));

const mb = (fs.statSync(path.join(dist, "alibaba-site.zip")).size / 1048576).toFixed(1);
console.log(`Package ready: dist/alibaba-site.zip (${mb} MB). Upload it to public_html and Extract.`);
