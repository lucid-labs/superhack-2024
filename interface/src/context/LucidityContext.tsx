"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useWallet } from "./ThirdwebContext";
import axios from "axios";
import { Token } from "@/types/token.types";
import { SupportedChainId } from "@/constants/chains";
import { TOKEN_URI } from "@/utils/config";

// Create a context to manage user details
const LucidityContext = createContext<{
  tokens: Record<SupportedChainId, Token[]>;
}>({
  tokens: {
    [SupportedChainId.MAINNET]: [],
    [SupportedChainId.DEVNET]: [],
    [SupportedChainId.BASE]: [],
  },
});

const LucidityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { chainId } = useWallet();
  const [tokens, setTokensState] = useState<Record<SupportedChainId, Token[]>>(
    {} as Record<SupportedChainId, Token[]>
  );

  const getTokenList = async () => {
    try {
      const res = await axios.get<Record<SupportedChainId, Token[]>>(TOKEN_URI);
      if (res.status === 200) {
        setTokensState(res.data as Record<SupportedChainId, Token[]>);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTokenList();
  }, [chainId]);

  return (
    <LucidityContext.Provider
      value={{
        tokens,
      }}
    >
      {children}
    </LucidityContext.Provider>
  );
};
export default LucidityProvider;
export const useLucidity = () => useContext(LucidityContext);
