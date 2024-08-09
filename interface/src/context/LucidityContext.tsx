"use client";
import { SupportedChainId } from "@/constants/chains";
import { MessageResponse } from "@/types/message.types";
import { Token } from "@/types/token.types";
import { TOKEN_URI } from "@/utils/config";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useWallet } from "./ThirdwebContext";
// Create a context to manage user details
const LucidityContext = createContext<{
  tokens: Record<SupportedChainId, Token[]>;
  sendMessage?: (message: string) => Promise<MessageResponse | undefined>;
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
  const { chain, address } = useWallet();
  const [tokens, setTokensState] = useState<Record<SupportedChainId, Token[]>>(
    {} as Record<SupportedChainId, Token[]>
  );

  const sendMessage = async (message: string) => {
    try {
      const res = await axios.post<MessageResponse>(
        `${process.env.NEXT_PUBLIC_CHATBOT_API}/chatbot/message`,
        {
          userId: address,
          message,
        },
        {
          // headers: {
          //  "" : "https://localhost:3000",
          //   "Access-Control-Allow-Origin": "*",
          //   "Access-Control-Allow-Methods": "POST, OPTIONS",
          // },
        }
      );
      if (res.status === 201) {
        console.log(res.data);
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
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
  }, [chain?.chainId]);

  return (
    <LucidityContext.Provider
      value={{
        tokens,
        sendMessage,
      }}
    >
      {children}
    </LucidityContext.Provider>
  );
};
export default LucidityProvider;
export const useLucidity = () => useContext(LucidityContext);
