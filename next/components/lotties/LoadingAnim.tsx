import lottie from "lottie-web";
import LoadingAnimation from "@src/assets/lotties/loading_animation.json";
import { useEffect, useRef } from "react";
import styled from "styled-components";

const LoadingAnim = () => {
  const loadingRef = useRef<any>();

  useEffect(() => {
    const loading = lottie.loadAnimation({
      container: loadingRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: LoadingAnimation,
    });

    loading.setSpeed(0.8);
  }, []);

  return <LoadingElem ref={loadingRef} />;
};

const LoadingElem = styled.div`
  width: 200px;
  height: 200px;
`;

export default LoadingAnim;
