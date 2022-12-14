import { RoundedDefaultButton } from "@components/layout/buttons/DefaultButtons";
import ToryPurpleAnim from "@components/lotties/ToryPurpleAnim";
import { PositionTextBox } from "@components/records/BodyPartChecker";
import { Position } from "@prisma/client";
import { FlexContainer } from "@styles/Common";
import { media, theme } from "@styles/theme";
import { motion } from "framer-motion";
import withGetServerSideProps from "@utils/client/withGetServerSideProps";
import { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { KoreanPosition } from "types/write";

const AddPage: NextPage = () => {
  const router = useRouter();
  const position = router.query.position as Position;

  const [toryMotionIdx, setToryMotionIdx] = useState<number>(1);

  useEffect(() => {
    setTimeout(() => {
      setToryMotionIdx(0);
    }, 2300);
  }, []);

  return (
    <FlexContainer>
      <FadeInMotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1, ease: "easeOut", delay: .3 } }}
      >
        <ToryMotion>
          <ToryPurpleAnim segmentIndex={toryMotionIdx} />
        </ToryMotion>
        <ToryText>
          <PositionTextBox>{KoreanPosition[position]}</PositionTextBox>에 대한 기록을 완료했어요.
          <br />
          다른 부위도 기록할까요?
        </ToryText>
        <ButtonBox>
          <RoundButton onClick={() => router.replace("/users/records/write")}>네, 다른 부위도 기록할래요</RoundButton>
          <RoundButton
            onClick={() => router.replace(`/users/records/chart/${position}`)}
            bgColor={theme.color.weekPurple}
            color="rgb(93, 107, 178)"
          >
            아니요,더 기록할게 없어요
          </RoundButton>
        </ButtonBox>
      </FadeInMotionDiv>
    </FlexContainer>
  );
};
export default AddPage;

const FadeInMotionDiv = styled(motion.div)`
`;
export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  };
});

const RoundButton = styled(RoundedDefaultButton)`
  padding: 21px 50px;
  ${media.custom(1280)} {
    padding: 18px 40px;
    font-size: 18px;
  }
  ${media.custom(980)} {
    padding: 18px 28px;
    font-size: 15px;
  }
  ${media.mobile} {
    padding: 15px 18px;
    font-size: 12px;
  }
`;

export const ToryText = styled.div`
  font-size: 36px;
  color: ${({ theme }) => theme.color.text};
  line-height: 1.8;
  text-align: center;
  margin-bottom: 100px;

  ${media.custom(1280)} {
    font-size: 30px;
  }
  ${media.custom(980)} {
    font-size: 22px;
  }
  ${media.mobile} {
    font-size: 18px;
  }

  ${media.tablet} {
    font-size: 26px;
  }

  ${media.mobile} {
    font-size: 22px;
  }

`;

const ButtonBox = styled.div`
  display: flex;
  padding: 0 0 200px;
  justify-content:center;
  > button {
    margin: 0 30px;
    ${media.custom(664)} {
      margin: 0 20px;
    }
    ${media.mobile} {
      margin: 0 5px;
    }
  }
`;

const ToryMotion = styled.div`
  width: 360px;
  height: 360px;
  margin: 0 auto 40px;
`;
