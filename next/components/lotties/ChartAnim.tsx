import lottie from "lottie-web";
import ChartAnimation from "@src/assets/lotties/chart_animation.json";
import { useEffect, useRef } from "react";

const ChartAnim = () => {
  const chartRef = useRef<any>();

  useEffect(() => {
    const chart = lottie.loadAnimation({
      container: chartRef.current,
      renderer: "canvas",
      loop: true,
      autoplay: true,
      animationData: ChartAnimation,
    });

    return () => {
      lottie.destroy();
    };
  }, []);

  return <div ref={chartRef}></div>;
};

export default ChartAnim;
