import BodyNavigator from "@components/records/BodyNavigator";
import styled, { css } from "styled-components";
import BodyPartChecker from "@components/records/BodyPartChecker";
import { useEffect, useState } from "react";
import { bodyPartType } from "../../../../types/bodyParts";
import { useSetRecoilState } from "recoil";
import { currentBodyPosition } from "atoms/atoms";
import { motion } from "framer-motion";
import { media } from "@styles/theme";
import doubleArrowIcon from "@src/assets/icons/doubleRight.png";

export default function WritePage() {
  const [selectedBodyPart, setSelectedBodyPart] = useState<bodyPartType>(null);
  const setCurrentPosition = useSetRecoilState(currentBodyPosition);
  const [isSelect, setIsSelect] = useState(false);
  useEffect(() => {
    setCurrentPosition("front");
  }, []);
  useEffect(() => {
    if (selectedBodyPart) {
      setIsSelect(false);
    }
  }, [selectedBodyPart]);

  return (
    <RecordContainer>
      <BodyPartCheckerArea
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, type: "tween", ease: "easeOut" }}
      >
        <BodyPartChecker selectedBodyPart={selectedBodyPart} setIsSelect={setIsSelect} />
      </BodyPartCheckerArea>
      <BodyNavigatorArea
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, type: "tween", ease: "easeOut", delay: 0.4 }}
      >
        <BodyNavigator
          selectedBodyPart={selectedBodyPart}
          setSelectedBodyPart={setSelectedBodyPart}
          isWritePage={true}
        />
      </BodyNavigatorArea>
      <MobBodyNavigatorArea isSelect={isSelect}>
        <BodyNavigator
          selectedBodyPart={selectedBodyPart}
          setSelectedBodyPart={setSelectedBodyPart}
          isWritePage={true}
        />
        <EnterNavigatorButton isSelect={isSelect} onClick={() => setIsSelect(prev => !prev)} />
      </MobBodyNavigatorArea>
    </RecordContainer>
  );
}

const RecordContainer = styled.div`
  position: relative;
  padding: 50px;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BodyPartCheckerArea = styled(motion.div)`
  width: 55%;
  max-width: 1200px;
`;

const MobBodyNavigatorArea = styled.div<{ isSelect: boolean }>`
  display: none;
  width: 45%;
  max-width: 820px;
  position: absolute;
  left: 0;
  top: 50%;
  height: 90%;
  width: 88%;
  transform: translate(-100%, -50%);
  transition: transform 0.8s;
  ${({ isSelect }) =>
    isSelect &&
    css`
      transform: translate(0%, -50%);
    `}
  ${media.custom(1366)} {
    display: block;
  }
`;

const BodyNavigatorArea = styled(motion.div)`
  width: 45%;
  max-width: 820px;
  ${media.custom(1366)} {
    display: none;
  }
`;
const EnterNavigatorButton = styled.button<{ isSelect: boolean }>`
  display: none;
  position: absolute;
  right: -40px;
  top: 50%;
  transform: translateY(-50%);
  width: 80px;
  height: 80px;
  padding: 20px;
  background: url(${doubleArrowIcon.src}) no-repeat 90% 50%;
  background-color: ${({ theme }) => theme.color.darkBg};
  background-size: 30px 30px;
  border-radius: 50%;
  z-index: 5;
  box-shadow: 8px 8px 18px rgba(3, 231, 203, 0.25);
  transition: right 0.6s, transform 0.6s, background-position 0.6s;
  ${media.custom(1366)} {
    display: block;
    ${({ isSelect }) =>
      isSelect &&
      css`
        transform: rotate(180deg) translateY(50%);
        background-position: 10% 50%;
      `}
  }
`;
