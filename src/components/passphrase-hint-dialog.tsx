"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { generatePassphraseHint } from "@/ai/flows/passphrase-hint";
import { Wand2, Loader2, Copy } from "lucide-react";

export function PassphraseHintDialog() {
  const [open, setOpen] = useState(false);
  const [hint, setHint] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!hint) {
      toast({
        title: "Hint is empty",
        description: "Please provide a hint to generate a passphrase.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setPassphrase("");
    try {
      const result = await generatePassphraseHint({ hint });
      setPassphrase(result.possiblePassphrase);
    } catch (error) {
      console.error("Failed to generate passphrase hint:", error);
      toast({
        title: "Generation Failed",
        description: "Could not generate a passphrase from the hint.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (passphrase) {
      navigator.clipboard.writeText(passphrase);
      toast({
        title: "Copied!",
        description: "Passphrase copied to clipboard.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Wand2 className="mr-2 h-4 w-4" />
          Get Passphrase Hint
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Passphrase Hint Generator</DialogTitle>
          <DialogDescription>
            Enter a hint and we'll use AI to generate a memorable passphrase for
            you.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hint" className="text-right">
              Hint
            </Label>
            <Input
              id="hint"
              value={hint}
              onChange={(e) => setHint(e.target.value)}
              className="col-span-3"
              placeholder="e.g., My first pet's name"
            />
          </div>
          {passphrase && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="passphrase" className="text-right">
                Suggestion
              </Label>
              <div className="col-span-3 relative">
                <Input id="passphrase" value={passphrase} readOnly />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={handleCopy}
                  aria-label="Copy passphrase"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleGenerate} disabled={isLoading} className="hover:shadow-[0_0_20px_hsl(var(--primary))] transition-shadow">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Generate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
