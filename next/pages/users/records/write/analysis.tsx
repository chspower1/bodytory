import LoadingDot from "@components/LoadingDot";
import useUser from "@hooks/useUser";
import { Col, FlexContainer, ToryText,  Wrapper } from "@styles/Common";
import styled from "styled-components";

const Analysis = () => {
  const {user} = useUser();

  return (
    <AnalysisWrapper>
      <FlexContainer>
        <Col>
          <ToryText color="#FFF">{user?.name}님의 건강상태를 기록하고 분석하고 있어요<LoadingDot/></ToryText>
          <Tory />
        </Col>
      </FlexContainer>
    </AnalysisWrapper>
  );
};
export default Analysis;

const AnalysisWrapper = styled(Wrapper)`
  background-color: ${({ theme }) => theme.color.darkBg};
`;
const Tory = styled.div`
  margin-top: 115px;
  background-color: white;
  width: 360px;
  height: 360px;
  border-radius: 50%;
`;
