import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { APTOS_API_KEY, NETWORK } from "../../constants";
import { ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const { toast } = useToast();

  return (
    <AptosWalletAdapterProvider
      autoConnect={true}
      dappConfig={{ network: NETWORK, aptosApiKey: APTOS_API_KEY }}
      optInWallets={[
        "Continue with Google",
        "Petra",
        "Nightly",
        "Pontem Wallet",
        "Mizu Wallet",
      ]}
      onError={(error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error || "Unknown wallet error",
        });
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
}
