import { FlexContainer } from "@styles/Common";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { media, theme } from "@styles/theme";
import skipIcon from "@src/assets/icons/skipIcon.png";
import { useRouter } from "next/router";
import ToryWhiteAnim from "@components/lotties/ToryWhiteAnim";
import { isFirstUser } from "atoms/atoms";
import { useSetRecoilState } from "recoil";
import { CircleDefaultButton, RoundedDefaultButton } from "@components/layout/buttons/DefaultButtons";
import withGetServerSideProps from "@utils/client/withGetServerSideProps";
import { GetServerSidePropsContext } from "next";

const LandingPage = () => {
  const router = useRouter();
  const [toriComment, setToriComment] = useState("반가워요!");
  const [isFirst, setIsFrist] = useState(false);
  const [toryMotionIdx, setToryMotionIdx] = useState<number>(0);
  const setIsNew = useSetRecoilState(isFirstUser);

  const handleClickPushRegister = () => {
    setIsNew(false);
    router.push("/auth/register/choice");
  };
  const handleClickPushLogin = () => {
    setIsNew(false);
    router.push("/auth/login");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setToriComment("저는 당신의 건강비서 토리에요!");
      setToryMotionIdx(1);
      setTimeout(() => {
        setIsFrist(true);
        setToryMotionIdx(5);
      }, 2200);
    }, 2700);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <FlexContainer>
      <LendingRoot flex={isFirst}>
        {!isFirst && (
          <ToriMessage
            key={toriComment}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut", delay: 0.7 } }}
          >
            {toriComment}
          </ToriMessage>
        )}
        <ToryMotion
          isFirst={isFirst}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } }}
        >
          <ToryWhiteAnim segmentIndex={toryMotionIdx} />
        </ToryMotion>
        {isFirst && (
          <QuestionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }}
          >
            <ToriMessage>바디토리는 처음이신가요?</ToriMessage>
            <div className="btnBox">
              <SelectButton bgColor={theme.color.mintBtn} onClick={handleClickPushRegister}>
                네
              </SelectButton>
              <SelectButton onClick={handleClickPushLogin}>아니요</SelectButton>
            </div>
          </QuestionBox>
        )}
      </LendingRoot>
      <AnimatePresence>
        {!isFirst && (
          <SkipBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SkipButton img bgColor="rgb(70, 75, 206)" onClick={handleClickPushLogin}>
              <span>건너뛰기</span>
              <span className="imgBox"></span>
            </SkipButton>
          </SkipBox>
        )}
      </AnimatePresence>
    </FlexContainer>
  );
};
export default LandingPage;

export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  };
});

const LendingRoot = styled.div<{ flex: boolean }>`
  margin: auto;
  position: relative;

  ${({ flex }) =>
    flex &&
    css`
      display: flex;
      align-items: center;
      gap: 60px;
      ${media.custom(1111)} {
        gap: 0;
      }
    `}
`;

const ToriMessage = styled(motion.h2)`
  font-size: 40px;
  margin: 80px 0 0;
  color: #fff;
  text-align: center;
  ${media.mobile} {
    font-size: 30px;
    word-break: keep-all;
  }
`;

const QuestionBox = styled(motion.div)`
  padding-right: 160px;
  flex-shrink: 0;
  ${ToriMessage} {
    margin: 0 0 100px;
  }

  .btnBox {
    display: flex;
    justify-content: space-around;
    margin-bottom: 60px;
  }
  ${media.custom(970)} {
    padding-right: 0;
    .btnBox {
      padding-top: 300px;
    }
  }
  ${media.mobile} {
    .btnBox {
      justify-content: center;
      padding-top: 220px;
    }
  }
`;

const SelectButton = styled(CircleDefaultButton)`
  width: 120px;
  height: 120px;
  font-size: 20px;
  ${media.mobile} {
    width: 80px;
    height: 80px;
    font-size: 16px;
    margin: 0 20px;
  }
`;

const SkipBox = styled(motion.div)`
  position: absolute;
  right: 5%;
  bottom: 40px;
  .imgBox {
    background: url(${skipIcon.src}) no-repeat center center;
    background-size: contain;
    width: 15px;
    height: 15px;
    margin: -2px 0 0 10px;
  }
  ${media.mobile} {
    .imgBox {
      width: 10px;
      height: 10px;
      margin: 0 0 0 5px;
    }
  }
`;

const SkipButton = styled(RoundedDefaultButton)`
  padding: 18px 40px;
`;

const ToryMotion = styled(motion.div)<{ isFirst: boolean }>`
  transform: translate(0, -50px);
  width: 480px;
  height: 480px;
  ${media.custom(970)}{
    width: 400px;
    height: 400px;
    margin: 0 auto;
    
    ${({ isFirst }) =>
      isFirst &&
      css`
      position: absolute;
      left: 50%;
      top:32%;
      transform: translate(-50%, -50%);
      
    }
  `}
  ${media.mobile}{
    width: 300px;
    height: 300px;
  }
`;
