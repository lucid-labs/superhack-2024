import React from "react";
import { Button, ButtonProps } from "rebass/styled-components";

interface Props extends ButtonProps {
  label: string;
  style?: React.CSSProperties;
  rightIcon?: React.ReactElement;
  loading?: boolean;
  onPress: (e: React.MouseEvent<HTMLElement>) => void;
};

const AppButton = ({ label, style, rightIcon, onPress, loading = false, ...props }: Props) => {
  return (
    <Button
      onClick={onPress}
      sx={{
        ...style,
        border: `1.5px solid #151515`,
        ":hover": {
          backgroundColor: "grey",
          cursor: "pointer",
        },
      }}
      {...props}
    >
      {loading ? (
        <i className="fa fa-spinner fa-spin"></i>
      ) : (
        <>
          {label} {rightIcon}
        </>
      )}
    </Button>
  );
};

export default AppButton;
