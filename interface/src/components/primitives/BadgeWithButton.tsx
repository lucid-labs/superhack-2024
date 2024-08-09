import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Fa6 } from "react-icons/fa6";
import { Box, Text, Flex, Button } from "rebass/styled-components";

type Props = {
  text: string | JSX.Element;
  buttonText: string;
  action: () => void;
};

const BadgeWithButton = ({ buttonText, action, text }: Props) => {
  return (
    text && (
      <Flex
        px={10}
        mt={10}
        flexWrap={"wrap"}
        sx={{
          border: "1px solid #969696",
          borderRadius: 10,
          minHeight: 50,
          padding: 10,
          color: "#7f7f7f",
          backgroundColor: "#f2f2f2",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Box display={"grid"} alignContent={"center"}>
          <Text>{text}</Text>
        </Box>
        <Button
          color={"white"}
          bg={"#000000"}
          height={45}
          width={"20%"}
          backgroundColor={"#333"}
          fontSize={14}
          sx={{
            border: `1.5px solid #6c6c6c`,
            transition: `0.5s`,
            ":hover": {
              backgroundColor: "grey",
              cursor: "pointer",
            },
            "@media screen and (max-width: 100em)": {
              width: "100%",
              marginTop: "10px",
            },
          }}
          onClick={action}
        >
          <Flex justifyContent={"center"}>
            <Text>{buttonText}</Text>
            <Box display={"grid"} alignContent={"center"}>
              <FaArrowRight style={{ marginLeft: "5px" }} />
            </Box>
          </Flex>
        </Button>
      </Flex>
    )
  );
};

export default BadgeWithButton;
