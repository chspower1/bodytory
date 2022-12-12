import lottie, { AnimationItem, AnimationSegment } from "lottie-web";
import ToryWhiteAnimation from "@src/lotties/data/tory_white.json";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface ToryAnimProps {
  toryMotionIdx: number;
  width: number;
}

const ToryWhiteAnim = ( { toryMotionIdx, width }: ToryAnimProps ) => {

  const [ready, setReady] = useState<boolean>(false);
  const [motionIndex, setMotionIndex] = useState<number>(0);

  const [ToryWhite, setToryWhite] = useState<AnimationItem>();

  const lottieRef = useRef<any>();

  const frameSegments: AnimationSegment[] = [ [0, 149], [150, 215], [216, 276], [277, 456], [457, 576], [577, 725] ];


  useEffect(() => {
    setToryWhite(lottie.loadAnimation({
      container: lottieRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: false,
      animationData: ToryWhiteAnimation,
      // path: "/src/lotties/data/tory_white.json"
    }));

    setReady(true);

  }, []);
  


  useEffect(() => {

    if(ToryWhite) {
      ToryWhite.playSegments(frameSegments[toryMotionIdx], true);
    }

    console.log(toryMotionIdx);

  }, [ready, toryMotionIdx]);


  return (
    <LottieElem ref={lottieRef} width={width} />
  );
};

const LottieElem = styled.div<{width: number}>`
  width: ${ ({ width }) => width }px;
`;


export default ToryWhiteAnim;
