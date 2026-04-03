"use client";

import Script from "next/script";

// Replace with actual GA4 measurement ID when ready
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export function Analytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
          });
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

// Tracking helper — call from client components
export function trackEvent(name: string, params?: Record<string, string>) {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({ event: name, ...params });
  }
}

// Type declaration for dataLayer
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}
