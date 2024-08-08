"use client";
import {
  useAddress,
  useChainId,
  useDisconnect,
  useMetamask,
} from "@thirdweb-dev/react";
import { createContext, useContext } from "react";

// Create a context to manage wallet connection state
const WalletContext = createContext<{
  address: string | undefined;
  chainId: string | number | undefined;
  connectWithMetamask: () => void;
  disconnect: () => void;
}>({
  address: undefined,
  chainId: undefined,
  connectWithMetamask: () => {},
  disconnect: () => {},
});

const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const chainId = useChainId();
  const disconnect = useDisconnect();

  return (
    <WalletContext.Provider
      value={{ address, chainId, connectWithMetamask, disconnect }}
    >
      {children}
    </WalletContext.Provider>
  );
};
export default WalletProvider;
export const useWallet = () => useContext(WalletContext);
