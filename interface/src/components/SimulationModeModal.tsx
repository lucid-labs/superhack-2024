import BigNumber from "bignumber.js";
import { Contract } from "ethers";
import { JsonRpcProvider } from "@ethersproject/providers";
import { formatEther } from "ethers/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { Button, Flex, Link, Text } from "rebass/styled-components";
import ERC20ABI from "../abi/ERC20.json";
import { SupportedChainId } from "../constants/chains";
import { useChain } from "../hooks/useChain";
import { Token } from "@/types/token.types";
import { useWallet } from "@/context/ThirdwebContext";
import { useUser } from "@/context/UserContext";
import BasicModal from "./primitives/Modal";
interface SimulationModeModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onLoad: (value: boolean) => void;
}
const SimulationModeModal = ({
  isOpen,
  isLoading,
  onClose,
  onLoad,
}: SimulationModeModalProps) => {
  const { address, chain } = useWallet();
  const { userSettings, setUserSettings } = useUser();
  const { switchChain } = useChain();
  const [simulationData, setSimulationData] = useState<any>(null);

  const trySimulationMode = async () => {
    try {
      if (userSettings.isLuciditySimulationMode) {
        // addNetworkToMetamask(SupportedChainId.DEVNET, CONSTS.rpc.devnet);
        onClose();
        switchChain(SupportedChainId.DEVNET);
      } else {
        onLoad(true);
        const simulatonResp = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/simulation?address=${address}&setupPositions=true`
        );
        const resp = await simulatonResp.json();
        if (resp) {
          setUserSettings({
            key: "isLuciditySimulationMode",
            value: true,
          });
          const provider = new JsonRpcProvider(resp.rpc);
          let simulationData = resp;
          const tokensData = await Promise.all(
            resp.tokens.map(async (token: string, index: number) => {
              const erc20Contract = new Contract(token, ERC20ABI, provider);
              const symbol = await erc20Contract.symbol();
              const decimals = await erc20Contract.decimals();
              return {
                symbol: symbol.toString(),
                decimals: decimals.toString(),
                address: resp.tokens[index],
                amount: new BigNumber(resp.amounts[index]).dividedBy(
                  10 ** parseFloat(decimals.toString())
                ),
              };
            })
          );
          tokensData.push({
            symbol: "ETH",
            decimals: "18",
            address: "0x0000000000000000000000000000000000000000",
            amount: formatEther(await provider.getBalance(address)),
          });
          const positionData = await Promise.all(
            resp.positionTokens.map(async (token: string, index: number) => {
              const erc20Contract = new Contract(token, ERC20ABI, provider);
              const symbol = await erc20Contract.symbol();
              const decimals = await erc20Contract.decimals();
              return {
                symbol: symbol.toString(),
                decimals: decimals.toString(),
                address: token,
                name: resp.positionTokenStrings[index],
                amount: new BigNumber(
                  resp.positionTokenAmounts[index]
                ).dividedBy(10 ** parseFloat(decimals.toString())),
              };
            })
          );
          simulationData = {
            ...simulationData,
            tokensData: tokensData,
            positionData,
          };
          setSimulationData(simulationData);
          onLoad(false);
        }
      }
    } catch (error) {
      onClose();
      onLoad(false);
      console.log("error", error);
    }
  };

  const addToken = async (token: Token) => {
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: token.address, // The address that the token is at.
            symbol: token.symbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: token.decimals, // The number of decimals in the token
            image: "", // A string url of the token logo
          },
        },
      });

      if (wasAdded) {
        console.log("Thanks for your interest!");
      } else {
        console.log("Your loss!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BasicModal height="fit-content" width={500} show={isOpen} close={onClose}>
      <div>
        <div style={{ paddingBottom: "10px" }}>
          <Text fontSize={20} fontWeight={400} mb={15}>
            Welcome to Lucidity Simulation Mode
          </Text>
          <Flex alignItems={"center"}>
            <Text fontSize={14} color={"fadedGrey"}>
              Powered by{" "}
            </Text>
            <Link
              href={process.env.NEXT_PUBLIC_TENDERLY_WEBSITE_URL}
              target="_blank"
              display={"flex"}
              color={"currentColor"}
              style={{ textDecoration: "none" }}
            >
              <Flex alignItems={"center"}>
                <Image
                  src="/images/tenderly.png"
                  width={20}
                  height={20}
                  alt="tenderly-logo"
                />
                <Text ml={1}>Tenderly</Text>
              </Flex>
            </Link>
          </Flex>
          <p color={"#6b6b85"} className="mb-2.5 mt-5">
            In the simulation network, you can experience the magic of Lucidity
            without concern for mainnet gas prices. Feel free to explore our
            features, and when you’re ready, you can transition to mainnet.
          </p>
          <Text fontSize={1} m={3}>
            1. You can use simulated assets to open new positions. <br></br> 2.
            You can use simulated positions to try the import position recipe.
          </Text>
        </div>
        {simulationData ? (
          <div>
            <div
              style={{
                borderBottom: "1px solid #6b6b85",
                borderTop: "1px solid #6b6b85",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              <Text
                fontSize={18}
                color="#6b6b85"
                fontWeight={400}
                mb={15}
                mt={15}
                textAlign="center"
              >
                Simulated Tokens
              </Text>
              {simulationData.tokensData &&
                simulationData.tokensData.map((token: Token) => (
                  <div key={token.symbol}>
                    <Flex
                      alignItems="center"
                      mb={15}
                      justifyContent="space-between"
                    >
                      <Text fontSize={16} fontWeight={400}>
                        {token.symbol}
                      </Text>
                      <Flex>
                        <Text fontSize={15} mr={10} fontWeight={400}>
                          {token.amount?.toString()}
                        </Text>
                        {simulationData &&
                          token.address !=
                            "0x0000000000000000000000000000000000000000" && (
                            <Flex alignItems="center" justifyContent="center">
                              <Flex
                                style={{
                                  textDecoration: "underline",
                                }}
                              >
                                <Text
                                  fontSize={12}
                                  mr={10}
                                  fontWeight={400}
                                  style={{ cursor: "pointer" }}
                                  onClick={() => addToken(token)}
                                >
                                  Add To Metamask
                                </Text>
                              </Flex>
                            </Flex>
                          )}
                      </Flex>
                    </Flex>
                  </div>
                ))}
            </div>
            <Text
              fontSize={18}
              mt={15}
              color="#6b6b85"
              fontWeight={400}
              mb={15}
              textAlign="center"
            >
              Simulated Positions
            </Text>
            {simulationData &&
              simulationData.positionData &&
              simulationData.positionData.map(
                (position: any, index: number) => (
                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    key={position}
                  >
                    <Flex alignItems="center" mb={15} flexDirection="column">
                      {index === 0 && (
                        <Text fontSize={16} mb={10} fontWeight={400}>
                          Protocol Name{" "}
                        </Text>
                      )}
                      <Text fontSize={15} fontWeight={400}>
                        {position.name}
                      </Text>
                    </Flex>

                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      flexDirection="column"
                    >
                      {index === 0 && (
                        <Text fontSize={16} mb={10} fontWeight={400}>
                          Simulated Balance{" "}
                        </Text>
                      )}
                      <Text
                        fontSize={15}
                        fontWeight={400}
                        textAlign={"right"}
                        width={"100%"}
                      >
                        {position.amount.toString()} {position.symbol}
                      </Text>
                    </Flex>
                  </Flex>
                )
              )}
            {simulationData &&
              chain?.chainId.toString().toLowerCase() !==
                simulationData.chainId.toString().toLowerCase() && (
                <Flex
                  alignItems="center"
                  mb={15}
                  justifyContent="center"
                  mt={20}
                >
                  <Button
                    onClick={() => {
                      // addNetworkToMetamask(
                      //   simulationData.chainId,
                      //   simulationData.rpc
                      // )
                      onClose();
                      switchChain(simulationData.chainId);
                    }}
                    color={"white"}
                    bg={"#000000"}
                    height={45}
                    fontSize={18}
                    sx={{
                      border: `1.5px solid #6c6c6c`,
                      transition: `0.5s`,
                      ":hover": {
                        backgroundColor: "grey",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <Flex justifyContent="center">
                      <span style={{ marginRight: "10px" }}>
                        {" "}
                        Switch to Simulation network
                      </span>
                      <HiOutlineSwitchHorizontal />
                    </Flex>
                  </Button>
                </Flex>
              )}
          </div>
        ) : (
          <Button
            color={"white"}
            bg={"#000000"}
            height={45}
            mt={20}
            disabled={isLoading}
            width={"100%"}
            fontSize={18}
            sx={{
              border: `1.5px solid #6c6c6c`,
              transition: `0.5s`,
              ":hover": {
                backgroundColor: "grey",
                cursor: "pointer",
              },
            }}
            onClick={trySimulationMode}
          >
            {isLoading
              ? "Launching Simulation Mode ..."
              : "Switch to Simulation network"}
          </Button>
        )}
      </div>
    </BasicModal>
  );
};

export default SimulationModeModal;
