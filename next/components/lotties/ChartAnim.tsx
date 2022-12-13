import { LottiePlayer } from "lottie-web";
import { useEffect, useRef, useState } from "react";

const ChartAnim = () => {
  const chartRef = useRef<any>();
  const [lottie, setLottie] = useState<LottiePlayer | null>(null);

  useEffect(() => {
    import("lottie-web").then(Lottie => setLottie(Lottie.default));
  }, []);

  useEffect(() => {
    if (lottie && chartRef.current) {
      const chart = lottie.loadAnimation({
        container: chartRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "../../public/static/lottie/chart_animation.json",
      });
    }

    return () => {
      lottie && lottie.destroy();
    };
  }, [lottie]);

  return <div ref={chartRef}></div>;
};

export default ChartAnim;
