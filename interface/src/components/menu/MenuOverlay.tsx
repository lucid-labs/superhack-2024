import styled from "styled-components";

const Container = styled.div<{
  isOpen?: boolean;
  right?: string;
}>`
  ${({isOpen, right = "30px"}) =>
    isOpen
      ? `
          position: absolute;
          right: ${right};
          margin-top: 10px;
          top: 64px;
          width: fit-content;
          background-color: #ffffff;
          border-radius: 10px;
          height: auto;
          border: 1px solid #b2b2b2;
          width: 250px;
          padding: 10px;
          z-index: 10;
        `
      : `
          display: none;
        `}
`;

interface FloatingMenuProps {
  isOpen: boolean;
  right?: string;
  children: JSX.Element;
  // Transition props.
  transition?: {
    // How much does the Y position moves on animate.
    // Default is 20
    moveY?: number;
  };
}

const MenuOverlay: React.FC<FloatingMenuProps> = ({
  isOpen,
  children,
  right,
}) => {
  return (
    <Container key={isOpen.toString()} isOpen={isOpen} right={right}>
      {children}
    </Container>
  );
};

export default MenuOverlay;
