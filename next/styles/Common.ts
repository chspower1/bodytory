import { motion } from "framer-motion";
import styled from "styled-components";
import IconArrowLeft from "@src/assets/icons/icon_arrow_left.png";
import { media } from "./theme";

export const Wrapper = styled.div<{ bgColor?: string }>`
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: ${props => props.bgColor};
  ${media.tablet}{
    overflow-y:scroll;
  }
`;

export const Container = styled(motion.div)`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  ${media.tablet}{
    padding: 0 30px;
  }
`;
export const WhiteWrapper = styled(Wrapper)`
  background-color: ${({ theme }) => theme.color.lightBg};
`;

export const FlexContainer = styled(Container)`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
export const InnerContainer = styled.div`
  margin: auto;
  height: 800px;
  padding-top: 70px;
`;

export const Box = styled(motion.div)<{ height?: string; width?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${props => (props.height ? props.height : "auto")};
  width: ${props => (props.width ? props.width : "auto")};
`;

export const Row = styled(Box)``;
export const Col = styled(Row)`
  flex-direction: column;
`;

export const BtnBox = styled(Row)<{ width?: string }>`
  width: ${props => (props.width ? props.width : "auto")};
  justify-content: space-between;
`;

export const WhiteText = styled.span<{ fontSize?: string }>`
  color: white;
  font-size: ${({ fontSize }) => fontSize || "18px"};
  strong {
    font-weight: 700;
  }
`;
export const BodyText = styled(WhiteText)`
  color: ${({ theme }) => theme.color.text};
  font-weight: 400;
`;
export const ToryText = styled(WhiteText)<{ color?: string }>`
  font-size: ${props => (props.fontSize ? props.fontSize : "36px")};
  color: ${props => (props.color ? props.color : props.theme.color.text)};
  line-height: 1.8;

  strong {
    font-weight: 700;
  }
`;
export const BlackToryText = styled(ToryText)`
  color: ${({ theme }) => theme.color.text};
`;

export const ToryText26 = styled(ToryText)`
  font-size: 26px;
`;

export const Accent = styled(ToryText)`
  color: ${({ theme }) => theme.color.darkBg};
`;

export const WhiteBoldText = styled(WhiteText)`
  font-weight: 600;
`;
export const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background: #5155ba url(${IconArrowLeft.src}) no-repeat 10px 50%/26px;
  overflow: hidden;
  transition: width 0.4s;

  span {
    display: block;
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.color.lightBg};
    width: 130px;
    padding-left: 20px;
    opacity: 0;
    transition: opacity 0.4s;
  }

  &:hover {
    width: 130px;

    span {
      opacity: 1;
    }
  }
  ${media.tablet}{
    width: 40px;
    height: 40px;
    background: #5155ba url(${IconArrowLeft.src}) no-repeat 10px 50%/18px;
    span {
      font-size: 14px;
    }
  }
`;
