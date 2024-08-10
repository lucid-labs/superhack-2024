"use client";
import Dashboard from "@/components/Dashboard";
import Header from "@/components/Header";
import { CHAINS, SupportedChainId } from "@/constants/chains";
import LucidityProvider from "@/context/LucidityContext";
import WalletProvider from "@/context/ThirdwebContext";
import UserProvider from "@/context/UserContext";
import { Base, Ethereum } from "@thirdweb-dev/chains";
import {
  coinbaseWallet,
  metamaskWallet,
  ThirdwebProvider,
  walletConnect,
} from "@thirdweb-dev/react";
import { type ChainOptions, defineChain } from "thirdweb/chains";
import "./globals.css";

import { useMemo } from "react";
// import { useChain } from "@/hooks/useChain";
// import { Ethereum } from "@thirdweb-dev/chains";

export default function Home() {
  // const { switchChain, simulationChain, baseChain } = useChain();
  const customChain = useMemo(() => {
    const y = {
      chain: "ETH",
      chainId: 1,
      ens: {
        registry: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
      },
      explorers: [
        {
          name: "etherscan",
          url: "https://etherscan.io",
          standard: "EIP3091",
        },
        {
          name: "blockscout",
          url: "https://eth.blockscout.com",
          standard: "EIP3091",
          icon: {
            url: "ipfs://QmYtUimyqHkkFxYdbXXRbUqNg2VLPUg6Uu2C2nmFWowiZM",
            width: 551,
            height: 540,
            format: "png",
          },
        },
        {
          name: "dexguru",
          url: "https://ethereum.dex.guru",
          standard: "EIP3091",
          icon: {
            url: "ipfs://QmRaASKRSjQ5btoUQ2rNTJNxKtx2a2RoewgA7DMQkLVEne",
            width: 83,
            height: 82,
            format: "svg",
          },
        },
      ],
      faucets: [],
      features: [
        {
          name: "EIP155",
        },
        {
          name: "EIP1559",
        },
      ],
      icon: {
        url: "ipfs://QmcxZHpyJa8T4i63xqjPYrZ6tKrt55tZJpbXcjSDKuKaf9/ethereum/512.png",
        width: 512,
        height: 512,
        format: "png",
      },
      infoURL: "https://ethereum.org",
      name: "Ethereum Mainnet",
      nativeCurrency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18,
      },
      networkId: 1,
      redFlags: [],
      rpc: [
        "https://1.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
        "https://mainnet.infura.io/v3/${INFURA_API_KEY}",
        "wss://mainnet.infura.io/ws/v3/${INFURA_API_KEY}",
        "https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}",
        "https://api.mycryptoapi.com/eth",
        "https://cloudflare-eth.com",
        "https://ethereum-rpc.publicnode.com",
        "wss://ethereum-rpc.publicnode.com",
        "https://mainnet.gateway.tenderly.co",
        "wss://mainnet.gateway.tenderly.co",
        "https://rpc.blocknative.com/boost",
        "https://rpc.flashbots.net",
        "https://rpc.flashbots.net/fast",
        "https://rpc.mevblocker.io",
        "https://rpc.mevblocker.io/fast",
        "https://rpc.mevblocker.io/noreverts",
        "https://rpc.mevblocker.io/fullprivacy",
        "https://eth.drpc.org",
        "wss://eth.drpc.org",
      ],
      shortName: "eth",
      slip44: 60,
      slug: "ethereum",
      testnet: false,
    };
    const simChain: ChainOptions = {
      id: SupportedChainId.DEVNET,
      name: CHAINS[SupportedChainId.DEVNET].name,
      rpc: CHAINS[SupportedChainId.DEVNET].rpcURL,
      icon: {
        url: "/lucidity.png",
        width: 30,
        height: 30,
        format: "",
      },
      nativeCurrency: {
        name: CHAINS[SupportedChainId.DEVNET].nativeCurrency.name,
        symbol: CHAINS[SupportedChainId.DEVNET].nativeCurrency.symbol,
        decimals: CHAINS[SupportedChainId.DEVNET].nativeCurrency.decimals as 18,
      },
      testnet: true,
      blockExplorers: [
        {
          name: "tenderly",
          url: CHAINS[SupportedChainId.DEVNET].blockExplorerUrls[0],
        },
      ],
    };
    return {
      ...defineChain(simChain),
      name: "simulation",
      chain: "simulation",
      slug: "simulation",
      shortName: "simulation",
      chainId: 123456789,
      rpc: [CHAINS[SupportedChainId.DEVNET].rpcURL],
      nativeCurrency: {
        name: CHAINS[SupportedChainId.DEVNET].nativeCurrency.name,
        symbol: CHAINS[SupportedChainId.DEVNET].nativeCurrency.symbol,
        decimals: CHAINS[SupportedChainId.DEVNET].nativeCurrency.decimals,
      },
      testnet: true,
    };
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <ThirdwebProvider
        supportedChains={[Ethereum, Base, customChain]}
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
