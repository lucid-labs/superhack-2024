"use client"
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { createContext, useContext } from "react";

// Create a context to manage wallet connection state
const WalletContext = createContext<{
  address: string | undefined;
  connectWithMetamask: () => void;
  disconnect: () => void;
}>({
  address: undefined,
  connectWithMetamask: () => {},
  disconnect: () => {},
});

const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const disconnect = useDisconnect();

  return (
    <WalletContext.Provider
      value={{ address, connectWithMetamask, disconnect }}
    >
      {children}
    </WalletContext.Provider>
  );
};
export default WalletProvider;
export const useWallet = () => useContext(WalletContext);
