import type {Metadata} from 'next';
import React from 'react';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import PlausibleAnalytics from "@/components/analytics/plausible-analytics";

export const metadata: Metadata = {
  title: 'Hash My Message',
  description: 'Encrypt and decrypt your messages with a passphrase.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Major+Mono+Display&family=Share+Tech+Mono&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <PlausibleAnalytics />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
