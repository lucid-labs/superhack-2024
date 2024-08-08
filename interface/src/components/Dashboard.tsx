import { Flex } from "rebass";
import Chatbot from "./Chatbot";
import TokenBalances from "./TokenBalances";

const Dashboard: React.FC = () => {
  return (
    <Flex className="flex gap-8 mx-auto w-full justify-center">
      <Chatbot />
      <TokenBalances />
    </Flex>
  );
};
export default Dashboard;
