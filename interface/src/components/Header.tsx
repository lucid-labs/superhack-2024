// pages/_app.tsx
"use client";
import { ConnectWallet } from "@thirdweb-dev/react";
import Image from "next/image";
import React from "react";

const Header: React.FC = () => {
  return (
    <header>
      <div className="absolute top-4 left-4 bg-gray-100 text-gray-900 rounded-full shadow-sm">
        <Image src="/lucidity.png" height={60} width={60} alt="logo" />
      </div>
      <div className="absolute top-4 right-4 bg-gray-100 text-gray-900 rounded-full shadow-sm">
        <ConnectWallet theme={"light"} />
      </div>
    </header>
  );
};

export default Header;
