import React, { useEffect } from "react";
import { Box, Text, Image, Flex } from "rebass/styled-components";
import { useWallet } from "@/context/ThirdwebContext";
import { CHAINS, SupportedChainId } from "@/constants/chains";
import MenuOverlay from "./menu/MenuOverlay";
import MenuItem from "./menu/MenuItem";
import { useChain } from "@/hooks/useChain";
import useOutsideAlerter from "@/hooks/useOutsideAlerter";

interface NetworkCardProps {
  toggleShowModalForSimulation: () => void;
}

const NetworkCard = ({ toggleShowModalForSimulation }: NetworkCardProps) => {
  const [isWrongNetwork, setIsWrongNetwork] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuRef = React.useRef(null);
  const { chain: activeChain } = useWallet();

  useEffect(() => {
    const chainIdIndex = Object.values(SupportedChainId).indexOf(
      activeChain?.chainId!
    );
    setIsWrongNetwork(chainIdIndex === -1);
  }, [activeChain]);

  const onToggleMenu = () => {
    setIsMenuOpen((open) => !open);
  };

  const NetworksListModal = ({
    isMenuOpen,
    currentChainId,
    toggleShowModalForSimulation,
  }: {
    isMenuOpen: boolean;
    currentChainId: number;
    toggleShowModalForSimulation?: (show: boolean) => void;
  }) => {
    const { switchChain } = useChain();
    return (
      <MenuOverlay isOpen={isMenuOpen} right="0px">
        <>
          {Object.values(SupportedChainId)
            .filter((key: any) => !isNaN(Number(SupportedChainId[key])))
            .map((x: any) => (
              <MenuItem
                key={x}
                label={
                  <Flex>
                    <Image
                      src={CHAINS[SupportedChainId[x]].logo}
                      alt={CHAINS[SupportedChainId[x]].name}
                      style={{
                        padding: `${
                          CHAINS[SupportedChainId[x]].logo
                            .toLowerCase()
                            .includes("simulation")
                            ? "0px"
                            : "4px"
                        }`,
                        background: "#cbcbd1",
                        borderRadius: "32px",
                        width: "24px",
                        height: "24px",
                        marginRight: "8px",
                      }}
                    />
                    <Text>{CHAINS[SupportedChainId[x]].name}</Text>
                  </Flex>
                }
                onClick={() => {
                  if (Number(SupportedChainId[x]) === SupportedChainId.DEVNET) {
                    toggleShowModalForSimulation &&
                      toggleShowModalForSimulation(true);
                  } else {
                    switchChain(Number(SupportedChainId[x]));
                  }
                }}
                style={{
                  background: `${
                    Number(currentChainId) === Number(x) ? "#1d1f1d" : ""
                  }`,
                  color: `${
                    Number(currentChainId) === Number(x)
                      ? "#fff !important"
                      : ""
                  }`,
                  borderRadius: "5px",
                  padding: "10px",
                }}
              />
            ))}
        </>
      </MenuOverlay>
    );
  };

  const onMenuClose = () => {
    setIsMenuOpen(false);
  };
  useOutsideAlerter(menuRef, () => {
    if (isMenuOpen) onMenuClose();
  });

  return (
    <div ref={menuRef}>
      <Flex
        mr={"3px"}
        backgroundColor={"hsl(300, 20.0%, 99.0%)"}
        width={63}
        height={63}
        // height={"100%"}
        paddingX={"10px"}
        sx={{
          borderRadius: 15,
          // border: `1px solid ${isWrongNetwork ? "#f00" : "#a7a7a7"}`,
        }}
      >
        <Flex
          width={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
          textAlign={"center"}
          onClick={onToggleMenu}
          style={{ cursor: "pointer" }}
        >
          <Box
            fontSize={15}
            color={isWrongNetwork ? "#f00" : "#222"}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src={
                isWrongNetwork
                  ? "/icons/network/error.svg"
                  : CHAINS[activeChain?.chainId as SupportedChainId]?.logo
              }
              style={{
                padding: CHAINS[activeChain?.chainId as SupportedChainId]?.logo
                  .toLowerCase()
                  .includes("simulation")
                  ? "0px"
                  : "4px",
                background: `${isWrongNetwork ? "#f3bebe" : "#cbcbd1"}`,
                borderRadius: "32px",
                width: "32px",
                height: "32px",
              }}
              alt="Newtwork Icon"
            />
          </Box>
        </Flex>
      </Flex>
      <NetworksListModal
        isMenuOpen={isMenuOpen}
        currentChainId={activeChain?.chainId}
        toggleShowModalForSimulation={toggleShowModalForSimulation}
      />
    </div>
  );
};

export default NetworkCard;
