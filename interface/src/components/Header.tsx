"use client";
import { useLucidity } from "@/context/LucidityContext";

import { useWallet } from "@/context/ThirdwebContext";
import { ConnectWallet } from "@thirdweb-dev/react";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import NetworkCard from "./NetworkCard";
import SimulationModeModal from "./SimulationModeModal";

const Header: React.FC = () => {
  const { tokens } = useLucidity();
  const { address } = useWallet();
  const [showModalForSimulation, toggleShowModalForSimulation] =
    useState(false);
  const [simulationModeLoading, setSimulationModeLoading] =
    React.useState(false);

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

  const closeModalForSimulation = () => {
    toggleShowModalForSimulation(false);
  };

  return (
    <header>
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <div className="bg-gray-100 text-gray-900 rounded-full shadow-sm max-w-auto">
          <Image src="/lucidity.png" height={60} width={60} alt="logo" />
        </div>
        <h1 className="text-3xl font-bold">LuciBot</h1>
      </div>
      {address && (
        <div className="absolute top-4 right-56 bg-gray-100 text-gray-900 rounded-lg shadow-sm">
          <NetworkCard
            toggleShowModalForSimulation={() =>
              toggleShowModalForSimulation(true)
            }
          />
        </div>
      )}
      <div className="absolute top-4 right-4 bg-gray-100 text-gray-900 rounded-full shadow-sm">
        <ConnectWallet theme={"light"} supportedTokens={twTokens} />
      </div>
      <SimulationModeModal
        isOpen={showModalForSimulation}
        onClose={closeModalForSimulation}
        onLoad={(value) => setSimulationModeLoading(value)}
        isLoading={simulationModeLoading}
      />
    </header>
  );
};

export default Header;
