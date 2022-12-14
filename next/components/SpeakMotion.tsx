import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import ListeningAnim from "./lotties/SpeakAnim";

const SpeakMotion = ({ right, listening }: { right?: boolean; listening: boolean }) => {

  const [speakMotionIdx, setSpeakMotionIdx] = useState<number>(0);

  return (
    <MotionBox right={right} className={listening ? "active": ""}>
      <ListeningAnim width={700} segmentIndex={speakMotionIdx} play={listening} />
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
  transition: opacity .3s;

  &.active {
    opacity: 1;
  }
`;
