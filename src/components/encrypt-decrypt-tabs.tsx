"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { encryptText, decryptText } from "@/lib/crypto";
import { Copy, Check, Lock, Unlock, Loader2, XCircle } from "lucide-react";

export function EncryptDecryptTabs({ userId }: { userId: string }) {
  const [encryptInput, setEncryptInput] = useState("");
  const [encryptPassphrase, setEncryptPassphrase] = useState("");
  const [encryptRecipientId, setEncryptRecipientId] = useState("");
  const [encryptOutput, setEncryptOutput] = useState("");
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [hasCopiedEncrypt, setHasCopiedEncrypt] = useState(false);

  const [decryptInput, setDecryptInput] = useState("");
  const [decryptPassphrase, setDecryptPassphrase] = useState("");
  const [decryptRecipientId, setDecryptRecipientId] = useState(userId || "");
  const [decryptOutput, setDecryptOutput] = useState("");
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [hasCopiedDecrypt, setHasCopiedDecrypt] = useState(false);
  
  const [hasCopiedId, setHasCopiedId] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    if (userId) {
      setDecryptRecipientId(userId);
    }
  }, [userId]);

  const copyUserId = () => {
    if (!userId) return;
    navigator.clipboard.writeText(userId);
    setHasCopiedId(true);
    toast({ title: "Recipient ID copied to clipboard!" });
    setTimeout(() => setHasCopiedId(false), 2000);
  };

  const handleEncrypt = async () => {
    if (!encryptInput || !encryptPassphrase) {
      toast({
        title: "Missing Fields",
        description: "Please provide both text and a passphrase to encrypt.",
        variant: "destructive",
      });
      return;
    }
    setIsEncrypting(true);
    setEncryptOutput('');
    const result = await encryptText(encryptInput, encryptPassphrase, encryptRecipientId);
    setIsEncrypting(false);
    if (result) {
      setEncryptOutput(result);
    } else {
      toast({
        title: "Encryption Failed",
        description: "An error occurred during encryption.",
        variant: "destructive",
      });
    }
  };

  const handleDecrypt = async () => {
    if (!decryptInput || !decryptPassphrase) {
      toast({
        title: "Missing Fields",
        description:
          "Please provide both encrypted data and a passphrase to decrypt.",
        variant: "destructive",
      });
      return;
    }
    setIsDecrypting(true);
    setDecryptOutput('');
    try {
      const result = await decryptText(decryptInput, decryptPassphrase, decryptRecipientId);
      setDecryptOutput(result);
    } catch (error) {
      setDecryptOutput("");
      let description = "An unknown error occurred.";
      if (error instanceof Error) {
        switch (error.message) {
          case 'PASSPHRASE_OR_DATA_INVALID':
            description = "Please check your passphrase and the encrypted data. They may be incorrect or corrupted.";
            break;
          case 'ID_MISMATCH':
            description = "The Recipient ID is incorrect or does not match the one used for encryption.";
            break;
          case 'ID_MISSING':
             description = "This message was encrypted for a specific Recipient ID, which is missing from the input.";
            break;
        }
      }
      toast({
        title: "Decryption Failed",
        description: description,
        variant: "destructive",
      });
    } finally {
      setIsDecrypting(false);
    }
  };

  const handleEncryptClear = () => {
    setEncryptInput("");
    setEncryptPassphrase("");
    setEncryptRecipientId("");
    setEncryptOutput("");
  };

  const handleDecryptClear = () => {
    setDecryptInput("");
    setDecryptPassphrase("");
    setDecryptRecipientId(userId || "");
    setDecryptOutput("");
  };

  const copyToClipboard = (text: string, type: "encrypt" | "decrypt") => {
    navigator.clipboard.writeText(text).then(() => {
      if (type === "encrypt") {
        setHasCopiedEncrypt(true);
        setTimeout(() => setHasCopiedEncrypt(false), 2000);
      } else {
        setHasCopiedDecrypt(true);
        setTimeout(() => setHasCopiedDecrypt(false), 2000);
      }
      toast({ title: "Copied to clipboard!" });
    });
  };
  
  const MAX_CHARS = 5000;

  return (
    <Card className="w-full bg-card rounded-lg">
      <CardHeader className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <CardTitle>Message Transformer</CardTitle>
            <CardDescription>
            Switch between encrypting and decrypting your text.
            </CardDescription>
          </div>
          {userId && (
            <div className="shrink-0">
              <div className="p-3 rounded-md border border-dashed border-primary/50 bg-muted/30">
                <Label htmlFor="user-id" className="text-xs text-muted-foreground">Your Recipient ID</Label>
                <div className="flex items-center gap-2 mt-1">
                    <Input id="user-id" value={userId} readOnly className="h-8 font-code bg-transparent text-sm w-44" />
                    <Button variant="ghost" size="icon" onClick={copyUserId} aria-label="Copy User ID" className="h-8 w-8">
                        {hasCopiedId ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                    </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="encrypt" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="encrypt">
              <Lock className="mr-2 h-4 w-4" /> Encrypt
            </TabsTrigger>
            <TabsTrigger value="decrypt">
              <Unlock className="mr-2 h-4 w-4" /> Decrypt
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="encrypt" className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="encrypt-input">Text to Encrypt</Label>
              <Textarea
                id="encrypt-input"
                placeholder="Type your secret message here..."
                value={encryptInput}
                onChange={(e) => setEncryptInput(e.target.value)}
                rows={5}
                maxLength={MAX_CHARS}
              />
              <p className="text-xs text-muted-foreground text-right">{encryptInput.length} / {MAX_CHARS}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="encrypt-passphrase">Passphrase</Label>
              <Input
                id="encrypt-passphrase"
                type="password"
                placeholder="Enter a strong passphrase"
                value={encryptPassphrase}
                onChange={(e) => setEncryptPassphrase(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="encrypt-recipient-id">Recipient ID (Optional)</Label>
              <Input
                id="encrypt-recipient-id"
                placeholder="Enter a unique ID for the recipient"
                value={encryptRecipientId}
                onChange={(e) => setEncryptRecipientId(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleEncrypt} 
                className={`w-full hover:shadow-[0_0_20px_hsl(var(--primary))] transition-shadow ${isEncrypting ? 'animate-pulsing-glow' : ''}`}
                disabled={isEncrypting}
              >
                {isEncrypting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lock className="mr-2 h-4 w-4" />}
                Encrypt Message
              </Button>
               <Button onClick={handleEncryptClear} variant="secondary" className="w-full sm:w-auto">
                <XCircle className="mr-2 h-4 w-4" /> Clear
              </Button>
            </div>
            {encryptOutput && (
              <div className="space-y-2 animate-fade-in">
                <Label htmlFor="encrypt-output">Encrypted Output</Label>
                <div className="relative">
                  <Textarea
                    id="encrypt-output"
                    readOnly
                    value={encryptOutput}
                    rows={5}
                    className="pr-12 bg-muted/50 font-code text-sm"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => copyToClipboard(encryptOutput, "encrypt")}
                    aria-label="Copy encrypted text"
                  >
                    {hasCopiedEncrypt ? <Check className="h-5 w-5 text-primary" /> : <Copy className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="decrypt" className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="decrypt-input">Encrypted Data</Label>
              <Textarea
                id="decrypt-input"
                placeholder="Paste your encrypted data here..."
                value={decryptInput}
                onChange={(e) => setDecryptInput(e.target.value)}
                rows={5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="decrypt-passphrase">Passphrase</Label>
              <Input
                id="decrypt-passphrase"
                type="password"
                placeholder="Enter the passphrase used for encryption"
                value={decryptPassphrase}
                onChange={(e) => setDecryptPassphrase(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="decrypt-recipient-id">Your ID (if one was used)</Label>
              <Input
                id="decrypt-recipient-id"
                placeholder="Your Recipient ID is pre-filled"
                value={decryptRecipientId}
                onChange={(e) => setDecryptRecipientId(e.target.value)}
              />
            </div>
             <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleDecrypt} className="w-full hover:shadow-[0_0_20px_hsl(var(--primary))] transition-shadow" disabled={isDecrypting}>
                  {isDecrypting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Unlock className="mr-2 h-4 w-4" />}
                  Decrypt Message
                </Button>
                <Button onClick={handleDecryptClear} variant="secondary" className="w-full sm:w-auto">
                  <XCircle className="mr-2 h-4 w-4" /> Clear
                </Button>
            </div>
            {decryptOutput && (
              <div className="space-y-2 animate-fade-in">
                <Label htmlFor="decrypt-output">Decrypted Text</Label>
                <div className="relative">
                  <Textarea
                    id="decrypt-output"
                    readOnly
                    value={decryptOutput}
                    rows={5}
                    className="pr-12 bg-muted/50"
                  />
                   <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => copyToClipboard(decryptOutput, "decrypt")}
                    aria-label="Copy decrypted text"
                  >
                    {hasCopiedDecrypt ? <Check className="h-5 w-5 text-primary" /> : <Copy className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

        </Tabs>
      </CardContent>
    </Card>
  );
}
