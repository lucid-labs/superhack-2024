import React from 'react'
import { Text, TextProps } from 'rebass/styled-components'
interface Props extends TextProps {
  fontSize?: number,
  children: React.ReactNode | JSX.Element;
}

const Heading = ({ children, fontSize = 20, ...props }: Props) => {
  if (typeof children !== 'string') {
    throw Error("Invalid type, use string: Heading.tsx")
  }
  return (
    <Text fontSize={fontSize} alignSelf={'center'} fontWeight={400} color={'fadedGrey'} {...props}>{children}</Text>
  )
}

export default Heading