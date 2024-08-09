import React from 'react'
import { Box, BoxProps } from 'rebass/styled-components'

interface Props extends BoxProps {
  children?: React.ReactNode | JSX.Element;
  height?: number | string
  width?: number | string
  padding?: number | string
  style?: React.CSSProperties
};


const Border = ({ children, height = 150, padding = 20, width = "100%", style, ...props }: Props) => {
  return (
    <Box
      minHeight={height}
      width={width}
      p={padding}
      sx={{
        border: '1.2px solid',
        borderColor: "tintGrey",
        borderRadius: 10,
        ...style
      }}
      {...props}
    >
      {children}
    </Box>
  )
}

export default Border