import { FlexContainer } from "@styles/Common";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import tory from "@src/assets/icons/tory.png";
import { motion } from "framer-motion";
import { CircleButton, RoundButton } from "@components/layout/buttons/Button";
import { theme } from "@styles/theme";
import skipIcon from "@src/assets/icons/skipIcon.png";
import { useRouter } from "next/router";

const LendingRoot = styled.div<{ flex: boolean }>`
  margin: auto;

  ${({ flex }) =>
    flex &&
    css`
      display: flex;
      align-items: center;
      gap: 120px;
    `}

  .imgBox {
    display: flex;
    justify-content: center;
  }
`;

const ToriMessage = styled(motion.h2)`
  font-size: 40px;
  margin-bottom: 80px;
  color: #fff;
`;

const QuestionBox = styled(motion.div)`
  .btnBox {
    display: flex;
    justify-content: space-evenly;
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

export default function LendingPage() {
  const router = useRouter();
  const [toriComment, setToriComment] = useState("반가워요!");
  const [isFirst, setIsFrist] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setToriComment("저는 당신의 건강비서 토리에요!");
      setTimeout(() => {
        setIsFrist(true);
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
        <div className="imgBox">
          <img src={tory.src} />
        </div>
        {isFirst && (
          <QuestionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }}
          >
            <ToriMessage>바디토리는 처음이신가요?</ToriMessage>
            <div className="btnBox">
              <Link href="/auth/register/choice">
                <CircleButton bgColor={theme.color.mintBtn}>네</CircleButton>
              </Link>
              <Link href="/auth/login">
                <CircleButton>아니요</CircleButton>
              </Link>
            </div>
          </QuestionBox>
        )}
      </LendingRoot>
      <SkipBox>
        <RoundButton width="200px" bgColor="rgb(75, 80, 211)" onClick={() => router.push("/")}>
          <span>건너뛰기</span>
          <span className="imgBox"></span>
        </RoundButton>
      </SkipBox>
    </FlexContainer>
  );
}
