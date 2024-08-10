import React from 'react'
import { FaCheck } from "react-icons/fa6";
import { Box } from 'rebass/styled-components'
import Border from './Border';
import HoverBox from './HoverBox';
type Props = {
  selected: boolean
  onClick: () => void;
}

const CheckBox = ({ selected, onClick }: Props) => {
  return (
    <HoverBox onClick={onClick}>
      <Border backgroundColor={selected ? 'primary' : ''} display={'grid'} alignContent={'center'} justifyContent={'center'} height={"25px"} width={"25px"} padding={0}>
        <FaCheck color={selected ? 'white' : '#676767'} fontSize={13} />
      </Border>
    </HoverBox>
  )
}

export default CheckBox