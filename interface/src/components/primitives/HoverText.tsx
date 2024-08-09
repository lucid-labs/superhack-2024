import React from 'react'
import { SxStyleProp, Text, TextProps } from 'rebass/styled-components'
interface Props extends TextProps {
  children: React.ReactNode | JSX.Element;
}

const HoverText = ({ children, style, ...props }: Props) => {
  return (
    <Text sx={{
      ...style,
      "&:hover": {
        cursor: 'pointer'
      }
    }} {...props}>{children}</Text>
  )
}

export default HoverText