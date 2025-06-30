"use client";

import { useState, useEffect } from "react";
import { EncryptDecryptTabs } from "@/components/encrypt-decrypt-tabs";
import { PassphraseHintDialog } from "@/components/passphrase-hint-dialog";

export default function Home() {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // This code runs only on the client, avoiding hydration mismatch
    const uniqueId = "user-" + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    setUserId(uniqueId);
  }, []);

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-24 bg-background">
      <div className="w-full max-w-2xl text-center mb-12 animate-fade-in">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-primary font-headline animate-neon-glow">
          Hash My Message
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-muted-foreground">
          Securely encrypt and decrypt your messages with a private passphrase.
        </p>
        <div className="mt-6">
          <PassphraseHintDialog />
        </div>
      </div>

      <div 
        className="w-full max-w-2xl animate-fade-in-up rounded-xl bg-gradient-to-r from-primary/50 via-primary to-primary/50 [background-size:400%_auto] animate-border-pan animate-shadow-pulse p-[2px]" 
        style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}
      >
        <EncryptDecryptTabs userId={userId} />
      </div>

      <footer className="absolute bottom-4 text-center text-muted-foreground animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}>
        <p>
          by:{" "}
          <a
            href="https://github.com/alwalid54321"
            target="_blank"
            rel="noopener noreferrer"
            className="font-headline text-primary/90 hover:text-primary hover:underline transition-all duration-300 hover:tracking-widest"
          >
            alwalid54321
          </a>
        </p>
      </footer>
    </main>
  );
}
