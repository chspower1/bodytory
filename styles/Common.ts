import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  font-size: 36px;
`;
export const WhiteBoldText = styled(WhiteText)`
  font-weight: 600;
`;
