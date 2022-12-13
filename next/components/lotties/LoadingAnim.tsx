import { LottiePlayer } from "lottie-web";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const LoadingAnim = () => {
  const loadingRef = useRef<any>();
  const [lottie, setLottie] = useState<LottiePlayer | null>(null);

  useEffect(() => {
    import("lottie-web").then(Lottie => setLottie(Lottie.default));
  }, []);

  useEffect(() => {
    if (lottie && loadingRef.current) {
      const loading = lottie.loadAnimation({
        container: loadingRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "../../public/static/lottie/loading_animation.json",
      });
      loading.setSpeed(0.8);
    }

    return () => {
      lottie && lottie.destroy();
    };
  }, [lottie]);

  return <LoadingElem ref={loadingRef} />;
};

const LoadingElem = styled.div`
  width: 200px;
  height: 200px;
`;

export default LoadingAnim;
