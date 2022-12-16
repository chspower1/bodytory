import { media } from "@styles/theme";
import React, { useState } from "react";
import styled from "styled-components";
import ListeningAnim from "./lotties/SpeakAnim";

const SpeakMotion = ({ right, listening }: { right?: boolean; listening: boolean }) => {
  const [speakMotionIdx, setSpeakMotionIdx] = useState<number>(0);

  return (
    <MotionBox right={right} className={listening ? "active" : ""}>
      <ListeningAnim segmentIndex={speakMotionIdx} play={listening} />
    </MotionBox>
  );
};

export default SpeakMotion;

const MotionBox = styled.div<{ right?: boolean }>`
  position: absolute;
  width: 700px;
  height: 700px;
  ${({ right }) => (right ? `right: -350px` : `left: -350px`)};
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 1;
  &.active {
    opacity: 1;
  }

  ${media.custom(1280)} {
    width: 600px;
    height: 600px;
    ${({ right }) => (right ? `right: -300px` : `left: -300px`)};
  }

  ${media.mobile} {
    width: 500px;
    height: 500px;
    ${({ right }) => (right ? `display: none` : `left: 50%`)};
    top: auto;
    bottom: -250px;
    transform: translate(-50%, 0);
  }
`;
