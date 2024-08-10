import { ReactElement } from "react";
import { Box, Text } from "rebass/styled-components";

type Props = {
  label: ReactElement | string;
  onClick?: (e?: any) => void;
  style?: any;
  className?: any;
  icon?: ReactElement | string;
};

const MenuItem = ({ label, onClick, icon, style, className }: Props) => {
  return (
    <Text
      onClick={onClick}
      my={10}
      color={"grey"}
      className={className}
      sx={{
        display: "flex",
        alignItems: "center",
        transition: "0.4s",
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "#f2eff3",
          transform: "scale(1.01)",
          color: "#211f26",
        },
        ...style,
      }}
    >
      {icon}
      {label}
    </Text>
  );
};

export default MenuItem;
