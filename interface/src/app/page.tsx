"use client";
import Header from "@/components/Header";
import WalletProvider from "@/context/ThirdwebContext";
import {
  coinbaseWallet,
  metamaskWallet,
  ThirdwebProvider,
  walletConnect,
} from "@thirdweb-dev/react";
import "./globals.css";
import UserProvider from "@/context/UserContext";
import Dashboard from "@/components/Dashboard";
import LucidityProvider from "@/context/LucidityContext";
// import { useChain } from "@/hooks/useChain";
// import { Ethereum } from "@thirdweb-dev/chains";

export default function Home() {
  // const { switchChain, simulationChain, baseChain } = useChain();

  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <ThirdwebProvider
        supportedWallets={[
          metamaskWallet(),
          coinbaseWallet({
            recommended: true,
          }),
          walletConnect(),
        ]}
        // supportedChains={[simulationChain, Ethereum, baseChain]}
        clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      >
        <WalletProvider>
          <LucidityProvider>
            <UserProvider>
              <Header />
              <Dashboard />
            </UserProvider>
          </LucidityProvider>
        </WalletProvider>
      </ThirdwebProvider>
    </main>
  );
}
