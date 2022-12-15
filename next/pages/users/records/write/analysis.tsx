import LoadingDot from "@components/LoadingDot";
import useUser from "@hooks/useUser";
import { Col, FlexContainer, ToryText, Wrapper } from "@styles/Common";
import withGetServerSideProps from "@utils/client/withGetServerSideProps";
import { GetServerSidePropsContext, NextPage } from "next";
import styled, { keyframes } from "styled-components";
import tory from "@src/assets/icons/tory.png";
import { media } from "@styles/theme";

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
export const ToryRotateAnimation = keyframes`
  50%{
    transform: rotate(-25deg);
  }
`
export const AnalysisWrapper = styled(Wrapper)`
  background-color: ${({ theme }) => theme.color.darkBg};
  ${ToryText}{
    text-align:center;
    word-break:keep-all;
    ${media.custom(490)}{
      padding: 0 40px;
    }
    ${media.custom(400)}{
      padding: 0 10px;
    }
  }
`;
export const Tory = styled.div`
  margin-top: 115px;
  width: 350px;
  height: 350px;
  border-radius: 50%;
  background: url(${tory.src}) no-repeat center center;
  background-size:40%;
  background-color: white;
  transform: rotate(25deg);
  animation: ${ToryRotateAnimation} 3s infinite;
  ${media.tablet}{
    margin-top: 90px;
    width: 240px;
    height: 240px;
  }
  ${media.mobile}{
    margin-top: 65px;
    width: 180px;
    height: 180px;
  }
`;
