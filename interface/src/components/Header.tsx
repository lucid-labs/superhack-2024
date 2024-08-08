"use client";
import { useLucidity } from "@/context/LucidityContext";
// import { useChain } from "@/hooks/useChain";
// import { ethereum } from "thirdweb/chains";
import { ConnectWallet } from "@thirdweb-dev/react";
import Image from "next/image";
import React, { useMemo } from "react";

const Header: React.FC = () => {
  const { tokens } = useLucidity();
  // const { switchChain, simulationChain, baseChain } = useChain();

  const twTokens = useMemo(() => {
    const tokenList: Record<string, any[]> = {};
    for (const [key, value] of Object.entries(tokens)) {
      if (key !== "name") {
        // TODO: ipfs list contains 'name' key  => do not store in state
        tokenList[key] = value.map((token) => {
          return { ...token, icon: token.logo };
        });
        // TODO: hide native token details (currently manually filtering eth)
        tokenList[key] = tokenList[key].filter(
          (token) => token.symbol !== "ETH"
        );
      }
    }
    return tokenList;
  }, [tokens]);

  return (
    <header>
      <div className="absolute top-4 left-4 bg-gray-100 text-gray-900 rounded-full shadow-sm">
        <Image src="/lucidity.png" height={60} width={60} alt="logo" />
      </div>
      <div className="absolute top-4 right-4 bg-gray-100 text-gray-900 rounded-full shadow-sm">
        <ConnectWallet
          // chains={[simulationChain, ethereum, baseChain]}
          theme={"light"}
          supportedTokens={twTokens}
        />
      </div>
    </header>
  );
};

export default Header;
