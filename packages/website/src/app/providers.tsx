"use client";

import { WalletProvider } from "@/components/providers/WalletProvider";
import { Toaster } from "@/components/ui/toaster";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WalletProvider>{children}</WalletProvider>
      <Toaster />
    </>
  );
}
