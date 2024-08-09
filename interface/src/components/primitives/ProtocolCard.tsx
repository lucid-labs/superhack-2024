import React from 'react'
import Border from './Border'
import { Box, Flex, Heading, Image, Text } from 'rebass/styled-components'
import AppButton from './Button'
import { FaArrowAltCircleRight } from 'react-icons/fa'
type Props = {
  protocol: string
}

const ProtocolCard = ({ protocol }: Props) => {
  return (
    <Border width={"48%"} m={10}>
      <Flex>

        <Flex width={"70%"}>
          <Image src={"https://dummyimage.com/50"} width={50} mr={10} height={50} sx={{ borderRadius: "100%" }} />
          <Text alignSelf={'center'} fontSize={18}>
            {protocol} <FaArrowAltCircleRight transform='rotate(-45)' fontSize={15} />
          </Text>
        </Flex>
        <Box width={"30%"} textAlign={"right"}>
          <AppButton
            fontSize={12}
            label='Manage' onPress={() => { }} />
        </Box>
      </Flex>
      <Box height={30}></Box>
      <Flex width={"80%"} margin={"auto"} justifyContent={'space-between'}>
        <Box mr={15}>
          <Heading fontSize={12} color={"softGrey"} fontWeight={300}>Total Supplied</Heading>
          <Text textAlign={'center'} fontWeight={400} opacity={0.8} fontSize={22} color={'fadedGrey'}>$11,424</Text>
        </Box>
        <Box height={"50px"} alignSelf={'center'} width={"1px"} backgroundColor={"#d6d6d6"}></Box>
        <Box mr={15}>
          <Heading fontSize={12} color={"softGrey"} fontWeight={300}>Total Borrowed</Heading>
          <Text textAlign={'center'} fontWeight={400} opacity={0.8} fontSize={22} color={'fadedGrey'}>$11,424</Text>
        </Box>
      </Flex>
    </Border>
  )
}

export default ProtocolCard