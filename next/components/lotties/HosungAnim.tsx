import { AnimationItem, AnimationSegment, LottiePlayer } from "lottie-web";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { LottieAnimProps } from "types/lottieProps";

const HosungAnim = ({ segmentIndex, width, delay, play }: LottieAnimProps) => {
  const [ready, setReady] = useState<boolean>(false);
  const [hosung, setHosung] = useState<AnimationItem>();
  const [lottie, setLottie] = useState<LottiePlayer | null>(null);

  const lottieRef = useRef<any>();

  const frameSegments: AnimationSegment[] = [
    [0, 119],
  ];

  useEffect(() => {
    import("lottie-web").then(Lottie => setLottie(Lottie.default));
  }, []);

  useEffect(() => {
    if (lottie && lottieRef.current) {
      setHosung(
        lottie.loadAnimation({
          container: lottieRef.current,
          renderer: "svg",
          loop: false,
          autoplay: false,
          path: "/static/lottie/hosung.json",
          initialSegment: frameSegments[segmentIndex]
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
    if (hosung && ready) {
      if(play) {
        hosung.playSegments(frameSegments[0], false);
      }
    }

  }, [ready, hosung, play]);

  return <LottieElem ref={lottieRef} width={width} />;
};

const LottieElem = styled.div<{ width: number }>`
  width: ${({ width }) => width}px;
`;

export default HosungAnim;
