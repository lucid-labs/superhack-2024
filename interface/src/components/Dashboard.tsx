import { Flex } from "rebass";
import Chatbot from "./Chatbot";
import TokenBalances from "./TokenBalances";

const Dashboard: React.FC = () => {
  return (
    <Flex
      className="flex flex-col md:flex-row gap-4 mx-auto w-full justify-between"
      sx={{
        '@media screen and (max-width: 768px)': {
          flexDirection: 'column-reverse',
        },
      }}
    >
      <TokenBalances />
      <Chatbot />
    </Flex>
  );
};

export default Dashboard;