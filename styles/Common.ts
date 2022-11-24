import styled from "styled-components";

export const Wrapper = styled.div`
  height: calc(100vh - 113px);
  width: 100%;
  overflow: hidden;
`;

export const Container = styled.div`
  width:100%;
  max-width:1300px;
  margin: 0 auto;
  padding: 30px 0;
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
`;
export const WhiteBoldText = styled(WhiteText)`
  font-weight: 600;
`;
