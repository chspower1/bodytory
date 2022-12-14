import { AnimationItem, AnimationSegment, LottiePlayer } from "lottie-web";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { LottieAnimProps } from "types/lottieProps";

const SpeakAnim = ({ segmentIndex, width, delay, play }: LottieAnimProps) => {
  const [ready, setReady] = useState<boolean>(false);
  const [speaking, setSpeaking] = useState<AnimationItem>();
  const [lottie, setLottie] = useState<LottiePlayer | null>(null);

  const lottieRef = useRef<any>();

  const frameSegments: AnimationSegment[] = [
    [0, 119],
    [120, 179],
  ];

  useEffect(() => {
    import("lottie-web").then(Lottie => setLottie(Lottie.default));
  }, []);

  useEffect(() => {
    if (lottie && lottieRef.current) {
      setSpeaking(
        lottie.loadAnimation({
          container: lottieRef.current,
          renderer: "svg",
          loop: true,
          autoplay: false,
          path: "/static/lottie/speaking.json",
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
    if (speaking && ready) {
      if(play) {
        speaking.setSpeed(1.4);
        speaking.playSegments(frameSegments[1], false);
      } else {
        speaking.pause();
      }

    }

  }, [ready, segmentIndex, speaking, play]);

  return <LottieElem ref={lottieRef} />;
};

const LottieElem = styled.div`
  width: 100%;
`;

export default SpeakAnim;
