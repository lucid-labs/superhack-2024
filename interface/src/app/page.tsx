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

export default function Home() {
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
