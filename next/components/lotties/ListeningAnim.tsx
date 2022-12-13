import lottie, { AnimationItem, AnimationSegment } from "lottie-web";
import ListeningAnimation from "@src/assets/lotties/listening.json";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";


interface ToryAnimProps {
  listeningMotionIdx: number;
  width: number;
}

const ListeningAnim = ( { listeningMotionIdx, width }: ToryAnimProps ) => {

  const [ready, setReady] = useState<boolean>(false);
  const [listening, setListening] = useState<AnimationItem>();

  const lottieRef = useRef<any>();

  const frameSegments: AnimationSegment[] = [ [0, 119], [120, 179]];


  useEffect(() => {
    setListening(lottie.loadAnimation({
      container: lottieRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: false,
      animationData: ListeningAnimation,
      // path: "/src/lotties/data/tory_white.json"
    }));

    setReady(true);

  }, []);
  


  useEffect(() => {

    if(listening) {
      listening.playSegments(frameSegments[listeningMotionIdx], true);
    }

    console.log(listeningMotionIdx);

  }, [ready, listeningMotionIdx]);


  return (
    <LottieElem ref={lottieRef} width={width} />
  );
};

const LottieElem = styled.div<{width: number}>`
  width: ${ ({ width }) => width }px;
`;


export default ListeningAnim;
