import { useUser } from "@/context/UserContext";
import { decimalPoints } from "@/utils/config";
import { truncate } from "@/utils/convert";
import BigNumber from "bignumber.js";
import { useMemo } from "react";
import { Box, Flex, Image, Text } from "rebass";
import Loader from "./primitives/Loader";

const TokenBalances: React.FC = () => {
  const { userBalances, userBalanceFetching } = useUser();
  const supportedTokens = useMemo(
    () =>
      userBalances.sort(
        (a, b) =>
          Number(b?.tokenBalance || "0") - Number(a?.tokenBalance || "0")
      ),
    [userBalances]
  );

  return (
    <div className="mt-12 p-6 w-[25rem] bg-gray-100 text-gray-900 rounded-lg shadow-md text-center max-w-full h-[40vh] overflow-scroll md:h-[80vh]">
      <div className="font-semibold text-left mb-6">
        Token Balances (Zero Balance Hidden)
      </div>
      {userBalanceFetching ? (
        <Box>
          <Loader />
        </Box>
      ) : (
        <Box className="list-wrap">
          {supportedTokens
            ?.filter((res) => new BigNumber(res.tokenBalance).isGreaterThan(0))
            .map((token) => (
              <Flex
                flexDirection="row"
                sx={{ gap: "12px" }}
                mb={2}
                key={token.contractAddress}
                width={"100%"}
              >
                <Image
                  src={token.logo ? token.logo : "/icons/unknown_coin_logo.svg"}
                  width="28px"
                  height="24px"
                  sx={{ borderRadius: "50%" }}
                  alt={token.name}
                />
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  width={"100%"}
                >
                  <Text
                    fontSize={"16px"}
                    color={"#211f26"}
                    mb="4px"
                    className="text-left"
                  >
                    {token.symbol}
                  </Text>
                  <Text
                    fontSize={"14px"}
                    color={"#6f6d78"}
                    className="text-right"
                  >
                    {truncate(token.tokenBalance, decimalPoints.token)}
                  </Text>
                </Flex>
              </Flex>
            ))}
        </Box>
      )}
    </div>
  );
};
export default TokenBalances;
