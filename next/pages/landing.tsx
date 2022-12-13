import { FlexContainer } from "@styles/Common";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import tory from "@src/assets/icons/tory.png";
import { AnimatePresence, motion } from "framer-motion";
import { CircleButton, RoundButton } from "@components/layout/buttons/Button";
import { theme } from "@styles/theme";
import skipIcon from "@src/assets/icons/skipIcon.png";
import { useRouter } from "next/router";
import ToryWhiteAnim from "@components/lotties/ToryWhiteAnim";
import { isFirstUser } from "atoms/atoms";
import { useSetRecoilState } from "recoil";


export default function LendingPage() {
  const router = useRouter();
  const [toriComment, setToriComment] = useState("반가워요!");
  const [isFirst, setIsFrist] = useState(false);
  const [toryMotionIdx, setToryMotionIdx] = useState<number>(0);
  const setIsNew  = useSetRecoilState(isFirstUser);

  const handleClickPushRegister =()=>{
    setIsNew(false);
    router.push("/auth/register/choice");
  }
  const handleClickPushLogin =()=>{
    setIsNew(false);
    router.push("/auth/login");
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setToriComment("저는 당신의 건강비서 토리에요!");
      setToryMotionIdx(1);
      setTimeout(() => {
        setIsFrist(true);
        setToryMotionIdx(5);
      }, 2700);
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
            animate={{ opacity: 1, y: 0, transition: { duration: .3, ease: "easeOut", delay: .7 } }}
          >
            {toriComment}
          </ToriMessage>
        )}
        <ToryMotion
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: .6, ease: "easeOut", delay: .2 } }}
        >
          <ToryWhiteAnim toryMotionIdx={toryMotionIdx} width={480} />
        </ToryMotion>
        {isFirst && (
          <QuestionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: .5, ease: "easeOut" } }}
          >
            <ToriMessage>바디토리는 처음이신가요?</ToriMessage>
            <div className="btnBox">
              <CircleButton bgColor={theme.color.mintBtn} onClick={handleClickPushRegister}>네</CircleButton>
              <CircleButton onClick={handleClickPushLogin}>아니요</CircleButton>
            </div>
          </QuestionBox>
        )}
      </LendingRoot>
      <AnimatePresence>
        {!isFirst && (
          <SkipBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <RoundButton size="md" width="200px" bgColor="rgb(70, 75, 206)" onClick={handleClickPushLogin}>
              <span>건너뛰기</span>
              <span className="imgBox"></span>
            </RoundButton>
          </SkipBox>
        )}
      </AnimatePresence>
    </FlexContainer>
  );
}


const LendingRoot = styled.div<{ flex: boolean }>`
  margin: auto;

  ${({ flex }) =>
    flex &&
    css`
      display: flex;
      align-items: center;
      gap: 60px;
    `}
  }
`;

const ToriMessage = styled(motion.h2)`
  font-size: 40px;
  margin: 80px 0 0;
  color: #fff;
  text-align: center;
`;

const QuestionBox = styled(motion.div)`
  padding-right: 160px;

  ${ToriMessage} {
    margin: 0 0 100px;
  }

  .btnBox {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 60px;
  }
`;

const SkipBox = styled.div`
  position: absolute;
  right: 60px;
  bottom: 40px;
  .imgBox {
    background: url(${skipIcon.src}) no-repeat center center;
    background-size: contain;
    width: 15px;
    height: 15px;
    margin: -2px 0 0 10px;
  }
`;

const ToryMotion = styled(motion.div)`
  transform: translate(0 , -50px);
`;