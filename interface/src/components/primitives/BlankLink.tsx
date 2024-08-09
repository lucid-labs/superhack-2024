import React from 'react'
import { Link } from 'rebass/styled-components'

type Props = {
  href: string;
  text: string;
  fontSize?: number | string
  color?: string
}

const BlankLink = ({ color = "fadedGrey", fontSize = 18, text, href }: Props) => {
  return (
    <Link fontWeight={"body"}
      fontSize={fontSize}
      sx={{
        transition: "0.5s",
        textDecoration: 'none',
        "&:hover": {
          cursor: "pointer",
          color: "grey",
        },
        marginRight: 20,
        "@media screen and (max-width: 40em)": {
          fontSize: 14,
          marginRight: 0,
        },
      }}
      color={color}
      alignSelf={"center"} target="_blank" href={href}>{text}</Link>
  )
}

export default BlankLink