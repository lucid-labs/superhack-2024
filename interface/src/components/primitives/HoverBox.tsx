import React from 'react'
import { SxStyleProp, Box, TextProps } from 'rebass/styled-components'
interface Props extends TextProps {
  border?: boolean;
  children: React.ReactNode | JSX.Element;
  hoverBackgroundColor?: string;
  onClick?: () => void;
}

const HoverBox = ({ children, border, style, hoverBackgroundColor = 'transparent', onClick, ...props }: Props) => {
  const borderStyle = border ? {
    border: '1.2px solid',
    borderColor: "tintGrey",
    borderRadius: 10,
    ...style
  } : {}
  return (
    <Box
      onClick={onClick}
      sx={{
        ...style,
        ...borderStyle,
        transition: '0.8s',
        "&:hover": {
          cursor: 'pointer',
          backgroundColor: hoverBackgroundColor
        }
      }} {...props}>{children}</Box>
  )
}

export default HoverBox