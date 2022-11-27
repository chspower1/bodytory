import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden;
  // padding-top: 116px;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
`;

export const FlexContainer = styled(Container)`
  display: flex;
  height: 100%;
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
export const ToryText = styled(WhiteText)`
  font-size: 34px;
  line-height: 1.8;

  strong {
    font-weight: 700;
  }
`;
export const ToryText26 = styled(ToryText)`
  font-size: 26px;
`;

export const WhiteBoldText = styled(WhiteText)`
  font-weight: 600;
`;
