import LoadingDot from "@components/LoadingDot";
import useUser from "@hooks/useUser";
import { Col, FlexContainer, ToryText, Wrapper } from "@styles/Common";
import withGetServerSideProps from "@utils/client/withGetServerSideProps";
import { GetServerSidePropsContext, NextPage } from "next";
import styled from "styled-components";

const Analysis: NextPage = () => {
  const { user } = useUser();

  return (
    <AnalysisWrapper>
      <FlexContainer>
        <Col>
          <ToryText color="#FFF">
            {user?.name}님의 건강상태를 기록하고 분석하고 있어요
            <LoadingDot />
          </ToryText>
          <Tory />
        </Col>
      </FlexContainer>
    </AnalysisWrapper>
  );
};
export default Analysis;
export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  };
});
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
