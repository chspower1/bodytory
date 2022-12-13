import { AnimationItem, AnimationSegment, LottiePlayer } from "lottie-web";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface ToryAnimProps {
  toryMotionIdx: number;
  width: number;
  delay?: number;
}

const ToryPurpleAnim = ({ toryMotionIdx, width, delay }: ToryAnimProps) => {
  const [ready, setReady] = useState<boolean>(false);
  const [ToryPurple, setToryPurple] = useState<AnimationItem>();
  const [lottie, setLottie] = useState<LottiePlayer | null>(null);

  const lottieRef = useRef<any>();

  const frameSegments: AnimationSegment[] = [
    [0, 149],
    [150, 215],
    [216, 276],
    [277, 456],
    [457, 576],
    [577, 725],
  ];

  useEffect(() => {
    import("lottie-web").then(Lottie => setLottie(Lottie.default));
  }, []);

  useEffect(() => {
    if (lottie && lottieRef.current) {
      console.log("setToryPurple");
      setToryPurple(
        lottie.loadAnimation({
          container: lottieRef.current,
          renderer: "svg",
          loop: true,
          autoplay: false,
          path: "/static/lottie/tory_purple.json",
        }),
      );
    }

    if (delay) {
      setTimeout(() => {
        setReady(true);
      }, delay);
    } else {
      setReady(true);
    }

    return () => {
      lottie && lottie.destroy();
    };
  }, [lottie]);

  useEffect(() => {
    if (ToryPurple && ready) {
      ToryPurple.playSegments(frameSegments[toryMotionIdx], true);
    }
  }, [ready, toryMotionIdx, ToryPurple]);

  return <LottieElem ref={lottieRef} width={width} />;
};

const LottieElem = styled.div<{ width: number }>`
  width: ${({ width }) => width}px;
`;

export default ToryPurpleAnim;
