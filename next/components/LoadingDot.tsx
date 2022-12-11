import React, { useEffect, useRef } from "react";

const LoadingDot = () => {
  const iRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const creater = setInterval(() => {
      if (iRef.current !== null) {
        iRef.current.innerText += ".";
        if (iRef.current.innerText.length > 3) {
          iRef.current.innerText = "";
        }
      }
    }, 500);
    return () => {
      clearInterval(creater);
    };
  }, []);
  return <i ref={iRef}></i>;
};

export default LoadingDot;
