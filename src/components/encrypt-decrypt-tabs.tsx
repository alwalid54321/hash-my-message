"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { encryptText, decryptText } from "@/lib/crypto";
import { Copy, Check, Lock, Unlock, Loader2 } from "lucide-react";

export function EncryptDecryptTabs() {
  const [encryptInput, setEncryptInput] = useState("");
  const [encryptPassphrase, setEncryptPassphrase] = useState("");
  const [encryptOutput, setEncryptOutput] = useState("");
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [hasCopiedEncrypt, setHasCopiedEncrypt] = useState(false);

  const [decryptInput, setDecryptInput] = useState("");
  const [decryptPassphrase, setDecryptPassphrase] = useState("");
  const [decryptOutput, setDecryptOutput] = useState("");
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [hasCopiedDecrypt, setHasCopiedDecrypt] = useState(false);

  const { toast } = useToast();

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
    const result = await encryptText(encryptInput, encryptPassphrase);
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
    const result = await decryptText(decryptInput, decryptPassphrase);
    setIsDecrypting(false);
    if (result !== null) {
      setDecryptOutput(result);
    } else {
      setDecryptOutput("");
      toast({
        title: "Decryption Failed",
        description:
          "This might be due to an incorrect passphrase or corrupted data.",
        variant: "destructive",
      });
    }
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

  return (
    <Card className="w-full shadow-2xl">
      <CardHeader>
        <CardTitle>Message Transformer</CardTitle>
        <CardDescription>
          Switch between encrypting and decrypting your text.
        </CardDescription>
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
          
          <TabsContent value="encrypt" className="mt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="encrypt-input">Text to Encrypt</Label>
              <Textarea
                id="encrypt-input"
                placeholder="Type your secret message here..."
                value={encryptInput}
                onChange={(e) => setEncryptInput(e.target.value)}
                rows={5}
              />
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
            <Button onClick={handleEncrypt} className="w-full" disabled={isEncrypting}>
              {isEncrypting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lock className="mr-2 h-4 w-4" />}
              Encrypt Message
            </Button>
            {encryptOutput && (
              <div className="space-y-2 animate-fade-in">
                <Label htmlFor="encrypt-output">Encrypted Output</Label>
                <div className="relative">
                  <Textarea
                    id="encrypt-output"
                    readOnly
                    value={encryptOutput}
                    rows={5}
                    className="pr-12 bg-muted/50"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => copyToClipboard(encryptOutput, "encrypt")}
                    aria-label="Copy encrypted text"
                  >
                    {hasCopiedEncrypt ? <Check className="h-5 w-5 text-green-400" /> : <Copy className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="decrypt" className="mt-6 space-y-6">
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
            <Button onClick={handleDecrypt} className="w-full" disabled={isDecrypting}>
              {isDecrypting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Unlock className="mr-2 h-4 w-4" />}
              Decrypt Message
            </Button>
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
                    {hasCopiedDecrypt ? <Check className="h-5 w-5 text-green-400" /> : <Copy className="h-5 w-5" />}
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
