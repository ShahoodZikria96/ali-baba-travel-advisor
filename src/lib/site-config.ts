"use client";

import { useEffect, useState } from "react";

/**
 * Runtime settings that can be changed on the server WITHOUT rebuilding the
 * site: edit /site-config.json in cPanel File Manager (Google Analytics ID,
 * Tag Manager ID, ads on/off).
 */
export interface RuntimeConfig {
  gaId?: string;
  gtmId?: string;
  /** Meta (Facebook) Pixel ID, digits only. Optional; enables ad conversion tracking. */
  metaPixelId?: string;
  adsEnabled?: boolean;
  adsenseClient?: string;
}

let cached: Promise<RuntimeConfig> | null = null;

export function loadRuntimeConfig(): Promise<RuntimeConfig> {
  cached ??= fetch("/site-config.json", { cache: "no-cache" })
    .then((r) => (r.ok ? (r.json() as Promise<RuntimeConfig>) : {}))
    .catch(() => ({}));
  return cached;
}

export function useRuntimeConfig(): RuntimeConfig | null {
  const [cfg, setCfg] = useState<RuntimeConfig | null>(null);
  useEffect(() => {
    let alive = true;
    loadRuntimeConfig().then((c) => alive && setCfg(c));
    return () => {
      alive = false;
    };
  }, []);
  return cfg;
}
