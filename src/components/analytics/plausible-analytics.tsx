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
        src="https://plausible.io/js/script.js" 
        strategy="lazyOnload"
      />
    </>
  );
}

// Add TypeScript declaration
declare global {
  interface Window {
    plausible?: (event: string, options?: object) => void;
  }
}
