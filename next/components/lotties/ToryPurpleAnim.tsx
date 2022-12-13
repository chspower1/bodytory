import lottie, { AnimationItem, AnimationSegment } from "lottie-web";
import ToryPurpleAnimation from "@src/assets/lotties/tory_purple.json";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface ToryAnimProps {
  toryMotionIdx: number;
  width: number;
  delay?: number;
}

const ToryPurpleAnim = ( { toryMotionIdx, width, delay }: ToryAnimProps ) => {

  const [ready, setReady] = useState<boolean>(false);
  const [ToryPurple, setToryPurple] = useState<AnimationItem>();

  const lottieRef = useRef<any>();

  const frameSegments: AnimationSegment[] = [ [0, 149], [150, 215], [216, 276], [277, 456], [457, 576], [577, 725] ];


  useEffect(() => {
    setToryPurple(lottie.loadAnimation({
      container: lottieRef.current,
      renderer: 'canvas',
      loop: true,
      autoplay: false,
      animationData: ToryPurpleAnimation,
    }));

    if(delay) {
      setTimeout(() => {
        setReady(true);
      }, delay);
    } else {
      setReady(true);
    }

  }, []);
  

  useEffect(() => {
    if(ToryPurple) {
      ToryPurple.playSegments(frameSegments[toryMotionIdx], true);
    }

  }, [ready, toryMotionIdx]);

  return <LottieElem ref={lottieRef} width={width} />;
};

const LottieElem = styled.div<{ width: number }>`
  width: ${({ width }) => width}px;
`;

export default ToryPurpleAnim;
