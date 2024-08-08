import React, { useEffect } from "react";
import { Box, Text, Image, Flex } from "rebass/styled-components";
import { useWallet } from "@/context/ThirdwebContext";
import { CHAINS, SupportedChainId } from "@/constants/chains";

const NetworkCard = () => {
  const [isWrongNetwork, setIsWrongNetwork] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuRef = React.useRef(null);
  //   const { switchChain } = useChain();
  const { chainId: activeChain } = useWallet();

  console.log({ activeChain });

  useEffect(() => {
    const chainIdIndex = Object.values(SupportedChainId).indexOf(activeChain!);
    setIsWrongNetwork(chainIdIndex === -1);
  }, [activeChain]);

  const NetworksListModal = ({
    isMenuOpen,
    currentChainId,
    toggleShowModalForSimulation,
  }: {
    isMenuOpen: boolean;
    currentChainId: number;
    toggleShowModalForSimulation?: (show: boolean) => void;
  }) => {
    return (
      //   <MenuOverlay isOpen={isMenuOpen} right="270px">
      //     <>
      //       {Object.values(SupportedChainId)
      //         .filter((key) => !isNaN(Number(SupportedChainId[key])))
      //         .map((x) => (
      //           <MenuItem
      //             key={x}
      //             label={
      //               <Flex>
      //                 <Image
      //                   src={CHAINS[SupportedChainId[x]].logo}
      //                   alt={CHAINS[SupportedChainId[x]].name}
      //                   style={{
      //                     padding: `${
      //                       CHAINS[SupportedChainId[x]].logo
      //                         .toLowerCase()
      //                         .includes("simulation")
      //                         ? "0px"
      //                         : "4px"
      //                     }`,
      //                     background: "#cbcbd1",
      //                     borderRadius: "32px",
      //                     width: "24px",
      //                     height: "24px",
      //                     marginRight: "8px",
      //                   }}
      //                 />
      //                 <Text>{CHAINS[SupportedChainId[x]].name}</Text>
      //               </Flex>
      //             }
      //             onClick={() => {
      //               if (Number(SupportedChainId[x]) === SupportedChainId.DEVNET) {
      //                 toggleShowModalForSimulation(true);
      //               } else {
      //                 switchChain(SupportedChainId[x]);
      //               }
      //             }}
      //             style={{
      //               background: `${
      //                 Number(currentChainId) === Number(x) ? "#1d1f1d" : ""
      //               }`,
      //               color: `${
      //                 Number(currentChainId) === Number(x)
      //                   ? "#fff !important"
      //                   : ""
      //               }`,
      //               borderRadius: "5px",
      //               padding: "10px",
      //             }}
      //           />
      //         ))}
      //     </>
      //   </MenuOverlay>
      <></>
    );
  };

  const onToggleMenu = () => {
    setIsMenuOpen((open) => !open);
  };

  const onMenuClose = () => {
    setIsMenuOpen(false);
  };
  //   useOutsideAlerter(menuRef, () => {
  //     if (isMenuOpen) onMenuClose();
  //   });

  return (
    <div ref={menuRef}>
      <Flex
        mr={"3px"}
        backgroundColor={"fadedDark"}
        width={48}
        height={"100%"}
        paddingX={"10px"}
        sx={{
          borderRadius: 15,
          border: `1px solid ${isWrongNetwork ? "#f00" : "#a7a7a7"}`,
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
                  : CHAINS[activeChain as SupportedChainId]?.logo
              }
              style={{
                padding: CHAINS[activeChain as SupportedChainId]?.logo
                  .toLowerCase()
                  .includes("simulation")
                  ? "0px"
                  : "4px",
                background: `${isWrongNetwork ? "#f3bebe" : "#cbcbd1"}`,
                borderRadius: "32px",
                width: "24px",
                height: "24px",
              }}
              alt="Newtwork Icon"
            />
          </Box>
        </Flex>
      </Flex>
      {/* <NetworksListModal
        isMenuOpen={isMenuOpen}
        currentChainId={activeChain}
        toggleShowModalForSimulation={toggleShowModalForSimulation}
      /> */}
    </div>
  );
};

export default NetworkCard;
