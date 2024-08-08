import { useCallback, useMemo } from "react";
import { Chain, defineChain, ethereum, base } from "thirdweb/chains";
import {
  useActiveWalletChain,
  useSwitchActiveWalletChain,
} from "thirdweb/react";
import { CHAINS, SupportedChainId } from "../constants/chains";
import { useWallet } from "@/context/ThirdwebContext";
// import Lucidity from "/lucidity.png";

export const useChain = () => {
  const { chainId: activeChain } = useWallet();

  const switchActiveChain = useSwitchActiveWalletChain();
  const simulationChain = useMemo(() => {
    const chain: Chain = {
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
        decimals: CHAINS[SupportedChainId.DEVNET].nativeCurrency.decimals,
      },
      testnet: true,
      blockExplorers: [
        {
          name: "tenderly",
          url: CHAINS[SupportedChainId.DEVNET].blockExplorerUrls![0],
        },
      ],
    };
    return defineChain(chain);
  }, []);

  const baseChain = useMemo(() => {
    const chain: Chain = {
      id: SupportedChainId.BASE,
      name: CHAINS[SupportedChainId.BASE].name,
      rpc: CHAINS[SupportedChainId.BASE].rpcURL,
      nativeCurrency: {
        name: CHAINS[SupportedChainId.BASE].nativeCurrency.name,
        symbol: CHAINS[SupportedChainId.BASE].nativeCurrency.symbol,
        decimals: CHAINS[SupportedChainId.BASE].nativeCurrency.decimals,
      },
      blockExplorers: [
        {
          name: "tenderly",
          url: CHAINS[SupportedChainId.BASE].blockExplorerUrls![0],
        },
      ],
    };
    return defineChain(chain);
  }, []);

  const switchChain = (switchTo: SupportedChainId) => {
    switch (switchTo) {
      case SupportedChainId.BASE:
        switchActiveChain(base).then(() => window.location.reload());
        break;
      case SupportedChainId.MAINNET:
        switchActiveChain(ethereum).then(() => window.location.reload());
        break;
      case SupportedChainId.DEVNET:
        switchActiveChain(simulationChain).then(() => window.location.reload());
        break;
      default:
        break;
    }
  };
  const getChainName = useCallback((chain: SupportedChainId) => {
    return CHAINS[chain].name as string;
  }, []);

  const getActiveChainName = useMemo(() => {
    return (CHAINS[activeChain as SupportedChainId]?.name as string) ?? "";
  }, [activeChain]);

  return {
    activeChain,
    switchChain,
    simulationChain,
    baseChain,
    getChainName,
    getActiveChainName,
  };
};
