// Minimal Node ESM loader so a plain `node --import` run can resolve the
// project's "@/..." -> "src/..." TypeScript path alias, used only to run
// scripts/export-seed-data.mjs directly against src/lib/content.ts without a
// bundler.
import { pathToFileURL } from "node:url";
import path from "node:path";

const root = process.cwd();

import fs from "node:fs";

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    let target = path.join(root, "src", specifier.slice(2));
    if (!fs.existsSync(target)) {
      for (const ext of [".ts", ".tsx", "/index.ts"]) {
        if (fs.existsSync(target + ext)) { target += ext; break; }
      }
    }
    return nextResolve(pathToFileURL(target).href, context);
  }
  return nextResolve(specifier, context);
}
