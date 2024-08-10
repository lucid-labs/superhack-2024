"use client";
import { Chain } from "@thirdweb-dev/chains";
import {
  useAddress,
  useChain,
  useDisconnect,
  useSigner
} from "@thirdweb-dev/react";
import { createContext, useContext } from "react";

// Create a context to manage wallet connection state
const WalletContext = createContext<{
  chain: Chain | undefined;
  address: string | undefined;
  disconnect: () => void;
  sendTransaction?: (params: any) => Promise<string | undefined>;
}>({
  chain: undefined,
  address: undefined,
  disconnect: () => {},
});

const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const address = useAddress();
  const chain = useChain();
  const disconnect = useDisconnect();
  const signer = useSigner();

  const sendTransaction = async (tx: any) => {
    if (!signer) return;

    try {
      console.log("Sending transaction", tx)
      const txResponse = await signer.sendTransaction(tx);
      await txResponse.wait();

      alert("Transaction successful!");
      return txResponse.hash;
    } catch (error) {
      console.log("sending transaction", error)
      alert("Transaction failed!");
    }
  };
  return (
    <WalletContext.Provider
      value={{ address, disconnect, chain, sendTransaction }}
    >
      {children}
    </WalletContext.Provider>
  );
};
export default WalletProvider;
export const useWallet = () => useContext(WalletContext);
