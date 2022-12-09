import lottie from "lottie-web";
import ChartAnimation from "@src/lotties/data/chart_animation.json";
import { useEffect, useRef } from "react";

const ChartAnim = () => {
  const chartRef = useRef<any>();

  useEffect(() => {
    
    const chart = lottie.loadAnimation({
      container: chartRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: ChartAnimation
    });

  }, []);


  return (
      <div ref={chartRef}></ div>
  );
};


export default ChartAnim;
