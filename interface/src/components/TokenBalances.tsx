import { useUser } from "@/context/UserContext";
import { decimalPoints } from "@/utils/config";
import { truncate } from "@/utils/convert";
import { useMemo } from "react";
import { Box, Flex, Image, Text } from "rebass";

const TokenBalances: React.FC = () => {
  const { userBalances } = useUser();
  const supportedTokens = useMemo(
    () =>
      userBalances.sort(
        (a, b) =>
          Number(b?.tokenBalance || "0") - Number(a?.tokenBalance || "0")
      ),
    [userBalances]
  );

  return (
    <div className="mt-12 p-6 w-[25rem] bg-gray-100 text-gray-900 rounded-lg shadow-md text-center max-w-full h-[580px] overflow-scroll">
      <div className="font-semibold text-left mb-6">Supported Tokens</div>
      <Box className="list-wrap">
        {supportedTokens?.map((token) => (
          <Flex
            flexDirection="row"
            sx={{ gap: "12px" }}
            mb={2}
            key={token.contractAddress}
            width={"100%"}
          >
            <Image
              src={token.logo ? token.logo : ""}
              width="32px"
              height="32px"
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
                {token.name}
              </Text>
              <Text fontSize={"14px"} color={"#6f6d78"} className="text-right">
                {truncate(token.tokenBalance, decimalPoints.token)}{" "}
                {token.symbol}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Box>
    </div>
  );
};
export default TokenBalances;
