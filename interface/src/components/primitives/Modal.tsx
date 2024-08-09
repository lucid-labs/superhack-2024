import { useEffect } from "react";
import { Box, Text } from "rebass/styled-components";

interface ModalProps {
  show: boolean;
  height?: number | string;
  width?: number | string;
  heading?: string;
  children: JSX.Element;
  close: (e?: MouseEvent) => void;
  overlayStyles?: object;
  modalStyles?: object;
}

// const CloseIcon = styled.div`
//   > i {
//     color: #4a4a5c;
//     font-size: 25px;
//     transition: 0.5s;
//     :hover {
//       cursor: pointer;
//       color: #57576c;
//     }
//   }
// `;

const BasicModal = ({
  heading,
  show,
  height = 400,
  width = 400,
  children,
  close,
  overlayStyles,
  modalStyles,
}: ModalProps) => {
  useEffect(() => {
    if (!show) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, [show]);

  function handleClose(e) {
    document.body.style.overflow = "scroll";
    close(e);
  }

  return (
    <>
      {show && (
        <>
          <Box
            onClick={handleClose}
            backgroundColor={"#9f9f9f"}
            height={"100vh"}
            width={"100%"}
            opacity={0.9}
            sx={{
              filter: "blur(1px)",
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 3,
              overflow: "hidden",
              overflowY: "hidden",
              ...overlayStyles,
            }}
          ></Box>
          <Box
            width={width}
            height={height}
            padding={20}
            backgroundColor={"white"}
            sx={{
              border: `1px solid #e6e6e6`,
              borderRadius: 10,
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%)`,
              zIndex: 4,
              "@media screen and (max-width: 60em)": {
                width: "60%",
              },
              "@media screen and (max-width: 50em)": {
                width: "98%",
              },
              ...modalStyles,
            }}
          >
            {heading && (
              <Box
                sx={{
                  borderRadius: "10px",
                  border: "2px solid",
                  borderColor: "#383939",
                  backgroundColor: "#262626",
                }}
                display={"flex"}
                marginX={0.5}
                marginTop={1}
                padding={10}
              >
                <i className="fa fa-info-circle white" aria-hidden="true"></i>
                <Text fontSize={12} mt={-0.5} ml={2} color={"white"}>
                  {heading}
                </Text>
              </Box>
            )}
            {children}
          </Box>
        </>
      )}
    </>
  );
};

export default BasicModal;
