'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function PlausibleAnalytics() {
  // Handle SPA route changes for accurate page view tracking
  useEffect(() => {
    const handleRouteChange = () => {
      if (window.plausible) {
        window.plausible('pageview');
      }
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <>
      <Script 
        data-domain="hashmymessage.com" 
        src="https://plausible.io/js/script.file-downloads.hash.outbound-links.pageview-props.revenue.tagged-events.js" 
        strategy="lazyOnload"
      />
      <Script id="plausible-setup">
        {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
      </Script>
    </>
  );
}

// Add TypeScript declaration
declare global {
  interface Window {
    plausible?: (event: string, options?: object) => void;
  }
}
