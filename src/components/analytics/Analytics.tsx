import Script from "next/script";
import { ClickTracker } from "@/components/analytics/ClickTracker";

/**
 * Loads Google Tag Manager (NEXT_PUBLIC_GTM_ID) or, if only a GA4 id is set,
 * gtag.js directly (NEXT_PUBLIC_GA_ID). Renders nothing when neither is set.
 * Scripts load after hydration so they never block first paint.
 */
export function Analytics() {
  const gtm = process.env.NEXT_PUBLIC_GTM_ID;
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  if (!gtm && !ga) return null;

  return (
    <>
      {gtm ? (
        <Script id="gtm" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=document.getElementsByTagName('script')[0],j=document.createElement('script');j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id=${gtm}';f.parentNode.insertBefore(j,f);`}
        </Script>
      ) : (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${ga}');`}
          </Script>
        </>
      )}
      <ClickTracker />
    </>
  );
}
