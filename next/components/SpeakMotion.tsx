import React from "react";
import styled, { keyframes } from "styled-components";

const SpeakMotion = ({ right, listening }: { right?: boolean; listening: boolean }) => {
  return (
    <MotionBox right={right} className={listening ? "active" : ""}>
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
    </MotionBox>
  );
};

export default SpeakMotion;

const speakingMotion = keyframes`
  0%{transform : translate(-50%,-50%) scale(0.8);opacity: 1;}
  100%{transform : translate(-50%,-50%) scale(3); opacity: 0;}
`;

const MotionBox = styled.div<{ right?: boolean }>`
  position: absolute;
  width: 620px;
  height: 620px;
  ${({ right }) => (right ? `right: -620px` : `left: -620px`)};
  top: 50%;
  transform: translateY(-50%) scale(0);
  opacity: 0;
  transition: opacity 0.6s, transform 1.5s, right 1.5s, left 1.5s;
  &.active {
    ${({ right }) => (right ? `right: -300px` : `left: -300px`)};
    transform: translateY(-50%) scale(1);
    opacity: 1;

    span {
      animation: ${speakingMotion} 3s Infinite;
    }
  }
  span {
    position: absolute;
    left: 50%;
    top: 50%;
    display: block;
    transform: translate(-50%, -50%) scale(0.8);
    tranform-origin: center center;
    border-radius: 50%;
    width: 270px;
    height: 270px;
    &:nth-child(1) {
      background: rgba(100, 106, 235, 0.2);
      animation: none;
    }
    &:nth-child(2) {
      background: rgba(83, 89, 233, 0.1);
      animation-delay: 0.8s;
    }
    &:nth-child(3) {
      background: rgba(83, 89, 233, 0.1);
      animation-delay: 1.6s;
    }
    &:nth-child(4) {
      background: rgba(83, 89, 233, 0.1);
      animation-delay: 2.4s;
    }
    &:nth-child(5) {
      background: rgba(83, 89, 233, 0.1);
      animation-delay: 3.2s;
    }
  }
`;
