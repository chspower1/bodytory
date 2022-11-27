import styled from "styled-components";

export const Wrapper = styled.div<{ bgColor?: string }>`
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: ${props => props.bgColor};
  // padding-top: 116px;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
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

export const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Col = styled(Row)`
  flex-direction: column;
`;
export const WhiteText = styled.span<{ fontSize?: string }>`
  color: white;
  font-size: ${({ fontSize }) => fontSize || "16px"};
`;
export const BodyText = styled(WhiteText)`
  color: ${({ theme }) => theme.color.text};
`;
export const ToryText = styled(WhiteText)<{ color?: string }>`
  font-size: 36px;
  color: ${props => (props.color ? props.color : props.theme.color.text)};
`;
export const BlackToryText = styled.div`
  /* color: ${({ theme }) => theme.color.text}; */
  font-size: 36px;
  width: auto;
`;
export const Accent = styled(ToryText)`
  color: ${({ theme }) => theme.color.darkBg};
`;
export const WhiteBoldText = styled(WhiteText)`
  font-weight: 600;
`;
