"use client";
import Header from "@/components/Header";
import WalletProvider from "@/context/ThirdwebContext";
import { coinbaseWallet, metamaskWallet, ThirdwebProvider, walletConnect } from "@thirdweb-dev/react";
import Chatbot from "../components/Chatbot";
import "./globals.css";

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
      ]}>
        <WalletProvider>
          <Header />
          <Chatbot />
        </WalletProvider>
      </ThirdwebProvider>
    </main>
  );
}
