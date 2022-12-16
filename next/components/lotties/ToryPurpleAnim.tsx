import { AnimationItem, AnimationSegment, LottiePlayer } from "lottie-web";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { LottieAnimProps } from "types/lottieProps";

const ToryPurpleAnim = ({ segmentIndex, delay }: LottieAnimProps) => {
  const [ready, setReady] = useState<boolean>(false);
  const [toryPurple, setToryPurple] = useState<AnimationItem>();
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
      setToryPurple(
        lottie.loadAnimation({
          container: lottieRef.current,
          renderer: "svg",
          loop: true,
          autoplay: false,
          path: "/static/lottie/tory_purple.json",
          initialSegment: frameSegments[segmentIndex],
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
    if (toryPurple && ready) {
      toryPurple.playSegments(frameSegments[segmentIndex], true);
    }
  }, [ready, segmentIndex, toryPurple]);

  return <LottieElem ref={lottieRef} />;
};

const LottieElem = styled.div`
  width: 100%;
`;

export default ToryPurpleAnim;
