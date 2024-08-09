import React from 'react'
import { Flex } from 'rebass/styled-components'

type Props = {
  text: string;
  styles?: object;
}

const AlertBadge = ({ text, styles }: Props) => {
  return (
    text && <Flex mt={10} sx={{
      border: "1px solid #969696",
      borderRadius: 10,
      minHeight: 70,
      padding: 10,
      color: '#7f7f7f',
      backgroundColor: '#f2f2f2',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      ...styles
    }}>{text}</Flex>
  )
}

export default AlertBadge