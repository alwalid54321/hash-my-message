"use client";

import { useState, useEffect } from "react";
import { EncryptDecryptTabs } from "@/components/encrypt-decrypt-tabs";
import { PassphraseHintDialog } from "@/components/passphrase-hint-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Copy, Check } from "lucide-react";

export default function Home() {
  const [userId, setUserId] = useState("");
  const [hasCopiedId, setHasCopiedId] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // This code runs only on the client, avoiding hydration mismatch
    const uniqueId = "user-" + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    setUserId(uniqueId);
  }, []);

  const copyUserId = () => {
    navigator.clipboard.writeText(userId);
    setHasCopiedId(true);
    toast({ title: "User ID copied to clipboard!" });
    setTimeout(() => setHasCopiedId(false), 2000);
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-24 bg-background">
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

      {userId && (
        <div className="w-full max-w-2xl text-left mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>
            <Label htmlFor="user-id">Your Unique Recipient ID</Label>
            <div className="flex items-center gap-2 mt-2">
                <Input id="user-id" value={userId} readOnly className="font-code bg-muted/50" />
                <Button variant="ghost" size="icon" onClick={copyUserId} aria-label="Copy User ID">
                    {hasCopiedId ? <Check className="h-5 w-5 text-primary" /> : <Copy className="h-5 w-5" />}
                </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Share this ID with the sender so they can encrypt messages specifically for you.</p>
        </div>
      )}

      <div 
        className="w-full max-w-2xl animate-fade-in-up p-[2px] rounded-xl bg-gradient-to-r from-primary/30 via-primary/80 to-primary/30 [background-size:400%_auto] animate-border-pan" 
        style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}
      >
        <EncryptDecryptTabs />
      </div>
    </main>
  );
}
