import lottie, { AnimationItem, AnimationSegment, LottiePlayer } from "lottie-web";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface ToryAnimProps {
  listeningMotionIdx: number;
  width: number;
}

const ListeningAnim = ({ listeningMotionIdx, width }: ToryAnimProps) => {
  const [ready, setReady] = useState<boolean>(false);
  const [listening, setListening] = useState<AnimationItem>();
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
      setListening(
        lottie.loadAnimation({
          container: lottieRef.current,
          renderer: "svg",
          loop: true,
          autoplay: false,
          path: "/static/lottie/listening.json",
        }),
      );
    }

    setReady(true);

    return () => {
      lottie && lottie.destroy();
    };
  }, [lottie]);

  useEffect(() => {
    if (listening) {
      listening.playSegments(frameSegments[listeningMotionIdx], true);
    }

    console.log(listeningMotionIdx);
  }, [ready, listeningMotionIdx, listening]);

  return <LottieElem ref={lottieRef} width={width} />;
};

const LottieElem = styled.div<{ width: number }>`
  width: ${({ width }) => width}px;
`;

export default ListeningAnim;
