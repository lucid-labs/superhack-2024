import React from 'react'
import { Box, Button, Flex, Text } from "rebass/styled-components"
import { Label, Input } from "@rebass/forms";
import { FaInfo } from 'react-icons/fa6';

interface Props {
  onChange?: (value: any) => void;
  value?: string;
  label?: string;
  style?: React.CSSProperties;
  rightText?: string;
  toolTip?: string;
  rightButton?: string;
  onRightButtonCick?: () => void;
}


const AppInput = ({ rightButton, onRightButtonCick, toolTip, value, rightText, label = "", onChange, style = {
  color: '#6b6b85',
  border: '1px solid #d2d2d2',
  backgroundColor: "white",
  borderRadius: "4px",
  height: "39px",
} }: Props) => {
  let inputWidth = '100%'
  if (rightText || rightButton) {
    inputWidth = '70%'
  } else if (rightText && rightButton) {
    inputWidth = '40%'
  }
  // if (rightText) return <>
  //   <Label color={"#6b6b85"} mb={10}>{label}</Label>
  //   <Flex sx={{
  //     border: '1px solid #d2d2d2',
  //     height: "39px",
  //     borderRadius: "4px",
  //   }}>
  //     <Input width={"70%"} value={value} style={{
  //       backgroundColor: 'white',
  //       borderRadius: "4px",
  //       border: 'none',
  //     }} onChange={onChange} />
  //     <Box sx={{
  //       borderLeft: '1px solid #d2d2d2',
  //       color: '#6b6b85',
  //       background: '#f4f4f4',
  //       height: "100%"
  //     }} width={"30%"} textAlign={'center'} display={'grid'} alignContent={'center'}>
  //       <Flex justifyContent={'center'}>
  //         <Text> {rightText}</Text>
  //         {
  //           toolTip ? <Box alignSelf={'center'} mx={"3px"} mt={"2px"} ml={"3px"} backgroundColor={'#b9b9b9'} width={16} height={16} sx={{ borderRadius: "100%" }} display={'grid'} justifyContent={'center'} alignContent={'center'}>
  //             <a data-tooltip-id="my-tooltip" data-tooltip-content={toolTip}>
  //               <FaInfo color='#f6f6f6' fontSize={10} />
  //             </a>
  //           </Box> : null
  //         }
  //       </Flex>
  //     </Box>
  //   </Flex>
  // </>
  return (
    <>
      {label && <Label color={"#6b6b85"} mb={10}>{label}</Label>}
      <Flex sx={{
        border: '1px solid #d2d2d2',
        height: "42px",
        borderRadius: "4px",
      }}>
        <Input value={value} onChange={onChange}
          width={inputWidth}
          style={{
            ...style,
            backgroundColor: 'white',
            borderRadius: "4px",
            border: 'none',
          }}
        />
        {rightText && <Box sx={{
          borderLeft: '1px solid #d2d2d2',
          color: '#6b6b85',
          background: rightButton ? 'transparent' : '#f4f4f4',
          height: "100%",
          borderRadius: rightButton ? '0px' : "4px"
        }} width={"30%"} textAlign={'center'} display={'grid'} alignContent={'center'}>
          <Flex justifyContent={'center'}>
            <Text> {rightText}</Text>
            {
              toolTip ? <Box alignSelf={'center'} mx={"3px"} mt={"2px"} ml={"3px"} backgroundColor={'#b9b9b9'} width={16} height={16} sx={{ borderRadius: "100%" }} display={'grid'} justifyContent={'center'} alignContent={'center'}>
                <a data-tooltip-id="my-tooltip" data-tooltip-content={toolTip}>
                  <FaInfo color='#f6f6f6' fontSize={10} />
                </a>
              </Box> : null
            }
          </Flex>
        </Box>}
        {rightButton &&
          <Button sx={{
            borderLeft: '1px solid #d2d2d2',
            color: '#000',
            background: 'transparent',
            height: "100%",
            cursor: 'pointer',
            textDecoration: 'underline',
            fontSize: '17px',
            borderRadius: '0px 4px 4px 0px'
          }}
            onClick={onRightButtonCick}
            width={"30%"}
            textAlign={'center'}
            display={'grid'}
            alignContent={'center'}
          >
            {rightButton}
          </Button>}
      </Flex>
    </>

  )
}

export default AppInput