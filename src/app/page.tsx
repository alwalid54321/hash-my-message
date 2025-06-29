import { EncryptDecryptTabs } from "@/components/encrypt-decrypt-tabs";
import { PassphraseHintDialog } from "@/components/passphrase-hint-dialog";

export default function Home() {
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
      <div className="w-full max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}>
        <EncryptDecryptTabs />
      </div>
    </main>
  );
}
