import { BigNumber } from "bignumber.js";

export enum SupportedChainId {
  MAINNET = 1,
  DEVNET = 123456789,
  BASE = 8453,
}

interface Chain {
  chainId: string;
  name: string;
  rpcURL: string;
  alias?: string;
  blockExplorerUrls?: string[];
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  logo: string;
}
export const CHAINS: Record<SupportedChainId, Chain> = {
  [SupportedChainId.MAINNET]: {
    chainId: `0x${new BigNumber(SupportedChainId.MAINNET.toString()).toString(
      16
    )}`,
    name: "Ethereum",
    rpcURL: process.env.NEXT_PUBLIC_MAINNET!,
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorerUrls: ["https://etherscan.io"],
    logo: "/icons/network/ethereum.svg",
  },
  [SupportedChainId.BASE]: {
    chainId: `0x${new BigNumber(SupportedChainId.BASE.toString()).toString(
      16
    )}`,
    name: "Base",
    // rpcURL: "https://mainnet.base.org",
    rpcURL: process.env.NEXT_PUBLIC_BASE!,
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorerUrls: ["https://basescan.org"],
    logo: "/icons/network/base.svg",
  },
  [SupportedChainId.DEVNET]: {
    chainId: `0x${new BigNumber(SupportedChainId.DEVNET.toString()).toString(
      16
    )}`,
    name: "Simulation",
    rpcURL: process.env.NEXT_PUBLIC_DEVNET!,
    alias: "Devnet",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorerUrls: [
      "https://dashboard.tenderly.co/explorer/fork/841e47f8-a6df-4642-9748-d23d83826ae5",
    ],
    logo: "/icons/network/simulation.svg",
  },
};

export const DEFAULT_CHAIN_ID = SupportedChainId.BASE;

export enum Protocols {
  "compound-v2" = "Compound V2",
  "aave-v2" = "Aave V2",
  "aave-v3" = "Aave V3",
  "morpho-aave" = "Morpho Aave V2",
  "morpho-aave-v3" = "Morpho Aave V3",
  "morpho-compound" = "Morpho Compound",
  "compound-v3-usdc" = "Compound V3 USDC",
  "compound-v3-weth" = "Compound V3 ETH",
  "moonwell" = "Moonwell",
  "seamless-protocol" = "Seamless Finance",
}
