"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Languages } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

/**
 * Whole-site English <-> Urdu switch using Google's website translator.
 *
 * - Loaded ONLY after the visitor asks for Urdu (no cost for everyone else).
 * - Purely client-side, so search engines still index the English pages and no
 *   duplicate-content URLs are created. The hand-written Urdu page (/urdu) is
 *   the indexable Urdu resource.
 * - Machine translation: brand names, numbers and addresses are marked
 *   translate="no" where they matter.
 */
declare global {
  interface Window {
    google?: { translate?: { TranslateElement: new (o: object, id: string) => unknown } };
    googleTranslateElementInit?: () => void;
  }
}

const COOKIE = "googtrans";

const subscribeNoop = () => () => {};

function isUrdu() {
  return document.cookie.split("; ").some((c) => c === `${COOKIE}=/en/ur`);
}

function setCookie(value: string, expires?: string) {
  const base = `${COOKIE}=${value}; path=/${expires ? `; expires=${expires}` : ""}`;
  document.cookie = base;
  document.cookie = `${base}; domain=${location.hostname}`;
}

// React and the translator both edit text nodes; tolerate the mismatch instead of crashing.
function patchDomForTranslator() {
  const proto = Node.prototype as Node & { __patched?: boolean };
  if (proto.__patched) return;
  proto.__patched = true;
  const remove = proto.removeChild;
  proto.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this) return child;
    return remove.call(this, child) as T;
  };
  const insert = proto.insertBefore;
  proto.insertBefore = function <T extends Node>(this: Node, node: T, ref: Node | null): T {
    if (ref && ref.parentNode !== this) return node;
    return insert.call(this, node, ref) as T;
  };
}

function loadTranslator() {
  if (document.getElementById("gt-script")) return;
  patchDomForTranslator();
  window.googleTranslateElementInit = () => {
    new window.google!.translate!.TranslateElement(
      { pageLanguage: "en", includedLanguages: "ur", autoDisplay: false },
      "google_translate_element"
    );
  };
  const s = document.createElement("script");
  s.id = "gt-script";
  s.async = true;
  s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.body.appendChild(s);
}

export function LanguageToggle({ className = "" }: { className?: string }) {
  const urdu = useSyncExternalStore(subscribeNoop, isUrdu, () => false);

  useEffect(() => {
    if (urdu) loadTranslator();
  }, [urdu]);

  function toggle() {
    trackEvent("language_toggle", { to: urdu ? "en" : "ur" });
    if (urdu) setCookie("", "Thu, 01 Jan 1970 00:00:00 GMT");
    else setCookie("/en/ur");
    location.reload();
  }

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        translate="no"
        aria-label={urdu ? "English — switch website to English" : "اردو — read this website in Urdu"}
        className={`inline-flex h-10 items-center gap-1.5 rounded-full border border-border px-3 text-sm font-semibold text-charcoal hover:border-primary hover:text-primary ${className}`}
      >
        <Languages size={16} />
        {urdu ? "English" : "اردو"}
      </button>
      <div id="google_translate_element" className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden />
    </>
  );
}
