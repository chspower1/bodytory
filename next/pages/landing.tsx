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
import { CircleDefaultButton, RoundedDefaultButton } from "@components/layout/buttons/DefaultButtons";

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
  margin: 80px 0 40px;
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
    justify-content: space-around;
    margin-bottom: 60px;
  }
`;

const SelectButton = styled(CircleDefaultButton)`
  width: 120px;
  height: 120px;
  font-size: 20px;
`


const SkipBox = styled(motion.div)`
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
const SkipButton =styled(RoundedDefaultButton)`
  padding: 18px 40px;
`

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
      }, 3000);
    }, 3000);
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }}
          >
            {toriComment}
          </ToriMessage>
        )}
        <ToryWhiteAnim toryMotionIdx={toryMotionIdx} width={500} />
        {isFirst && (
          <QuestionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }}
          >
            <ToriMessage>바디토리는 처음이신가요?</ToriMessage>
            <div className="btnBox">
              <SelectButton  bgColor={theme.color.mintBtn} onClick={handleClickPushRegister}>네</SelectButton>
              <SelectButton  onClick={handleClickPushLogin}>아니요</SelectButton>
            </div>
          </QuestionBox>
        )}
      </LendingRoot>
      <AnimatePresence>
        {!isFirst && (
          <SkipBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SkipButton bgColor="rgb(70, 75, 206)" onClick={handleClickPushLogin}>
              <span>건너뛰기</span>
              <span className="imgBox"></span>
            </SkipButton>
          </SkipBox>
        )}
      </AnimatePresence>
    </FlexContainer>
  );
}
